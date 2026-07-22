import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { LogsResponse } from '../../core/models/monitoring.model';
import { TimeRangeService } from '../../core/services/time-range.service';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';

interface LogQueryExample {
  label: string;
  query: string;
}

@Component({
  selector: 'app-logs-explorer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
    MatButtonModule,
    PanelContainerComponent,
    QueryEditorComponent,
    LogsViewerComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Logs Explorer</h1>
        <div class="page-subtitle">Lecture LogQL compacte avec historique, synthese des streams et bloc JSON repliable.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete LogQL" subtitle="Le navigateur ne contacte jamais Loki directement.">
          <app-query-editor [value]="query" label="LogQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

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
        <app-panel-container title="Chargement des logs" subtitle="Le premier clic doit suffire pour afficher le resultat.">
          <app-loading-skeleton [rows]="8"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="!loading && errorMessage">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="!loading && !errorMessage && !response">
        <app-empty-state
          title="Aucune requete executee."
          description="Lance une requete LogQL pour afficher les streams, les labels et les messages de logs."
        ></app-empty-state>
      </div>

      <ng-container *ngIf="!loading && !errorMessage && response as currentResponse">
        <div class="span-12" *ngIf="!currentResponse.streams.length">
          <app-empty-state
            title="Aucune donnee recue pour cette periode."
            description="Loki a repondu mais n'a retourne aucun stream pour cette requete."
          ></app-empty-state>
        </div>

        <ng-container *ngIf="currentResponse.streams.length">
          <div class="span-4">
            <app-panel-container title="Synthese" [subtitle]="'Periode active : ' + selectedRangeLabel">
              <div class="stat-list">
                <div class="stat-card">
                  <span>Streams</span>
                  <strong>{{ currentResponse.streams.length }}</strong>
                </div>
                <div class="stat-card">
                  <span>Entrees</span>
                  <strong>{{ totalEntries }}</strong>
                </div>
                <div class="stat-card">
                  <span>Historique</span>
                  <strong>{{ history.length }}</strong>
                </div>
              </div>

              <div class="stream-resume">
                <div class="stream-chip" *ngFor="let stream of currentResponse.streams.slice(0, 10)">
                  {{ labelsSummary(stream.labels) }}
                </div>
              </div>
            </app-panel-container>
          </div>

          <div class="span-8">
            <app-panel-container title="Flux de logs" subtitle="Vue compacte optimisee pour lire rapidement.">
              <app-logs-viewer [streams]="currentResponse.streams"></app-logs-viewer>
            </app-panel-container>
          </div>

          <div class="span-12">
            <app-panel-container title="JSON brut" subtitle="Affichage technique de la reponse normalisee.">
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
    .stat-list {
      display: grid;
      gap: 0.75rem;
    }
    .stat-card {
      display: grid;
      gap: 0.2rem;
      padding: 0.8rem 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .stat-card span {
      color: var(--text-secondary);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .stat-card strong {
      font-size: 1.05rem;
      font-weight: 700;
    }
    .stream-resume {
      display: grid;
      gap: 0.55rem;
    }
    .stream-chip {
      padding: 0.72rem 0.82rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      font-size: 0.78rem;
      line-height: 1.45;
      background: rgba(255, 255, 255, 0.03);
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsExplorerPageComponent {
  protected query = '{job=~".+"}';
  protected response: LogsResponse | null = null;
  protected history: string[] = this.readHistory();
  protected loading = false;
  protected errorMessage = '';
  protected errorDetails = '';
  protected readonly examples: LogQueryExample[] = [
    { label: 'Tous les jobs', query: '{job=~".+"}' },
    { label: 'Erreurs', query: '{job=~".+"} |= "ERROR"' },
    { label: 'Warnings', query: '{job=~".+"} |= "WARN"' }
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
      this.errorMessage = 'La requete LogQL est vide.';
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
      .queryLogsRange({
        query: trimmedQuery,
        start: start.toISOString(),
        end: end.toISOString(),
        step: '60',
        limit: 200,
        direction: 'BACKWARD'
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

  protected labelsSummary(labels: Record<string, string>): string {
    const entries = Object.entries(labels);
    return entries.length
      ? entries.map(([key, value]) => `${key}=${value}`).join(', ')
      : 'Aucun label';
  }

  protected get totalEntries(): number {
    return (this.response?.streams ?? []).reduce((total, stream) => total + stream.entries.length, 0);
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
  }

  private persistHistory(query: string): void {
    this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
    localStorage.setItem('logs-history', JSON.stringify(this.history));
  }

  private readHistory(): string[] {
    const value = localStorage.getItem('logs-history');
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
      return String((error as { message?: string }).message ?? 'Impossible de recuperer les logs.');
    }

    return 'Impossible de recuperer les logs.';
  }

  private extractErrorDetails(error: unknown): string {
    try {
      return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    } catch {
      return '';
    }
  }
}
