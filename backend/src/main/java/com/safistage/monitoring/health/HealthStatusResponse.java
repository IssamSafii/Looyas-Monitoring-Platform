package com.safistage.monitoring.health;

public record HealthStatusResponse(
        String component,
        HealthState status,
        String message
) {
}
