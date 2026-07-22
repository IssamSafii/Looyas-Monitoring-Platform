package com.safistage.monitoring.monitoring.logs.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record LogsInstantQueryRequest(
        @NotBlank @Size(max = 4000) String query,
        Instant time,
        Integer limit,
        String direction
) {
}
