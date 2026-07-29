import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import {
  OciCompartment,
  OciPaginatedResponse,
  OciWorkRequest,
  OciWorkRequestError,
  OciWorkRequestLog,
  OciWorkRequestsPage
} from '../../core/models/oci.model';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

type PageState = 'loading' | 'ready' | 'empty' | 'error' | 'not-configured';
type DetailState = 'idle' | 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-oci-work-requests-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PanelContainerComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Work Requests</h1>
        <div class="page-subtitle">Lecture seule des work requests OCI communs, avec pagination backend et details repliables.</div>
      </div>
      <button mat-stroked-button type="button" (click)="reload()">Actualiser</button>
    </div>

    <div class="section-grid">
      <div class="span-12">
        <app-panel-container title="Filtres" subtitle="Compartment, statut, operation, periode et ressource avec pagination cote serveur.">
          <form [formGroup]="filtersForm" class="filters-grid" (ngSubmit)="applyFilters()">
            <mat-form-field>
              <mat-label>Compartment</mat-label>
              <mat-select formControlName="compartmentId">
                <mat-option value="">Compartment configure</mat-option>
                <mat-option *ngFor="let compartment of compartments" [value]="compartment.id">
                  {{ compartment.name }} - {{ compartment.maskedId }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Statut</mat-label>
              <mat-select formControlName="status">
                <mat-option value="">Tous</mat-option>
                <mat-option value="ACCEPTED">ACCEPTED</mat-option>
                <mat-option value="IN_PROGRESS">IN_PROGRESS</mat-option>
                <mat-option value="FAILED">FAILED</mat-option>
                <mat-option value="SUCCEEDED">SUCCEEDED</mat-option>
                <mat-option value="CANCELING">CANCELING</mat-option>
                <mat-option value="CANCELED">CANCELED</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Type d'operation</mat-label>
              <input matInput formControlName="operationType" placeholder="CREATE, UPDATE, DELETE...">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Ressource</mat-label>
              <input matInput formControlName="resource" placeholder="OCID, type ou identifiant masque">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Debut</mat-label>
              <input matInput type="datetime-local" formControlName="from">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Fin</mat-label>
              <input matInput type="datetime-local" formControlName="to">
            </mat-form-field>
          </form>

          <div class="filters-actions">
            <button mat-stroked-button type="button" (click)="applyFilters()">Appliquer</button>
            <button mat-stroked-button type="button" (click)="resetFilters()">Reinitialiser</button>
          </div>

          <div class="hint-row" *ngIf="compartmentsMessage">{{ compartmentsMessage }}</div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="pageNotice">
        <div class="notice-card" [class.notice-warn]="partialSupport">
          <strong>Note OCI</strong>
          <span>{{ pageNotice }}</span>
        </div>
      </div>

      <div class="span-12">
        <app-panel-container title="Work Requests" subtitle="Operation, ressource, statut, progression et detail sans ecriture OCI.">
          <ng-container *ngIf="state === 'loading'">
            <app-loading-skeleton [rows]="8"></app-loading-skeleton>
          </ng-container>

          <app-empty-state *ngIf="state === 'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
          <app-empty-state *ngIf="state === 'empty'" title="Aucun work request" description="Aucun work request ne correspond aux filtres actifs."></app-empty-state>
          <app-error-state *ngIf="state === 'error'" [message]="errorMessage" [details]="errorDetails" (retry)="reload()"></app-error-state>

          <div *ngIf="state === 'ready'" class="table-block">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Ressource</th>
                    <th>Statut</th>
                    <th>Termine</th>
                    <th>Debut</th>
                    <th>Fin</th>
                    <th>Erreur</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <ng-container *ngFor="let workRequest of pageData?.items || []">
                    <tr>
                      <td>
                        <strong>{{ workRequest.operationType || '-' }}</strong>
                        <div class="muted monospace">{{ workRequest.maskedId }}</div>
                      </td>
                      <td>{{ workRequest.resourceSummary || '-' }}</td>
                      <td><span class="chip">{{ workRequest.status || '-' }}</span></td>
                      <td>{{ workRequest.percentComplete == null ? '-' : (workRequest.percentComplete | number:'1.0-0') + ' %' }}</td>
                      <td>{{ (workRequest.timeStarted || workRequest.timeAccepted) | date:'short' }}</td>
                      <td>{{ workRequest.timeFinished ? (workRequest.timeFinished | date:'short') : '-' }}</td>
                      <td class="message-cell">{{ workRequest.errorMessage || workRequest.supportMessage || '-' }}</td>
                      <td>
                        <button mat-stroked-button type="button" (click)="toggleDetails(workRequest)">
                          {{ expandedWorkRequestId === workRequest.id ? 'Masquer' : 'Afficher' }}
                        </button>
                      </td>
                    </tr>

                    <tr *ngIf="expandedWorkRequestId === workRequest.id">
                      <td colspan="8" class="expanded-cell">
                        <div class="expanded-panel">
                          <app-loading-skeleton *ngIf="detailState === 'loading'" [rows]="6"></app-loading-skeleton>

                          <app-error-state *ngIf="detailState === 'error'" [message]="detailErrorMessage" [details]="detailErrorDetails" (retry)="reloadExpanded()"></app-error-state>

                          <div *ngIf="detailState === 'ready' && expandedDetails as details" class="expanded-grid">
                            <div class="detail-card">
                              <span>Work Request</span>
                              <strong class="monospace">{{ details.maskedId }}</strong>
                            </div>
                            <div class="detail-card">
                              <span>Compartment</span>
                              <strong class="monospace">{{ details.maskedCompartmentId }}</strong>
                            </div>
                            <div class="detail-card">
                              <span>API commune</span>
                              <strong>{{ details.commonApiSupported ? 'Disponible' : 'Partielle' }}</strong>
                            </div>

                            <div class="detail-section" *ngIf="details.supportMessage">
                              <div class="section-title">Compatibilite</div>
                              <div class="muted">{{ details.supportMessage }}</div>
                            </div>

                            <div class="detail-section">
                              <div class="section-title">Ressources concernees</div>
                              <div *ngIf="details.resources.length; else noResourcesTpl" class="resource-list">
                                <article *ngFor="let resource of details.resources" class="resource-card">
                                  <strong>{{ resource.entityType || 'resource' }}</strong>
                                  <span>{{ resource.actionType || '-' }}</span>
                                  <span class="monospace">{{ resource.maskedIdentifier || '-' }}</span>
                                </article>
                              </div>
                              <ng-template #noResourcesTpl>
                                <div class="muted">Aucune ressource detaillee n'a ete retournee.</div>
                              </ng-template>
                            </div>

                            <div class="detail-section">
                              <div class="section-head">
                                <div class="section-title">Erreurs</div>
                                <div class="pager-actions">
                                  <button mat-stroked-button type="button" (click)="loadExpandedErrors('prev')" [disabled]="!canGoPreviousErrors">Precedent</button>
                                  <button mat-stroked-button type="button" (click)="loadExpandedErrors('next')" [disabled]="!canGoNextErrors">Suivant</button>
                                </div>
                              </div>
                              <div class="muted" *ngIf="expandedErrors?.message">{{ expandedErrors?.message }}</div>
                              <div *ngIf="expandedErrors?.items?.length; else noErrorsTpl" class="detail-list">
                                <article *ngFor="let item of expandedErrors?.items || []" class="timeline-card">
                                  <strong>{{ item.code || 'ERROR' }}</strong>
                                  <span>{{ item.timestamp ? (item.timestamp | date:'short') : '-' }}</span>
                                  <div>{{ item.message || '-' }}</div>
                                </article>
                              </div>
                              <ng-template #noErrorsTpl>
                                <div class="muted">Aucune erreur detaillee disponible.</div>
                              </ng-template>
                            </div>

                            <div class="detail-section">
                              <div class="section-head">
                                <div class="section-title">Logs</div>
                                <div class="pager-actions">
                                  <button mat-stroked-button type="button" (click)="loadExpandedLogs('prev')" [disabled]="!canGoPreviousLogs">Precedent</button>
                                  <button mat-stroked-button type="button" (click)="loadExpandedLogs('next')" [disabled]="!canGoNextLogs">Suivant</button>
                                </div>
                              </div>
                              <div class="muted" *ngIf="expandedLogs?.message">{{ expandedLogs?.message }}</div>
                              <div *ngIf="expandedLogs?.items?.length; else noLogsTpl" class="detail-list">
                                <article *ngFor="let item of expandedLogs?.items || []" class="timeline-card">
                                  <strong>{{ item.timestamp ? (item.timestamp | date:'short') : '-' }}</strong>
                                  <div>{{ item.message || '-' }}</div>
                                </article>
                              </div>
                              <ng-template #noLogsTpl>
                                <div class="muted">Aucun log detaille disponible.</div>
                              </ng-template>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </ng-container>
                </tbody>
              </table>
            </div>

            <mat-paginator
              [pageIndex]="pageIndex"
              [pageSize]="pageSize"
              [pageSizeOptions]="pageSizeOptions"
              [length]="paginatorLength"
              (page)="onPageChange($event)">
            </mat-paginator>
          </div>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: [`
    .filters-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
    .filters-actions,
    .pager-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .hint-row,
    .notice-card {
      color: var(--text-secondary);
    }
    .notice-card {
      display: grid;
      gap: 0.3rem;
      padding: 0.95rem 1rem;
      border: 1px solid rgba(76, 201, 240, 0.2);
      border-radius: var(--radius-md);
      background: rgba(76, 201, 240, 0.06);
    }
    .notice-warn {
      border-color: rgba(255, 180, 84, 0.24);
      background: rgba(255, 180, 84, 0.08);
    }
    .table-block {
      display: grid;
      gap: 0.85rem;
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
      padding: 0.9rem 1rem;
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid var(--border-soft);
    }
    th {
      color: var(--text-secondary);
      font-weight: 700;
      background: rgba(255, 255, 255, 0.02);
    }
    .message-cell,
    .expanded-cell {
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .expanded-cell {
      padding: 0;
      background: rgba(8, 14, 25, 0.38);
    }
    .expanded-panel {
      padding: 1rem;
    }
    .expanded-grid {
      display: grid;
      gap: 0.9rem;
    }
    .detail-card,
    .resource-card,
    .timeline-card,
    .detail-section {
      display: grid;
      gap: 0.35rem;
      padding: 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .detail-card {
      grid-template-columns: 1fr;
    }
    .detail-card span,
    .section-title {
      color: var(--text-secondary);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .resource-list,
    .detail-list {
      display: grid;
      gap: 0.75rem;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 0.6rem;
    }
    .monospace {
      word-break: break-all;
    }
    @media (max-width: 1080px) {
      .filters-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OciWorkRequestsPageComponent implements OnInit {
  protected readonly pageSizeOptions = [10, 20, 50];
  protected readonly detailPageLimit = 10;

  protected state: PageState = 'loading';
  protected detailState: DetailState = 'idle';
  protected pageData: OciWorkRequestsPage | null = null;
  protected pageIndex = 0;
  protected pageSize = 20;
  protected pageNotice = '';
  protected partialSupport = false;
  protected errorMessage = '';
  protected errorDetails = '';
  protected detailErrorMessage = '';
  protected detailErrorDetails = '';
  protected compartments: OciCompartment[] = [];
  protected compartmentsMessage = '';

  protected expandedWorkRequestId: string | null = null;
  protected expandedDetails: OciWorkRequest | null = null;
  protected expandedErrors: OciPaginatedResponse<OciWorkRequestError> | null = null;
  protected expandedLogs: OciPaginatedResponse<OciWorkRequestLog> | null = null;
  protected errorPageTokens: Array<string | null> = [null];
  protected errorPageIndex = 0;
  protected logPageTokens: Array<string | null> = [null];
  protected logPageIndex = 0;

  protected readonly filtersForm = this.formBuilder.nonNullable.group({
    compartmentId: [''],
    status: [''],
    operationType: [''],
    resource: [''],
    from: [this.toLocalDateTime(this.defaultStart())],
    to: [this.toLocalDateTime(new Date())]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ociService: OciService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCompartments();
    this.loadWorkRequests();
  }

  protected reload(): void {
    this.loadCompartments();
    this.loadWorkRequests();
  }

  protected applyFilters(): void {
    this.pageIndex = 0;
    this.loadWorkRequests();
  }

  protected resetFilters(): void {
    this.filtersForm.reset({
      compartmentId: '',
      status: '',
      operationType: '',
      resource: '',
      from: this.toLocalDateTime(this.defaultStart()),
      to: this.toLocalDateTime(new Date())
    });
    this.pageIndex = 0;
    this.loadWorkRequests();
  }

  protected onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadWorkRequests();
  }

  protected get paginatorLength(): number {
    if (!this.pageData) {
      return this.pageSize;
    }
    return this.pageData.hasNext
      ? (this.pageIndex + 2) * this.pageSize
      : this.pageIndex * this.pageSize + this.pageData.items.length;
  }

  protected toggleDetails(workRequest: OciWorkRequest): void {
    if (this.expandedWorkRequestId === workRequest.id) {
      this.expandedWorkRequestId = null;
      this.expandedDetails = null;
      this.expandedErrors = null;
      this.expandedLogs = null;
      this.detailState = 'idle';
      this.cdr.markForCheck();
      return;
    }

    this.expandedWorkRequestId = workRequest.id;
    this.expandedDetails = workRequest;
    this.detailState = 'loading';
    this.detailErrorMessage = '';
    this.detailErrorDetails = '';
    this.errorPageTokens = [null];
    this.errorPageIndex = 0;
    this.logPageTokens = [null];
    this.logPageIndex = 0;
    this.expandedErrors = null;
    this.expandedLogs = null;
    this.cdr.markForCheck();

    this.ociService.workRequest(workRequest.id).subscribe({
      next: (details) => {
        if (this.expandedWorkRequestId !== workRequest.id) {
          return;
        }

        this.expandedDetails = details;
        this.detailState = 'ready';
        this.cdr.markForCheck();
        this.loadExpandedErrors();
        this.loadExpandedLogs();
      },
      error: (error: unknown) => {
        if (this.expandedWorkRequestId !== workRequest.id) {
          return;
        }

        this.detailState = 'error';
        this.detailErrorMessage = this.extractErrorMessage(error, 'Impossible de charger le detail du work request.');
        this.detailErrorDetails = this.extractErrorDetails(error);
        this.cdr.markForCheck();
      }
    });
  }

  protected reloadExpanded(): void {
    const current = this.expandedDetails;
    if (!current) {
      return;
    }
    this.toggleDetails(current);
    this.toggleDetails(current);
  }

  protected loadExpandedErrors(direction: 'current' | 'next' | 'prev' = 'current'): void {
    if (!this.expandedWorkRequestId) {
      return;
    }

    if (direction === 'next' && this.expandedErrors?.nextPage) {
      if (this.errorPageTokens.length === this.errorPageIndex + 1) {
        this.errorPageTokens.push(this.expandedErrors.nextPage);
      }
      this.errorPageIndex++;
    } else if (direction === 'prev' && this.errorPageIndex > 0) {
      this.errorPageIndex--;
    }

    const token = this.errorPageTokens[this.errorPageIndex] || null;
    this.ociService.workRequestErrors(this.expandedWorkRequestId, token, this.detailPageLimit).subscribe({
      next: (response) => {
        this.expandedErrors = response;
        this.cdr.markForCheck();
      },
      error: () => {
        this.expandedErrors = {
          items: [],
          limit: this.detailPageLimit,
          nextPage: null,
          hasNext: false,
          partialSupport: true,
          message: "Les erreurs detaillees ne sont pas disponibles pour ce work request."
        };
        this.cdr.markForCheck();
      }
    });
  }

  protected loadExpandedLogs(direction: 'current' | 'next' | 'prev' = 'current'): void {
    if (!this.expandedWorkRequestId) {
      return;
    }

    if (direction === 'next' && this.expandedLogs?.nextPage) {
      if (this.logPageTokens.length === this.logPageIndex + 1) {
        this.logPageTokens.push(this.expandedLogs.nextPage);
      }
      this.logPageIndex++;
    } else if (direction === 'prev' && this.logPageIndex > 0) {
      this.logPageIndex--;
    }

    const token = this.logPageTokens[this.logPageIndex] || null;
    this.ociService.workRequestLogs(this.expandedWorkRequestId, token, this.detailPageLimit).subscribe({
      next: (response) => {
        this.expandedLogs = response;
        this.cdr.markForCheck();
      },
      error: () => {
        this.expandedLogs = {
          items: [],
          limit: this.detailPageLimit,
          nextPage: null,
          hasNext: false,
          partialSupport: true,
          message: "Les logs detaillees ne sont pas disponibles pour ce work request."
        };
        this.cdr.markForCheck();
      }
    });
  }

  protected get canGoPreviousErrors(): boolean {
    return this.errorPageIndex > 0;
  }

  protected get canGoNextErrors(): boolean {
    return !!this.expandedErrors?.hasNext;
  }

  protected get canGoPreviousLogs(): boolean {
    return this.logPageIndex > 0;
  }

  protected get canGoNextLogs(): boolean {
    return !!this.expandedLogs?.hasNext;
  }

  private loadCompartments(): void {
    this.compartmentsMessage = '';
    this.ociService.compartments().subscribe({
      next: (response) => {
        this.compartments = response.compartments || [];
        if (!this.filtersForm.controls.compartmentId.getRawValue() && response.configuredCompartmentId) {
          this.filtersForm.controls.compartmentId.setValue(response.configuredCompartmentId);
        }
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.compartments = [];
        this.compartmentsMessage = this.extractErrorCode(error) === 'OCI_NOT_CONFIGURED'
          ? "La liste des compartments OCI n'est pas disponible tant que la source n'est pas configuree."
          : this.extractErrorMessage(error, 'Impossible de charger les compartments OCI.');
        this.cdr.markForCheck();
      }
    });
  }

  private loadWorkRequests(): void {
    this.state = 'loading';
    this.pageData = null;
    this.pageNotice = '';
    this.partialSupport = false;
    this.errorMessage = '';
    this.errorDetails = '';
    this.expandedWorkRequestId = null;
    this.expandedDetails = null;
    this.expandedErrors = null;
    this.expandedLogs = null;
    this.detailState = 'idle';
    this.cdr.markForCheck();

    this.ociService.workRequests({
      compartmentId: this.toNull(this.filtersForm.controls.compartmentId.getRawValue()),
      status: this.toNull(this.filtersForm.controls.status.getRawValue()),
      operationType: this.toNull(this.filtersForm.controls.operationType.getRawValue()),
      resource: this.toNull(this.filtersForm.controls.resource.getRawValue()),
      from: this.toIso(this.filtersForm.controls.from.getRawValue()),
      to: this.toIso(this.filtersForm.controls.to.getRawValue()),
      page: this.pageIndex,
      limit: this.pageSize
    }).subscribe({
      next: (response) => {
        this.pageData = response;
        this.pageNotice = response.message || '';
        this.partialSupport = response.partialSupport;
        this.state = response.items.length ? 'ready' : 'empty';
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.pageData = null;
        if (this.extractErrorCode(error) === 'OCI_NOT_CONFIGURED') {
          this.state = 'not-configured';
        } else {
          this.state = 'error';
          this.errorMessage = this.extractErrorMessage(error, 'Impossible de charger les work requests OCI.');
          this.errorDetails = this.extractErrorDetails(error);
        }
        this.cdr.markForCheck();
      }
    });
  }

  private defaultStart(): Date {
    return new Date(Date.now() - this.timeRangeService.selected().seconds * 1000);
  }

  private toLocalDateTime(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    const hours = `${value.getHours()}`.padStart(2, '0');
    const minutes = `${value.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private toIso(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? new Date(trimmed).toISOString() : null;
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
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const payload = (error as { error?: { details?: string[] } }).error;
      if (Array.isArray(payload?.details) && payload.details.length) {
        return payload.details.join('\n');
      }
    }
    return '';
  }
}
