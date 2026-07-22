import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceConfig, DataSourceConfigPayload } from '../models/datasource.model';

@Injectable({ providedIn: 'root' })
export class DataSourceService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<DataSourceConfig[]>('/api/admin/data-sources');
  }

  save(payload: DataSourceConfigPayload, id?: number) {
    return id
      ? this.http.put<DataSourceConfig>(`/api/admin/data-sources/${id}`, payload)
      : this.http.post<DataSourceConfig>('/api/admin/data-sources', payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`/api/admin/data-sources/${id}`);
  }

  test(id: number) {
    return this.http.post<{ success: boolean; message: string }>(`/api/admin/data-sources/${id}/test`, {});
  }
}
