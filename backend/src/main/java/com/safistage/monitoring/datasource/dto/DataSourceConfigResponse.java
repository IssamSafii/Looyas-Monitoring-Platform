package com.safistage.monitoring.datasource.dto;

import com.safistage.monitoring.datasource.AuthenticationType;
import com.safistage.monitoring.datasource.DataSourceType;

import java.time.Instant;

public record DataSourceConfigResponse(
        Long id,
        String name,
        DataSourceType type,
        String baseUrl,
        String apiPrefix,
        String tenantId,
        AuthenticationType authenticationType,
        String username,
        String maskedPassword,
        String maskedToken,
        String region,
        String maskedCompartmentId,
        String profile,
        String configFile,
        String defaultMetricNamespace,
        boolean includeSubcompartments,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt
) {
}
