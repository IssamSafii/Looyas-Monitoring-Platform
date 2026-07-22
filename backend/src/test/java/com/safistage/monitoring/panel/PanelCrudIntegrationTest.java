package com.safistage.monitoring.panel;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PanelCrudIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void shouldCreatePanelForDashboard() throws Exception {
        String token = login();
        String dashboardResponse = mockMvc.perform(post("/api/dashboards")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name":"Panel Board",
                                  "slug":"panel-board",
                                  "description":"test",
                                  "icon":"dashboard",
                                  "refreshInterval":"30s",
                                  "defaultTimeRange":"1h",
                                  "enabled":true
                                }
                                """))
                .andReturn().getResponse().getContentAsString();
        long dashboardId = objectMapper.readTree(dashboardResponse).path("id").asLong();

        String panelResponse = mockMvc.perform(post("/api/dashboards/" + dashboardId + "/panels")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title":"CPU",
                                  "description":"Usage CPU",
                                  "dataSourceType":"MIMIR",
                                  "panelType":"TIME_SERIES",
                                  "query":"up",
                                  "unit":"%",
                                  "legendTemplate":"{{pod}}",
                                  "optionsJson":"{}",
                                  "gridX":0,
                                  "gridY":0,
                                  "gridWidth":6,
                                  "gridHeight":4,
                                  "enabled":true
                                }
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        assertThat(objectMapper.readTree(panelResponse).path("title").asText()).isEqualTo("CPU");
    }

    private String login() throws Exception {
        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"admin","password":"admin"}
                                """))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(loginResponse).path("accessToken").asText();
    }
}
