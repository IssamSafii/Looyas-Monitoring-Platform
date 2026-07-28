package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciMetricDefinitionsListResponse(
        String status,
        String source,
        String namespace,
        List<OciMetricDefinitionResponse> definitions
) {
}
