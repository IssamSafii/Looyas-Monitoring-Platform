package com.safistage.monitoring.oci.workrequests;

import com.oracle.bmc.model.BmcException;
import com.oracle.bmc.workrequests.WorkRequestClient;
import com.oracle.bmc.workrequests.model.WorkRequest;
import com.oracle.bmc.workrequests.model.WorkRequestError;
import com.oracle.bmc.workrequests.model.WorkRequestResource;
import com.oracle.bmc.workrequests.model.WorkRequestSummary;
import com.oracle.bmc.workrequests.responses.GetWorkRequestResponse;
import com.oracle.bmc.workrequests.responses.ListWorkRequestErrorsResponse;
import com.oracle.bmc.workrequests.responses.ListWorkRequestsResponse;
import com.safistage.monitoring.datasource.DataSourceConfigRepository;
import com.safistage.monitoring.oci.client.OciClientFactory;
import com.safistage.monitoring.oci.config.OciProperties;
import com.safistage.monitoring.oci.config.OciResolvedConfig;
import com.safistage.monitoring.oci.exception.OciExceptionMapper;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OciWorkRequestServiceTest {

    @Test
    void shouldFilterAndMapCommonWorkRequests() {
        WorkRequestClient client = mock(WorkRequestClient.class);
        ListWorkRequestsResponse listResponse = mock(ListWorkRequestsResponse.class);
        GetWorkRequestResponse detailResponse = mock(GetWorkRequestResponse.class);
        ListWorkRequestErrorsResponse errorResponse = mock(ListWorkRequestErrorsResponse.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.workRequestClient = client;

        WorkRequestSummary matchingSummary = new WorkRequestSummary(
                "SCALE_UP",
                WorkRequestSummary.Status.Failed,
                "ocid1.workrequest.oc1..one",
                "ocid1.compartment.oc1..demo",
                75f,
                Date.from(Instant.parse("2026-07-28T08:00:00Z")),
                Date.from(Instant.parse("2026-07-28T08:10:00Z")),
                Date.from(Instant.parse("2026-07-28T08:20:00Z"))
        );
        WorkRequestSummary ignoredSummary = new WorkRequestSummary(
                "TERMINATE_INSTANCE",
                WorkRequestSummary.Status.Succeeded,
                "ocid1.workrequest.oc1..two",
                "ocid1.compartment.oc1..demo",
                100f,
                Date.from(Instant.parse("2026-07-28T06:00:00Z")),
                Date.from(Instant.parse("2026-07-28T06:05:00Z")),
                Date.from(Instant.parse("2026-07-28T06:10:00Z"))
        );
        WorkRequest detail = new WorkRequest(
                "SCALE_UP",
                WorkRequest.Status.Failed,
                "ocid1.workrequest.oc1..one",
                "ocid1.compartment.oc1..demo",
                List.of(new WorkRequestResource(
                        WorkRequestResource.ActionType.Updated,
                        "instance",
                        "ocid1.instance.oc1..target",
                        null
                )),
                75f,
                Date.from(Instant.parse("2026-07-28T08:00:00Z")),
                Date.from(Instant.parse("2026-07-28T08:10:00Z")),
                Date.from(Instant.parse("2026-07-28T08:20:00Z"))
        );

        when(client.listWorkRequests(any())).thenReturn(listResponse);
        when(listResponse.getItems()).thenReturn(List.of(matchingSummary, ignoredSummary));
        when(listResponse.getOpcNextPage()).thenReturn(null);
        when(client.getWorkRequest(any())).thenReturn(detailResponse);
        when(detailResponse.getWorkRequest()).thenReturn(detail);
        when(client.listWorkRequestErrors(any())).thenReturn(errorResponse);
        when(errorResponse.getItems()).thenReturn(List.of(new WorkRequestError("FAILED", "Stack exploded\nat com.oracle.Hidden", Date.from(Instant.parse("2026-07-28T08:21:00Z")))));
        when(errorResponse.getOpcNextPage()).thenReturn(null);

        OciWorkRequestService service = new OciWorkRequestService(
                clientFactory,
                properties(),
                new OciExceptionMapper(),
                new OciWorkRequestMapper(new OciExceptionMapper())
        );

        var page = service.listWorkRequests(
                null,
                "FAILED",
                "scale",
                Instant.parse("2026-07-28T07:00:00Z"),
                Instant.parse("2026-07-28T09:00:00Z"),
                "instance",
                0,
                20
        );

        assertThat(page.items()).hasSize(1);
        assertThat(page.items().get(0).operationType()).isEqualTo("SCALE_UP");
        assertThat(page.items().get(0).resourceSummary()).contains("instance");
        assertThat(page.items().get(0).errorMessage()).isEqualTo("Stack exploded");
        assertThat(page.partialSupport()).isFalse();
    }

    @Test
    void shouldKeepPageReadableWhenCommonDetailApiIsUnavailable() {
        WorkRequestClient client = mock(WorkRequestClient.class);
        ListWorkRequestsResponse listResponse = mock(ListWorkRequestsResponse.class);
        TestOciClientFactory clientFactory = new TestOciClientFactory(configured());
        clientFactory.workRequestClient = client;

        WorkRequestSummary summary = new WorkRequestSummary(
                "CREATE_INSTANCE",
                WorkRequestSummary.Status.InProgress,
                "ocid1.workrequest.oc1..three",
                "ocid1.compartment.oc1..demo",
                42f,
                Date.from(Instant.parse("2026-07-28T11:00:00Z")),
                Date.from(Instant.parse("2026-07-28T11:05:00Z")),
                null
        );

        when(client.listWorkRequests(any())).thenReturn(listResponse);
        when(listResponse.getItems()).thenReturn(List.of(summary));
        when(listResponse.getOpcNextPage()).thenReturn(null);
        when(client.getWorkRequest(any())).thenThrow(new BmcException(404, "NotAuthorizedOrNotFound", "Missing", "req-123"));

        OciWorkRequestService service = new OciWorkRequestService(
                clientFactory,
                properties(),
                new OciExceptionMapper(),
                new OciWorkRequestMapper(new OciExceptionMapper())
        );

        var page = service.listWorkRequests(null, null, null, null, null, null, 0, 20);

        assertThat(page.items()).hasSize(1);
        assertThat(page.items().get(0).commonApiSupported()).isFalse();
        assertThat(page.partialSupport()).isTrue();
        assertThat(page.message()).contains("API Work Requests commune");
    }

    private OciProperties properties() {
        OciProperties properties = new OciProperties();
        properties.setMaxQueryRangeHours(168);
        return properties;
    }

    private OciResolvedConfig configured() {
        return new OciResolvedConfig(true, true, "/app/.oci/config", "DEFAULT", "eu-frankfurt-1", "ocid1.compartment.oc1..demo", "oci_computeagent", false, "ok");
    }

    private static final class TestOciClientFactory extends OciClientFactory {
        private final OciResolvedConfig config;
        private WorkRequestClient workRequestClient;

        private TestOciClientFactory(OciResolvedConfig config) {
            super(new OciProperties(), mock(DataSourceConfigRepository.class));
            this.config = config;
        }

        @Override
        public OciResolvedConfig resolveConfiguration() {
            return config;
        }

        @Override
        public WorkRequestClient newWorkRequestClient(OciResolvedConfig config) {
            return workRequestClient;
        }
    }
}
