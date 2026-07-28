package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciCompartmentsResponse(
        String status,
        String source,
        String configuredCompartmentId,
        List<OciCompartmentResponse> compartments
) {
}
