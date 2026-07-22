package com.safistage.monitoring.monitoring.normalization.dto;

import java.util.List;
import java.util.Map;

public record LogStreamDto(
        Map<String, String> labels,
        List<LogEntryDto> entries
) {
}
