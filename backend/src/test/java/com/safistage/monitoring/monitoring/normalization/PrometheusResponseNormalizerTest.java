package com.safistage.monitoring.monitoring.normalization;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PrometheusResponseNormalizerTest {

    private final PrometheusResponseNormalizer normalizer = new PrometheusResponseNormalizer();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void shouldNormalizeMatrixResponse() throws Exception {
        var json = objectMapper.readTree("""
                {
                  "status":"success",
                  "data":{
                    "resultType":"matrix",
                    "result":[
                      {
                        "metric":{"node":"node-01"},
                        "values":[[1710000000,"25.4"],[1710000060,"26.1"]]
                      }
                    ]
                  }
                }
                """);

        var response = normalizer.normalize(json);

        assertThat(response.resultType()).isEqualTo("matrix");
        assertThat(response.series()).hasSize(1);
        assertThat(response.series().get(0).name()).isEqualTo("node-01");
        assertThat(response.series().get(0).points()).hasSize(2);
    }
}
