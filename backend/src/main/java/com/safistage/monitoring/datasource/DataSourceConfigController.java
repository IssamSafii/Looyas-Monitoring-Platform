package com.safistage.monitoring.datasource;

import com.safistage.monitoring.datasource.dto.DataSourceConfigRequest;
import com.safistage.monitoring.datasource.dto.DataSourceConfigResponse;
import com.safistage.monitoring.datasource.dto.DataSourceTestResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/data-sources")
@PreAuthorize("hasRole('ADMIN')")
public class DataSourceConfigController {

    private final DataSourceConfigService service;

    public DataSourceConfigController(DataSourceConfigService service) {
        this.service = service;
    }

    @GetMapping
    public List<DataSourceConfigResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public DataSourceConfigResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<DataSourceConfigResponse> create(@Valid @RequestBody DataSourceConfigRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public DataSourceConfigResponse update(@PathVariable Long id, @Valid @RequestBody DataSourceConfigRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/test")
    public DataSourceTestResponse test(@PathVariable Long id) {
        return service.testConnection(id);
    }
}
