package com.safistage.monitoring.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
    boolean existsBySlug(String slug);
}
