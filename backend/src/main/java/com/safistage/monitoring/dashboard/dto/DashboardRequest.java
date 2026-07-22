package com.safistage.monitoring.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DashboardRequest(
        @NotBlank @Size(max = 200) String name,
        @NotBlank @Size(max = 200) String slug,
        String description,
        String icon,
        String refreshInterval,
        String defaultTimeRange,
        boolean enabled
) {
}
