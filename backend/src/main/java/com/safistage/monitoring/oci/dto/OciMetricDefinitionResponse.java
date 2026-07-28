package com.safistage.monitoring.oci.dto;

import java.util.List;
import java.util.Map;

public record OciMetricDefinitionResponse(
        String namespace,
        String name,
        List<String> dimensions,
        Map<String, String> metadata
) {
}
