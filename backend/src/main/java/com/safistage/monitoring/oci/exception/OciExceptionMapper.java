package com.safistage.monitoring.oci.exception;

import com.oracle.bmc.model.BmcException;
import com.safistage.monitoring.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class OciExceptionMapper {

    public ApiException toApiException(Exception exception) {
        if (exception instanceof ApiException apiException) {
            return apiException;
        }

        if (exception instanceof BmcException bmcException) {
            return switch (bmcException.getStatusCode()) {
                case 401 -> new ApiException(HttpStatus.UNAUTHORIZED, "OCI_INVALID_CREDENTIALS", "Identifiants OCI invalides.");
                case 403 -> new ApiException(HttpStatus.FORBIDDEN, "OCI_PERMISSION_DENIED", "Permissions OCI insuffisantes.");
                case 404 -> new ApiException(HttpStatus.NOT_FOUND, "OCI_COMPARTMENT_NOT_FOUND", "Compartment OCI introuvable.");
                case 429 -> new ApiException(HttpStatus.TOO_MANY_REQUESTS, "OCI_RATE_LIMITED", "La limite OCI a ete atteinte.");
                case 408, 504 -> new ApiException(HttpStatus.GATEWAY_TIMEOUT, "OCI_TIMEOUT", "La requete OCI a expire.");
                default -> {
                    if (bmcException.getStatusCode() >= 500) {
                        yield new ApiException(HttpStatus.BAD_GATEWAY, "OCI_SERVICE_ERROR", "Le service OCI a retourne une erreur.");
                    }
                    yield new ApiException(HttpStatus.BAD_GATEWAY, "OCI_SERVICE_ERROR", "Erreur OCI: " + sanitizeMessage(bmcException.getMessage()));
                }
            };
        }

        return new ApiException(HttpStatus.BAD_GATEWAY, "OCI_SERVICE_ERROR", "Erreur OCI: " + sanitizeMessage(exception.getMessage()));
    }

    public ApiException toApiException(Throwable throwable) {
        if (throwable instanceof Exception exception) {
            return toApiException(exception);
        }
        return new ApiException(HttpStatus.BAD_GATEWAY, "OCI_SERVICE_ERROR", "Erreur OCI: " + sanitizeMessage(throwable.getMessage()));
    }

    public String sanitizeMessage(String message) {
        if (message == null || message.isBlank()) {
            return "Erreur OCI non detaillee.";
        }

        return message
                .replaceAll("(?i)fingerprint=[^,\\s]+", "fingerprint=***")
                .replaceAll("(?i)key_file=[^,\\s]+", "key_file=***")
                .replaceAll("(?i)token=[^,\\s]+", "token=***");
    }
}
