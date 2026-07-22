package com.safistage.monitoring.monitoring.common;

import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;

@Component
public class MonitoringQueryValidator {

    private final MonitoringProperties properties;

    public MonitoringQueryValidator(MonitoringProperties properties) {
        this.properties = properties;
    }

    public void validateQuery(String query) {
        if (query == null || query.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_QUERY", "La requête ne peut pas être vide");
        }
        if (query.length() > properties.getMaxQueryLength()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "QUERY_TOO_LONG", "La requête dépasse la taille maximale autorisée");
        }
    }

    public void validateRange(Instant start, Instant end) {
        if (start == null || end == null || end.isBefore(start)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RANGE", "La période demandée est invalide");
        }
        long seconds = Duration.between(start, end).getSeconds();
        if (seconds > properties.getMaxQuerySeconds()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "RANGE_TOO_LARGE", "La période demandée dépasse la limite autorisée");
        }
    }

    public int validateLogLimit(Integer requestedLimit) {
        int limit = requestedLimit == null ? 200 : requestedLimit;
        if (limit < 1 || limit > properties.getMaxLogLimit()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_LIMIT", "La limite demandée est invalide");
        }
        return limit;
    }
}
