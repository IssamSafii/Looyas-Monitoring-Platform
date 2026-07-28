import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { LogEntry, LogsResponse, LogStream } from '../../core/models/monitoring.model';
import { TimeRangeService } from '../../core/services/time-range.service';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';

type LogLevelFilter = 'ALL' | 'WARN' | 'ERROR';

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
        <div class="page-subtitle">Lecture LogQL centree sur le flux, avec plus d'espace pour lire les messages sans distraction.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete LogQL" subtitle="Le navigateur ne contacte jamais Loki directement.">
          <app-query-editor [value]="query" label="LogQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

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
          description="Lance une requete LogQL pour afficher un flux de logs lisible et bien organise."
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
          <div class="span-12">
            <app-panel-container title="Flux de logs" [subtitle]="'Periode active : ' + selectedRangeLabel">
              <div class="stat-strip">
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
                  <strong>{{ selectedFilterLabel }}</strong>
                </div>
                <div class="mini-stat">
                  <span>Derniere requete</span>
                  <strong class="query-preview">{{ query }}</strong>
                </div>
              </div>

              <div class="filter-toolbar">
                <div class="meta-label">Filtrer les resultats</div>
                <div class="filter-actions">
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip"
                    [class.filter-chip-active]="selectedFilter === 'ALL'"
                    (click)="setFilter('ALL')"
                  >
                    Tout
                  </button>
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip filter-warn"
                    [class.filter-chip-active]="selectedFilter === 'WARN'"
                    (click)="setFilter('WARN')"
                  >
                    Warnings
                  </button>
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip filter-error"
                    [class.filter-chip-active]="selectedFilter === 'ERROR'"
                    (click)="setFilter('ERROR')"
                  >
                    Erreurs
                  </button>
                </div>
              </div>

              <div class="logs-frame">
                <app-logs-viewer [streams]="filteredStreams"></app-logs-viewer>
              </div>
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
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 720px) {
      .stat-strip {
        grid-template-columns: 1fr;
      }
      .query-preview {
        white-space: normal;
      }
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
  protected selectedFilter: LogLevelFilter = 'ALL';

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

  protected setFilter(filter: LogLevelFilter): void {
    this.selectedFilter = filter;
    this.cdr.markForCheck();
  }

  protected get totalEntries(): number {
    return (this.response?.streams ?? []).reduce((total, stream) => total + stream.entries.length, 0);
  }

  protected get filteredStreams(): LogStream[] {
    const streams = this.response?.streams ?? [];

    if (this.selectedFilter === 'ALL') {
      return streams;
    }

    return streams
      .map((stream) => ({
        ...stream,
        entries: stream.entries.filter((entry) => this.matchesFilter(entry))
      }))
      .filter((stream) => stream.entries.length > 0);
  }

  protected get visibleStreamsCount(): number {
    return this.filteredStreams.length;
  }

  protected get visibleEntriesCount(): number {
    return this.filteredStreams.reduce((total, stream) => total + stream.entries.length, 0);
  }

  protected get selectedFilterLabel(): string {
    switch (this.selectedFilter) {
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

  private persistHistory(query: string): void {
    this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
    localStorage.setItem('logs-history', JSON.stringify(this.history));
  }

  private readHistory(): string[] {
    const value = localStorage.getItem('logs-history');
    return value ? (JSON.parse(value) as string[]) : [];
  }

  private matchesFilter(entry: LogEntry): boolean {
    return (entry.level || 'INFO').toUpperCase() === this.selectedFilter;
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
