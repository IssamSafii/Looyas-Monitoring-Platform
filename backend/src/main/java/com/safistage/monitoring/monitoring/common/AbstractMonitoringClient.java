package com.safistage.monitoring.monitoring.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.safistage.monitoring.config.MonitoringProperties;
import com.safistage.monitoring.datasource.AuthenticationType;
import com.safistage.monitoring.datasource.DataSourceConfig;
import com.safistage.monitoring.datasource.SecretCryptoService;
import com.safistage.monitoring.exception.ApiException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.Duration;
import java.util.Map;

@Component
public abstract class AbstractMonitoringClient {

    protected final WebClient.Builder webClientBuilder;
    protected final SecretCryptoService secretCryptoService;
    protected final MonitoringProperties monitoringProperties;

    protected AbstractMonitoringClient(WebClient.Builder webClientBuilder,
                                       SecretCryptoService secretCryptoService,
                                       MonitoringProperties monitoringProperties) {
        this.webClientBuilder = webClientBuilder;
        this.secretCryptoService = secretCryptoService;
        this.monitoringProperties = monitoringProperties;
    }

    protected JsonNode executeGet(DataSourceConfig config, String endpoint, Map<String, String> queryParams) {
        URI uri = UriComponentsBuilder.fromHttpUrl(config.getBaseUrl())
                .path(normalizePath(config.getApiPrefix()))
                .path(endpoint)
                .queryParams(toMultiValueMap(queryParams))
                .build()
                .encode()
                .toUri();

        WebClient.RequestHeadersSpec<?> request = webClientBuilder.build()
                .get()
                .uri(uri)
                .headers(headers -> applyHeaders(headers, config));

        return request.retrieve()
                .onStatus(HttpStatusCode -> HttpStatusCode.isError(), response -> response.bodyToMono(String.class)
                        .map(body -> new ApiException(HttpStatus.BAD_GATEWAY, "UPSTREAM_ERROR", "Erreur source: " + body)))
                .bodyToMono(JsonNode.class)
                .timeout(Duration.ofSeconds(monitoringProperties.getRequestTimeoutSeconds()))
                .onErrorMap(ex -> new ApiException(HttpStatus.BAD_GATEWAY, "UPSTREAM_UNAVAILABLE", "Impossible de joindre la source distante"))
                .block();
    }

    private void applyHeaders(HttpHeaders headers, DataSourceConfig config) {
        if (config.getTenantId() != null && !config.getTenantId().isBlank()) {
            headers.set("X-Scope-OrgID", config.getTenantId());
        }
        String password = empty(secretCryptoService.decrypt(config.getEncryptedPassword()));
        String token = empty(secretCryptoService.decrypt(config.getEncryptedToken()));
        if (config.getAuthenticationType() == AuthenticationType.BASIC && config.getUsername() != null) {
            headers.setBasicAuth(config.getUsername(), password);
        }
        if (config.getAuthenticationType() == AuthenticationType.BEARER) {
            headers.setBearerAuth(token);
        }
    }

    private MultiValueMap<String, String> toMultiValueMap(Map<String, String> params) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        params.forEach((key, value) -> {
            if (value != null && !value.isBlank()) {
                map.add(key, value);
            }
        });
        return map;
    }

    private String normalizePath(String path) {
        if (path == null || path.isBlank()) {
            return "";
        }
        return path.startsWith("/") ? path : "/" + path;
    }

    private String empty(String value) {
        return value == null ? "" : value;
    }
}
