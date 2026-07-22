package com.safistage.monitoring.dashboard.dto;

import com.safistage.monitoring.panel.dto.PanelResponse;

import java.util.List;

public record DashboardResponse(
        Long id,
        String name,
        String slug,
        String description,
        String icon,
        String refreshInterval,
        String defaultTimeRange,
        boolean enabled,
        List<PanelResponse> panels
) {
}
