import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard, Panel } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Dashboard[]>('/api/dashboards');
  }

  saveDashboard(payload: Partial<Dashboard>, id?: number) {
    return id ? this.http.put<Dashboard>(`/api/dashboards/${id}`, payload) : this.http.post<Dashboard>('/api/dashboards', payload);
  }

  deleteDashboard(id: number) {
    return this.http.delete<void>(`/api/dashboards/${id}`);
  }

  savePanel(dashboardId: number, payload: Partial<Panel>, panelId?: number) {
    return panelId
      ? this.http.put<Panel>(`/api/panels/${panelId}`, payload)
      : this.http.post<Panel>(`/api/dashboards/${dashboardId}/panels`, payload);
  }

  deletePanel(panelId: number) {
    return this.http.delete<void>(`/api/panels/${panelId}`);
  }

  preview(panelId: number) {
    return this.http.post<{ data: unknown }>(`/api/panels/${panelId}/preview`, {});
  }
}
