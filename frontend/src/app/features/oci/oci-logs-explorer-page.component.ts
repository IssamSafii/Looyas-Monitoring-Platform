import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { OciLogEntry, OciLogSearchResponse } from '../../core/models/oci.model';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

type ViewState = 'idle' | 'loading' | 'ready' | 'empty' | 'error' | 'not-configured';

@Component({
  selector: 'app-oci-logs-explorer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PanelContainerComponent,
    QueryEditorComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Logs Explorer</h1>
        <div class="page-subtitle">OCI Logging Search, filtrage local, copie rapide et export JSON ou CSV.</div>
      </div>
      <button mat-stroked-button type="button" (click)="run(query)">Actualiser</button>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Recherche OCI" subtitle="Si la requete est vide, le backend utilise automatiquement la recherche par compartment configure.">
          <form [formGroup]="filtersForm" class="filters-grid">
            <mat-form-field>
              <mat-label>Compartment ID</mat-label>
              <input matInput formControlName="compartmentId" placeholder="Optionnel">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Limite</mat-label>
              <mat-select formControlName="limit">
                <mat-option [value]="100">100</mat-option>
                <mat-option [value]="200">200</mat-option>
                <mat-option [value]="500">500</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Filtre local</mat-label>
              <input matInput formControlName="textFilter" placeholder="message, service, severity">
            </mat-form-field>
          </form>

          <app-query-editor [value]="query" label="OCI Logging Search" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta" *ngIf="history.length">
            <div class="meta-label">Historique local</div>
            <div class="chip-row">
              <button mat-stroked-button type="button" class="query-chip" *ngFor="let item of history" (click)="applyQuery(item)">
                {{ item || 'Requete par defaut backend' }}
              </button>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="state === 'loading'">
        <app-panel-container title="Chargement OCI" subtitle="Le backend interroge OCI Logging Search.">
          <app-loading-skeleton [rows]="8"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="state === 'not-configured'">
        <app-empty-state title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
      </div>

      <div class="span-12" *ngIf="state === 'error'">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="state === 'empty'">
        <app-empty-state title="Aucun log OCI" description="La recherche n'a retourne aucun log pour la periode active."></app-empty-state>
      </div>

      <ng-container *ngIf="state === 'ready' && response as currentResponse">
        <div class="span-12">
          <app-panel-container title="Flux de logs OCI" [subtitle]="'Periode active : ' + selectedRangeLabel">
            <div class="stat-strip">
              <div class="mini-stat">
                <span>Total</span>
                <strong>{{ currentResponse.count }}</strong>
              </div>
              <div class="mini-stat">
                <span>Affiches</span>
                <strong>{{ filteredLogs.length }}</strong>
              </div>
              <div class="mini-stat">
                <span>Warnings</span>
                <strong>{{ warningCount }}</strong>
              </div>
              <div class="mini-stat">
                <span>Erreurs</span>
                <strong>{{ errorCount }}</strong>
              </div>
            </div>

            <div class="action-row">
              <button mat-stroked-button type="button" (click)="exportJson()">Exporter JSON</button>
              <button mat-stroked-button type="button" (click)="exportCsv()">Exporter CSV</button>
            </div>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Service</th>
                    <th>Ressource</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let log of filteredLogs">
                    <td>{{ log.timestamp || '-' }}</td>
                    <td>{{ severity(log) }}</td>
                    <td>{{ log.service || '-' }}</td>
                    <td>{{ log.resourceName || log.resourceId || '-' }}</td>
                    <td>{{ log.message || '-' }}</td>
                    <td><button mat-stroked-button type="button" (click)="copyMessage(log)">Copier</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Details JSON" subtitle="Chaque entree peut avoir une structure OCI differente, le JSON reste accessible.">
            <details class="raw-panel" *ngFor="let log of filteredLogs.slice(0, 8)">
              <summary>{{ severity(log) }} · {{ log.resourceName || log.service || 'OCI' }}</summary>
              <pre class="raw-json">{{ log.data | json }}</pre>
            </details>
          </app-panel-container>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .explorer-grid,
    .query-meta {
      display: grid;
      gap: 0.85rem;
    }
    .filters-grid {
      display: grid;
      grid-template-columns: minmax(240px, 1fr) 180px minmax(220px, 1fr);
      gap: 0.85rem;
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
      min-height: 34px;
      border-radius: 999px;
      font-size: 0.78rem;
    }
    .stat-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .mini-stat {
      display: grid;
      gap: 0.25rem;
      padding: 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .mini-stat span {
      color: var(--text-secondary);
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
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
      margin-top: 0.75rem;
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
      .filters-grid,
      .stat-strip {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OciLogsExplorerPageComponent {
  protected readonly filtersForm = this.formBuilder.nonNullable.group({
    compartmentId: [''],
    limit: [200, Validators.required],
    textFilter: ['']
  });

  protected state: ViewState = 'idle';
  protected response: OciLogSearchResponse | null = null;
  protected errorMessage = '';
  protected errorDetails = '';
  protected query = '';
  protected history: string[] = this.readHistory();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ociService: OciService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.filtersForm.valueChanges.subscribe(() => this.cdr.markForCheck());
  }

  protected run(query: string): void {
    this.query = query;
    this.state = 'loading';
    this.response = null;
    this.errorMessage = '';
    this.errorDetails = '';
    this.cdr.markForCheck();

    const end = new Date();
    const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);

    this.ociService.searchLogs({
      searchQuery: query.trim() ? query.trim() : null,
      compartmentId: this.toNull(this.filtersForm.controls.compartmentId.getRawValue()),
      from: start.toISOString(),
      to: end.toISOString(),
      limit: this.filtersForm.controls.limit.getRawValue()
    }).subscribe({
      next: (response) => {
        this.response = response;
        this.state = response.logs.length ? 'ready' : 'empty';
        this.persistHistory(query.trim());
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.response = null;
        const code = this.extractErrorCode(error);
        if (code === 'OCI_NOT_CONFIGURED') {
          this.state = 'not-configured';
        } else {
          this.state = 'error';
          this.errorMessage = this.extractErrorMessage(error, 'Impossible de recuperer les logs OCI.');
          this.errorDetails = this.extractErrorDetails(error);
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

  protected copy(query: string): void {
    void navigator.clipboard.writeText(query);
  }

  protected copyMessage(log: OciLogEntry): void {
    void navigator.clipboard.writeText(log.message || '');
  }

  protected severity(log: OciLogEntry): string {
    return (log.severity || 'INFO').toUpperCase();
  }

  protected get filteredLogs(): OciLogEntry[] {
    const textFilter = this.filtersForm.controls.textFilter.getRawValue().trim().toLowerCase();
    return (this.response?.logs || []).filter((log) => {
      if (!textFilter) {
        return true;
      }

      return [
        log.message,
        log.service,
        log.resourceName,
        log.resourceId,
        log.severity
      ].join(' ').toLowerCase().includes(textFilter);
    });
  }

  protected get warningCount(): number {
    return this.filteredLogs.filter((log) => this.severity(log).includes('WARN')).length;
  }

  protected get errorCount(): number {
    return this.filteredLogs.filter((log) => this.severity(log).includes('ERROR')).length;
  }

  protected get selectedRangeLabel(): string {
    return this.timeRangeService.selected().label;
  }

  protected exportJson(): void {
    if (!this.response) {
      return;
    }
    this.downloadFile('oci-logs.json', JSON.stringify(this.response, null, 2), 'application/json;charset=utf-8');
  }

  protected exportCsv(): void {
    const rows = ['timestamp,severity,service,resource,message'];
    for (const log of this.filteredLogs) {
      rows.push([
        this.escapeCsv(log.timestamp || ''),
        this.escapeCsv(this.severity(log)),
        this.escapeCsv(log.service || ''),
        this.escapeCsv(log.resourceName || log.resourceId || ''),
        this.escapeCsv(log.message || '')
      ].join(','));
    }
    this.downloadFile('oci-logs.csv', rows.join('\n'), 'text/csv;charset=utf-8');
  }

  private persistHistory(query: string): void {
    this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
    localStorage.setItem('oci-logs-history', JSON.stringify(this.history));
  }

  private readHistory(): string[] {
    const value = localStorage.getItem('oci-logs-history');
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
