export interface DataSourceConfig {
  id: number;
  name: string;
  type: 'MIMIR' | 'LOKI';
  baseUrl: string;
  apiPrefix: string;
  tenantId: string | null;
  authenticationType: 'NONE' | 'BASIC' | 'BEARER';
  username: string | null;
  maskedPassword: string | null;
  maskedToken: string | null;
  enabled: boolean;
}

export interface DataSourceConfigPayload {
  name: string;
  type: 'MIMIR' | 'LOKI';
  baseUrl: string;
  apiPrefix: string;
  tenantId: string | null;
  authenticationType: 'NONE' | 'BASIC' | 'BEARER';
  username: string | null;
  password: string | null;
  token: string | null;
  enabled: boolean;
}
