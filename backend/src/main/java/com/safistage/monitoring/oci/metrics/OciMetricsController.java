package com.safistage.monitoring.oci.metrics;

import com.safistage.monitoring.oci.dto.OciMetricDefinitionsListResponse;
import com.safistage.monitoring.oci.dto.OciMetricsQueryRequest;
import com.safistage.monitoring.oci.dto.OciMetricsQueryResponse;
import com.safistage.monitoring.oci.dto.OciNamespacesResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring/oci/metrics")
public class OciMetricsController {

    private final OciMonitoringService monitoringService;

    public OciMetricsController(OciMonitoringService monitoringService) {
        this.monitoringService = monitoringService;
    }

    @GetMapping("/namespaces")
    public OciNamespacesResponse namespaces(@RequestParam(required = false) String compartmentId) {
        return monitoringService.namespaces(compartmentId);
    }

    @GetMapping("/definitions")
    public OciMetricDefinitionsListResponse definitions(@RequestParam(required = false) String compartmentId,
                                                        @RequestParam String namespace) {
        return monitoringService.definitions(compartmentId, namespace);
    }

    @PostMapping("/query")
    public OciMetricsQueryResponse query(@Valid @RequestBody OciMetricsQueryRequest request) {
        return monitoringService.query(request);
    }
}
