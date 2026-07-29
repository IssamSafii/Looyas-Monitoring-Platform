package com.safistage.monitoring.oci.workrequests;

import com.oracle.bmc.model.BmcException;
import com.oracle.bmc.workrequests.WorkRequestClient;
import com.oracle.bmc.workrequests.model.WorkRequest;
import com.oracle.bmc.workrequests.model.WorkRequestSummary;
import com.oracle.bmc.workrequests.requests.GetWorkRequestRequest;
import com.oracle.bmc.workrequests.requests.ListWorkRequestErrorsRequest;
import com.oracle.bmc.workrequests.requests.ListWorkRequestLogsRequest;
import com.oracle.bmc.workrequests.requests.ListWorkRequestsRequest;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciPaginatedDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestErrorDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestLogDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestsPageDto;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;

@Service
public class OciWorkRequestService {

    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int MAX_PAGE_SIZE = 100;
    private static final int OCI_BATCH_SIZE = 100;
    private static final String COMMON_API_NOTICE = "Cette vue utilise l'API Work Requests commune d'OCI. Certains services peuvent exposer leurs propres endpoints et ne pas apparaitre ici.";
    private static final String COMMON_API_PARTIAL_NOTICE = "Certaines informations detaillees ne sont pas disponibles via l'API commune. La page reste utilisable en lecture seule.";

    private final OciClientFactory clientFactory;
    private final OciProperties properties;
    private final OciExceptionMapper exceptionMapper;
    private final OciWorkRequestMapper mapper;

    public OciWorkRequestService(OciClientFactory clientFactory,
                                 OciProperties properties,
                                 OciExceptionMapper exceptionMapper,
                                 OciWorkRequestMapper mapper) {
        this.clientFactory = clientFactory;
        this.properties = properties;
        this.exceptionMapper = exceptionMapper;
        this.mapper = mapper;
    }

    public OciWorkRequestsPageDto listWorkRequests(String compartmentId,
                                                   String status,
                                                   String operationType,
                                                   Instant from,
                                                   Instant to,
                                                   String resource,
                                                   Integer page,
                                                   Integer limit) {
        try {
            OciResolvedConfig config = requireConfigured();
            validateRange(from, to);

            int safePage = normalizePage(page);
            int safeLimit = normalizeLimit(limit);
            int offset = safePage * safeLimit;
            String effectiveCompartmentId = resolveCompartmentId(config, compartmentId);
            String resourceFilter = normalizeText(resource);
            String resourceIdFilter = resourceFilter != null && resourceFilter.startsWith("ocid1.") ? resourceFilter : null;
            String statusFilter = normalizeText(status);
            String operationFilter = normalizeText(operationType);

            try (var client = clientFactory.newWorkRequestClient(config)) {
                List<OciWorkRequestDto> items = new ArrayList<>();
                LinkedHashSet<String> notices = new LinkedHashSet<>();
                int skipped = 0;
                boolean hasNext = false;
                boolean partialSupport = false;
                String nextPage = null;

                do {
                    var response = client.listWorkRequests(ListWorkRequestsRequest.builder()
                            .compartmentId(effectiveCompartmentId)
                            .resourceId(resourceIdFilter)
                            .limit(OCI_BATCH_SIZE)
                            .page(nextPage)
                            .build());

                    nextPage = response.getOpcNextPage();

                    for (WorkRequestSummary summary : response.getItems()) {
                        if (!matchesSummary(summary, statusFilter, operationFilter, from, to)) {
                            continue;
                        }

                        HydrationResult hydration = hydrateWorkRequest(client, summary, resourceFilter, resourceIdFilter != null);
                        partialSupport |= hydration.partialSupport();
                        if (hydration.notice() != null && !hydration.notice().isBlank()) {
                            notices.add(hydration.notice());
                        }
                        if (!hydration.matches()) {
                            continue;
                        }

                        if (skipped < offset) {
                            skipped++;
                            continue;
                        }

                        if (items.size() < safeLimit) {
                            items.add(hydration.dto());
                            continue;
                        }

                        hasNext = true;
                        break;
                    }
                } while (!hasNext && nextPage != null);

                return new OciWorkRequestsPageDto(
                        items,
                        safePage,
                        safeLimit,
                        hasNext,
                        partialSupport,
                        buildNotice(partialSupport, notices)
                );
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciWorkRequestDto getWorkRequest(String id) {
        String workRequestId = normalizeWorkRequestId(id);

        try {
            OciResolvedConfig config = requireConfigured();
            try (var client = clientFactory.newWorkRequestClient(config)) {
                WorkRequest workRequest = client.getWorkRequest(GetWorkRequestRequest.builder()
                                .workRequestId(workRequestId)
                                .build())
                        .getWorkRequest();

                return mapper.toDto(workRequest, loadFirstErrorMessage(client, workRequestId), true, COMMON_API_NOTICE);
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciPaginatedDto<OciWorkRequestErrorDto> getErrors(String id, String page, Integer limit) {
        String workRequestId = normalizeWorkRequestId(id);

        try {
            OciResolvedConfig config = requireConfigured();
            int safeLimit = normalizeLimit(limit);

            try (var client = clientFactory.newWorkRequestClient(config)) {
                var response = client.listWorkRequestErrors(ListWorkRequestErrorsRequest.builder()
                        .workRequestId(workRequestId)
                        .page(blankToNull(page))
                        .limit(safeLimit)
                        .build());

                return new OciPaginatedDto<>(
                        response.getItems().stream().map(mapper::toDto).toList(),
                        safeLimit,
                        response.getOpcNextPage(),
                        response.getOpcNextPage() != null,
                        false,
                        null
                );
            }
        } catch (Throwable exception) {
            if (isCommonApiUnsupported(exception)) {
                return new OciPaginatedDto<>(List.of(), normalizeLimit(limit), null, false, true, COMMON_API_PARTIAL_NOTICE);
            }
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciPaginatedDto<OciWorkRequestLogDto> getLogs(String id, String page, Integer limit) {
        String workRequestId = normalizeWorkRequestId(id);

        try {
            OciResolvedConfig config = requireConfigured();
            int safeLimit = normalizeLimit(limit);

            try (var client = clientFactory.newWorkRequestClient(config)) {
                var response = client.listWorkRequestLogs(ListWorkRequestLogsRequest.builder()
                        .workRequestId(workRequestId)
                        .page(blankToNull(page))
                        .limit(safeLimit)
                        .build());

                return new OciPaginatedDto<>(
                        response.getItems().stream().map(mapper::toDto).toList(),
                        safeLimit,
                        response.getOpcNextPage(),
                        response.getOpcNextPage() != null,
                        false,
                        null
                );
            }
        } catch (Throwable exception) {
            if (isCommonApiUnsupported(exception)) {
                return new OciPaginatedDto<>(List.of(), normalizeLimit(limit), null, false, true, COMMON_API_PARTIAL_NOTICE);
            }
            throw exceptionMapper.toApiException(exception);
        }
    }

    private HydrationResult hydrateWorkRequest(WorkRequestClient client,
                                               WorkRequestSummary summary,
                                               String resourceFilter,
                                               boolean exactResourceFilterApplied) {
        try {
            WorkRequest detailedWorkRequest = client.getWorkRequest(GetWorkRequestRequest.builder()
                            .workRequestId(summary.getId())
                            .build())
                    .getWorkRequest();

            String errorMessage = loadFirstErrorMessage(client, summary.getId());
            OciWorkRequestDto dto = mapper.toDto(detailedWorkRequest, errorMessage, true, COMMON_API_NOTICE);
            return new HydrationResult(dto, matchesResource(dto, resourceFilter), false, null);
        } catch (Throwable exception) {
            if (isCommonApiUnsupported(exception)) {
                OciWorkRequestDto dto = mapper.toDto(summary, null, false, COMMON_API_PARTIAL_NOTICE);
                return new HydrationResult(dto, resourceFilter == null || exactResourceFilterApplied, true, COMMON_API_PARTIAL_NOTICE);
            }
            throw exceptionMapper.toApiException(exception);
        }
    }

    private String loadFirstErrorMessage(WorkRequestClient client, String workRequestId) {
        try {
            var response = client.listWorkRequestErrors(ListWorkRequestErrorsRequest.builder()
                    .workRequestId(workRequestId)
                    .limit(1)
                    .build());

            if (response.getItems() == null || response.getItems().isEmpty()) {
                return null;
            }

            return response.getItems().get(0).getMessage();
        } catch (Throwable exception) {
            if (isCommonApiUnsupported(exception)) {
                return null;
            }
            throw exceptionMapper.toApiException(exception);
        }
    }

    private boolean matchesSummary(WorkRequestSummary summary,
                                   String statusFilter,
                                   String operationFilter,
                                   Instant from,
                                   Instant to) {
        if (statusFilter != null) {
            String currentStatus = summary.getStatus() == null ? "" : summary.getStatus().getValue();
            if (!currentStatus.equalsIgnoreCase(statusFilter)) {
                return false;
            }
        }

        if (operationFilter != null) {
            String operation = summary.getOperationType() == null ? "" : summary.getOperationType();
            if (!operation.toLowerCase(Locale.ROOT).contains(operationFilter)) {
                return false;
            }
        }

        return matchesPeriod(summary.getTimeAccepted(), summary.getTimeStarted(), summary.getTimeFinished(), from, to);
    }

    private boolean matchesResource(OciWorkRequestDto dto, String resourceFilter) {
        if (resourceFilter == null) {
            return true;
        }

        if (dto.resourceSummary() != null && dto.resourceSummary().toLowerCase(Locale.ROOT).contains(resourceFilter)) {
            return true;
        }

        return dto.resources().stream().anyMatch(resource ->
                resource.entityType().toLowerCase(Locale.ROOT).contains(resourceFilter)
                        || resource.identifier().toLowerCase(Locale.ROOT).contains(resourceFilter)
                        || resource.maskedIdentifier().toLowerCase(Locale.ROOT).contains(resourceFilter));
    }

    private boolean matchesPeriod(java.util.Date accepted,
                                  java.util.Date started,
                                  java.util.Date finished,
                                  Instant from,
                                  Instant to) {
        if (from == null && to == null) {
            return true;
        }

        Instant start = started != null ? started.toInstant() : accepted != null ? accepted.toInstant() : finished != null ? finished.toInstant() : null;
        Instant end = finished != null ? finished.toInstant() : start;

        if (start == null || end == null) {
            return false;
        }
        if (from != null && end.isBefore(from)) {
            return false;
        }
        return to == null || !start.isAfter(to);
    }

    private OciResolvedConfig requireConfigured() {
        OciResolvedConfig config = clientFactory.resolveConfiguration();
        if (!config.enabled() || !config.configured()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "La source OCI n'est pas encore configuree.");
        }
        return config;
    }

    private void validateRange(Instant from, Instant to) {
        if (from != null && to != null && (from.equals(to) || from.isAfter(to))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La periode OCI est invalide.");
        }

        if (from != null && to != null && Duration.between(from, to).toHours() > properties.getMaxQueryRangeHours()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La plage OCI demandee depasse la limite autorisee.");
        }
    }

    private String resolveCompartmentId(OciResolvedConfig config, String requestCompartmentId) {
        String value = requestCompartmentId != null && !requestCompartmentId.isBlank() ? requestCompartmentId.trim() : config.compartmentId();
        if (value == null || value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "Aucun compartment OCI n'est configure.");
        }
        return value;
    }

    private int normalizeLimit(Integer limit) {
        if (limit == null) {
            return DEFAULT_PAGE_SIZE;
        }
        if (limit <= 0 || limit > MAX_PAGE_SIZE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La taille de page OCI doit etre comprise entre 1 et 100.");
        }
        return limit;
    }

    private int normalizePage(Integer page) {
        if (page == null) {
            return 0;
        }
        if (page < 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La page OCI doit etre positive.");
        }
        return page;
    }

    private String normalizeWorkRequestId(String value) {
        if (value == null || value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "workRequestId invalide.");
        }
        return value.trim();
    }

    private String normalizeText(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim().toLowerCase(Locale.ROOT);
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private boolean isCommonApiUnsupported(Throwable throwable) {
        Throwable candidate = throwable instanceof ApiException ? throwable.getCause() : throwable;
        if (candidate instanceof BmcException bmcException) {
            return switch (bmcException.getStatusCode()) {
                case 400, 404, 405, 409, 501 -> true;
                default -> false;
            };
        }
        return false;
    }

    private String buildNotice(boolean partialSupport, LinkedHashSet<String> notices) {
        if (!partialSupport) {
            return COMMON_API_NOTICE;
        }

        if (notices.isEmpty()) {
            return COMMON_API_NOTICE + " " + COMMON_API_PARTIAL_NOTICE;
        }

        return COMMON_API_NOTICE + " " + String.join(" ", notices);
    }

    private record HydrationResult(
            OciWorkRequestDto dto,
            boolean matches,
            boolean partialSupport,
            String notice
    ) {
    }
}
