package com.safistage.monitoring.datasource;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.datasource.dto.DataSourceConfigRequest;
import com.safistage.monitoring.datasource.dto.DataSourceConfigResponse;
import com.safistage.monitoring.datasource.dto.DataSourceTestResponse;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.monitoring.loki.LokiClient;
import com.safistage.monitoring.monitoring.mimir.MimirClient;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.health.OciHealthService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
public class DataSourceConfigService {

    private final DataSourceConfigRepository repository;
    private final SecretCryptoService cryptoService;
    private final MonitoringProperties monitoringProperties;
    private final MimirClient mimirClient;
    private final LokiClient lokiClient;
    private final OciProperties ociProperties;
    private final OciHealthService ociHealthService;

    public DataSourceConfigService(DataSourceConfigRepository repository,
                                   SecretCryptoService cryptoService,
                                   MonitoringProperties monitoringProperties,
                                   MimirClient mimirClient,
                                   LokiClient lokiClient,
                                   OciProperties ociProperties,
                                   OciHealthService ociHealthService) {
        this.repository = repository;
        this.cryptoService = cryptoService;
        this.monitoringProperties = monitoringProperties;
        this.mimirClient = mimirClient;
        this.lokiClient = lokiClient;
        this.ociProperties = ociProperties;
        this.ociHealthService = ociHealthService;
    }

    @Bean
    ApplicationRunner dataSourceBootstrapRunner(DataSourceConfigService service) {
        return args -> service.initializeDefaultsIfMissing();
    }

    @Transactional
    public void initializeDefaultsIfMissing() {
        if (!repository.existsByType(DataSourceType.MIMIR)) {
            repository.save(createDefault("Mimir", DataSourceType.MIMIR, monitoringProperties.getMimir()));
        }
        if (!repository.existsByType(DataSourceType.LOKI)) {
            repository.save(createDefault("Loki", DataSourceType.LOKI, monitoringProperties.getLoki()));
        }
        if (!repository.existsByType(DataSourceType.OCI)) {
            repository.save(createOciDefault());
        }
    }

    @Transactional(readOnly = true)
    public List<DataSourceConfigResponse> findAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DataSourceConfigResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Transactional
    public DataSourceConfigResponse create(DataSourceConfigRequest request) {
        validateRequest(request);
        if (repository.existsByType(request.type())) {
            throw new ApiException(HttpStatus.CONFLICT, "DATA_SOURCE_TYPE_EXISTS", "Une source de ce type existe deja. Modifie la source existante.");
        }
        DataSourceConfig entity = new DataSourceConfig();
        apply(entity, request, false);
        return toResponse(repository.save(entity));
    }

    @Transactional
    public DataSourceConfigResponse update(Long id, DataSourceConfigRequest request) {
        validateRequest(request);
        DataSourceConfig entity = getEntity(id);
        apply(entity, request, true);
        return toResponse(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getEntity(id));
    }

    @Transactional(readOnly = true)
    public DataSourceConfig getEnabledByType(DataSourceType type) {
        DataSourceConfig config = repository.findByType(type)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "DATA_SOURCE_NOT_FOUND", "Source introuvable"));
        if (!config.isEnabled()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "DATA_SOURCE_DISABLED", "La source est desactivee");
        }
        return config;
    }

    @Transactional(readOnly = true)
    public DataSourceTestResponse testConnection(Long id) {
        DataSourceConfig config = getEntity(id);
        try {
            if (config.getType() == DataSourceType.OCI) {
                var response = ociHealthService.health();
                return new DataSourceTestResponse("CONNECTED".equals(response.status()), response.message());
            }

            JsonNode response = config.getType() == DataSourceType.MIMIR
                    ? mimirClient.getLabels(config)
                    : lokiClient.getLabels(config);
            return new DataSourceTestResponse(true, "Connexion reussie: " + response.path("status").asText("ok"));
        } catch (RuntimeException ex) {
            return new DataSourceTestResponse(false, ex.getMessage());
        }
    }

    private DataSourceConfigResponse toResponse(DataSourceConfig entity) {
        return new DataSourceConfigResponse(
                entity.getId(),
                entity.getName(),
                entity.getType(),
                entity.getBaseUrl(),
                entity.getApiPrefix(),
                entity.getTenantId(),
                entity.getAuthenticationType(),
                entity.getUsername(),
                cryptoService.mask(cryptoService.decrypt(entity.getEncryptedPassword())),
                cryptoService.mask(cryptoService.decrypt(entity.getEncryptedToken())),
                entity.getRegion(),
                cryptoService.mask(entity.getCompartmentId()),
                entity.getProfile(),
                entity.getConfigFile(),
                entity.getDefaultMetricNamespace(),
                entity.isIncludeSubcompartments(),
                entity.isEnabled(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    private DataSourceConfig getEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "DATA_SOURCE_NOT_FOUND", "Source introuvable"));
    }

    private void apply(DataSourceConfig entity, DataSourceConfigRequest request, boolean preserveExistingValues) {
        entity.setName(request.name());
        entity.setType(request.type());
        entity.setBaseUrl(blankToEmpty(request.baseUrl()));
        entity.setApiPrefix(request.apiPrefix() == null ? "" : request.apiPrefix().trim());
        entity.setTenantId(blankToNull(request.tenantId()));
        entity.setAuthenticationType(request.authenticationType());
        entity.setUsername(blankToNull(request.username()));
        entity.setRegion(blankToNull(request.region()));
        entity.setProfile(blankToNull(request.profile()));
        entity.setConfigFile(blankToNull(request.configFile()));
        entity.setDefaultMetricNamespace(blankToNull(request.defaultMetricNamespace()));
        entity.setIncludeSubcompartments(request.includeSubcompartments());
        entity.setEnabled(request.enabled());

        if (request.compartmentId() != null && !request.compartmentId().isBlank()) {
            entity.setCompartmentId(request.compartmentId().trim());
        } else if (!preserveExistingValues) {
            entity.setCompartmentId(null);
        }

        if (request.password() != null && !request.password().isBlank()) {
            entity.setEncryptedPassword(cryptoService.encrypt(request.password()));
        } else if (!preserveExistingValues) {
            entity.setEncryptedPassword(null);
        }

        if (request.token() != null && !request.token().isBlank()) {
            entity.setEncryptedToken(cryptoService.encrypt(request.token()));
        } else if (!preserveExistingValues) {
            entity.setEncryptedToken(null);
        }
    }

    private DataSourceConfig createDefault(String name, DataSourceType type, MonitoringProperties.SourceProperties properties) {
        DataSourceConfig config = new DataSourceConfig();
        config.setName(name);
        config.setType(type);
        config.setBaseUrl(properties.getBaseUrl().isBlank() ? "http://localhost" : properties.getBaseUrl().trim());
        config.setApiPrefix(properties.getApiPrefix());
        config.setTenantId(blankToNull(properties.getTenantId()));
        if (!properties.getBearerToken().isBlank()) {
            config.setAuthenticationType(AuthenticationType.BEARER);
            config.setEncryptedToken(cryptoService.encrypt(properties.getBearerToken()));
        } else if (!properties.getUsername().isBlank()) {
            config.setAuthenticationType(AuthenticationType.BASIC);
            config.setUsername(properties.getUsername());
            config.setEncryptedPassword(cryptoService.encrypt(properties.getPassword()));
        } else {
            config.setAuthenticationType(AuthenticationType.NONE);
        }
        config.setEnabled(!properties.getBaseUrl().isBlank());
        return config;
    }

    private DataSourceConfig createOciDefault() {
        DataSourceConfig config = new DataSourceConfig();
        config.setName("OCI");
        config.setType(DataSourceType.OCI);
        config.setBaseUrl("");
        config.setApiPrefix("");
        config.setAuthenticationType(AuthenticationType.NONE);
        config.setEnabled(ociProperties.isEnabled());
        config.setRegion(blankToNull(ociProperties.getRegion()));
        config.setCompartmentId(blankToNull(ociProperties.getCompartmentId()));
        config.setProfile(blankToNull(ociProperties.getProfile()));
        config.setConfigFile(blankToNull(ociProperties.getConfigFile()));
        config.setDefaultMetricNamespace(blankToNull(ociProperties.getDefaultMetricNamespace()));
        config.setIncludeSubcompartments(ociProperties.isIncludeSubcompartments());
        return config;
    }

    public Map<String, String> resolveSecrets(DataSourceConfig config) {
        return Map.of(
                "password", blankToEmpty(cryptoService.decrypt(config.getEncryptedPassword())),
                "token", blankToEmpty(cryptoService.decrypt(config.getEncryptedToken()))
        );
    }

    private void validateRequest(DataSourceConfigRequest request) {
        if (request.type() == DataSourceType.OCI) {
            return;
        }

        if (request.baseUrl() == null || request.baseUrl().isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BASE_URL", "La base URL est obligatoire.");
        }

        URI uri = URI.create(request.baseUrl());
        if (!List.of("http", "https").contains(uri.getScheme())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BASE_URL", "Seuls les protocoles http et https sont autorises");
        }
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String blankToEmpty(String value) {
        return value == null ? "" : value.trim();
    }
}
