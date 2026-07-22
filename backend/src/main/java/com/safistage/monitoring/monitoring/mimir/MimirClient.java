package com.safistage.monitoring.monitoring.mimir;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.SecretCryptoService;
import com.safistage.monitoring.monitoring.common.AbstractMonitoringClient;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class MimirClient extends AbstractMonitoringClient {

    public MimirClient(WebClient.Builder webClientBuilder,
                       SecretCryptoService secretCryptoService,
                       MonitoringProperties monitoringProperties) {
        super(webClientBuilder, secretCryptoService, monitoringProperties);
    }

    public JsonNode query(DataSourceConfig config, String query, String time) {
        return executeGet(config, "/api/v1/query", Map.of("query", query, "time", time == null ? "" : time));
    }

    public JsonNode queryRange(DataSourceConfig config, String query, String start, String end, String step) {
        return executeGet(config, "/api/v1/query_range", Map.of("query", query, "start", start, "end", end, "step", step));
    }

    public JsonNode getLabels(DataSourceConfig config) {
        return executeGet(config, "/api/v1/labels", Map.of());
    }

    public JsonNode getLabelValues(DataSourceConfig config, String labelName) {
        return executeGet(config, "/api/v1/label/" + labelName + "/values", Map.of());
    }

    public JsonNode getSeries(DataSourceConfig config, String matchers, String start, String end) {
        return executeGet(config, "/api/v1/series", Map.of("match[]", matchers, "start", start, "end", end));
    }
}
