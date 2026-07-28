package com.safistage.monitoring.oci.dto;

public record OciMetricPointResponse(
        long timestamp,
        Double value
) {
}
