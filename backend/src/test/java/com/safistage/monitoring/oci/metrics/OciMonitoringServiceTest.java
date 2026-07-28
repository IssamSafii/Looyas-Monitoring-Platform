package com.safistage.monitoring.oci.metrics;

import com.oracle.bmc.monitoring.MonitoringClient;
import com.oracle.bmc.monitoring.model.AggregatedDatapoint;
import com.oracle.bmc.monitoring.model.MetricData;
import com.oracle.bmc.monitoring.responses.SummarizeMetricsDataResponse;
import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciMetricsQueryRequest;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OciMonitoringServiceTest {

    @Test
    void shouldRejectInvalidPeriod() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);
        OciMonitoringService service = new OciMonitoringService(new TestOciClientFactory(configured()), properties, new OciExceptionMapper());

        OciMetricsQueryRequest request = new OciMetricsQueryRequest(
                null,
                "oci_computeagent",
                "CpuUtilization[1m].mean()",
                Instant.parse("2026-07-28T10:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                false
        );

        assertThatThrownBy(() -> service.query(request))
                .isInstanceOf(ApiException.class)
                .extracting("code")
                .isEqualTo("OCI_QUERY_INVALID");
    }

    @Test
    void shouldNormalizeMetricSeries() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);

        MonitoringClient monitoringClient = mock(MonitoringClient.class);
        MetricData metricData = mock(MetricData.class);
        AggregatedDatapoint datapoint = mock(AggregatedDatapoint.class);
        SummarizeMetricsDataResponse response = mock(SummarizeMetricsDataResponse.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.monitoringClient = monitoringClient;

        when(monitoringClient.summarizeMetricsData(any())).thenReturn(response);
        when(response.getItems()).thenReturn(List.of(metricData));
        when(metricData.getDimensions()).thenReturn(Map.of(
                "resourceDisplayName", "compute-instance-01",
                "resourceId", "ocid1.instance.oc1..demo"
        ));
        when(metricData.getMetadata()).thenReturn(Map.of("unit", "percent"));
        when(metricData.getName()).thenReturn("CpuUtilization");
        when(metricData.getAggregatedDatapoints()).thenReturn(List.of(datapoint));
        when(datapoint.getTimestamp()).thenReturn(Date.from(Instant.parse("2026-07-28T10:15:00Z")));
        when(datapoint.getValue()).thenReturn(15.4d);

        OciMonitoringService service = new OciMonitoringService(clientFactory, properties, new OciExceptionMapper());
        var result = service.query(new OciMetricsQueryRequest(
                null,
                "oci_computeagent",
                "CpuUtilization[1m].mean()",
                Instant.parse("2026-07-28T09:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                false
        ));

        assertThat(result.series()).hasSize(1);
        assertThat(result.series().get(0).name()).isEqualTo("compute-instance-01");
        assertThat(result.series().get(0).points().get(0).value()).isEqualTo(15.4d);
    }

    @Test
    void shouldPropagatePermissionDenied() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);

        MonitoringClient monitoringClient = mock(MonitoringClient.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.monitoringClient = monitoringClient;
        when(monitoringClient.summarizeMetricsData(any()))
                .thenThrow(new ApiException(HttpStatus.FORBIDDEN, "OCI_PERMISSION_DENIED", "Permissions OCI insuffisantes."));

        OciMonitoringService service = new OciMonitoringService(clientFactory, properties, new OciExceptionMapper());

        assertThatThrownBy(() -> service.query(new OciMetricsQueryRequest(
                null,
                "oci_computeagent",
                "CpuUtilization[1m].mean()",
                Instant.parse("2026-07-28T09:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                false
        )))
                .isInstanceOf(ApiException.class)
                .extracting("code")
                .isEqualTo("OCI_PERMISSION_DENIED");
    }

    private OciResolvedConfig configured() {
        return new OciResolvedConfig(true, true, "/app/.oci/config", "DEFAULT", "eu-frankfurt-1", "ocid1.compartment.oc1..demo", "oci_computeagent", false, "ok");
    }

    private static final class TestOciClientFactory extends OciClientFactory {
        private final OciResolvedConfig config;
        private MonitoringClient monitoringClient;

        private TestOciClientFactory(OciResolvedConfig config) {
            super(new OciProperties(), mock(DataSourceConfigRepository.class));
            this.config = config;
        }

        @Override
        public OciResolvedConfig resolveConfiguration() {
            return config;
        }

        @Override
        public MonitoringClient newMonitoringClient(OciResolvedConfig config) {
            return monitoringClient;
        }
    }
}
