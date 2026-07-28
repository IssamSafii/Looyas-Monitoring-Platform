import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import { MetricSeries } from '../../core/models/monitoring.model';
import { OciHealthResponse, OciMetricDefinition, OciMetricsQueryResponse, OciMetricSeries } from '../../core/models/oci.model';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

type ViewState = 'idle' | 'loading' | 'ready' | 'empty' | 'error' | 'not-configured';

@Component({
  selector: 'app-oci-metrics-explorer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    JsonPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PanelContainerComponent,
    QueryEditorComponent,
    TimeSeriesChartComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    HealthBadgeComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Metrics Explorer</h1>
        <div class="page-subtitle">Exploration MQL via le backend Spring Boot, avec definitions, graphe, tableau et export.</div>
      </div>
      <button mat-stroked-button type="button" (click)="reloadCatalog()">Actualiser</button>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Contexte OCI" subtitle="Namespace, compartment et options de lecture.">
          <div class="toolbar-grid">
            <div class="status-chip-row">
              <span class="muted">Statut</span>
              <app-health-badge [status]="healthBadgeStatus"></app-health-badge>
              <span class="muted">{{ healthMessage }}</span>
            </div>

            <form [formGroup]="contextForm" class="context-grid">
              <mat-form-field>
                <mat-label>Compartment ID</mat-label>
                <input matInput formControlName="compartmentId" placeholder="Optionnel, sinon valeur backend">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Namespace</mat-label>
                <mat-select formControlName="namespace" (valueChange)="onNamespaceChange($event)">
                  <mat-option *ngFor="let namespace of namespaces" [value]="namespace">{{ namespace }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-checkbox formControlName="includeSubcompartments">Inclure les sous-compartments</mat-checkbox>
            </form>
          </div>
        </app-panel-container>
      </div>

      <div class="span-8">
        <app-panel-container title="Requete OCI MQL" subtitle="Si la zone est vide, les exemples ci-dessous peuvent etre reappliques en un clic.">
          <app-query-editor [value]="query" label="OCI MQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta">
            <div class="query-block">
              <div class="meta-label">Exemples</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip" *ngFor="let example of examples" (click)="applyQuery(example)">
                  {{ example }}
                </button>
              </div>
            </div>

            <div class="query-block" *ngIf="history.length">
              <div class="meta-label">Historique local</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip" *ngFor="let item of history" (click)="applyQuery(item)">
                  {{ item }}
                </button>
              </div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-4">
        <app-panel-container title="Metriques disponibles" subtitle="Definitions remontees par OCI pour le namespace actif.">
          <ng-container [ngSwitch]="catalogState">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="6"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune definition" description="Aucune metrique n'est disponible pour ce namespace."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="catalogErrorMessage" [details]="catalogErrorDetails" (retry)="reloadCatalog()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="definition-list">
              <article *ngFor="let definition of visibleDefinitions" class="definition-card">
                <strong>{{ definition.name }}</strong>
                <div class="muted">{{ definition.dimensions.join(', ') || 'Aucune dimension' }}</div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="resultState === 'loading'">
        <app-panel-container title="Execution en cours" subtitle="OCI Monitoring est interroge via le backend.">
          <app-loading-skeleton [rows]="7"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="resultState === 'not-configured'">
        <app-empty-state title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
      </div>

      <div class="span-12" *ngIf="resultState === 'error'">
        <app-error-state [message]="resultErrorMessage" [details]="resultErrorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="resultState === 'empty'">
        <app-empty-state title="Aucune donnee OCI" description="La requete MQL a repondu, mais sans serie exploitable pour la periode active."></app-empty-state>
      </div>

      <ng-container *ngIf="resultState === 'ready' && response as currentResponse">
        <div class="span-12">
          <app-panel-container title="Visualisation OCI" [subtitle]="'Periode active : ' + selectedRangeLabel">
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
                <span>Derniere valeur</span>
                <strong>{{ globalLastValueLabel }}</strong>
              </div>
              <div class="mini-stat">
                <span>Unite</span>
                <strong>{{ unitLabel }}</strong>
              </div>
            </div>

            <div class="chart-frame">
              <app-time-series-chart [series]="chartSeries" [unit]="chartUnit"></app-time-series-chart>
            </div>

            <div class="series-grid">
              <article class="series-card" *ngFor="let series of visibleSeries">
                <div class="series-head">
                  <strong>{{ displayName(series) }}</strong>
                  <span>{{ series.points.length }} pts</span>
                </div>
                <div class="series-body">
                  <div>
                    <span>Derniere valeur</span>
                    <strong>{{ lastValue(series) }}</strong>
                  </div>
                  <div>
                    <span>Utilite</span>
                    <strong>{{ usageLabel }}</strong>
                  </div>
                  <div>
                    <span>Dimensions</span>
                    <strong>{{ primaryDimension(series) }}</strong>
                  </div>
                </div>
              </article>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Tableau des resultats" subtitle="Derniere valeur par serie et dimensions principales.">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Serie</th>
                    <th>Derniere valeur</th>
                    <th>Type</th>
                    <th>Dimensions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let series of currentResponse.series">
                    <td>{{ displayName(series) }}</td>
                    <td>{{ lastValue(series) }}</td>
                    <td>{{ usageLabel }}</td>
                    <td>{{ primaryDimension(series) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Export et JSON brut" subtitle="Le JSON reste repliable pour garder l'interface lisible.">
            <div class="action-row">
              <button mat-stroked-button type="button" (click)="exportCsv()">Exporter CSV</button>
              <button mat-stroked-button type="button" (click)="copyJson()">Copier JSON</button>
            </div>

            <details class="raw-panel">
              <summary>Afficher la reponse JSON</summary>
              <pre class="raw-json">{{ currentResponse | json }}</pre>
            </details>
          </app-panel-container>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .explorer-grid { align-items: start; }
    .toolbar-grid,
    .query-meta,
    .query-block,
    .definition-list {
      display: grid;
      gap: 0.85rem;
    }
    .status-chip-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.65rem;
    }
    .context-grid {
      display: grid;
      grid-template-columns: minmax(260px, 1fr) 260px auto;
      gap: 0.85rem;
      align-items: center;
    }
    .meta-label {
      color: var(--text-secondary);
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .chip-row,
    .action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .query-chip {
      border-radius: 999px;
      min-height: 34px;
      font-size: 0.78rem;
    }
    .definition-card,
    .series-card,
    .mini-stat {
      display: grid;
      gap: 0.25rem;
      padding: 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .stat-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .mini-stat span,
    .series-body span {
      color: var(--text-secondary);
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .chart-frame {
      min-width: 0;
      padding: 0.35rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(5, 10, 18, 0.35);
    }
    .series-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
    .series-head {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .series-body {
      display: grid;
      gap: 0.65rem;
    }
    .table-wrapper {
      overflow: auto;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.85rem 0.95rem;
      text-align: left;
      border-bottom: 1px solid var(--border-soft);
      vertical-align: top;
    }
    th {
      color: var(--text-secondary);
      font-weight: 700;
      background: rgba(255, 255, 255, 0.02);
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
    .raw-json {
      margin: 0;
      padding: 0 1rem 1rem;
      font-size: 0.76rem;
      line-height: 1.5;
      overflow: auto;
    }
    @media (max-width: 1080px) {
      .context-grid,
      .stat-strip,
      .series-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OciMetricsExplorerPageComponent implements OnInit {
  protected readonly examples = [
    'CpuUtilization[1m].mean()',
    'MemoryUtilization[1m].mean()',
    'NetworksBytesIn[1m].mean()',
    'NetworksBytesOut[1m].mean()'
  ];

  protected readonly contextForm = this.formBuilder.nonNullable.group({
    compartmentId: [''],
    namespace: ['oci_computeagent', Validators.required],
    includeSubcompartments: [false]
  });

  protected health: OciHealthResponse | null = null;
  protected namespaces: string[] = ['oci_computeagent'];
  protected definitions: OciMetricDefinition[] = [];
  protected catalogState: ViewState = 'loading';
  protected catalogErrorMessage = '';
  protected catalogErrorDetails = '';

  protected query = 'CpuUtilization[1m].mean()';
  protected response: OciMetricsQueryResponse | null = null;
  protected resultState: ViewState = 'idle';
  protected resultErrorMessage = '';
  protected resultErrorDetails = '';
  protected history: string[] = this.readHistory();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ociService: OciService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHealth();
    this.reloadCatalog();
  }

  protected get healthBadgeStatus(): 'CONNECTED' | 'DEGRADED' | 'DISCONNECTED' | 'UNKNOWN' {
    if (this.health?.status === 'CONNECTED') {
      return 'CONNECTED';
    }
    if (this.health?.status === 'NOT_CONFIGURED') {
      return 'UNKNOWN';
    }
    return this.health ? 'DISCONNECTED' : 'UNKNOWN';
  }

  protected get healthMessage(): string {
    return this.health?.message || 'Verification OCI en attente.';
  }

  protected get visibleDefinitions(): OciMetricDefinition[] {
    return this.definitions.slice(0, 14);
  }

  protected get chartSeries(): MetricSeries[] {
    return (this.response?.series || []).map((series) => ({
      name: series.name,
      labels: series.dimensions,
      points: series.points
    }));
  }

  protected get visibleSeries(): OciMetricSeries[] {
    return (this.response?.series || []).slice(0, 6);
  }

  protected get totalPoints(): number {
    return (this.response?.series || []).reduce((sum, series) => sum + series.points.length, 0);
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
  }

  protected get usageLabel(): string {
    return this.resolveUnit().usage;
  }

  protected get unitLabel(): string {
    return this.resolveUnit().label;
  }

  protected get chartUnit(): string {
    return this.resolveUnit().chartUnit;
  }

  protected get globalLastValueLabel(): string {
    const firstValue = this.response?.series
      .map((series) => series.points.at(-1)?.value)
      .find((value) => value != null);

    return firstValue == null ? '-' : this.formatValue(firstValue);
  }

  protected reloadCatalog(): void {
    this.catalogState = 'loading';
    this.catalogErrorMessage = '';
    this.catalogErrorDetails = '';

    this.ociService.namespaces(this.contextForm.controls.compartmentId.getRawValue()).subscribe({
      next: (response) => {
        this.namespaces = response.namespaces.length ? response.namespaces : ['oci_computeagent'];
        if (!this.namespaces.includes(this.contextForm.controls.namespace.getRawValue())) {
          this.contextForm.controls.namespace.setValue(this.namespaces[0]);
        }
        this.loadDefinitions(this.contextForm.controls.namespace.getRawValue());
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        const code = this.extractErrorCode(error);
        if (code === 'OCI_NOT_CONFIGURED') {
          this.catalogState = 'not-configured';
        } else {
          this.catalogState = 'error';
          this.catalogErrorMessage = this.extractErrorMessage(error, 'Impossible de charger les namespaces OCI.');
          this.catalogErrorDetails = this.extractErrorDetails(error);
        }
        this.cdr.markForCheck();
      }
    });
  }

  protected onNamespaceChange(namespace: string): void {
    this.loadDefinitions(namespace);
  }

  protected run(query: string): void {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      this.resultState = 'error';
      this.resultErrorMessage = 'La requete OCI MQL est vide.';
      this.resultErrorDetails = '';
      this.response = null;
      this.cdr.markForCheck();
      return;
    }

    this.query = trimmedQuery;
    this.resultState = 'loading';
    this.resultErrorMessage = '';
    this.resultErrorDetails = '';
    this.response = null;
    this.cdr.markForCheck();

    const end = new Date();
    const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);

    this.ociService.queryMetrics({
      compartmentId: this.toNull(this.contextForm.controls.compartmentId.getRawValue()),
      namespace: this.contextForm.controls.namespace.getRawValue(),
      query: trimmedQuery,
      from: start.toISOString(),
      to: end.toISOString(),
      includeSubcompartments: this.contextForm.controls.includeSubcompartments.getRawValue()
    }).subscribe({
      next: (response) => {
        this.response = response;
        this.resultState = response.series.length ? 'ready' : 'empty';
        this.persistHistory(trimmedQuery);
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        const code = this.extractErrorCode(error);
        this.response = null;
        if (code === 'OCI_NOT_CONFIGURED') {
          this.resultState = 'not-configured';
        } else {
          this.resultState = 'error';
          this.resultErrorMessage = this.extractErrorMessage(error, 'Impossible de recuperer les metriques OCI.');
          this.resultErrorDetails = this.extractErrorDetails(error);
        }
        this.cdr.markForCheck();
      }
    });
  }

  protected retry(): void {
    this.run(this.query);
  }

  protected applyQuery(query: string): void {
    this.query = query;
    this.cdr.markForCheck();
  }

  protected displayName(series: OciMetricSeries): string {
    return series.dimensions['resourceDisplayName'] || series.dimensions['displayName'] || series.name || 'Serie OCI';
  }

  protected primaryDimension(series: OciMetricSeries): string {
    const entries = Object.entries(series.dimensions);
    if (!entries.length) {
      return 'Aucune dimension';
    }
    const [key, value] = entries[0];
    return `${key}=${value}`;
  }

  protected lastValue(series: OciMetricSeries): string {
    const value = [...series.points].reverse().find((point) => point.value != null)?.value;
    return value == null ? '-' : this.formatValue(value);
  }

  protected exportCsv(): void {
    if (!this.response) {
      return;
    }

    const lines = ['series,lastValue,type,dimensions'];
    for (const series of this.response.series) {
      lines.push([
        this.escapeCsv(this.displayName(series)),
        this.escapeCsv(this.lastValue(series)),
        this.escapeCsv(this.usageLabel),
        this.escapeCsv(this.primaryDimension(series))
      ].join(','));
    }
    this.downloadFile('oci-metrics.csv', lines.join('\n'), 'text/csv;charset=utf-8');
  }

  protected copyJson(): void {
    if (this.response) {
      void navigator.clipboard.writeText(JSON.stringify(this.response, null, 2));
    }
  }

  protected copy(query: string): void {
    void navigator.clipboard.writeText(query);
  }

  private loadHealth(): void {
    this.ociService.health().subscribe({
      next: (health) => {
        this.health = health;
        this.cdr.markForCheck();
      },
      error: () => {
        this.health = null;
        this.cdr.markForCheck();
      }
    });
  }

  private loadDefinitions(namespace: string): void {
    this.catalogState = 'loading';
    this.ociService.definitions(namespace, this.contextForm.controls.compartmentId.getRawValue()).subscribe({
      next: (response) => {
        this.definitions = response.definitions;
        this.catalogState = response.definitions.length ? 'ready' : 'empty';
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        const code = this.extractErrorCode(error);
        if (code === 'OCI_NOT_CONFIGURED') {
          this.catalogState = 'not-configured';
        } else {
          this.catalogState = 'error';
          this.catalogErrorMessage = this.extractErrorMessage(error, 'Impossible de charger les definitions OCI.');
          this.catalogErrorDetails = this.extractErrorDetails(error);
        }
        this.cdr.markForCheck();
      }
    });
  }

  private resolveUnit(): { label: string; chartUnit: string; usage: string } {
    const normalizedQuery = this.query.toLowerCase();

    if (normalizedQuery.includes('cpuutilization')) {
      return { label: '% CPU', chartUnit: '%', usage: 'Consommation CPU' };
    }
    if (normalizedQuery.includes('memoryutilization')) {
      return { label: '% RAM', chartUnit: '%', usage: 'Consommation memoire' };
    }
    if (normalizedQuery.includes('bytesin') || normalizedQuery.includes('bytesout') || normalizedQuery.includes('bytes')) {
      return { label: 'GB', chartUnit: 'B', usage: 'Trafic reseau' };
    }
    if (normalizedQuery.includes('disk')) {
      return { label: 'GB', chartUnit: 'B', usage: 'E/S disque' };
    }
    return { label: 'valeur', chartUnit: '', usage: 'Valeur OCI' };
  }

  private formatValue(value: number): string {
    const unit = this.resolveUnit();
    if (unit.chartUnit === 'B') {
      return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value / (1024 ** 3))} GB`;
    }
    return unit.label === 'valeur'
      ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value)
      : `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value)} ${unit.label}`;
  }

  private persistHistory(query: string): void {
    this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
    localStorage.setItem('oci-metrics-history', JSON.stringify(this.history));
  }

  private readHistory(): string[] {
    const value = localStorage.getItem('oci-metrics-history');
    return value ? (JSON.parse(value) as string[]) : [];
  }

  private escapeCsv(value: string): string {
    return `"${value.replaceAll('"', '""')}"`;
  }

  private downloadFile(filename: string, content: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  private toNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  private extractErrorCode(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      return ((error as { error?: { code?: string } }).error?.code) || '';
    }
    return '';
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const payload = (error as { error?: { message?: string } }).error;
      if (payload?.message) {
        return payload.message;
      }
    }
    return fallback;
  }

  private extractErrorDetails(error: unknown): string {
    try {
      return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    } catch {
      return '';
    }
  }
}
