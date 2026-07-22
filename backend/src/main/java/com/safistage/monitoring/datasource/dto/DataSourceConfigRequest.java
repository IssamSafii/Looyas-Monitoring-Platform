package com.safistage.monitoring.datasource.dto;

import com.safistage.monitoring.datasource.AuthenticationType;
import com.safistage.monitoring.datasource.DataSourceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DataSourceConfigRequest(
        @NotBlank @Size(max = 100) String name,
        @NotNull DataSourceType type,
        @NotBlank @Size(max = 500) String baseUrl,
        @Size(max = 100) String apiPrefix,
        @Size(max = 255) String tenantId,
        @NotNull AuthenticationType authenticationType,
        @Size(max = 255) String username,
        String password,
        String token,
        boolean enabled
) {
}
