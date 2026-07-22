export interface MetricPoint {
  timestamp: number;
  value: number | null;
}

export interface MetricSeries {
  name: string;
  labels: Record<string, string>;
  points: MetricPoint[];
}

export interface MetricsResponse {
  status: string;
  resultType: string;
  series: MetricSeries[];
}

export interface LogEntry {
  timestamp: string;
  timestampNanos: string;
  message: string;
  level: string;
}

export interface LogStream {
  labels: Record<string, string>;
  entries: LogEntry[];
}

export interface LogsResponse {
  status: string;
  streams: LogStream[];
}

export interface HealthStatusResponse {
  component: string;
  status: 'CONNECTED' | 'DEGRADED' | 'DISCONNECTED' | 'UNKNOWN';
  message: string;
}

export interface SystemHealthResponse {
  components: HealthStatusResponse[];
}
