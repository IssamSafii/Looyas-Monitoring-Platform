package com.safistage.monitoring.datasource;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.datasource.dto.DataSourceConfigRequest;
import com.safistage.monitoring.datasource.dto.DataSourceConfigResponse;
import com.safistage.monitoring.datasource.dto.DataSourceTestResponse;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.monitoring.loki.LokiClient;
import com.safistage.monitoring.monitoring.mimir.MimirClient;
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

    public DataSourceConfigService(DataSourceConfigRepository repository,
                                   SecretCryptoService cryptoService,
                                   MonitoringProperties monitoringProperties,
                                   MimirClient mimirClient,
                                   LokiClient lokiClient) {
        this.repository = repository;
        this.cryptoService = cryptoService;
        this.monitoringProperties = monitoringProperties;
        this.mimirClient = mimirClient;
        this.lokiClient = lokiClient;
    }

    @Bean
    ApplicationRunner dataSourceBootstrapRunner(DataSourceConfigService service) {
        return args -> service.initializeDefaultsIfMissing();
    }

    @Transactional
    public void initializeDefaultsIfMissing() {
        if (repository.count() > 0) {
            return;
        }
        repository.save(createDefault("Mimir", DataSourceType.MIMIR, monitoringProperties.getMimir()));
        repository.save(createDefault("Loki", DataSourceType.LOKI, monitoringProperties.getLoki()));
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
        validateBaseUrl(request.baseUrl());
        DataSourceConfig entity = new DataSourceConfig();
        apply(entity, request, false);
        return toResponse(repository.save(entity));
    }

    @Transactional
    public DataSourceConfigResponse update(Long id, DataSourceConfigRequest request) {
        validateBaseUrl(request.baseUrl());
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
            throw new ApiException(HttpStatus.BAD_REQUEST, "DATA_SOURCE_DISABLED", "La source est désactivée");
        }
        return config;
    }

    @Transactional(readOnly = true)
    public DataSourceTestResponse testConnection(Long id) {
        DataSourceConfig config = getEntity(id);
        try {
            JsonNode response = config.getType() == DataSourceType.MIMIR
                    ? mimirClient.getLabels(config)
                    : lokiClient.getLabels(config);
            return new DataSourceTestResponse(true, "Connexion réussie: " + response.path("status").asText("ok"));
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
                entity.isEnabled()
        );
    }

    private DataSourceConfig getEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "DATA_SOURCE_NOT_FOUND", "Source introuvable"));
    }

    private void apply(DataSourceConfig entity, DataSourceConfigRequest request, boolean preserveExistingSecrets) {
        entity.setName(request.name());
        entity.setType(request.type());
        entity.setBaseUrl(request.baseUrl().trim());
        entity.setApiPrefix(request.apiPrefix() == null ? "" : request.apiPrefix().trim());
        entity.setTenantId(blankToNull(request.tenantId()));
        entity.setAuthenticationType(request.authenticationType());
        entity.setUsername(blankToNull(request.username()));
        entity.setEnabled(request.enabled());
        if (request.password() != null && !request.password().isBlank()) {
            entity.setEncryptedPassword(cryptoService.encrypt(request.password()));
        } else if (!preserveExistingSecrets) {
            entity.setEncryptedPassword(null);
        }
        if (request.token() != null && !request.token().isBlank()) {
            entity.setEncryptedToken(cryptoService.encrypt(request.token()));
        } else if (!preserveExistingSecrets) {
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

    public Map<String, String> resolveSecrets(DataSourceConfig config) {
        return Map.of(
                "password", blankToEmpty(cryptoService.decrypt(config.getEncryptedPassword())),
                "token", blankToEmpty(cryptoService.decrypt(config.getEncryptedToken()))
        );
    }

    private void validateBaseUrl(String baseUrl) {
        URI uri = URI.create(baseUrl);
        if (!List.of("http", "https").contains(uri.getScheme())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BASE_URL", "Seuls les protocoles http et https sont autorisés");
        }
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String blankToEmpty(String value) {
        return value == null ? "" : value;
    }
}
