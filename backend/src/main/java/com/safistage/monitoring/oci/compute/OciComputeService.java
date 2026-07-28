package com.safistage.monitoring.oci.compute;

import com.oracle.bmc.core.requests.GetInstanceRequest;
import com.oracle.bmc.core.requests.ListInstancesRequest;
import com.oracle.bmc.core.responses.GetInstanceResponse;
import com.oracle.bmc.core.responses.ListInstancesResponse;
import com.oracle.bmc.monitoring.model.SummarizeMetricsDataDetails;
import com.oracle.bmc.monitoring.requests.SummarizeMetricsDataRequest;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciComputeInstanceResponse;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class OciComputeService {

    private final OciClientFactory clientFactory;
    private final OciExceptionMapper exceptionMapper;

    public OciComputeService(OciClientFactory clientFactory, OciExceptionMapper exceptionMapper) {
        this.clientFactory = clientFactory;
        this.exceptionMapper = exceptionMapper;
    }

    public List<OciComputeInstanceResponse> listInstances(String compartmentId) {
        try {
            OciResolvedConfig config = requireConfigured();
            String effectiveCompartmentId = resolveCompartmentId(config, compartmentId);
            try (var computeClient = clientFactory.newComputeClient(config);
             var monitoringClient = clientFactory.newMonitoringClient(config)) {
                List<OciComputeInstanceResponse> instances = new ArrayList<>();
                String page = null;

                do {
                    ListInstancesResponse response = computeClient.listInstances(ListInstancesRequest.builder()
                            .compartmentId(effectiveCompartmentId)
                            .page(page)
                            .limit(100)
                            .build());

                    response.getItems().forEach(instance -> instances.add(new OciComputeInstanceResponse(
                            instance.getId(),
                            mask(instance.getId()),
                            instance.getDisplayName(),
                            instance.getLifecycleState() == null ? "" : instance.getLifecycleState().name(),
                            instance.getShape(),
                            instance.getAvailabilityDomain(),
                            instance.getFaultDomain(),
                            config.region(),
                            mask(instance.getCompartmentId()),
                            instance.getTimeCreated() == null ? null : instance.getTimeCreated().toInstant(),
                            readCpuCurrent(monitoringClient, config, effectiveCompartmentId, instance.getId())
                    )));
                    page = response.getOpcNextPage();
                } while (page != null);

                return instances;
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    public OciComputeInstanceResponse getInstance(String instanceId) {
        if (instanceId == null || instanceId.isBlank() || !instanceId.startsWith("ocid1.instance.")) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_QUERY_INVALID", "instanceId invalide.");
        }

        try {
            OciResolvedConfig config = requireConfigured();
            try (var computeClient = clientFactory.newComputeClient(config);
             var monitoringClient = clientFactory.newMonitoringClient(config)) {
                GetInstanceResponse response = computeClient.getInstance(GetInstanceRequest.builder().instanceId(instanceId).build());
                var instance = response.getInstance();

                return new OciComputeInstanceResponse(
                        instance.getId(),
                        mask(instance.getId()),
                        instance.getDisplayName(),
                        instance.getLifecycleState() == null ? "" : instance.getLifecycleState().name(),
                        instance.getShape(),
                        instance.getAvailabilityDomain(),
                        instance.getFaultDomain(),
                        config.region(),
                        mask(instance.getCompartmentId()),
                        instance.getTimeCreated() == null ? null : instance.getTimeCreated().toInstant(),
                        readCpuCurrent(monitoringClient, config, instance.getCompartmentId(), instance.getId())
                );
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

    private String resolveCompartmentId(OciResolvedConfig config, String requestCompartmentId) {
        String value = requestCompartmentId != null && !requestCompartmentId.isBlank() ? requestCompartmentId.trim() : config.compartmentId();
        if (value == null || value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "Aucun compartment OCI n'est configure.");
        }
        return value;
    }

    private Double readCpuCurrent(com.oracle.bmc.monitoring.MonitoringClient monitoringClient,
                                  OciResolvedConfig config,
                                  String compartmentId,
                                  String instanceId) {
        try {
            var response = monitoringClient.summarizeMetricsData(SummarizeMetricsDataRequest.builder()
                    .compartmentId(compartmentId)
                    .summarizeMetricsDataDetails(SummarizeMetricsDataDetails.builder()
                            .namespace(config.defaultMetricNamespace())
                            .query("CpuUtilization[1m].mean(){resourceId = \"" + instanceId + "\"}")
                            .startTime(Date.from(Instant.now().minusSeconds(3600)))
                            .endTime(Date.from(Instant.now()))
                            .build())
                    .build());

            if (response.getItems().isEmpty() || response.getItems().get(0).getAggregatedDatapoints() == null || response.getItems().get(0).getAggregatedDatapoints().isEmpty()) {
                return null;
            }

            return response.getItems().get(0).getAggregatedDatapoints().get(response.getItems().get(0).getAggregatedDatapoints().size() - 1).getValue();
        } catch (Exception ignored) {
            return null;
        }
    }

    private String mask(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        if (value.length() <= 16) {
            return value;
        }
        return value.substring(0, 16) + "..." + value.substring(value.length() - 4);
    }
}
