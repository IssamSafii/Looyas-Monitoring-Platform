package com.safistage.monitoring.monitoring.normalization.dto;

public record MetricPointDto(
        long timestamp,
        Double value
) {
}
