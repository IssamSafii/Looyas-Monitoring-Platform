package com.safistage.monitoring.datasource.dto;

import com.safistage.monitoring.datasource.AuthenticationType;
import com.safistage.monitoring.datasource.DataSourceType;

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
        boolean enabled
) {
}
