package com.safistage.monitoring.monitoring.normalization.dto;

import java.util.List;
import java.util.Map;

public record MetricSeriesDto(
        String name,
        Map<String, String> labels,
        List<MetricPointDto> points
) {
}
