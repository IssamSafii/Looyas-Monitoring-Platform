package com.safistage.monitoring.panel.dto;

import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.panel.PanelType;

public record PanelResponse(
        Long id,
        Long dashboardId,
        String title,
        String description,
        DataSourceType dataSourceType,
        PanelType panelType,
        String query,
        String unit,
        String legendTemplate,
        String optionsJson,
        int gridX,
        int gridY,
        int gridWidth,
        int gridHeight,
        boolean enabled
) {
}
