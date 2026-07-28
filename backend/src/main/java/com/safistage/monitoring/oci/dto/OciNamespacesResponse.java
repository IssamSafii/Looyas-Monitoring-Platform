package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciNamespacesResponse(
        String status,
        String source,
        List<String> namespaces
) {
}
