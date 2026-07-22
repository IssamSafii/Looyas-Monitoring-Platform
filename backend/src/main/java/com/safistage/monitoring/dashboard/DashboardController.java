package com.safistage.monitoring.dashboard;

import com.safistage.monitoring.dashboard.dto.DashboardRequest;
import com.safistage.monitoring.dashboard.dto.DashboardResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboards")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public List<DashboardResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public DashboardResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public DashboardResponse create(@Valid @RequestBody DashboardRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public DashboardResponse update(@PathVariable Long id, @Valid @RequestBody DashboardRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
