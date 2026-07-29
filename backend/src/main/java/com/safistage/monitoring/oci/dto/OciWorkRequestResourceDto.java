package com.safistage.monitoring.oci.dto;

public record OciWorkRequestResourceDto(
        String actionType,
        String entityType,
        String identifier,
        String maskedIdentifier
) {
}
