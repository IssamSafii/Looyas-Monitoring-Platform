package com.safistage.monitoring.monitoring.normalization;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.monitoring.normalization.dto.MetricPointDto;
import com.safistage.monitoring.monitoring.normalization.dto.MetricSeriesDto;
import com.safistage.monitoring.monitoring.normalization.dto.NormalizedMetricsResponse;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PrometheusResponseNormalizer {

    public NormalizedMetricsResponse normalize(JsonNode root) {
        JsonNode data = root.path("data");
        String resultType = data.path("resultType").asText();
        List<MetricSeriesDto> series = new ArrayList<>();
        for (JsonNode item : data.path("result")) {
            Map<String, String> labels = new LinkedHashMap<>();
            item.path("metric").fields().forEachRemaining(entry -> labels.put(entry.getKey(), entry.getValue().asText()));
            List<MetricPointDto> points = new ArrayList<>();
            if ("matrix".equals(resultType)) {
                for (JsonNode value : item.path("values")) {
                    points.add(new MetricPointDto(value.get(0).asLong() * 1000, parseDouble(value.get(1).asText())));
                }
            } else if ("vector".equals(resultType)) {
                JsonNode value = item.path("value");
                if (value.isArray() && value.size() == 2) {
                    points.add(new MetricPointDto(value.get(0).asLong() * 1000, parseDouble(value.get(1).asText())));
                }
            }
            series.add(new MetricSeriesDto(resolveName(labels), labels, points));
        }
        return new NormalizedMetricsResponse(root.path("status").asText("success"), resultType, series);
    }

    private String resolveName(Map<String, String> labels) {
        for (String key : List.of("pod", "node", "instance", "namespace", "cluster", "__name__")) {
            if (labels.containsKey(key)) {
                return labels.get(key);
            }
        }
        return labels.isEmpty() ? "series" : String.join(" ", labels.values());
    }

    private Double parseDouble(String value) {
        try {
            return Double.valueOf(value);
        } catch (Exception ex) {
            return null;
        }
    }
}
