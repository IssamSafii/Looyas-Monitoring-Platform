package com.safistage.monitoring.oci.dto;

import java.time.Instant;

public record OciHealthResponse(
        String status,
        boolean configured,
        String region,
        String profile,
        boolean compartmentConfigured,
        String message,
        Instant checkedAt
) {
}
