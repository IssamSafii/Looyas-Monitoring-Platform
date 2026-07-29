package com.safistage.monitoring.oci.dto;

import java.time.Instant;

public record OciWorkRequestLogDto(
        String message,
        Instant timestamp
) {
}
