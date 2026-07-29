package com.safistage.monitoring.oci.logs;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oracle.bmc.loggingsearch.model.SearchLogsDetails;
import com.oracle.bmc.loggingsearch.model.SearchResult;
import com.oracle.bmc.loggingsearch.requests.SearchLogsRequest;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciLogEntryResponse;
import com.safistage.monitoring.oci.dto.OciLogSearchRequest;
import com.safistage.monitoring.oci.dto.OciLogSearchResponse;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OciLoggingSearchService {

    private final OciClientFactory clientFactory;
    private final OciProperties properties;
    private final OciExceptionMapper exceptionMapper;
    private final ObjectMapper objectMapper;

    public OciLoggingSearchService(OciClientFactory clientFactory,
                                   OciProperties properties,
                                   OciExceptionMapper exceptionMapper,
                                   ObjectMapper objectMapper) {
        this.clientFactory = clientFactory;
        this.properties = properties;
        this.exceptionMapper = exceptionMapper;
        this.objectMapper = objectMapper;
    }

    public OciLogSearchResponse search(OciLogSearchRequest request) {
        try {
            OciResolvedConfig config = requireConfigured();
            validateRequest(request);

            String compartmentId = resolveCompartmentId(config, request.compartmentId());
            String searchQuery = request.searchQuery() == null || request.searchQuery().isBlank()
                    ? "search \"" + compartmentId + "\" | sort by datetime desc"
                    : request.searchQuery().trim();
            int limit = Math.min(request.limit() == null ? properties.getLogLimit() : request.limit(), properties.getLogMaxLimit());

            try (var client = clientFactory.newLogSearchClient(config)) {
                List<OciLogEntryResponse> logs = new ArrayList<>();
                String page = null;

                do {
                    var response = client.searchLogs(SearchLogsRequest.builder()
                            .searchLogsDetails(SearchLogsDetails.builder()
                                    .searchQuery(searchQuery)
                                    .timeStart(Date.from(request.from()))
                                    .timeEnd(Date.from(request.to()))
                                    .isReturnFieldInfo(false)
                                    .build())
                            .limit(Math.min(limit - logs.size(), 1000))
                            .page(page)
                            .build());

                    if (response.getSearchResponse() != null && response.getSearchResponse().getResults() != null) {
                        for (SearchResult result : response.getSearchResponse().getResults()) {
                            logs.add(normalizeResult(result, config.region()));
                            if (logs.size() >= limit) {
                                break;
                            }
                        }
                    }

                    page = logs.size() >= limit ? null : response.getOpcNextPage();
                } while (page != null);

                return new OciLogSearchResponse("success", "OCI", logs, logs.size(), logs.size() >= limit);
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    private OciResolvedConfig requireConfigured() {
        OciResolvedConfig config = clientFactory.resolveConfiguration();
        if (!config.enabled() || !config.configured()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "La source OCI n'est pas encore configuree.");
        }
        return config;
    }

    private void validateRequest(OciLogSearchRequest request) {
        if (request.from().isAfter(request.to()) || request.from().equals(request.to())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_LOG_QUERY_INVALID", "La periode OCI est invalide.");
        }

        if (Duration.between(request.from(), request.to()).toHours() > properties.getMaxQueryRangeHours()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_LOG_QUERY_INVALID", "La plage OCI demandee depasse la limite autorisee.");
        }

        if (request.searchQuery() != null && request.searchQuery().length() > 4000) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_LOG_QUERY_INVALID", "La requete de logs OCI est trop longue.");
        }

        if (request.limit() != null && request.limit() <= 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_LOG_QUERY_INVALID", "La limite OCI doit etre strictement positive.");
        }

        if (request.limit() != null && request.limit() > properties.getLogMaxLimit()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_LOG_QUERY_INVALID", "La limite OCI depasse la valeur maximale autorisee.");
        }
    }

    private String resolveCompartmentId(OciResolvedConfig config, String requestCompartmentId) {
        String value = requestCompartmentId != null && !requestCompartmentId.isBlank() ? requestCompartmentId.trim() : config.compartmentId();
        if (value == null || value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "Aucun compartment OCI n'est configure.");
        }
        return value;
    }

    private OciLogEntryResponse normalizeResult(SearchResult result, String region) {
        Map<String, Object> data = objectMapper.convertValue(result.getData(), new TypeReference<>() {});
        Map<String, Object> normalizedData = data == null ? Map.of() : new LinkedHashMap<>(data);

        String timestamp = asString(firstNonNull(
                normalizedData.get("datetime"),
                normalizedData.get("time"),
                normalizedData.get("timestamp"),
                readNested(normalizedData, "data", "datetime"),
                readNested(normalizedData, "data", "time")
        ));
        String message = asString(firstNonNull(
                normalizedData.get("message"),
                normalizedData.get("logContent"),
                readNested(normalizedData, "data", "message"),
                readNested(normalizedData, "data", "logContent"),
                readNested(normalizedData, "oracle", "message")
        ));
        String severity = asString(firstNonNull(
                normalizedData.get("severity"),
                normalizedData.get("level"),
                normalizedData.get("logLevel"),
                readNested(normalizedData, "data", "severity"),
                readNested(normalizedData, "data", "level")
        ));
        String resourceId = asString(firstNonNull(
                normalizedData.get("resourceId"),
                normalizedData.get("resourceOCID"),
                readNested(normalizedData, "data", "resourceId")
        ));
        String resourceName = asString(firstNonNull(
                normalizedData.get("resourceDisplayName"),
                normalizedData.get("resourceName"),
                readNested(normalizedData, "data", "resourceDisplayName")
        ));
        String logGroupId = asString(firstNonNull(
                normalizedData.get("logGroupId"),
                normalizedData.get("logGroupOCID"),
                readNested(normalizedData, "data", "logGroupId")
        ));
        String logId = asString(firstNonNull(
                normalizedData.get("logId"),
                normalizedData.get("logOCID"),
                readNested(normalizedData, "data", "logId")
        ));
        String service = asString(firstNonNull(
                normalizedData.get("service"),
                normalizedData.get("source"),
                readNested(normalizedData, "data", "service"),
                readNested(normalizedData, "oracle", "service")
        ));

        return new OciLogEntryResponse(timestamp, message, severity, logGroupId, logId, resourceId, resourceName, region, service, normalizedData);
    }

    private Object firstNonNull(Object... values) {
        for (Object value : values) {
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    private String asString(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    @SuppressWarnings("unchecked")
    private Object readNested(Map<String, Object> source, String... path) {
        Object current = source;
        for (String segment : path) {
            if (!(current instanceof Map<?, ?> map)) {
                return null;
            }
            current = ((Map<String, Object>) map).get(segment);
            if (current == null) {
                return null;
            }
        }
        return current;
    }
}
