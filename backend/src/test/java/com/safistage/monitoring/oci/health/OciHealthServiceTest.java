package com.safistage.monitoring.oci.health;

import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.identity.IdentityClient;
import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.exception.ApiException;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class OciHealthServiceTest {

    @Test
    void shouldReturnNotConfiguredWhenOciIsDisabled() {
        TestOciClientFactory clientFactory = new TestOciClientFactory(
                new OciResolvedConfig(false, false, "", "DEFAULT", "", "", "oci_computeagent", false, "disabled")
        );

        OciHealthService service = new OciHealthService(clientFactory, new OciExceptionMapper());

        var response = service.health();

        assertThat(response.status()).isEqualTo("NOT_CONFIGURED");
        assertThat(response.configured()).isFalse();
    }

    @Test
    void shouldReturnConnectedWhenTenancyCheckSucceeds() {
        ConfigFileAuthenticationDetailsProvider provider = mock(ConfigFileAuthenticationDetailsProvider.class);
        IdentityClient identityClient = mock(IdentityClient.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.provider = provider;
        clientFactory.identityClient = identityClient;
        when(provider.getTenantId()).thenReturn("ocid1.tenancy.oc1..demo");
        when(identityClient.getTenancy(any())).thenReturn(null);

        OciHealthService service = new OciHealthService(clientFactory, new OciExceptionMapper());
        var response = service.health();

        assertThat(response.status()).isEqualTo("CONNECTED");
        assertThat(response.configured()).isTrue();
        verify(identityClient).getTenancy(any());
    }

    @Test
    void shouldReturnTimeoutWhenFactoryThrowsTimeout() {
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.providerFailure = new ApiException(HttpStatus.GATEWAY_TIMEOUT, "OCI_TIMEOUT", "La requete OCI a expire.");

        OciHealthService service = new OciHealthService(clientFactory, new OciExceptionMapper());
        var response = service.health();

        assertThat(response.status()).isEqualTo("TIMEOUT");
        assertThat(response.configured()).isFalse();
    }

    private OciResolvedConfig configured() {
        return new OciResolvedConfig(true, true, "/app/.oci/config", "DEFAULT", "eu-frankfurt-1", "ocid1.compartment.oc1..demo", "oci_computeagent", false, "ok");
    }

    private static final class TestOciClientFactory extends OciClientFactory {
        private final OciResolvedConfig config;
        private ConfigFileAuthenticationDetailsProvider provider;
        private IdentityClient identityClient;
        private RuntimeException providerFailure;

        private TestOciClientFactory(OciResolvedConfig config) {
            super(new OciProperties(), mock(DataSourceConfigRepository.class));
            this.config = config;
        }

        @Override
        public OciResolvedConfig resolveConfiguration() {
            return config;
        }

        @Override
        public ConfigFileAuthenticationDetailsProvider authenticationProvider(OciResolvedConfig config) {
            if (providerFailure != null) {
                throw providerFailure;
            }
            return provider;
        }

        @Override
        public IdentityClient newIdentityClient(OciResolvedConfig config) {
            return identityClient;
        }
    }
}
