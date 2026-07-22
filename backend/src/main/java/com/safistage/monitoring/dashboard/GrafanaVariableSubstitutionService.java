package com.safistage.monitoring.dashboard;

import com.safistage.monitoring.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.regex.Pattern;

@Service
public class GrafanaVariableSubstitutionService {

    public String substitute(String query, Map<String, String> variables) {
        String result = query;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String value = entry.getValue() == null || entry.getValue().isBlank() || "all".equalsIgnoreCase(entry.getValue())
                    ? ".+"
                    : Pattern.quote(entry.getValue());
            result = result.replace("${" + entry.getKey() + ":regex}", value);
            result = result.replace("$" + entry.getKey(), value);
        }
        result = result.replace("$__rate_interval", "5m");
        if (result.matches(".*\\$\\{?.+")) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "UNKNOWN_VARIABLE", "La requête contient une variable Grafana inconnue");
        }
        return result;
    }
}
