package com.safistage.monitoring.oci.dto;

import java.util.Map;

public record OciLogEntryResponse(
        String timestamp,
        String message,
        String severity,
        String logGroupId,
        String logId,
        String resourceId,
        String resourceName,
        String region,
        String service,
        Map<String, Object> data
) {
}
