package com.safistage.monitoring.datasource.dto;

public record DataSourceTestResponse(
        boolean success,
        String message
) {
}
