package com.safistage.monitoring.monitoring.logs;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.DataSourceConfigService;
import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.monitoring.common.MonitoringQueryValidator;
import com.safistage.monitoring.monitoring.logs.dto.LogsInstantQueryRequest;
import com.safistage.monitoring.monitoring.logs.dto.LogsRangeQueryRequest;
import com.safistage.monitoring.monitoring.loki.LokiClient;
import com.safistage.monitoring.monitoring.normalization.LokiResponseNormalizer;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedLogsResponse;
import org.springframework.stereotype.Service;

@Service
public class LogsService {

    private final DataSourceConfigService dataSourceConfigService;
    private final LokiClient lokiClient;
    private final MonitoringQueryValidator validator;
    private final LokiResponseNormalizer normalizer;

    public LogsService(DataSourceConfigService dataSourceConfigService,
                       LokiClient lokiClient,
                       MonitoringQueryValidator validator,
                       LokiResponseNormalizer normalizer) {
        this.dataSourceConfigService = dataSourceConfigService;
        this.lokiClient = lokiClient;
        this.validator = validator;
        this.normalizer = normalizer;
    }

    public NormalizedLogsResponse query(LogsInstantQueryRequest request) {
        validator.validateQuery(request.query());
        int limit = validator.validateLogLimit(request.limit());
        DataSourceConfig config = dataSourceConfigService.getEnabledByType(DataSourceType.LOKI);
        JsonNode response = lokiClient.query(config, request.query(), request.time() == null ? null : request.time().toString(), limit, normalizeDirection(request.direction()));
        return normalizer.normalize(response);
    }

    public NormalizedLogsResponse queryRange(LogsRangeQueryRequest request) {
        validator.validateQuery(request.query());
        validator.validateRange(request.start(), request.end());
        int limit = validator.validateLogLimit(request.limit());
        DataSourceConfig config = dataSourceConfigService.getEnabledByType(DataSourceType.LOKI);
        JsonNode response = lokiClient.queryRange(config, request.query(), request.start().toString(), request.end().toString(), request.step(), limit, normalizeDirection(request.direction()));
        return normalizer.normalize(response);
    }

    public JsonNode labels() {
        return lokiClient.getLabels(dataSourceConfigService.getEnabledByType(DataSourceType.LOKI));
    }

    public JsonNode labelValues(String labelName) {
        return lokiClient.getLabelValues(dataSourceConfigService.getEnabledByType(DataSourceType.LOKI), labelName);
    }

    private String normalizeDirection(String direction) {
        return "FORWARD".equalsIgnoreCase(direction) ? "FORWARD" : "BACKWARD";
    }
}
