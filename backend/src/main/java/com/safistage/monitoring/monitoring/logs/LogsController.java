package com.safistage.monitoring.monitoring.logs;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.monitoring.logs.dto.LogsInstantQueryRequest;
import com.safistage.monitoring.monitoring.logs.dto.LogsRangeQueryRequest;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedLogsResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/monitoring/logs")
public class LogsController {

    private final LogsService service;

    public LogsController(LogsService service) {
        this.service = service;
    }

    @PostMapping("/query")
    public NormalizedLogsResponse query(@Valid @RequestBody LogsInstantQueryRequest request) {
        return service.query(request);
    }

    @PostMapping("/query-range")
    public NormalizedLogsResponse queryRange(@Valid @RequestBody LogsRangeQueryRequest request) {
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
