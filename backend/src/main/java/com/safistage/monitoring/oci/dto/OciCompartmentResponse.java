package com.safistage.monitoring.oci.dto;

public record OciCompartmentResponse(
        String id,
        String maskedId,
        String name,
        String lifecycleState,
        boolean defaultSelection
) {
}
