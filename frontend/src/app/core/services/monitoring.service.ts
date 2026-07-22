import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetricsResponse, LogsResponse } from '../models/monitoring.model';

@Injectable({ providedIn: 'root' })
export class MonitoringService {
  constructor(private readonly http: HttpClient) {}

  queryMetricsRange(payload: { query: string; start: string; end: string; step: string }) {
    return this.http.post<MetricsResponse>('/api/monitoring/metrics/query-range', payload);
  }

  queryMetrics(payload: { query: string; time?: string }) {
    return this.http.post<MetricsResponse>('/api/monitoring/metrics/query', payload);
  }

  metricsLabels() {
    return this.http.get<{ status: string; data: string[] }>('/api/monitoring/metrics/labels');
  }

  metricLabelValues(labelName: string) {
    return this.http.get<{ status: string; data: string[] }>(`/api/monitoring/metrics/labels/${labelName}/values`);
  }

  queryLogsRange(payload: { query: string; start: string; end: string; step?: string; limit: number; direction: string }) {
    return this.http.post<LogsResponse>('/api/monitoring/logs/query-range', payload);
  }

  queryLogs(payload: { query: string; time?: string; limit: number; direction: string }) {
    return this.http.post<LogsResponse>('/api/monitoring/logs/query', payload);
  }

  logsLabels() {
    return this.http.get<{ status: string; data: string[] }>('/api/monitoring/logs/labels');
  }

  logLabelValues(labelName: string) {
    return this.http.get<{ status: string; data: string[] }>(`/api/monitoring/logs/labels/${labelName}/values`);
  }
}
