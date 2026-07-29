package com.safistage.monitoring.oci.dto;

import java.time.Instant;

public record OciWorkRequestErrorDto(
        String code,
        String message,
        Instant timestamp
) {
}
