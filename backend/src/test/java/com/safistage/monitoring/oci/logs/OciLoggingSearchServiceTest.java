package com.safistage.monitoring.oci.logs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oracle.bmc.loggingsearch.LogSearchClient;
import com.oracle.bmc.loggingsearch.model.SearchResponse;
import com.oracle.bmc.loggingsearch.model.SearchResult;
import com.oracle.bmc.loggingsearch.responses.SearchLogsResponse;
import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciLogSearchRequest;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OciLoggingSearchServiceTest {

    @Test
    void shouldRejectLimitAboveMaximum() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);
        properties.setLogMaxLimit(2000);

        OciLoggingSearchService service = new OciLoggingSearchService(
                new TestOciClientFactory(configured()),
                properties,
                new OciExceptionMapper(),
                new ObjectMapper()
        );

        assertThatThrownBy(() -> service.search(new OciLogSearchRequest(
                null,
                null,
                Instant.parse("2026-07-28T09:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                3000
        )))
                .isInstanceOf(ApiException.class)
                .extracting("code")
                .isEqualTo("OCI_LOG_QUERY_INVALID");
    }

    @Test
    void shouldNormalizeLogsWithNestedMessage() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);
        properties.setLogLimit(500);
        properties.setLogMaxLimit(2000);

        LogSearchClient logSearchClient = mock(LogSearchClient.class);
        SearchLogsResponse response = mock(SearchLogsResponse.class);
        SearchResponse searchResponse = mock(SearchResponse.class);
        SearchResult result = mock(SearchResult.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.logSearchClient = logSearchClient;

        when(logSearchClient.searchLogs(any())).thenReturn(response);
        when(response.getSearchResponse()).thenReturn(searchResponse);
        when(searchResponse.getResults()).thenReturn(List.of(result));
        when(response.getOpcNextPage()).thenReturn(null);
        when(result.getData()).thenReturn(Map.of(
                "datetime", "2026-07-28T09:42:15Z",
                "severity", "ERROR",
                "service", "compute",
                "resourceName", "instance-01",
                "data", Map.of("message", "Request completed with warning")
        ));

        OciLoggingSearchService service = new OciLoggingSearchService(clientFactory, properties, new OciExceptionMapper(), new ObjectMapper());
        var output = service.search(new OciLogSearchRequest(
                null,
                null,
                Instant.parse("2026-07-28T09:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                200
        ));

        assertThat(output.logs()).hasSize(1);
        assertThat(output.logs().get(0).message()).isEqualTo("Request completed with warning");
        assertThat(output.logs().get(0).severity()).isEqualTo("ERROR");
    }

    @Test
    void shouldPropagatePermissionDenied() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);
        properties.setLogLimit(500);
        properties.setLogMaxLimit(2000);

        LogSearchClient logSearchClient = mock(LogSearchClient.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.logSearchClient = logSearchClient;
        when(logSearchClient.searchLogs(any()))
                .thenThrow(new ApiException(HttpStatus.FORBIDDEN, "OCI_PERMISSION_DENIED", "Permissions OCI insuffisantes."));

        OciLoggingSearchService service = new OciLoggingSearchService(clientFactory, properties, new OciExceptionMapper(), new ObjectMapper());

        assertThatThrownBy(() -> service.search(new OciLogSearchRequest(
                null,
                null,
                Instant.parse("2026-07-28T09:00:00Z"),
                Instant.parse("2026-07-28T10:00:00Z"),
                200
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
        private LogSearchClient logSearchClient;

        private TestOciClientFactory(OciResolvedConfig config) {
            super(new OciProperties(), mock(DataSourceConfigRepository.class));
            this.config = config;
        }

        @Override
        public OciResolvedConfig resolveConfiguration() {
            return config;
        }

        @Override
        public LogSearchClient newLogSearchClient(OciResolvedConfig config) {
            return logSearchClient;
        }
    }
}
