package com.safistage.monitoring.monitoring.normalization.dto;

import java.util.List;

public record NormalizedLogsResponse(
        String status,
        List<LogStreamDto> streams
) {
}
