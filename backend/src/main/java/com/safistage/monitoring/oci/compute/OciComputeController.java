package com.safistage.monitoring.oci.compute;

import com.safistage.monitoring.oci.dto.OciComputeInstanceResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/monitoring/oci/compute")
public class OciComputeController {

    private final OciComputeService computeService;

    public OciComputeController(OciComputeService computeService) {
        this.computeService = computeService;
    }

    @GetMapping("/instances")
    public List<OciComputeInstanceResponse> listInstances(@RequestParam(required = false) String compartmentId) {
        return computeService.listInstances(compartmentId);
    }

    @GetMapping("/instances/{instanceId}")
    public OciComputeInstanceResponse getInstance(@PathVariable String instanceId) {
        return computeService.getInstance(instanceId);
    }
}
