package com.safistage.monitoring.health;

import java.util.List;

public record SystemHealthResponse(
        List<HealthStatusResponse> components
) {
}
