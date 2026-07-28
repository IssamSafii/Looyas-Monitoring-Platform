package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciMetricsQueryResponse(
        String status,
        String source,
        String namespace,
        String query,
        List<OciMetricSeriesResponse> series
) {
}
