package com.safistage.monitoring.datasource;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DataSourceConfigRepository extends JpaRepository<DataSourceConfig, Long> {
    Optional<DataSourceConfig> findByType(DataSourceType type);
    List<DataSourceConfig> findAllByTypeOrderByUpdatedAtDesc(DataSourceType type);
    boolean existsByType(DataSourceType type);
}
