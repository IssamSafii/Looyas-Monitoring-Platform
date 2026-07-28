package com.safistage.monitoring.datasource;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "data_source_configs")
public class DataSourceConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DataSourceType type;

    @Column(name = "base_url", nullable = false, length = 500)
    private String baseUrl;

    @Column(name = "api_prefix", nullable = false, length = 100)
    private String apiPrefix = "";

    @Column(name = "tenant_id")
    private String tenantId;

    @Enumerated(EnumType.STRING)
    @Column(name = "authentication_type", nullable = false, length = 20)
    private AuthenticationType authenticationType = AuthenticationType.NONE;

    private String username;

    @Column(name = "encrypted_password")
    private String encryptedPassword;

    @Column(name = "encrypted_token")
    private String encryptedToken;

    @Column(length = 100)
    private String region;

    @Column(name = "compartment_id", length = 255)
    private String compartmentId;

    @Column(length = 100)
    private String profile;

    @Column(name = "config_file", length = 500)
    private String configFile;

    @Column(name = "default_metric_namespace", length = 255)
    private String defaultMetricNamespace;

    @Column(name = "include_subcompartments", nullable = false)
    private boolean includeSubcompartments;

    @Column(nullable = false)
    private boolean enabled = true;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DataSourceType getType() {
        return type;
    }

    public void setType(DataSourceType type) {
        this.type = type;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getApiPrefix() {
        return apiPrefix;
    }

    public void setApiPrefix(String apiPrefix) {
        this.apiPrefix = apiPrefix;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public AuthenticationType getAuthenticationType() {
        return authenticationType;
    }

    public void setAuthenticationType(AuthenticationType authenticationType) {
        this.authenticationType = authenticationType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public String getEncryptedToken() {
        return encryptedToken;
    }

    public void setEncryptedToken(String encryptedToken) {
        this.encryptedToken = encryptedToken;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCompartmentId() {
        return compartmentId;
    }

    public void setCompartmentId(String compartmentId) {
        this.compartmentId = compartmentId;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getConfigFile() {
        return configFile;
    }

    public void setConfigFile(String configFile) {
        this.configFile = configFile;
    }

    public String getDefaultMetricNamespace() {
        return defaultMetricNamespace;
    }

    public void setDefaultMetricNamespace(String defaultMetricNamespace) {
        this.defaultMetricNamespace = defaultMetricNamespace;
    }

    public boolean isIncludeSubcompartments() {
        return includeSubcompartments;
    }

    public void setIncludeSubcompartments(boolean includeSubcompartments) {
        this.includeSubcompartments = includeSubcompartments;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
