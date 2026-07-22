package com.safistage.monitoring.monitoring.metrics;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.DataSourceConfigService;
import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.monitoring.common.MonitoringQueryValidator;
import com.safistage.monitoring.monitoring.metrics.dto.MetricsInstantQueryRequest;
import com.safistage.monitoring.monitoring.metrics.dto.MetricsRangeQueryRequest;
import com.safistage.monitoring.monitoring.mimir.MimirClient;
import com.safistage.monitoring.monitoring.normalization.PrometheusResponseNormalizer;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedMetricsResponse;
import org.springframework.stereotype.Service;

@Service
public class MetricsService {

    private final DataSourceConfigService dataSourceConfigService;
    private final MimirClient mimirClient;
    private final MonitoringQueryValidator validator;
    private final PrometheusResponseNormalizer normalizer;

    public MetricsService(DataSourceConfigService dataSourceConfigService,
                          MimirClient mimirClient,
                          MonitoringQueryValidator validator,
                          PrometheusResponseNormalizer normalizer) {
        this.dataSourceConfigService = dataSourceConfigService;
        this.mimirClient = mimirClient;
        this.validator = validator;
        this.normalizer = normalizer;
    }

    public NormalizedMetricsResponse query(MetricsInstantQueryRequest request) {
        validator.validateQuery(request.query());
        DataSourceConfig config = dataSourceConfigService.getEnabledByType(DataSourceType.MIMIR);
        JsonNode response = mimirClient.query(config, request.query(), request.time() == null ? null : request.time().toString());
        return normalizer.normalize(response);
    }

    public NormalizedMetricsResponse queryRange(MetricsRangeQueryRequest request) {
        validator.validateQuery(request.query());
        validator.validateRange(request.start(), request.end());
        DataSourceConfig config = dataSourceConfigService.getEnabledByType(DataSourceType.MIMIR);
        JsonNode response = mimirClient.queryRange(config, request.query(), request.start().toString(), request.end().toString(), request.step());
        return normalizer.normalize(response);
    }

    public JsonNode labels() {
        return mimirClient.getLabels(dataSourceConfigService.getEnabledByType(DataSourceType.MIMIR));
    }

    public JsonNode labelValues(String labelName) {
        return mimirClient.getLabelValues(dataSourceConfigService.getEnabledByType(DataSourceType.MIMIR), labelName);
    }
}
