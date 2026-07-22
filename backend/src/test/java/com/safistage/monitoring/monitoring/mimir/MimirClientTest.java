package com.safistage.monitoring.monitoring.mimir;

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

class MimirClientTest {

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
    void shouldCallPrometheusCompatibleQueryEndpoint() throws Exception {
        server.enqueue(new MockResponse().setBody("""
                {"status":"success","data":{"resultType":"vector","result":[]}}
                """).addHeader("Content-Type", "application/json"));

        SecretCryptoService secretCryptoService = Mockito.mock(SecretCryptoService.class);
        MonitoringProperties properties = new MonitoringProperties();
        MimirClient client = new MimirClient(WebClient.builder(), secretCryptoService, properties);

        DataSourceConfig config = new DataSourceConfig();
        config.setBaseUrl(server.url("/").toString());
        config.setApiPrefix("/prometheus");
        config.setAuthenticationType(AuthenticationType.NONE);

        var response = client.query(config, "up", null);

        assertThat(response.path("status").asText()).isEqualTo("success");
        assertThat(server.takeRequest().getPath()).contains("/prometheus/api/v1/query");
    }
}
