package com.safistage.monitoring.dashboard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safistage.monitoring.datasource.DataSourceType;
import com.safistage.monitoring.panel.Panel;
import com.safistage.monitoring.panel.PanelType;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;

@Service
public class GrafanaDashboardImportService {

    private final DashboardRepository dashboardRepository;
    private final ObjectMapper objectMapper;

    public GrafanaDashboardImportService(DashboardRepository dashboardRepository, ObjectMapper objectMapper) {
        this.dashboardRepository = dashboardRepository;
        this.objectMapper = objectMapper;
    }

    @Bean
    ApplicationRunner grafanaImportRunner(GrafanaDashboardImportService service) {
        return args -> service.importIfPresent();
    }

    @Transactional
    public void importIfPresent() throws Exception {
        if (dashboardRepository.count() > 0) {
            return;
        }
        Resource[] resources = new PathMatchingResourcePatternResolver().getResources("classpath*:grafana/*.json");
        for (Resource resource : resources) {
            try (InputStream inputStream = resource.getInputStream()) {
                JsonNode root = objectMapper.readTree(inputStream);
                Dashboard dashboard = new Dashboard();
                dashboard.setName(root.path("title").asText(resource.getFilename()));
                dashboard.setSlug(slugify(dashboard.getName()));
                dashboard.setDescription(root.path("description").asText(null));
                dashboard.setIcon("dashboard");
                dashboard.setRefreshInterval("30s");
                dashboard.setDefaultTimeRange("1h");
                for (JsonNode panelNode : root.path("panels")) {
                    Panel panel = new Panel();
                    panel.setDashboard(dashboard);
                    panel.setTitle(panelNode.path("title").asText("Panel"));
                    panel.setDescription(panelNode.path("description").asText(null));
                    panel.setDataSourceType(resolveDataSourceType(panelNode));
                    panel.setPanelType(resolvePanelType(panelNode.path("type").asText()));
                    panel.setQuery(extractQuery(panelNode));
                    panel.setUnit(panelNode.path("fieldConfig").path("defaults").path("unit").asText(null));
                    panel.setLegendTemplate(panelNode.path("options").path("legend").path("displayMode").asText(null));
                    panel.setOptionsJson(panelNode.toString());
                    panel.setGridX(panelNode.path("gridPos").path("x").asInt(0));
                    panel.setGridY(panelNode.path("gridPos").path("y").asInt(0));
                    panel.setGridWidth(panelNode.path("gridPos").path("w").asInt(6));
                    panel.setGridHeight(panelNode.path("gridPos").path("h").asInt(4));
                    dashboard.getPanels().add(panel);
                }
                dashboardRepository.save(dashboard);
            }
        }
    }

    private String extractQuery(JsonNode panelNode) {
        JsonNode target = panelNode.path("targets").isArray() && !panelNode.path("targets").isEmpty()
                ? panelNode.path("targets").get(0)
                : panelNode;
        if (target.hasNonNull("expr")) {
            return target.path("expr").asText();
        }
        if (target.hasNonNull("query")) {
            return target.path("query").asText();
        }
        return "{}";
    }

    private DataSourceType resolveDataSourceType(JsonNode panelNode) {
        String type = panelNode.path("datasource").path("type").asText("").toLowerCase();
        if (type.contains("loki") || extractQuery(panelNode).contains("{")) {
            return DataSourceType.LOKI;
        }
        return DataSourceType.MIMIR;
    }

    private PanelType resolvePanelType(String type) {
        return switch (type) {
            case "stat" -> PanelType.STAT;
            case "timeseries" -> PanelType.TIME_SERIES;
            case "bargauge", "bar" -> PanelType.BAR;
            case "piechart" -> PanelType.PIE;
            case "gauge" -> PanelType.GAUGE;
            case "logs" -> PanelType.LOGS;
            case "table" -> PanelType.TABLE;
            default -> PanelType.TIME_SERIES;
        };
    }

    private String slugify(String value) {
        return value.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
