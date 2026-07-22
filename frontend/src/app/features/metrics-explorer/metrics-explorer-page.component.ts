import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
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

interface QueryExample {
  label: string;
  query: string;
}

@Component({
  selector: 'app-metrics-explorer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
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
        <div class="page-subtitle">Executer une requete PromQL, lire les series rapidement et verifier le JSON brut sans quitter la page.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete PromQL" subtitle="Les appels passent uniquement par le backend Spring Boot.">
          <app-query-editor [value]="query" label="PromQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta">
            <div class="query-block">
              <div class="meta-label">Exemples</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip" *ngFor="let example of examples" (click)="applyExample(example.query)">
                  {{ example.label }}
                </button>
              </div>
            </div>

            <div class="query-block" *ngIf="history.length">
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
          description="Choisis une requete PromQL puis lance Executer pour afficher le graphique, les series et le tableau."
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
          <div class="span-8">
            <app-panel-container title="Visualisation" [subtitle]="'Periode active : ' + selectedRangeLabel">
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
                  <span>Requete</span>
                  <strong>{{ currentResponse.resultType }}</strong>
                </div>
              </div>

              <app-time-series-chart [series]="currentResponse.series"></app-time-series-chart>
            </app-panel-container>
          </div>

          <div class="span-4">
            <app-panel-container title="Resume des series" subtitle="Lecture rapide des premieres courbes.">
              <div class="series-list">
                <div class="series-card" *ngFor="let series of currentResponse.series.slice(0, 8)">
                  <div class="series-head">
                    <strong>{{ displayName(series) }}</strong>
                    <span>{{ series.points.length }} pts</span>
                  </div>
                  <div class="series-value">{{ lastValue(series) }}</div>
                  <div class="series-labels">{{ labelsSummary(series.labels) }}</div>
                </div>
              </div>
            </app-panel-container>
          </div>

          <div class="span-12">
            <app-panel-container title="Tableau des resultats" subtitle="Derniere valeur, nombre de points et labels associes.">
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Serie</th>
                      <th>Derniere valeur</th>
                      <th>Points</th>
                      <th>Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let series of currentResponse.series">
                      <td class="series-name">{{ displayName(series) }}</td>
                      <td class="monospace">{{ lastValue(series) }}</td>
                      <td>{{ series.points.length }}</td>
                      <td class="labels-cell">{{ labelsSummary(series.labels) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </app-panel-container>
          </div>

          <div class="span-12">
            <app-panel-container title="JSON brut" subtitle="Pratique pour verifier la normalisation retour backend.">
              <details class="raw-panel">
                <summary>Afficher la reponse JSON</summary>
                <pre class="monospace raw-json">{{ currentResponse | json }}</pre>
              </details>
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
    .stat-strip {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .mini-stat {
      display: grid;
      gap: 0.2rem;
      padding: 0.8rem 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
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
    .series-list {
      display: grid;
      gap: 0.75rem;
    }
    .series-card {
      display: grid;
      gap: 0.35rem;
      padding: 0.85rem 0.95rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .series-head {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.82rem;
    }
    .series-head strong {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .series-head span {
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .series-value {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.2;
    }
    .series-labels {
      color: var(--text-secondary);
      font-size: 0.78rem;
      line-height: 1.45;
      word-break: break-word;
    }
    .table-wrapper {
      overflow: auto;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 760px;
    }
    th,
    td {
      padding: 0.78rem 0.9rem;
      text-align: left;
      border-bottom: 1px solid var(--border-soft);
      font-size: 0.85rem;
      vertical-align: top;
    }
    th {
      color: var(--text-secondary);
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: rgba(255, 255, 255, 0.03);
    }
    .series-name {
      font-weight: 600;
    }
    .labels-cell {
      color: var(--text-secondary);
      max-width: 520px;
      word-break: break-word;
    }
    .raw-panel {
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(8, 14, 25, 0.48);
      overflow: hidden;
    }
    .raw-panel summary {
      cursor: pointer;
      padding: 0.85rem 1rem;
      font-weight: 600;
      list-style: none;
    }
    .raw-panel summary::-webkit-details-marker {
      display: none;
    }
    .raw-json {
      margin: 0;
      padding: 0 1rem 1rem;
      font-size: 0.76rem;
      line-height: 1.5;
      overflow: auto;
    }
    @media (max-width: 960px) {
      .stat-strip {
        grid-template-columns: 1fr;
      }
      table {
        min-width: 640px;
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
  protected readonly examples: QueryExample[] = [
    { label: 'CPU pods', query: 'sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)' },
    { label: 'Memoire pods', query: 'sum(container_memory_working_set_bytes) by (pod)' },
    { label: 'Nodes ready', query: 'sum(kube_node_status_condition{condition="Ready",status="true"})' }
  ];

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

  protected labelsSummary(labels: Record<string, string>): string {
    const entries = Object.entries(labels);
    return entries.length
      ? entries.map(([key, value]) => `${key}=${value}`).join(', ')
      : 'Aucun label';
  }

  protected lastValue(series: MetricSeries): string {
    const value = [...series.points].reverse().find((point) => point.value !== null)?.value;
    return value == null ? '-' : this.formatNumber(value);
  }

  protected get totalPoints(): number {
    return (this.response?.series ?? []).reduce((total, series) => total + series.points.length, 0);
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
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
