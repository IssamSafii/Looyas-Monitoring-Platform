package com.safistage.monitoring.oci.workrequests;

import com.safistage.monitoring.oci.dto.OciPaginatedDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestErrorDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestLogDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestsPageDto;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/monitoring/oci/work-requests")
public class OciWorkRequestController {

    private final OciWorkRequestService workRequestService;

    public OciWorkRequestController(OciWorkRequestService workRequestService) {
        this.workRequestService = workRequestService;
    }

    @GetMapping
    public OciWorkRequestsPageDto listWorkRequests(@RequestParam(required = false) String compartmentId,
                                                   @RequestParam(required = false) String status,
                                                   @RequestParam(required = false) String operationType,
                                                   @RequestParam(required = false) String resource,
                                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
                                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to,
                                                   @RequestParam(required = false) Integer page,
                                                   @RequestParam(required = false) Integer limit) {
        return workRequestService.listWorkRequests(compartmentId, status, operationType, from, to, resource, page, limit);
    }

    @GetMapping("/{id}")
    public OciWorkRequestDto getWorkRequest(@PathVariable String id) {
        return workRequestService.getWorkRequest(id);
    }

    @GetMapping("/{id}/errors")
    public OciPaginatedDto<OciWorkRequestErrorDto> getErrors(@PathVariable String id,
                                                             @RequestParam(required = false) String page,
                                                             @RequestParam(required = false) Integer limit) {
        return workRequestService.getErrors(id, page, limit);
    }

    @GetMapping("/{id}/logs")
    public OciPaginatedDto<OciWorkRequestLogDto> getLogs(@PathVariable String id,
                                                         @RequestParam(required = false) String page,
                                                         @RequestParam(required = false) Integer limit) {
        return workRequestService.getLogs(id, page, limit);
    }
}
