package com.safistage.monitoring.oci.logs;

import com.safistage.monitoring.oci.dto.OciLogSearchRequest;
import com.safistage.monitoring.oci.dto.OciLogSearchResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring/oci/logs")
public class OciLogsController {

    private final OciLoggingSearchService loggingSearchService;

    public OciLogsController(OciLoggingSearchService loggingSearchService) {
        this.loggingSearchService = loggingSearchService;
    }

    @PostMapping("/search")
    public OciLogSearchResponse search(@Valid @RequestBody OciLogSearchRequest request) {
        return loggingSearchService.search(request);
    }
}
