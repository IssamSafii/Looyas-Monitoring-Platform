import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { HealthService } from '../../core/services/health.service';
import { HealthStatusResponse, LogEntry, LogsResponse, LogStream, MetricSeries, MetricsResponse } from '../../core/models/monitoring.model';
import { TimeRangeService } from '../../core/services/time-range.service';

type OverviewLogFilter = 'ALL' | 'WARN' | 'ERROR';

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
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    MatButtonModule,
    PanelContainerComponent,
    StatCardComponent,
    TimeSeriesChartComponent,
    LogsViewerComponent,
    HealthBadgeComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Overview</h1>
        <div class="page-subtitle">Vue globale des metriques et des logs avec des valeurs lisibles, prêtes pour l'exploitation.</div>
      </div>
      <div class="chip">{{ lastRefresh | date:'short' }}</div>
    </div>

    <div class="grid-tiles">
      <app-stat-card
        *ngFor="let stat of stats"
        [title]="stat.title"
        [description]="stat.description"
        [value]="stat.value"
        [unit]="stat.unit"
        [loading]="stat.loading"
        [noData]="stat.noData"
        lastRefresh="updated"
      ></app-stat-card>
    </div>

    <div class="section-grid overview-grid">
      <div class="span-8">
        <app-panel-container title="CPU globale" subtitle="Consommation totale observee sur la periode selectionnee.">
          <app-time-series-chart [series]="cpuSeries" unit="CPU"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-4">
        <app-panel-container title="Sante des sources" subtitle="Etat backend, PostgreSQL, Mimir et Loki">
          <div class="health-list">
            <div *ngFor="let item of health" class="health-row">
              <div class="health-head">
                <span>{{ item.component }}</span>
                <app-health-badge [status]="item.status"></app-health-badge>
              </div>
              <div class="muted">{{ item.message }}</div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Memoire globale" subtitle="Volume total observe via working set.">
          <app-time-series-chart [series]="memorySeries" unit="B"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Volume de logs" subtitle="Nombre d'entrees recuperees dans la periode active.">
          <app-time-series-chart [series]="logVolumeSeries"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Derniers logs" [subtitle]="'Periode active : ' + selectedRangeLabel">
          <div class="logs-toolbar">
            <div class="logs-summary">
              <div class="mini-stat">
                <span>Streams</span>
                <strong>{{ visibleStreamsCount }}</strong>
              </div>
              <div class="mini-stat">
                <span>Entrees</span>
                <strong>{{ visibleEntriesCount }}</strong>
              </div>
              <div class="mini-stat">
                <span>Filtre actif</span>
                <strong>{{ selectedLogFilterLabel }}</strong>
              </div>
            </div>

            <div class="filter-toolbar">
              <div class="meta-label">Filtrer les resultats</div>
              <div class="filter-actions">
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip"
                  [class.filter-chip-active]="selectedLogFilter === 'ALL'"
                  (click)="setLogFilter('ALL')"
                >
                  Tout
                </button>
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip filter-warn"
                  [class.filter-chip-active]="selectedLogFilter === 'WARN'"
                  (click)="setLogFilter('WARN')"
                >
                  Warnings
                </button>
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip filter-error"
                  [class.filter-chip-active]="selectedLogFilter === 'ERROR'"
                  (click)="setLogFilter('ERROR')"
                >
                  Erreurs
                </button>
              </div>
            </div>
          </div>

          <div class="logs-frame">
            <app-logs-viewer [streams]="filteredRecentLogs"></app-logs-viewer>
          </div>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: [`
    .overview-grid {
      margin-top: 1rem;
      align-items: start;
    }
    .health-list {
      display: grid;
      gap: 0.85rem;
    }
    .health-row {
      display: grid;
      gap: 0.3rem;
    }
    .health-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .logs-toolbar {
      display: grid;
      gap: 0.9rem;
    }
    .logs-summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .mini-stat {
      display: grid;
      gap: 0.2rem;
      padding: 0.85rem 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
      min-width: 0;
    }
    .mini-stat span {
      color: var(--text-secondary);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .mini-stat strong {
      font-size: 1rem;
      font-weight: 700;
    }
    .meta-label {
      color: var(--text-secondary);
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .filter-toolbar {
      display: grid;
      gap: 0.55rem;
    }
    .filter-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
    }
    .filter-chip {
      min-height: 36px;
      border-radius: 999px;
      font-size: 0.82rem;
    }
    .filter-chip-active {
      border-color: rgba(124, 140, 255, 0.6) !important;
      background: rgba(124, 140, 255, 0.14) !important;
    }
    .filter-warn.filter-chip-active {
      border-color: rgba(255, 180, 84, 0.56) !important;
      background: rgba(255, 180, 84, 0.12) !important;
    }
    .filter-error.filter-chip-active {
      border-color: rgba(255, 107, 107, 0.56) !important;
      background: rgba(255, 107, 107, 0.12) !important;
    }
    .logs-frame {
      min-width: 0;
      padding: 0.35rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(5, 10, 18, 0.35);
    }
    @media (max-width: 960px) {
      .logs-summary {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {
  protected lastRefresh = new Date();
  protected health: HealthStatusResponse[] = [];
  protected cpuSeries: MetricSeries[] = [];
  protected memorySeries: MetricSeries[] = [];
  protected logVolumeSeries: MetricSeries[] = [];
  protected recentLogs: LogStream[] = [];
  protected selectedLogFilter: OverviewLogFilter = 'ALL';
  protected stats: StatView[] = [
    { title: 'Clusters detectes', description: 'Approximation via le label cluster expose.', unit: 'clusters', value: '-', loading: true, noData: false },
    { title: 'Nodes', description: 'Nombre de noeuds visibles dans le cluster.', unit: 'nodes', value: '-', loading: true, noData: false },
    { title: 'Pods running', description: 'Pods actuellement en phase Running.', unit: 'pods', value: '-', loading: true, noData: false },
    { title: 'CPU totale', description: 'Consommation totale des containers sur la periode.', unit: 'CPU', value: '-', loading: true, noData: false },
    { title: 'Memoire totale', description: 'Working set total des containers.', unit: 'GiB', value: '-', loading: true, noData: false },
    { title: 'Logs recents', description: "Nombre d'entrees observees dans Loki.", unit: 'logs', value: '-', loading: true, noData: false }
  ];

  constructor(
    private readonly monitoringService: MonitoringService,
    private readonly healthService: HealthService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  protected setLogFilter(filter: OverviewLogFilter): void {
    this.selectedLogFilter = filter;
    this.cdr.markForCheck();
  }

  protected get filteredRecentLogs(): LogStream[] {
    if (this.selectedLogFilter === 'ALL') {
      return this.recentLogs;
    }

    return this.recentLogs
      .map((stream) => ({
        ...stream,
        entries: stream.entries.filter((entry) => this.matchesLogFilter(entry))
      }))
      .filter((stream) => stream.entries.length > 0);
  }

  protected get visibleStreamsCount(): number {
    return this.filteredRecentLogs.length;
  }

  protected get visibleEntriesCount(): number {
    return this.filteredRecentLogs.reduce((total, stream) => total + stream.entries.length, 0);
  }

  protected get selectedLogFilterLabel(): string {
    switch (this.selectedLogFilter) {
      case 'WARN':
        return 'Warnings';
      case 'ERROR':
        return 'Erreurs';
      default:
        return 'Tout';
    }
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
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
      cpuStat: this.monitoringService.queryMetrics({ query: 'sum(rate(container_cpu_usage_seconds_total[5m]))' }).pipe(catchError(() => of(null))),
      memoryStat: this.monitoringService.queryMetrics({ query: 'sum(container_memory_working_set_bytes)' }).pipe(catchError(() => of(null))),
      cpuSeries: this.monitoringService.queryMetricsRange({ query: 'sum(rate(container_cpu_usage_seconds_total[5m]))', ...rangePayload }).pipe(catchError(() => of(null))),
      memorySeries: this.monitoringService.queryMetricsRange({ query: 'sum(container_memory_working_set_bytes)', ...rangePayload }).pipe(catchError(() => of(null))),
      recentLogs: this.monitoringService.queryLogsRange({ query: '{job=~".+"}', limit: 80, direction: 'BACKWARD', ...rangePayload }).pipe(catchError(() => of(null)))
    }).subscribe((result) => {
      this.lastRefresh = new Date();
      this.health = result.health.components;
      this.cpuSeries = result.cpuSeries?.series ?? [];
      this.memorySeries = result.memorySeries?.series ?? [];
      this.recentLogs = result.recentLogs?.streams ?? [];
      this.logVolumeSeries = this.logsToSeries(result.recentLogs, start.getTime(), end.getTime());

      this.applyStat(0, result.clusters, (value) => this.formatInteger(value));
      this.applyStat(1, result.nodes, (value) => this.formatInteger(value));
      this.applyStat(2, result.podsRunning, (value) => this.formatInteger(value));
      this.applyStat(3, result.cpuStat, (value) => this.formatDecimal(value, 2));
      this.applyStat(4, result.memoryStat, (value) => this.formatBytesToGiB(value));

      this.stats[5].loading = false;
      this.stats[5].value = this.formatInteger(this.recentLogs.reduce((acc, stream) => acc + stream.entries.length, 0));
      this.stats[5].noData = !this.recentLogs.length;

      this.cdr.markForCheck();
    });
  }

  private applyStat(index: number, response: MetricsResponse | null, formatter: (value: number) => string): void {
    const card = this.stats[index];
    card.loading = false;
    card.noData = false;

    const point = response?.series?.[0]?.points?.at(-1);
    if (point?.value == null) {
      card.noData = true;
      card.value = '-';
      return;
    }

    card.value = formatter(point.value);
  }

  private logsToSeries(response: LogsResponse | null, startTimestamp: number, endTimestamp: number): MetricSeries[] {
    if (!response?.streams?.length) {
      return [];
    }

    const total = response.streams.reduce((acc, stream) => acc + stream.entries.length, 0);

    return [{
      name: 'logs',
      labels: { source: 'loki' },
      points: [
        { timestamp: startTimestamp, value: 0 },
        { timestamp: endTimestamp, value: total }
      ]
    }];
  }

  private matchesLogFilter(entry: LogEntry): boolean {
    return (entry.level || 'INFO').toUpperCase() === this.selectedLogFilter;
  }

  private formatInteger(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
  }

  private formatDecimal(value: number, maximumFractionDigits: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits }).format(value);
  }

  private formatBytesToGiB(value: number): string {
    const gib = value / (1024 ** 3);
    return this.formatDecimal(gib, 2);
  }
}
