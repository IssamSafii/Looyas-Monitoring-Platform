package com.safistage.monitoring.monitoring.normalization;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.monitoring.normalization.dto.LogEntryDto;
import com.safistage.monitoring.monitoring.normalization.dto.LogStreamDto;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedLogsResponse;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Component
public class LokiResponseNormalizer {

    public NormalizedLogsResponse normalize(JsonNode root) {
        List<LogStreamDto> streams = new ArrayList<>();
        for (JsonNode item : root.path("data").path("result")) {
            Map<String, String> labels = new LinkedHashMap<>();
            item.path("stream").fields().forEachRemaining(entry -> labels.put(entry.getKey(), entry.getValue().asText()));
            List<LogEntryDto> entries = new ArrayList<>();
            for (JsonNode value : item.path("values")) {
                String nanos = value.get(0).asText();
                String message = value.get(1).asText();
                entries.add(new LogEntryDto(toIso(nanos), nanos, message, detectLevel(message)));
            }
            streams.add(new LogStreamDto(labels, entries));
        }
        return new NormalizedLogsResponse(root.path("status").asText("success"), streams);
    }

    private String toIso(String nanos) {
        try {
            long totalNanos = Long.parseLong(nanos);
            long millis = totalNanos / 1_000_000L;
            return Instant.ofEpochMilli(millis).toString();
        } catch (Exception ex) {
            return Instant.now().toString();
        }
    }

    private String detectLevel(String message) {
        String value = message.toUpperCase(Locale.ROOT);
        if (value.contains("ERROR")) return "ERROR";
        if (value.contains("WARN")) return "WARN";
        if (value.contains("DEBUG")) return "DEBUG";
        return "INFO";
    }
}
