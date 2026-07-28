import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { MetricSeries, MetricsResponse } from '../../core/models/monitoring.model';
import { TimeRangeService } from '../../core/services/time-range.service';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';

@Component({
  selector: 'app-metrics-explorer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    PanelContainerComponent,
    QueryEditorComponent,
    TimeSeriesChartComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Metrics Explorer</h1>
        <div class="page-subtitle">Lecture PromQL concentree sur le graphe, les indicateurs clefs et un apercu propre des series.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete PromQL" subtitle="Les appels passent uniquement par le backend Spring Boot.">
          <app-query-editor [value]="query" label="PromQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta" *ngIf="history.length">
            <div class="query-block">
              <div class="meta-label">Historique</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip history-chip" *ngFor="let item of history" (click)="applyExample(item)">
                  {{ item }}
                </button>
              </div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="loading">
        <app-panel-container title="Execution en cours" subtitle="Le resultat arrivera ici des la premiere reponse.">
          <app-loading-skeleton [rows]="6"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="!loading && errorMessage">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="!loading && !errorMessage && !response">
        <app-empty-state
          title="Aucune requete executee."
          description="Choisis une requete PromQL puis lance Executer pour afficher une visualisation claire des series."
        ></app-empty-state>
      </div>

      <ng-container *ngIf="!loading && !errorMessage && response as currentResponse">
        <div class="span-12" *ngIf="!currentResponse.series.length">
          <app-empty-state
            title="Aucune donnee recue pour cette periode."
            description="La requete a bien ete envoyee, mais Mimir n'a retourne aucune serie exploitable."
          ></app-empty-state>
        </div>

        <ng-container *ngIf="currentResponse.series.length">
          <div class="span-12">
            <app-panel-container title="Visualisation" [subtitle]="'Periode active : ' + selectedRangeLabel">
              <div class="visualization-layout">
                <div class="stat-strip">
                  <div class="mini-stat">
                    <span>Series</span>
                    <strong>{{ currentResponse.series.length }}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Points</span>
                    <strong>{{ totalPoints }}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Unite</span>
                    <strong>{{ inferredUnitLabel }}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Derniere requete</span>
                    <strong class="query-preview">{{ query }}</strong>
                  </div>
                </div>

                <div class="chart-frame">
                  <app-time-series-chart [series]="currentResponse.series" [palette]="seriesPalette" [unit]="chartUnit"></app-time-series-chart>
                </div>

                <section class="visualization-sidebar">
                  <div class="sidebar-header">
                    <div>
                      <div class="sidebar-title">Series principales</div>
                      <div class="sidebar-subtitle">Lecture rapide des courbes les plus visibles.</div>
                    </div>
                    <div class="chip">{{ visibleSeriesCount }} affichees</div>
                  </div>

                  <div class="series-overview">
                    <article class="series-overview-card" *ngFor="let series of visibleSeries">
                      <div class="series-overview-head">
                        <div class="series-name-row">
                          <span class="series-swatch" [style.background]="seriesColor(series)"></span>
                          <strong>{{ displayName(series) }}</strong>
                        </div>
                        <span>{{ series.points.length }} pts</span>
                      </div>

                      <div class="series-metrics">
                        <div>
                          <span>Derniere valeur</span>
                          <strong>{{ lastValue(series) }}</strong>
                        </div>
                        <div>
                          <span>Label cle</span>
                          <strong>{{ primaryLabel(series.labels) }}</strong>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div class="series-footnote" *ngIf="currentResponse.series.length > visibleSeriesCount">
                    + {{ currentResponse.series.length - visibleSeriesCount }} autres series restent visibles dans le graphe.
                  </div>
                </section>
              </div>
            </app-panel-container>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    .explorer-grid { align-items: start; }
    .query-meta { display: grid; gap: 0.85rem; }
    .query-block { display: grid; gap: 0.45rem; }
    .meta-label {
      color: var(--text-secondary);
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
    }
    .query-chip {
      min-height: 34px;
      border-radius: 999px;
      font-size: 0.78rem;
      line-height: 1.15;
    }
    .history-chip {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .visualization-layout {
      display: grid;
      gap: 1rem;
      align-items: start;
    }
    .visualization-sidebar {
      display: grid;
      gap: 0.9rem;
      min-width: 0;
      padding: 0.95rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
        rgba(8, 14, 25, 0.42);
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      align-items: flex-start;
    }
    .sidebar-title {
      font-size: 0.98rem;
      font-weight: 700;
    }
    .sidebar-subtitle {
      margin-top: 0.2rem;
      color: var(--text-secondary);
      font-size: 0.8rem;
      line-height: 1.45;
    }
    .stat-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
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
    .query-preview {
      display: block;
      font-size: 0.9rem;
      line-height: 1.35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chart-frame {
      min-width: 0;
      padding: 0.35rem 0.35rem 0.15rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(5, 10, 18, 0.35);
    }
    .series-overview {
      display: grid;
      gap: 0.75rem;
    }
    .series-overview-card {
      display: grid;
      gap: 0.7rem;
      padding: 0.85rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .series-overview-head {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.82rem;
      align-items: center;
    }
    .series-overview-head strong,
    .series-overview-head span {
      min-width: 0;
    }
    .series-overview-head span {
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .series-name-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      min-width: 0;
    }
    .series-name-row strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .series-swatch {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      flex: 0 0 auto;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.04);
    }
    .series-metrics {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.7rem;
    }
    .series-metrics div {
      display: grid;
      gap: 0.22rem;
      min-width: 0;
    }
    .series-metrics span {
      color: var(--text-secondary);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .series-metrics strong {
      font-size: 0.92rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .series-footnote {
      color: var(--text-secondary);
      font-size: 0.8rem;
      line-height: 1.45;
    }
    @media (max-width: 1180px) {
      .stat-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 720px) {
      .stat-strip,
      .series-metrics {
        grid-template-columns: 1fr;
      }
      .sidebar-header,
      .series-overview-head {
        display: grid;
      }
      .query-preview {
        white-space: normal;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsExplorerPageComponent {
  protected query = 'sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)';
  protected response: MetricsResponse | null = null;
  protected history: string[] = this.readHistory();
  protected loading = false;
  protected errorMessage = '';
  protected errorDetails = '';
  protected readonly seriesPalette = ['#7c8cff', '#4cc9f0', '#7bd88f', '#ffb454', '#ff6b6b', '#c792ea', '#5eead4', '#f472b6'];

  private lastExecutedQuery = this.query;

  constructor(
    private readonly monitoringService: MonitoringService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  protected run(query: string): void {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      this.response = null;
      this.errorMessage = 'La requete PromQL est vide.';
      this.errorDetails = '';
      this.cdr.markForCheck();
      return;
    }

    const end = new Date();
    const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);

    this.query = trimmedQuery;
    this.lastExecutedQuery = trimmedQuery;
    this.loading = true;
    this.errorMessage = '';
    this.errorDetails = '';
    this.response = null;
    this.cdr.markForCheck();

    this.monitoringService
      .queryMetricsRange({
        query: trimmedQuery,
        start: start.toISOString(),
        end: end.toISOString(),
        step: '60'
      })
      .subscribe({
        next: (response) => {
          this.response = response;
          this.persistHistory(trimmedQuery);
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (error: unknown) => {
          this.loading = false;
          this.response = null;
          this.errorMessage = this.extractErrorMessage(error);
          this.errorDetails = this.extractErrorDetails(error);
          this.cdr.markForCheck();
        }
      });
  }

  protected retry(): void {
    this.run(this.lastExecutedQuery);
  }

  protected applyExample(query: string): void {
    this.query = query;
    this.cdr.markForCheck();
  }

  protected copy(query: string): void {
    void navigator.clipboard.writeText(query);
  }

  protected displayName(series: MetricSeries): string {
    return series.name || series.labels['pod'] || series.labels['node'] || series.labels['instance'] || 'Serie sans nom';
  }

  protected lastValue(series: MetricSeries): string {
    const value = [...series.points].reverse().find((point) => point.value !== null)?.value;
    return value == null ? '-' : this.formatValueWithUnit(value);
  }

  protected primaryLabel(labels: Record<string, string>): string {
    const preferredKeys = ['pod', 'node', 'instance', 'job', 'namespace'];
    const key = preferredKeys.find((entry) => labels[entry]) ?? Object.keys(labels)[0];

    return key ? `${key}=${labels[key]}` : 'Aucun label';
  }

  protected seriesColor(series: MetricSeries): string {
    const index = this.visibleSeries.findIndex((item) => item === series);
    return this.seriesPalette[(index === -1 ? 0 : index) % this.seriesPalette.length];
  }

  protected get visibleSeries(): MetricSeries[] {
    return (this.response?.series ?? []).slice(0, 6);
  }

  protected get visibleSeriesCount(): number {
    return this.visibleSeries.length;
  }

  protected get totalPoints(): number {
    return (this.response?.series ?? []).reduce((total, series) => total + series.points.length, 0);
  }

  protected get inferredUnitLabel(): string {
    return this.resolveMetricUnit().label;
  }

  protected get chartUnit(): string {
    return this.resolveMetricUnit().chartUnit;
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
  }

  private formatValueWithUnit(value: number): string {
    const unit = this.resolveMetricUnit();

    switch (unit.kind) {
      case 'bytes':
        return this.formatBytes(value);
      case 'cpu':
        return `${this.formatNumber(value)} ${unit.label}`;
      case 'percent':
        return `${this.formatNumber(value)} ${unit.label}`;
      case 'seconds':
        return `${this.formatNumber(value)} ${unit.label}`;
      case 'count':
        return `${this.formatInteger(value)} ${unit.label}`;
      default:
        return unit.label === 'valeur' ? this.formatNumber(value) : `${this.formatNumber(value)} ${unit.label}`;
    }
  }

  private formatBytes(value: number): string {
    const gib = value / (1024 ** 3);
    if (gib >= 1) {
      return `${this.formatNumber(gib)} GiB`;
    }

    const mib = value / (1024 ** 2);
    if (mib >= 1) {
      return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(mib)} MiB`;
    }

    const kib = value / 1024;
    if (kib >= 1) {
      return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(kib)} KiB`;
    }

    return `${this.formatInteger(value)} B`;
  }

  private formatInteger(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
  }

  private resolveMetricUnit(): { kind: 'bytes' | 'cpu' | 'percent' | 'seconds' | 'count' | 'generic'; label: string; chartUnit: string } {
    const normalizedQuery = this.query.toLowerCase();

    if (normalizedQuery.includes('_bytes') || normalizedQuery.includes('memory_') || normalizedQuery.includes('working_set')) {
      return { kind: 'bytes', label: 'GiB', chartUnit: 'B' };
    }

    if (normalizedQuery.includes('container_cpu_usage_seconds_total') || normalizedQuery.includes('rate(') && normalizedQuery.includes('cpu')) {
      return { kind: 'cpu', label: 'CPU', chartUnit: 'CPU' };
    }

    if (normalizedQuery.includes('%') || normalizedQuery.includes(' 100 *') || normalizedQuery.startsWith('100 *') || normalizedQuery.includes('percentage')) {
      return { kind: 'percent', label: '%', chartUnit: '%' };
    }

    if (normalizedQuery.includes('_seconds') || normalizedQuery.includes('duration')) {
      return { kind: 'seconds', label: 's', chartUnit: 's' };
    }

    if (
      normalizedQuery.includes('count(') ||
      normalizedQuery.includes('sum(') ||
      normalizedQuery.includes('kube_node_info') ||
      normalizedQuery.includes('kube_pod_status_phase')
    ) {
      return { kind: 'count', label: 'items', chartUnit: '' };
    }

    return { kind: 'generic', label: 'valeur', chartUnit: '' };
  }

  private persistHistory(query: string): void {
    this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
    localStorage.setItem('metrics-history', JSON.stringify(this.history));
  }

  private readHistory(): string[] {
    const value = localStorage.getItem('metrics-history');
    return value ? (JSON.parse(value) as string[]) : [];
  }

  private extractErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const errorValue = (error as { error?: { message?: string } }).error;
      if (errorValue?.message) {
        return errorValue.message;
      }
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as { message?: string }).message ?? 'Impossible de recuperer les metriques.');
    }

    return 'Impossible de recuperer les metriques.';
  }

  private extractErrorDetails(error: unknown): string {
    try {
      return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    } catch {
      return '';
    }
  }
}
