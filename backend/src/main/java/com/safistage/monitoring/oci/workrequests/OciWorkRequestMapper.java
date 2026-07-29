package com.safistage.monitoring.oci.workrequests;

import com.oracle.bmc.workrequests.model.WorkRequest;
import com.oracle.bmc.workrequests.model.WorkRequestError;
import com.oracle.bmc.workrequests.model.WorkRequestLogEntry;
import com.oracle.bmc.workrequests.model.WorkRequestResource;
import com.oracle.bmc.workrequests.model.WorkRequestSummary;
import com.safistage.monitoring.oci.dto.OciWorkRequestDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestErrorDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestLogDto;
import com.safistage.monitoring.oci.dto.OciWorkRequestResourceDto;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Component
public class OciWorkRequestMapper {

    private final OciExceptionMapper exceptionMapper;

    public OciWorkRequestMapper(OciExceptionMapper exceptionMapper) {
        this.exceptionMapper = exceptionMapper;
    }

    public OciWorkRequestDto toDto(WorkRequest workRequest,
                                   String errorMessage,
                                   boolean commonApiSupported,
                                   String supportMessage) {
        List<OciWorkRequestResourceDto> resources = mapResources(workRequest.getResources());
        return new OciWorkRequestDto(
                workRequest.getId(),
                mask(workRequest.getId()),
                value(workRequest.getOperationType()),
                value(workRequest.getStatus() == null ? null : workRequest.getStatus().getValue()),
                workRequest.getCompartmentId(),
                mask(workRequest.getCompartmentId()),
                workRequest.getPercentComplete(),
                toInstant(workRequest.getTimeAccepted()),
                toInstant(workRequest.getTimeStarted()),
                toInstant(workRequest.getTimeFinished()),
                summarizeResources(resources),
                resources,
                sanitizeUiMessage(errorMessage),
                commonApiSupported,
                sanitizeUiMessage(supportMessage)
        );
    }

    public OciWorkRequestDto toDto(WorkRequestSummary workRequest,
                                   String errorMessage,
                                   boolean commonApiSupported,
                                   String supportMessage) {
        return new OciWorkRequestDto(
                workRequest.getId(),
                mask(workRequest.getId()),
                value(workRequest.getOperationType()),
                value(workRequest.getStatus() == null ? null : workRequest.getStatus().getValue()),
                workRequest.getCompartmentId(),
                mask(workRequest.getCompartmentId()),
                workRequest.getPercentComplete(),
                toInstant(workRequest.getTimeAccepted()),
                toInstant(workRequest.getTimeStarted()),
                toInstant(workRequest.getTimeFinished()),
                "Ressource detaillee indisponible via l'API commune.",
                List.of(),
                sanitizeUiMessage(errorMessage),
                commonApiSupported,
                sanitizeUiMessage(supportMessage)
        );
    }

    public OciWorkRequestErrorDto toDto(WorkRequestError error) {
        return new OciWorkRequestErrorDto(
                value(error.getCode()),
                sanitizeUiMessage(error.getMessage()),
                toInstant(error.getTimestamp())
        );
    }

    public OciWorkRequestLogDto toDto(WorkRequestLogEntry logEntry) {
        return new OciWorkRequestLogDto(
                sanitizeUiMessage(logEntry.getMessage()),
                toInstant(logEntry.getTimestamp())
        );
    }

    private List<OciWorkRequestResourceDto> mapResources(List<WorkRequestResource> resources) {
        if (resources == null || resources.isEmpty()) {
            return List.of();
        }

        return resources.stream()
                .filter(Objects::nonNull)
                .map(resource -> new OciWorkRequestResourceDto(
                        value(resource.getActionType() == null ? null : resource.getActionType().getValue()),
                        value(resource.getEntityType()),
                        value(resource.getIdentifier()),
                        mask(resource.getIdentifier())
                ))
                .toList();
    }

    private String summarizeResources(List<OciWorkRequestResourceDto> resources) {
        if (resources.isEmpty()) {
            return "Aucune ressource detaillee";
        }

        return resources.stream()
                .limit(2)
                .map(resource -> {
                    String entityType = resource.entityType().isBlank() ? "resource" : resource.entityType();
                    String identifier = resource.maskedIdentifier().isBlank() ? "-" : resource.maskedIdentifier();
                    return entityType + ": " + identifier;
                })
                .reduce((left, right) -> left + " | " + right)
                .orElse("Aucune ressource detaillee");
    }

    private Instant toInstant(java.util.Date date) {
        return date == null ? null : date.toInstant();
    }

    private String sanitizeUiMessage(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        String sanitized = exceptionMapper.sanitizeMessage(value).replace("\r", "").trim();
        if (sanitized.isBlank()) {
            return null;
        }

        String firstLine = sanitized.lines()
                .map(String::trim)
                .filter(line -> !line.isBlank())
                .filter(line -> !line.startsWith("at ") && !line.startsWith("Caused by:"))
                .findFirst()
                .orElse("");

        return firstLine.isBlank() ? null : firstLine;
    }

    private String mask(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        if (value.length() <= 16) {
            return value;
        }
        return value.substring(0, 16) + "..." + value.substring(value.length() - 4);
    }

    private String value(String value) {
        return value == null ? "" : value.trim();
    }
}
