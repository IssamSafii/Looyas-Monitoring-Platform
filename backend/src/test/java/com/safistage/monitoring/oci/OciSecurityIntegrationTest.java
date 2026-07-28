package com.safistage.monitoring.oci;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OciSecurityIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void shouldRejectOciHealthWithoutJwt() throws Exception {
        mockMvc.perform(get("/api/monitoring/oci/health"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldRejectOciMetricsQueryWithoutJwt() throws Exception {
        mockMvc.perform(post("/api/monitoring/oci/metrics/query")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "namespace": "oci_computeagent",
                                  "query": "CpuUtilization[1m].mean()",
                                  "from": "2026-07-28T09:00:00Z",
                                  "to": "2026-07-28T10:00:00Z",
                                  "includeSubcompartments": false
                                }
                                """))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldRejectOciLogsWithoutJwt() throws Exception {
        mockMvc.perform(post("/api/monitoring/oci/logs/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "searchQuery": null,
                                  "from": "2026-07-28T09:00:00Z",
                                  "to": "2026-07-28T10:00:00Z",
                                  "limit": 200
                                }
                                """))
                .andExpect(status().isForbidden());
    }
}
