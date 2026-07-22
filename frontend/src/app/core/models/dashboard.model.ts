export interface Panel {
  id: number;
  dashboardId: number;
  title: string;
  description: string | null;
  dataSourceType: 'MIMIR' | 'LOKI';
  panelType: 'STAT' | 'TIME_SERIES' | 'BAR' | 'PIE' | 'GAUGE' | 'TABLE' | 'LOGS';
  query: string;
  unit: string | null;
  legendTemplate: string | null;
  optionsJson: string | null;
  gridX: number;
  gridY: number;
  gridWidth: number;
  gridHeight: number;
  enabled: boolean;
}

export interface Dashboard {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  refreshInterval: string | null;
  defaultTimeRange: string | null;
  enabled: boolean;
  panels: Panel[];
}
