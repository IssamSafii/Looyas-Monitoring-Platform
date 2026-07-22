package com.safistage.monitoring.monitoring.normalization.dto;

public record LogEntryDto(
        String timestamp,
        String timestampNanos,
        String message,
        String level
) {
}
