package com.safistage.monitoring.monitoring.loki;

import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.datasource.AuthenticationType;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.SecretCryptoService;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

class LokiClientTest {

    private MockWebServer server;

    @BeforeEach
    void setUp() throws IOException {
        server = new MockWebServer();
        server.start();
    }

    @AfterEach
    void tearDown() throws IOException {
        server.shutdown();
    }

    @Test
    void shouldCallLokiRangeEndpoint() throws Exception {
        server.enqueue(new MockResponse().setBody("""
                {"status":"success","data":{"resultType":"streams","result":[]}}
                """).addHeader("Content-Type", "application/json"));

        SecretCryptoService secretCryptoService = Mockito.mock(SecretCryptoService.class);
        MonitoringProperties properties = new MonitoringProperties();
        LokiClient client = new LokiClient(WebClient.builder(), secretCryptoService, properties);

        DataSourceConfig config = new DataSourceConfig();
        config.setBaseUrl(server.url("/").toString());
        config.setApiPrefix("/loki");
        config.setAuthenticationType(AuthenticationType.NONE);

        var response = client.queryRange(config, "{job=\"api\"}", "2026-07-22T09:00:00Z", "2026-07-22T10:00:00Z", "60", 100, "BACKWARD");

        assertThat(response.path("status").asText()).isEqualTo("success");
        assertThat(server.takeRequest().getPath()).contains("/loki/api/v1/query_range");
    }
}
