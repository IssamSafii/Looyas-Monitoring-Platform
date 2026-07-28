package com.safistage.monitoring.oci.identity;

import com.oracle.bmc.identity.model.Compartment;
import com.oracle.bmc.identity.requests.GetCompartmentRequest;
import com.oracle.bmc.identity.requests.GetTenancyRequest;
import com.oracle.bmc.identity.requests.ListCompartmentsRequest;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.dto.OciCompartmentResponse;
import com.safistage.monitoring.oci.dto.OciCompartmentsResponse;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OciIdentityService {

    private final OciClientFactory clientFactory;
    private final OciExceptionMapper exceptionMapper;

    public OciIdentityService(OciClientFactory clientFactory, OciExceptionMapper exceptionMapper) {
        this.clientFactory = clientFactory;
        this.exceptionMapper = exceptionMapper;
    }

    public OciCompartmentsResponse listCompartments() {
        try {
            OciResolvedConfig config = requireConfigured();
            try (var identityClient = clientFactory.newIdentityClient(config)) {
                Map<String, OciCompartmentResponse> compartmentsById = new LinkedHashMap<>();
                addConfiguredScope(identityClient, config, compartmentsById);

                String page = null;
                do {
                    var response = identityClient.listCompartments(ListCompartmentsRequest.builder()
                            .compartmentId(config.compartmentId())
                            .compartmentIdInSubtree(true)
                            .accessLevel(ListCompartmentsRequest.AccessLevel.Accessible)
                            .lifecycleState(Compartment.LifecycleState.Active)
                            .limit(1000)
                            .page(page)
                            .build());

                    response.getItems().forEach(item -> compartmentsById.putIfAbsent(item.getId(), new OciCompartmentResponse(
                            item.getId(),
                            mask(item.getId()),
                            firstNonBlank(item.getName(), mask(item.getId())),
                            item.getLifecycleState() == null ? "" : item.getLifecycleState().name(),
                            item.getId().equals(config.compartmentId())
                    )));
                    page = response.getOpcNextPage();
                } while (page != null);

                List<OciCompartmentResponse> compartments = new ArrayList<>(compartmentsById.values());
                compartments.sort(Comparator
                        .comparing(OciCompartmentResponse::defaultSelection).reversed()
                        .thenComparing(item -> item.name() == null ? "" : item.name(), String.CASE_INSENSITIVE_ORDER));

                return new OciCompartmentsResponse("success", "OCI", config.compartmentId(), compartments);
            }
        } catch (Throwable exception) {
            throw exceptionMapper.toApiException(exception);
        }
    }

    private OciResolvedConfig requireConfigured() {
        OciResolvedConfig config = clientFactory.resolveConfiguration();
        if (!config.enabled() || !config.configured()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "OCI_NOT_CONFIGURED", "La source OCI n'est pas encore configuree.");
        }
        return config;
    }

    private void addConfiguredScope(com.oracle.bmc.identity.IdentityClient identityClient,
                                    OciResolvedConfig config,
                                    Map<String, OciCompartmentResponse> compartmentsById) {
        String scopeId = config.compartmentId();
        if (scopeId == null || scopeId.isBlank()) {
            return;
        }

        try {
            if (scopeId.startsWith("ocid1.tenancy.")) {
                var tenancy = identityClient.getTenancy(GetTenancyRequest.builder().tenancyId(scopeId).build()).getTenancy();
                compartmentsById.put(scopeId, new OciCompartmentResponse(
                        scopeId,
                        mask(scopeId),
                        firstNonBlank(tenancy.getName(), "Tenancy configuree"),
                        "ACTIVE",
                        true
                ));
                return;
            }

            if (scopeId.startsWith("ocid1.compartment.")) {
                var compartment = identityClient.getCompartment(GetCompartmentRequest.builder().compartmentId(scopeId).build()).getCompartment();
                compartmentsById.put(scopeId, new OciCompartmentResponse(
                        scopeId,
                        mask(scopeId),
                        firstNonBlank(compartment.getName(), mask(scopeId)),
                        compartment.getLifecycleState() == null ? "" : compartment.getLifecycleState().name(),
                        true
                ));
                return;
            }
        } catch (Exception ignored) {
            // Keep a fallback option for the configured scope even if metadata lookup fails.
        }

        compartmentsById.put(scopeId, new OciCompartmentResponse(
                scopeId,
                mask(scopeId),
                mask(scopeId),
                "ACTIVE",
                true
        ));
    }

    private String firstNonBlank(String preferred, String fallback) {
        return preferred == null || preferred.isBlank() ? fallback : preferred.trim();
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
}
