package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciLogSearchResponse(
        String status,
        String source,
        List<OciLogEntryResponse> logs,
        int count,
        boolean truncated
) {
}
