package com.safistage.monitoring.oci.health;

import com.oracle.bmc.identity.requests.GetTenancyRequest;
import com.oracle.bmc.model.BmcException;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciHealthResponse;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class OciHealthService {

    private final OciClientFactory clientFactory;
    private final OciExceptionMapper exceptionMapper;

    public OciHealthService(OciClientFactory clientFactory, OciExceptionMapper exceptionMapper) {
        this.clientFactory = clientFactory;
        this.exceptionMapper = exceptionMapper;
    }

    public OciHealthResponse health() {
        try {
            OciResolvedConfig config = clientFactory.resolveConfiguration();
            if (!config.enabled() || !config.configured()) {
                return new OciHealthResponse(
                        "NOT_CONFIGURED",
                        false,
                        blankToNull(config.region()),
                        blankToNull(config.profile()),
                        config.compartmentId() != null && !config.compartmentId().isBlank(),
                        "La source OCI n'est pas encore configuree.",
                        Instant.now()
                );
            }

            var provider = clientFactory.authenticationProvider(config);
            String tenancyId = provider.getTenantId();
            try (var client = clientFactory.newIdentityClient(config)) {
                client.getTenancy(GetTenancyRequest.builder().tenancyId(tenancyId).build());
            }
            return new OciHealthResponse("CONNECTED", true, config.region(), config.profile(), true, "Connexion OCI reussie", Instant.now());
        } catch (ApiException exception) {
            return responseFromApiException(exception, null);
        } catch (BmcException exception) {
            return responseFromApiException(exceptionMapper.toApiException(exception), null);
        } catch (Throwable exception) {
            return responseFromApiException(exceptionMapper.toApiException(exception), null);
        }
    }

    private OciHealthResponse responseFromApiException(ApiException exception, OciResolvedConfig config) {
        String status = switch (exception.getCode()) {
            case "OCI_INVALID_CREDENTIALS" -> "INVALID_CREDENTIALS";
            case "OCI_PERMISSION_DENIED" -> "PERMISSION_DENIED";
            case "OCI_REGION_UNAVAILABLE" -> "REGION_UNAVAILABLE";
            case "OCI_TIMEOUT" -> "TIMEOUT";
            case "OCI_NOT_CONFIGURED" -> "NOT_CONFIGURED";
            default -> "DISCONNECTED";
        };

        return new OciHealthResponse(
                status,
                false,
                config == null ? null : blankToNull(config.region()),
                config == null ? null : blankToNull(config.profile()),
                config != null && config.compartmentId() != null && !config.compartmentId().isBlank(),
                exception.getMessage(),
                Instant.now()
        );
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}
