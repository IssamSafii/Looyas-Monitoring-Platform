package com.safistage.monitoring.oci.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oci")
public class OciProperties {

    private boolean enabled;
    private String configFile = "/app/.oci/config";
    private String profile = "DEFAULT";
    private String region = "";
    private String compartmentId = "";
    private String defaultMetricNamespace = "oci_computeagent";
    private int queryTimeoutSeconds = 30;
    private int maxQueryRangeHours = 168;
    private int logLimit = 500;
    private int logMaxLimit = 2000;
    private boolean includeSubcompartments;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getConfigFile() {
        return configFile;
    }

    public void setConfigFile(String configFile) {
        this.configFile = configFile;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
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

    public String getDefaultMetricNamespace() {
        return defaultMetricNamespace;
    }

    public void setDefaultMetricNamespace(String defaultMetricNamespace) {
        this.defaultMetricNamespace = defaultMetricNamespace;
    }

    public int getQueryTimeoutSeconds() {
        return queryTimeoutSeconds;
    }

    public void setQueryTimeoutSeconds(int queryTimeoutSeconds) {
        this.queryTimeoutSeconds = queryTimeoutSeconds;
    }

    public int getMaxQueryRangeHours() {
        return maxQueryRangeHours;
    }

    public void setMaxQueryRangeHours(int maxQueryRangeHours) {
        this.maxQueryRangeHours = maxQueryRangeHours;
    }

    public int getLogLimit() {
        return logLimit;
    }

    public void setLogLimit(int logLimit) {
        this.logLimit = logLimit;
    }

    public int getLogMaxLimit() {
        return logMaxLimit;
    }

    public void setLogMaxLimit(int logMaxLimit) {
        this.logMaxLimit = logMaxLimit;
    }

    public boolean isIncludeSubcompartments() {
        return includeSubcompartments;
    }

    public void setIncludeSubcompartments(boolean includeSubcompartments) {
        this.includeSubcompartments = includeSubcompartments;
    }
}
