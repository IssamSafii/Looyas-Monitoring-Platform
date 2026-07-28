export type OciHealthStatus =
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'NOT_CONFIGURED'
  | 'INVALID_CREDENTIALS'
  | 'PERMISSION_DENIED'
  | 'REGION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'ERROR';

export interface OciHealthResponse {
  status: OciHealthStatus;
  configured: boolean;
  region: string | null;
  profile: string | null;
  compartmentConfigured: boolean;
  message: string;
  checkedAt: string;
}

export interface OciCompartment {
  id: string;
  maskedId: string;
  name: string;
  lifecycleState: string;
  defaultSelection: boolean;
}

export interface OciCompartmentsResponse {
  status: string;
  source: 'OCI';
  configuredCompartmentId: string | null;
  compartments: OciCompartment[];
}

export interface OciMetricPoint {
  timestamp: number;
  value: number | null;
}

export interface OciMetricSeries {
  name: string;
  dimensions: Record<string, string>;
  metadata: Record<string, string>;
  points: OciMetricPoint[];
}

export interface OciMetricsQueryRequest {
  compartmentId: string | null;
  namespace: string;
  query: string;
  from: string;
  to: string;
  includeSubcompartments: boolean | null;
}

export interface OciMetricsQueryResponse {
  status: string;
  source: 'OCI';
  namespace: string;
  query: string;
  series: OciMetricSeries[];
}

export interface OciMetricDefinition {
  namespace: string;
  name: string;
  dimensions: string[];
  metadata: Record<string, string>;
}

export interface OciNamespacesResponse {
  status: string;
  source: 'OCI';
  namespaces: string[];
}

export interface OciMetricDefinitionsListResponse {
  status: string;
  source: 'OCI';
  namespace: string;
  definitions: OciMetricDefinition[];
}

export interface OciLogSearchRequest {
  searchQuery: string | null;
  compartmentId: string | null;
  from: string;
  to: string;
  limit: number;
}

export interface OciLogEntry {
  timestamp: string;
  message: string;
  severity: string;
  logGroupId: string;
  logId: string;
  resourceId: string;
  resourceName: string;
  region: string;
  service: string;
  data: Record<string, unknown>;
}

export interface OciLogSearchResponse {
  status: string;
  source: 'OCI';
  logs: OciLogEntry[];
  count: number;
  truncated: boolean;
}

export interface OciComputeInstance {
  id: string;
  maskedId: string;
  displayName: string;
  lifecycleState: string;
  shape: string;
  availabilityDomain: string;
  faultDomain: string;
  region: string;
  maskedCompartmentId: string;
  timeCreated: string;
  cpuCurrent: number | null;
}
