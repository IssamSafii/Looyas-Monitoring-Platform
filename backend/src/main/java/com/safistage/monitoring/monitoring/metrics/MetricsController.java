package com.safistage.monitoring.monitoring.metrics;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.monitoring.metrics.dto.MetricsInstantQueryRequest;
import com.safistage.monitoring.monitoring.metrics.dto.MetricsRangeQueryRequest;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedMetricsResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/monitoring/metrics")
public class MetricsController {

    private final MetricsService service;

    public MetricsController(MetricsService service) {
        this.service = service;
    }

    @PostMapping("/query")
    public NormalizedMetricsResponse query(@Valid @RequestBody MetricsInstantQueryRequest request) {
        return service.query(request);
    }

    @PostMapping("/query-range")
    public NormalizedMetricsResponse queryRange(@Valid @RequestBody MetricsRangeQueryRequest request) {
        return service.queryRange(request);
    }

    @GetMapping("/labels")
    public JsonNode labels() {
        return service.labels();
    }

    @GetMapping("/labels/{labelName}/values")
    public JsonNode labelValues(@PathVariable String labelName) {
        return service.labelValues(labelName);
    }
}
