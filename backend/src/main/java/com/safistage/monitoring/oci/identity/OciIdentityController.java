package com.safistage.monitoring.oci.identity;

import com.safistage.monitoring.oci.dto.OciCompartmentsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring/oci")
public class OciIdentityController {

    private final OciIdentityService identityService;

    public OciIdentityController(OciIdentityService identityService) {
        this.identityService = identityService;
    }

    @GetMapping("/compartments")
    public OciCompartmentsResponse listCompartments() {
        return identityService.listCompartments();
    }
}
