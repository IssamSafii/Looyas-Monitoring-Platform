package com.safistage.monitoring.oci.client;

import com.oracle.bmc.ConfigFileReader;
import com.oracle.bmc.Region;
import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.identity.IdentityClient;
import com.oracle.bmc.workrequests.WorkRequestClient;
import com.oracle.bmc.loggingsearch.LogSearchClient;
import com.oracle.bmc.monitoring.MonitoringClient;
import com.oracle.bmc.core.ComputeClient;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class OciClientFactory {

    private final OciProperties properties;
    private final DataSourceConfigRepository dataSourceConfigRepository;

    public OciClientFactory(OciProperties properties, DataSourceConfigRepository dataSourceConfigRepository) {
        this.properties = properties;
        this.dataSourceConfigRepository = dataSourceConfigRepository;
    }

    public OciResolvedConfig resolveConfiguration() {
        DataSourceConfig source = selectOciSource();

        boolean useDatabaseToggle = source != null && hasExplicitOciConfiguration(source);
        boolean enabled = useDatabaseToggle ? source.isEnabled() : properties.isEnabled();
        String configFile = firstNonBlank(source != null ? source.getConfigFile() : null, properties.getConfigFile());
        String profile = firstNonBlank(source != null ? source.getProfile() : null, properties.getProfile());
        String region = firstNonBlank(source != null ? source.getRegion() : null, properties.getRegion());
        String compartmentId = firstNonBlank(source != null ? source.getCompartmentId() : null, properties.getCompartmentId());
        String defaultMetricNamespace = firstNonBlank(source != null ? source.getDefaultMetricNamespace() : null, properties.getDefaultMetricNamespace());
        boolean includeSubcompartments = source != null ? source.isIncludeSubcompartments() : properties.isIncludeSubcompartments();

        if (!enabled) {
            return new OciResolvedConfig(false, false, configFile, profile, region, compartmentId, defaultMetricNamespace, includeSubcompartments, "La source OCI n'est pas encore configuree.");
        }

        if (isBlank(configFile) || isBlank(profile) || isBlank(region) || isBlank(compartmentId)) {
            return new OciResolvedConfig(true, false, configFile, profile, region, compartmentId, defaultMetricNamespace, includeSubcompartments, "La source OCI n'est pas encore configuree.");
        }

        if (!Files.exists(Path.of(configFile))) {
            return new OciResolvedConfig(true, false, configFile, profile, region, compartmentId, defaultMetricNamespace, includeSubcompartments, "Le fichier OCI config est introuvable.");
        }

        return new OciResolvedConfig(true, true, configFile, profile, region, compartmentId, defaultMetricNamespace, includeSubcompartments, "Configuration OCI chargee.");
    }

    public ConfigFileAuthenticationDetailsProvider authenticationProvider(OciResolvedConfig config) {
        if (!config.configured()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", config.message());
        }

        try {
            ConfigFileReader.ConfigFile configFile = ConfigFileReader.parse(config.configFile(), config.profile());
            return new ConfigFileAuthenticationDetailsProvider(configFile);
        } catch (Exception exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_INVALID_CREDENTIALS", "Impossible de charger les credentials OCI.");
        }
    }

    public MonitoringClient newMonitoringClient(OciResolvedConfig config) {
        MonitoringClient client = new MonitoringClient(authenticationProvider(config));
        client.setRegion(resolveRegion(config.region()));
        return client;
    }

    public LogSearchClient newLogSearchClient(OciResolvedConfig config) {
        LogSearchClient client = new LogSearchClient(authenticationProvider(config));
        client.setRegion(resolveRegion(config.region()));
        return client;
    }

    public ComputeClient newComputeClient(OciResolvedConfig config) {
        ComputeClient client = new ComputeClient(authenticationProvider(config));
        client.setRegion(resolveRegion(config.region()));
        return client;
    }

    public IdentityClient newIdentityClient(OciResolvedConfig config) {
        IdentityClient client = new IdentityClient(authenticationProvider(config));
        client.setRegion(resolveRegion(config.region()));
        return client;
    }

    public WorkRequestClient newWorkRequestClient(OciResolvedConfig config) {
        WorkRequestClient client = new WorkRequestClient(authenticationProvider(config));
        client.setRegion(resolveRegion(config.region()));
        return client;
    }

    private Region resolveRegion(String regionId) {
        try {
            return Region.fromRegionId(regionId);
        } catch (Exception exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_REGION_UNAVAILABLE", "Region OCI invalide ou indisponible.");
        }
    }

    private String firstNonBlank(String preferred, String fallback) {
        return !isBlank(preferred) ? preferred.trim() : (isBlank(fallback) ? fallback : fallback.trim());
    }

    private DataSourceConfig selectOciSource() {
        return dataSourceConfigRepository.findAllByTypeOrderByUpdatedAtDesc(DataSourceType.OCI).stream()
                .sorted((left, right) -> Integer.compare(score(right), score(left)))
                .findFirst()
                .orElse(null);
    }

    private int score(DataSourceConfig source) {
        int score = 0;
        if (source.isEnabled()) {
            score += 100;
        }
        if (hasExplicitOciConfiguration(source)) {
            score += 10;
        }
        return score;
    }

    private boolean hasExplicitOciConfiguration(DataSourceConfig source) {
        return !isBlank(source.getConfigFile())
                || !isBlank(source.getProfile())
                || !isBlank(source.getRegion())
                || !isBlank(source.getCompartmentId());
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
