import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OciCompartmentsResponse,
  OciComputeInstance,
  OciHealthResponse,
  OciLogSearchRequest,
  OciLogSearchResponse,
  OciMetricDefinitionsListResponse,
  OciMetricsQueryRequest,
  OciMetricsQueryResponse,
  OciNamespacesResponse
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
}
