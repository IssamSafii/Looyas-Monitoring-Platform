package com.safistage.monitoring.oci.dto;

import java.util.List;
import java.util.Map;

public record OciMetricSeriesResponse(
        String name,
        Map<String, String> dimensions,
        Map<String, String> metadata,
        List<OciMetricPointResponse> points
) {
}
