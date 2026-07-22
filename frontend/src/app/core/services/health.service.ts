import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemHealthResponse } from '../models/monitoring.model';

@Injectable({ providedIn: 'root' })
export class HealthService {
  constructor(private readonly http: HttpClient) {}

  getHealth() {
    return this.http.get<SystemHealthResponse>('/api/health');
  }
}
