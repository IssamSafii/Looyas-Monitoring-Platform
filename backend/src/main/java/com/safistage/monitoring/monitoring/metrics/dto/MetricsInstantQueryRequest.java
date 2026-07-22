package com.safistage.monitoring.monitoring.metrics.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record MetricsInstantQueryRequest(
        @NotBlank @Size(max = 4000) String query,
        Instant time
) {
}
