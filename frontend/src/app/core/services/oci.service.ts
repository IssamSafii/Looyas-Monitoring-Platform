import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OciCompartmentsResponse,
  OciComputeInstance,
  OciHealthResponse,
  OciPaginatedResponse,
  OciLogSearchRequest,
  OciLogSearchResponse,
  OciMetricDefinitionsListResponse,
  OciMetricsQueryRequest,
  OciMetricsQueryResponse,
  OciNamespacesResponse,
  OciWorkRequest,
  OciWorkRequestError,
  OciWorkRequestLog,
  OciWorkRequestsPage,
  OciWorkRequestsQuery
} from '../models/oci.model';

@Injectable({ providedIn: 'root' })
export class OciService {
  constructor(private readonly http: HttpClient) {}

  health() {
    return this.http.get<OciHealthResponse>('/api/monitoring/oci/health');
  }

  compartments() {
    return this.http.get<OciCompartmentsResponse>('/api/monitoring/oci/compartments');
  }

  namespaces(compartmentId?: string | null) {
    let params = new HttpParams();
    if (compartmentId?.trim()) {
      params = params.set('compartmentId', compartmentId.trim());
    }
    return this.http.get<OciNamespacesResponse>('/api/monitoring/oci/metrics/namespaces', { params });
  }

  definitions(namespace: string, compartmentId?: string | null) {
    let params = new HttpParams().set('namespace', namespace);
    if (compartmentId?.trim()) {
      params = params.set('compartmentId', compartmentId.trim());
    }
    return this.http.get<OciMetricDefinitionsListResponse>('/api/monitoring/oci/metrics/definitions', { params });
  }

  queryMetrics(payload: OciMetricsQueryRequest) {
    return this.http.post<OciMetricsQueryResponse>('/api/monitoring/oci/metrics/query', payload);
  }

  searchLogs(payload: OciLogSearchRequest) {
    return this.http.post<OciLogSearchResponse>('/api/monitoring/oci/logs/search', payload);
  }

  computeInstances(compartmentId?: string | null) {
    let params = new HttpParams();
    if (compartmentId?.trim()) {
      params = params.set('compartmentId', compartmentId.trim());
    }
    return this.http.get<OciComputeInstance[]>('/api/monitoring/oci/compute/instances', { params });
  }

  computeInstance(instanceId: string) {
    return this.http.get<OciComputeInstance>(`/api/monitoring/oci/compute/instances/${encodeURIComponent(instanceId)}`);
  }

  workRequests(query: OciWorkRequestsQuery) {
    let params = new HttpParams();

    if (query.compartmentId?.trim()) {
      params = params.set('compartmentId', query.compartmentId.trim());
    }
    if (query.status?.trim()) {
      params = params.set('status', query.status.trim());
    }
    if (query.operationType?.trim()) {
      params = params.set('operationType', query.operationType.trim());
    }
    if (query.resource?.trim()) {
      params = params.set('resource', query.resource.trim());
    }
    if (query.from?.trim()) {
      params = params.set('from', query.from.trim());
    }
    if (query.to?.trim()) {
      params = params.set('to', query.to.trim());
    }
    if (query.page != null) {
      params = params.set('page', String(query.page));
    }
    if (query.limit != null) {
      params = params.set('limit', String(query.limit));
    }

    return this.http.get<OciWorkRequestsPage>('/api/monitoring/oci/work-requests', { params });
  }

  workRequest(id: string) {
    return this.http.get<OciWorkRequest>(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}`);
  }

  workRequestErrors(id: string, page?: string | null, limit?: number) {
    let params = new HttpParams();
    if (page?.trim()) {
      params = params.set('page', page.trim());
    }
    if (limit != null) {
      params = params.set('limit', String(limit));
    }
    return this.http.get<OciPaginatedResponse<OciWorkRequestError>>(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}/errors`, { params });
  }

  workRequestLogs(id: string, page?: string | null, limit?: number) {
    let params = new HttpParams();
    if (page?.trim()) {
      params = params.set('page', page.trim());
    }
    if (limit != null) {
      params = params.set('limit', String(limit));
    }
    return this.http.get<OciPaginatedResponse<OciWorkRequestLog>>(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}/logs`, { params });
  }
}
