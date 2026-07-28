package com.safistage.monitoring.oci.metrics;

import com.oracle.bmc.monitoring.model.ListMetricsDetails;
import com.oracle.bmc.monitoring.model.Metric;
import com.oracle.bmc.monitoring.model.SummarizeMetricsDataDetails;
import com.oracle.bmc.monitoring.requests.ListMetricsRequest;
import com.oracle.bmc.monitoring.requests.SummarizeMetricsDataRequest;
import com.oracle.bmc.monitoring.responses.ListMetricsResponse;
import com.oracle.bmc.monitoring.responses.SummarizeMetricsDataResponse;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciMetricDefinitionResponse;
import com.safistage.monitoring.oci.dto.OciMetricDefinitionsListResponse;
import com.safistage.monitoring.oci.dto.OciMetricPointResponse;
import com.safistage.monitoring.oci.dto.OciMetricSeriesResponse;
import com.safistage.monitoring.oci.dto.OciMetricsQueryRequest;
import com.safistage.monitoring.oci.dto.OciMetricsQueryResponse;
import com.safistage.monitoring.oci.dto.OciNamespacesResponse;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class OciMonitoringService {

    private final OciClientFactory clientFactory;
    private final OciProperties properties;
    private final OciExceptionMapper exceptionMapper;

    public OciMonitoringService(OciClientFactory clientFactory,
                                OciProperties properties,
                                OciExceptionMapper exceptionMapper) {
        this.clientFactory = clientFactory;
        this.properties = properties;
        this.exceptionMapper = exceptionMapper;
    }

    public OciNamespacesResponse namespaces(String compartmentId) {
        try {
            OciResolvedConfig config = requireConfigured();
            String effectiveCompartmentId = resolveCompartmentId(config, compartmentId);

            try (var client = clientFactory.newMonitoringClient(config)) {
                Set<String> namespaces = new LinkedHashSet<>();
                String page = null;

                do {
                    ListMetricsResponse response = client.listMetrics(ListMetricsRequest.builder()
                            .compartmentId(effectiveCompartmentId)
                            .compartmentIdInSubtree(config.includeSubcompartments())
                            .listMetricsDetails(ListMetricsDetails.builder().namespace(null).build())
                            .page(page)
                            .limit(100)
                            .build());

                    for (Metric item : response.getItems()) {
                        if (item.getNamespace() != null && !item.getNamespace().isBlank()) {
                            namespaces.add(item.getNamespace());
                        }
                    }
                    page = response.getOpcNextPage();
                } while (page != null);

                return new OciNamespacesResponse("success", "OCI", namespaces.stream().sorted().toList());
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciMetricDefinitionsListResponse definitions(String compartmentId, String namespace) {
        OciResolvedConfig config = requireConfigured();
        if (namespace == null || namespace.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "Le namespace OCI est obligatoire.");
        }

        try {
            try (var client = clientFactory.newMonitoringClient(config)) {
                List<OciMetricDefinitionResponse> definitions = new ArrayList<>();
                String page = null;

                do {
                    ListMetricsResponse response = client.listMetrics(ListMetricsRequest.builder()
                            .compartmentId(resolveCompartmentId(config, compartmentId))
                            .compartmentIdInSubtree(config.includeSubcompartments())
                            .listMetricsDetails(ListMetricsDetails.builder().namespace(namespace).build())
                            .page(page)
                            .limit(100)
                            .build());

                    for (Metric item : response.getItems()) {
                        Map<String, String> dimensions = item.getDimensions() == null
                                ? Map.of()
                                : item.getDimensions().entrySet().stream()
                                        .collect(LinkedHashMap::new, (acc, entry) -> acc.put(entry.getKey(), String.valueOf(entry.getValue())), LinkedHashMap::putAll);

                        definitions.add(new OciMetricDefinitionResponse(
                                item.getNamespace(),
                                item.getName(),
                                dimensions.keySet().stream().sorted().toList(),
                                dimensions
                        ));
                    }

                    page = response.getOpcNextPage();
                } while (page != null);

                definitions.sort(Comparator.comparing(OciMetricDefinitionResponse::name));
                return new OciMetricDefinitionsListResponse("success", "OCI", namespace, definitions);
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciMetricsQueryResponse query(OciMetricsQueryRequest request) {
        try {
            OciResolvedConfig config = requireConfigured();
            validateRequest(request);

            try (var client = clientFactory.newMonitoringClient(config)) {
                SummarizeMetricsDataDetails details = SummarizeMetricsDataDetails.builder()
                        .namespace(request.namespace())
                        .query(request.query())
                        .startTime(Date.from(request.from()))
                        .endTime(Date.from(request.to()))
                        .build();

                SummarizeMetricsDataResponse response = client.summarizeMetricsData(SummarizeMetricsDataRequest.builder()
                        .compartmentId(resolveCompartmentId(config, request.compartmentId()))
                        .compartmentIdInSubtree(resolveIncludeSubcompartments(config, request.includeSubcompartments()))
                        .summarizeMetricsDataDetails(details)
                        .build());

                List<OciMetricSeriesResponse> series = new ArrayList<>();
                response.getItems().forEach(item -> {
                    Map<String, String> dimensions = stringifyMap(item.getDimensions());
                    Map<String, String> metadata = stringifyMap(item.getMetadata());
                    List<OciMetricPointResponse> points = item.getAggregatedDatapoints() == null
                            ? List.of()
                            : item.getAggregatedDatapoints().stream()
                                    .filter(point -> point.getTimestamp() != null)
                                    .map(point -> new OciMetricPointResponse(point.getTimestamp().getTime(), point.getValue()))
                                    .sorted(Comparator.comparingLong(OciMetricPointResponse::timestamp))
                                    .toList();

                    series.add(new OciMetricSeriesResponse(resolveSeriesName(dimensions, item.getName()), dimensions, metadata, points));
                });

                return new OciMetricsQueryResponse("success", "OCI", request.namespace(), request.query(), series);
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

    private void validateRequest(OciMetricsQueryRequest request) {
        if (request.from().isAfter(request.to()) || request.from().equals(request.to())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La periode OCI est invalide.");
        }

        if (request.namespace() == null || request.namespace().isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "Le namespace OCI est obligatoire.");
        }

        if (request.query() == null || request.query().isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La requete OCI est obligatoire.");
        }

        if (Duration.between(request.from(), request.to()).toHours() > properties.getMaxQueryRangeHours()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La plage OCI demandee depasse la limite autorisee.");
        }

        if (request.query().length() > 4000) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "La requete OCI est trop longue.");
        }
    }

    private String resolveCompartmentId(OciResolvedConfig config, String requestCompartmentId) {
        String value = requestCompartmentId != null && !requestCompartmentId.isBlank() ? requestCompartmentId.trim() : config.compartmentId();
        if (value == null || value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "Aucun compartment OCI n'est configure.");
        }
        return value;
    }

    private boolean resolveIncludeSubcompartments(OciResolvedConfig config, Boolean requestValue) {
        return requestValue != null ? requestValue : config.includeSubcompartments();
    }

    private Map<String, String> stringifyMap(Map<String, ?> values) {
        Map<String, String> result = new LinkedHashMap<>();
        if (values == null) {
            return result;
        }
        values.forEach((key, value) -> result.put(key, value == null ? "" : String.valueOf(value)));
        return result;
    }

    private String resolveSeriesName(Map<String, String> dimensions, String metricName) {
        for (String key : List.of("resourceDisplayName", "displayName", "resourceId", "name")) {
            if (dimensions.containsKey(key) && !dimensions.get(key).isBlank()) {
                return dimensions.get(key);
            }
        }
        return metricName == null || metricName.isBlank() ? "oci-series" : metricName;
    }
}
