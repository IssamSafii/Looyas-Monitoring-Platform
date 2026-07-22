package com.safistage.monitoring.dashboard;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class GrafanaVariableSubstitutionServiceTest {

    private final GrafanaVariableSubstitutionService service = new GrafanaVariableSubstitutionService();

    @Test
    void shouldReplaceKnownVariablesAndRateInterval() {
        String query = "sum(rate(metric{cluster=~\"${cluster:regex}\",namespace=~\"${namespace:regex}\"}[$__rate_interval]))";
        String result = service.substitute(query, Map.of("cluster", "aks-safi", "namespace", "default"));

        assertThat(result).contains("\\Qaks-safi\\E");
        assertThat(result).contains("\\Qdefault\\E");
        assertThat(result).contains("[5m]");
    }
}
