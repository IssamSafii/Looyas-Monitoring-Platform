package com.safistage.monitoring.oci.dto;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record OciLogSearchRequest(
        String searchQuery,
        String compartmentId,
        @NotNull Instant from,
        @NotNull Instant to,
        Integer limit
) {
}
