package com.safistage.monitoring.monitoring.normalization.dto;

import java.util.List;

public record NormalizedMetricsResponse(
        String status,
        String resultType,
        List<MetricSeriesDto> series
) {
}
