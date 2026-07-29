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

export interface OciWorkRequestResource {
  actionType: string;
  entityType: string;
  identifier: string;
  maskedIdentifier: string;
}

export interface OciWorkRequest {
  id: string;
  maskedId: string;
  operationType: string;
  status: string;
  compartmentId: string;
  maskedCompartmentId: string;
  percentComplete: number | null;
  timeAccepted: string | null;
  timeStarted: string | null;
  timeFinished: string | null;
  resourceSummary: string;
  resources: OciWorkRequestResource[];
  errorMessage: string | null;
  commonApiSupported: boolean;
  supportMessage: string | null;
}

export interface OciWorkRequestsQuery {
  compartmentId?: string | null;
  status?: string | null;
  operationType?: string | null;
  resource?: string | null;
  from?: string | null;
  to?: string | null;
  page?: number;
  limit?: number;
}

export interface OciWorkRequestsPage {
  items: OciWorkRequest[];
  page: number;
  limit: number;
  hasNext: boolean;
  partialSupport: boolean;
  message: string;
}

export interface OciPaginatedResponse<T> {
  items: T[];
  limit: number;
  nextPage: string | null;
  hasNext: boolean;
  partialSupport: boolean;
  message: string | null;
}

export interface OciWorkRequestError {
  code: string;
  message: string;
  timestamp: string | null;
}

export interface OciWorkRequestLog {
  message: string;
  timestamp: string | null;
}
