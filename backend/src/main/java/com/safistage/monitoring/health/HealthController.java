package com.safistage.monitoring.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    public SystemHealthResponse all() {
        return healthService.all();
    }

    @GetMapping("/mimir")
    public HealthStatusResponse mimir() {
        return healthService.mimir();
    }

    @GetMapping("/loki")
    public HealthStatusResponse loki() {
        return healthService.loki();
    }
}
