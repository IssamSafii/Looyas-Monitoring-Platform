package com.safistage.monitoring.health;

import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.monitoring.loki.LokiClient;
import com.safistage.monitoring.monitoring.mimir.MimirClient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthService {

    private final JdbcTemplate jdbcTemplate;
    private final DataSourceConfigRepository dataSourceConfigRepository;
    private final MimirClient mimirClient;
    private final LokiClient lokiClient;

    public HealthService(JdbcTemplate jdbcTemplate,
                         DataSourceConfigRepository dataSourceConfigRepository,
                         MimirClient mimirClient,
                         LokiClient lokiClient) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSourceConfigRepository = dataSourceConfigRepository;
        this.mimirClient = mimirClient;
        this.lokiClient = lokiClient;
    }

    public SystemHealthResponse all() {
        return new SystemHealthResponse(List.of(
                new HealthStatusResponse("backend", HealthState.CONNECTED, "API disponible"),
                postgres(),
                mimir(),
                loki()
        ));
    }

    public HealthStatusResponse postgres() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return new HealthStatusResponse("postgresql", HealthState.CONNECTED, "Connexion OK");
        } catch (Exception ex) {
            return new HealthStatusResponse("postgresql", HealthState.DISCONNECTED, "Connexion impossible");
        }
    }

    public HealthStatusResponse mimir() {
        return checkRemote(DataSourceType.MIMIR, true);
    }

    public HealthStatusResponse loki() {
        return checkRemote(DataSourceType.LOKI, false);
    }

    private HealthStatusResponse checkRemote(DataSourceType type, boolean metrics) {
        return dataSourceConfigRepository.findByType(type)
                .map(config -> {
                    if (!config.isEnabled()) {
                        return new HealthStatusResponse(type.name().toLowerCase(), HealthState.UNKNOWN, "Source désactivée");
                    }
                    try {
                        if (metrics) {
                            mimirClient.getLabels(config);
                        } else {
                            lokiClient.getLabels(config);
                        }
                        return new HealthStatusResponse(type.name().toLowerCase(), HealthState.CONNECTED, "Connexion OK");
                    } catch (Exception ex) {
                        return new HealthStatusResponse(type.name().toLowerCase(), HealthState.DEGRADED, ex.getMessage());
                    }
                })
                .orElse(new HealthStatusResponse(type.name().toLowerCase(), HealthState.UNKNOWN, "Source non configurée"));
    }
}
