package com.safistage.monitoring.oci.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record OciMetricsQueryRequest(
        String compartmentId,
        @NotBlank String namespace,
        @NotBlank String query,
        @NotNull Instant from,
        @NotNull Instant to,
        Boolean includeSubcompartments
) {
}
