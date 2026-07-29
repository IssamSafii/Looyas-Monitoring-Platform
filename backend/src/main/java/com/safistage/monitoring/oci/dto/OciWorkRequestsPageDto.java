package com.safistage.monitoring.oci.dto;

import java.util.List;

public record OciWorkRequestsPageDto(
        List<OciWorkRequestDto> items,
        int page,
        int limit,
        boolean hasNext,
        boolean partialSupport,
        String message
) {
}
