package com.safistage.monitoring.panel.dto;

import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.panel.PanelType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PanelRequest(
        @NotBlank @Size(max = 200) String title,
        String description,
        @NotNull DataSourceType dataSourceType,
        @NotNull PanelType panelType,
        @NotBlank @Size(max = 4000) String query,
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
