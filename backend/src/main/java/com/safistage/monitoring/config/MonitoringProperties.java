package com.safistage.monitoring.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "monitoring")
public class MonitoringProperties {

    private int maxQuerySeconds = 86400;
    private int maxLogLimit = 2000;
    private int requestTimeoutSeconds = 20;
    private int maxQueryLength = 4000;
    private final SourceProperties mimir = new SourceProperties();
    private final SourceProperties loki = new SourceProperties();

    public int getMaxQuerySeconds() {
        return maxQuerySeconds;
    }

    public void setMaxQuerySeconds(int maxQuerySeconds) {
        this.maxQuerySeconds = maxQuerySeconds;
    }

    public int getMaxLogLimit() {
        return maxLogLimit;
    }

    public void setMaxLogLimit(int maxLogLimit) {
        this.maxLogLimit = maxLogLimit;
    }

    public int getRequestTimeoutSeconds() {
        return requestTimeoutSeconds;
    }

    public void setRequestTimeoutSeconds(int requestTimeoutSeconds) {
        this.requestTimeoutSeconds = requestTimeoutSeconds;
    }

    public int getMaxQueryLength() {
        return maxQueryLength;
    }

    public void setMaxQueryLength(int maxQueryLength) {
        this.maxQueryLength = maxQueryLength;
    }

    public SourceProperties getMimir() {
        return mimir;
    }

    public SourceProperties getLoki() {
        return loki;
    }

    public static class SourceProperties {
        private String apiPrefix = "";
        private String baseUrl = "";
        private String tenantId = "";
        private String username = "";
        private String password = "";
        private String bearerToken = "";

        public String getApiPrefix() {
            return apiPrefix;
        }

        public void setApiPrefix(String apiPrefix) {
            this.apiPrefix = apiPrefix;
        }

        public String getBaseUrl() {
            return baseUrl;
        }

        public void setBaseUrl(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getTenantId() {
            return tenantId;
        }

        public void setTenantId(String tenantId) {
            this.tenantId = tenantId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getBearerToken() {
            return bearerToken;
        }

        public void setBearerToken(String bearerToken) {
            this.bearerToken = bearerToken;
        }
    }
}
