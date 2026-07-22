package com.safistage.monitoring.panel;

import com.safistage.monitoring.dashboard.Dashboard;
import com.safistage.monitoring.dashboard.GrafanaVariableSubstitutionService;
import com.safistage.monitoring.dashboard.DashboardRepository;
import com.safistage.monitoring.dashboard.dto.DashboardResponse;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.monitoring.logs.LogsService;
import com.safistage.monitoring.monitoring.logs.dto.LogsRangeQueryRequest;
import com.safistage.monitoring.monitoring.metrics.MetricsService;
import com.safistage.monitoring.monitoring.metrics.dto.MetricsRangeQueryRequest;
import com.safistage.monitoring.panel.dto.PanelPreviewResponse;
import com.safistage.monitoring.panel.dto.PanelRequest;
import com.safistage.monitoring.panel.dto.PanelResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class PanelService {

    private final PanelRepository panelRepository;
    private final DashboardRepository dashboardRepository;
    private final MetricsService metricsService;
    private final LogsService logsService;
    private final GrafanaVariableSubstitutionService variableSubstitutionService;

    public PanelService(PanelRepository panelRepository,
                        DashboardRepository dashboardRepository,
                        MetricsService metricsService,
                        LogsService logsService,
                        GrafanaVariableSubstitutionService variableSubstitutionService) {
        this.panelRepository = panelRepository;
        this.dashboardRepository = dashboardRepository;
        this.metricsService = metricsService;
        this.logsService = logsService;
        this.variableSubstitutionService = variableSubstitutionService;
    }

    @Transactional
    public PanelResponse create(Long dashboardId, PanelRequest request) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "DASHBOARD_NOT_FOUND", "Dashboard introuvable"));
        Panel panel = new Panel();
        panel.setDashboard(dashboard);
        apply(panel, request);
        return toResponse(panelRepository.save(panel));
    }

    @Transactional
    public PanelResponse update(Long id, PanelRequest request) {
        Panel panel = getEntity(id);
        apply(panel, request);
        return toResponse(panelRepository.save(panel));
    }

    @Transactional
    public void delete(Long id) {
        panelRepository.delete(getEntity(id));
    }

    @Transactional(readOnly = true)
    public PanelPreviewResponse preview(Long id) {
        Panel panel = getEntity(id);
        String resolvedQuery = variableSubstitutionService.substitute(panel.getQuery(), Map.of(
                "cluster", "all",
                "namespace", "all",
                "pod", "all",
                "node", "all"
        ));
        if (panel.getDataSourceType() == com.safistage.monitoring.datasource.DataSourceType.LOKI) {
            return new PanelPreviewResponse(logsService.queryRange(new LogsRangeQueryRequest(
                    resolvedQuery,
                    Instant.now().minusSeconds(3600),
                    Instant.now(),
                    "60",
                    200,
                    "BACKWARD"
            )));
        }
        return new PanelPreviewResponse(metricsService.queryRange(new MetricsRangeQueryRequest(
                resolvedQuery,
                Instant.now().minusSeconds(3600),
                Instant.now(),
                "60"
        )));
    }

    Panel getEntity(Long id) {
        return panelRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PANEL_NOT_FOUND", "Panel introuvable"));
    }

    public DashboardResponse toDashboardResponse(Dashboard dashboard) {
        List<PanelResponse> panels = dashboard.getPanels().stream().map(this::toResponse).toList();
        return new DashboardResponse(
                dashboard.getId(),
                dashboard.getName(),
                dashboard.getSlug(),
                dashboard.getDescription(),
                dashboard.getIcon(),
                dashboard.getRefreshInterval(),
                dashboard.getDefaultTimeRange(),
                dashboard.isEnabled(),
                panels
        );
    }

    public PanelResponse toResponse(Panel panel) {
        return new PanelResponse(
                panel.getId(),
                panel.getDashboard().getId(),
                panel.getTitle(),
                panel.getDescription(),
                panel.getDataSourceType(),
                panel.getPanelType(),
                panel.getQuery(),
                panel.getUnit(),
                panel.getLegendTemplate(),
                panel.getOptionsJson(),
                panel.getGridX(),
                panel.getGridY(),
                panel.getGridWidth(),
                panel.getGridHeight(),
                panel.isEnabled()
        );
    }

    private void apply(Panel panel, PanelRequest request) {
        panel.setTitle(request.title());
        panel.setDescription(request.description());
        panel.setDataSourceType(request.dataSourceType());
        panel.setPanelType(request.panelType());
        panel.setQuery(request.query());
        panel.setUnit(request.unit());
        panel.setLegendTemplate(request.legendTemplate());
        panel.setOptionsJson(request.optionsJson());
        panel.setGridX(request.gridX());
        panel.setGridY(request.gridY());
        panel.setGridWidth(request.gridWidth());
        panel.setGridHeight(request.gridHeight());
        panel.setEnabled(request.enabled());
    }
}
