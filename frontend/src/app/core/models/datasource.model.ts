export interface DataSourceConfig {
  id: number;
  name: string;
  type: 'MIMIR' | 'LOKI' | 'OCI';
  baseUrl: string;
  apiPrefix: string;
  tenantId: string | null;
  authenticationType: 'NONE' | 'BASIC' | 'BEARER';
  username: string | null;
  maskedPassword: string | null;
  maskedToken: string | null;
  region: string | null;
  maskedCompartmentId: string | null;
  profile: string | null;
  configFile: string | null;
  defaultMetricNamespace: string | null;
  includeSubcompartments: boolean;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataSourceConfigPayload {
  name: string;
  type: 'MIMIR' | 'LOKI' | 'OCI';
  baseUrl: string;
  apiPrefix: string;
  tenantId: string | null;
  authenticationType: 'NONE' | 'BASIC' | 'BEARER';
  username: string | null;
  password: string | null;
  token: string | null;
  region: string | null;
  compartmentId: string | null;
  profile: string | null;
  configFile: string | null;
  defaultMetricNamespace: string | null;
  includeSubcompartments: boolean;
  enabled: boolean;
}
