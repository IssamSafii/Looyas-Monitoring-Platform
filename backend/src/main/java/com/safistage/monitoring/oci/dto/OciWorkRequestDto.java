package com.safistage.monitoring.oci.dto;

import java.time.Instant;
import java.util.List;

public record OciWorkRequestDto(
        String id,
        String maskedId,
        String operationType,
        String status,
        String compartmentId,
        String maskedCompartmentId,
        Float percentComplete,
        Instant timeAccepted,
        Instant timeStarted,
        Instant timeFinished,
        String resourceSummary,
        List<OciWorkRequestResourceDto> resources,
        String errorMessage,
        boolean commonApiSupported,
        String supportMessage
) {
}
