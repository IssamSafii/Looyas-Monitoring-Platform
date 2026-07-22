package com.safistage.monitoring.panel;

import com.safistage.monitoring.panel.dto.PanelPreviewResponse;
import com.safistage.monitoring.panel.dto.PanelRequest;
import com.safistage.monitoring.panel.dto.PanelResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasRole('ADMIN')")
public class PanelController {

    private final PanelService service;

    public PanelController(PanelService service) {
        this.service = service;
    }

    @PostMapping("/api/dashboards/{dashboardId}/panels")
    public PanelResponse create(@PathVariable Long dashboardId, @Valid @RequestBody PanelRequest request) {
        return service.create(dashboardId, request);
    }

    @PutMapping("/api/panels/{panelId}")
    public PanelResponse update(@PathVariable Long panelId, @Valid @RequestBody PanelRequest request) {
        return service.update(panelId, request);
    }

    @DeleteMapping("/api/panels/{panelId}")
    public ResponseEntity<Void> delete(@PathVariable Long panelId) {
        service.delete(panelId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/panels/{panelId}/preview")
    public PanelPreviewResponse preview(@PathVariable Long panelId) {
        return service.preview(panelId);
    }
}
