package com.safistage.monitoring.oci.health;

import com.safistage.monitoring.oci.dto.OciHealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring/oci/health")
public class OciHealthController {

    private final OciHealthService healthService;

    public OciHealthController(OciHealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    public OciHealthResponse health() {
        return healthService.health();
    }
}
