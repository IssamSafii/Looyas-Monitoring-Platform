package com.safistage.monitoring.oci.dto;

import java.time.Instant;

public record OciComputeInstanceResponse(
        String id,
        String maskedId,
        String displayName,
        String lifecycleState,
        String shape,
        String availabilityDomain,
        String faultDomain,
        String region,
        String maskedCompartmentId,
        Instant timeCreated,
        Double cpuCurrent
) {
}
