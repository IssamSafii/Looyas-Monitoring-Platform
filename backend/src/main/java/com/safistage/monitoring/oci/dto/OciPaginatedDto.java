package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciPaginatedDto<T>(
        List<T> items,
        int limit,
        String nextPage,
        boolean hasNext,
        boolean partialSupport,
        String message
) {
}
