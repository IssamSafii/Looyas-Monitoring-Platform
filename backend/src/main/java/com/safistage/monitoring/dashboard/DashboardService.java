package com.safistage.monitoring.dashboard;

import com.safistage.monitoring.dashboard.dto.DashboardRequest;
import com.safistage.monitoring.dashboard.dto.DashboardResponse;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.panel.Panel;
import com.safistage.monitoring.panel.dto.PanelResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardRepository repository;

    public DashboardService(DashboardRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<DashboardResponse> findAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DashboardResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Transactional
    public DashboardResponse create(DashboardRequest request) {
        if (repository.existsBySlug(request.slug())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "DASHBOARD_SLUG_EXISTS", "Ce slug existe déjà");
        }
        Dashboard dashboard = new Dashboard();
        apply(dashboard, request);
        return toResponse(repository.save(dashboard));
    }

    @Transactional
    public DashboardResponse update(Long id, DashboardRequest request) {
        Dashboard dashboard = getEntity(id);
        apply(dashboard, request);
        return toResponse(repository.save(dashboard));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getEntity(id));
    }

    public Dashboard getEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "DASHBOARD_NOT_FOUND", "Dashboard introuvable"));
    }

    private DashboardResponse toResponse(Dashboard dashboard) {
        List<PanelResponse> panels = dashboard.getPanels().stream().map(this::toPanelResponse).toList();
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

    private PanelResponse toPanelResponse(Panel panel) {
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

    private void apply(Dashboard dashboard, DashboardRequest request) {
        dashboard.setName(request.name());
        dashboard.setSlug(request.slug());
        dashboard.setDescription(request.description());
        dashboard.setIcon(request.icon());
        dashboard.setRefreshInterval(request.refreshInterval());
        dashboard.setDefaultTimeRange(request.defaultTimeRange());
        dashboard.setEnabled(request.enabled());
    }
}
