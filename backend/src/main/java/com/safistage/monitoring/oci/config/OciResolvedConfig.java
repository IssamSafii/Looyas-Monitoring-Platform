package com.safistage.monitoring.oci.config;

public record OciResolvedConfig(
        boolean enabled,
        boolean configured,
        String configFile,
        String profile,
        String region,
        String compartmentId,
        String defaultMetricNamespace,
        boolean includeSubcompartments,
        String message
) {
}
