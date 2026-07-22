import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { HealthService } from '../../core/services/health.service';
import { HealthStatusResponse, LogsResponse, LogStream, MetricSeries } from '../../core/models/monitoring.model';
import { TimeRangeService } from '../../core/services/time-range.service';

interface StatView {
  title: string;
  description: string;
  unit: string;
  value: string;
  loading: boolean;
  noData: boolean;
}

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, PanelContainerComponent, StatCardComponent, TimeSeriesChartComponent, LogsViewerComponent, HealthBadgeComponent],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Overview</h1>
        <div class="page-subtitle">Vue globale des métriques et logs récupérés via le backend Spring Boot.</div>
      </div>
      <div class="chip">{{ lastRefresh | date:'short' }}</div>
    </div>

    <div class="grid-tiles">
      <app-stat-card *ngFor="let stat of stats" [title]="stat.title" [description]="stat.description" [value]="stat.value" [unit]="stat.unit" [loading]="stat.loading" [noData]="stat.noData" lastRefresh="updated"></app-stat-card>
    </div>

    <div class="section-grid" style="margin-top: 1rem;">
      <div class="span-8">
        <app-panel-container title="CPU global" subtitle="Tendance cluster ou instance">
          <app-time-series-chart [series]="cpuSeries" unit="%"></app-time-series-chart>
        </app-panel-container>
      </div>
      <div class="span-4">
        <app-panel-container title="Santé des sources" subtitle="État backend, PostgreSQL, Mimir et Loki">
          <div style="display:grid; gap:0.75rem;">
            <div *ngFor="let item of health">
              <div style="display:flex; justify-content:space-between; gap:1rem;">
                <span>{{ item.component }}</span>
                <app-health-badge [status]="item.status"></app-health-badge>
              </div>
              <div class="muted">{{ item.message }}</div>
            </div>
          </div>
        </app-panel-container>
      </div>
      <div class="span-6">
        <app-panel-container title="RAM globale" subtitle="Mémoire utilisée sur la période">
          <app-time-series-chart [series]="memorySeries" unit="B"></app-time-series-chart>
        </app-panel-container>
      </div>
      <div class="span-6">
        <app-panel-container title="Volume de logs" subtitle="Entrées récentes côté Loki">
          <app-time-series-chart [series]="logVolumeSeries"></app-time-series-chart>
        </app-panel-container>
      </div>
      <div class="span-12">
        <app-panel-container title="Derniers logs en erreur" subtitle="Filtre local côté frontend possible dans Logs Explorer">
          <app-logs-viewer [streams]="errorLogs"></app-logs-viewer>
        </app-panel-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {
  protected lastRefresh = new Date();
  protected health: HealthStatusResponse[] = [];
  protected cpuSeries: MetricSeries[] = [];
  protected memorySeries: MetricSeries[] = [];
  protected logVolumeSeries: MetricSeries[] = [];
  protected errorLogs: LogStream[] = [];
  protected stats: StatView[] = [
    { title: 'Clusters détectés', description: 'Approximation via label cluster', unit: '', value: '-', loading: true, noData: false },
    { title: 'Nodes', description: 'Nombre de nœuds exposés', unit: '', value: '-', loading: true, noData: false },
    { title: 'Pods Running', description: 'Pods en cours d’exécution', unit: '', value: '-', loading: true, noData: false },
    { title: 'CPU global', description: 'Pourcentage CPU moyen', unit: '%', value: '-', loading: true, noData: false },
    { title: 'RAM globale', description: 'Mémoire active', unit: 'B', value: '-', loading: true, noData: false },
    { title: 'Logs / seconde', description: 'Débit estimé sur la période', unit: '', value: '-', loading: true, noData: false }
  ];

  constructor(
    private readonly monitoringService: MonitoringService,
    private readonly healthService: HealthService,
    private readonly timeRangeService: TimeRangeService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const end = new Date();
    const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
    const rangePayload = { start: start.toISOString(), end: end.toISOString(), step: '60' };

    forkJoin({
      health: this.healthService.getHealth().pipe(catchError(() => of({ components: [] }))),
      clusters: this.monitoringService.queryMetrics({ query: 'count(count by (cluster) (up))' }).pipe(catchError(() => of(null))),
      nodes: this.monitoringService.queryMetrics({ query: 'count(kube_node_info)' }).pipe(catchError(() => of(null))),
      podsRunning: this.monitoringService.queryMetrics({ query: 'sum(kube_pod_status_phase{phase="Running"})' }).pipe(catchError(() => of(null))),
      cpu: this.monitoringService.queryMetricsRange({ query: '100 * avg(rate(container_cpu_usage_seconds_total[5m]))', ...rangePayload }).pipe(catchError(() => of(null))),
      memory: this.monitoringService.queryMetricsRange({ query: 'sum(container_memory_working_set_bytes)', ...rangePayload }).pipe(catchError(() => of(null))),
      logs: this.monitoringService.queryLogsRange({ query: 'sum(count_over_time({job=~".+"}[1m]))', limit: 200, direction: 'BACKWARD', ...rangePayload }).pipe(catchError(() => of(null))),
      errors: this.monitoringService.queryLogsRange({ query: '{job=~".+"} |= "error"', limit: 20, direction: 'BACKWARD', ...rangePayload }).pipe(catchError(() => of(null)))
    }).subscribe((result) => {
      this.lastRefresh = new Date();
      this.health = result.health.components;
      this.cpuSeries = result.cpu?.series ?? [];
      this.memorySeries = result.memory?.series ?? [];
      this.logVolumeSeries = this.logsToSeries(result.logs);
      this.errorLogs = result.errors?.streams ?? [];
      this.applyStat(0, result.clusters);
      this.applyStat(1, result.nodes);
      this.applyStat(2, result.podsRunning);
      this.applyStat(3, result.cpu);
      this.applyStat(4, result.memory);
      this.stats[5].loading = false;
      this.stats[5].value = String(result.logs?.streams.reduce((acc, stream) => acc + stream.entries.length, 0) ?? 0);
      this.stats[5].noData = !result.logs?.streams.length;
    });
  }

  private applyStat(index: number, response: { series: MetricSeries[] } | null): void {
    const card = this.stats[index];
    card.loading = false;
    const point = response?.series?.[0]?.points?.at(-1);
    if (point?.value == null) {
      card.noData = true;
      return;
    }
    card.value = point.value.toFixed(2);
  }

  private logsToSeries(response: LogsResponse | null): MetricSeries[] {
    if (!response?.streams?.length) {
      return [];
    }
    const total = response.streams.reduce((acc, stream) => acc + stream.entries.length, 0);
    return [{
      name: 'logs',
      labels: { source: 'loki' },
      points: [{ timestamp: Date.now(), value: total }]
    }];
  }
}
