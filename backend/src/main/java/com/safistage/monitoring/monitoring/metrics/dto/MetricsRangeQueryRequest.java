package com.safistage.monitoring.monitoring.metrics.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record MetricsRangeQueryRequest(
        @NotBlank @Size(max = 4000) String query,
        @NotNull Instant start,
        @NotNull Instant end,
        @NotBlank String step
) {
}
