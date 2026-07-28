import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { OciComputeInstance } from '../../core/models/oci.model';
import { OciService } from '../../core/services/oci.service';

type PageState = 'loading' | 'ready' | 'empty' | 'error' | 'not-configured';

@Component({
  selector: 'app-oci-compute-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
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
        <h1 class="page-title">OCI Compute</h1>
        <div class="page-subtitle">Inventaire des instances Compute, filtrage local et vue detaillee sans operation d'ecriture.</div>
      </div>
      <button mat-stroked-button type="button" (click)="load()">Actualiser</button>
    </div>

    <div class="section-grid">
      <div class="span-12">
        <app-panel-container title="Filtres" subtitle="Recherche locale sur le resultat OCI deja charge.">
          <form [formGroup]="filtersForm" class="filters-grid">
            <mat-form-field>
              <mat-label>Recherche</mat-label>
              <input matInput formControlName="search" placeholder="Nom, shape, AD, region">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Etat</mat-label>
              <mat-select formControlName="state">
                <mat-option value="ALL">Tous</mat-option>
                <mat-option value="RUNNING">RUNNING</mat-option>
                <mat-option value="STOPPED">STOPPED</mat-option>
                <mat-option value="STARTING">STARTING</mat-option>
                <mat-option value="STOPPING">STOPPING</mat-option>
                <mat-option value="TERMINATED">TERMINATED</mat-option>
              </mat-select>
            </mat-form-field>
          </form>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Instances OCI" subtitle="Tableau responsive et detail a la demande.">
          <ng-container [ngSwitch]="state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="8"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune instance" description="Aucune instance Compute n'a ete retournee pour ce compartment."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="errorMessage" [details]="errorDetails" (retry)="load()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="table-wrapper">
              <table *ngIf="filteredInstances.length; else filteredEmptyTpl">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Etat</th>
                    <th>Shape</th>
                    <th>Availability Domain</th>
                    <th>Fault Domain</th>
                    <th>CPU actuel</th>
                    <th>Region</th>
                    <th>Date de creation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let instance of filteredInstances">
                    <td>
                      <strong>{{ instance.displayName || instance.maskedId }}</strong>
                      <div class="muted monospace">{{ instance.maskedId }}</div>
                    </td>
                    <td><span class="chip">{{ instance.lifecycleState }}</span></td>
                    <td>{{ instance.shape || '-' }}</td>
                    <td>{{ instance.availabilityDomain || '-' }}</td>
                    <td>{{ instance.faultDomain || '-' }}</td>
                    <td>{{ instance.cpuCurrent == null ? '-' : (instance.cpuCurrent | number:'1.0-2') + ' %' }}</td>
                    <td>{{ instance.region || '-' }}</td>
                    <td>{{ instance.timeCreated | date:'short' }}</td>
                    <td>
                      <button mat-stroked-button type="button" (click)="showDetails(instance)">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ng-template #filteredEmptyTpl>
                <app-empty-state title="Aucun resultat" description="Aucune instance ne correspond aux filtres actifs."></app-empty-state>
              </ng-template>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="selectedInstance">
        <app-panel-container [title]="selectedInstance.displayName || selectedInstance.maskedId" subtitle="Detail OCI retourne par le backend.">
          <div class="detail-grid">
            <div class="detail-card">
              <span>ID</span>
              <strong class="monospace">{{ selectedInstance.maskedId }}</strong>
            </div>
            <div class="detail-card">
              <span>Compartment</span>
              <strong class="monospace">{{ selectedInstance.maskedCompartmentId }}</strong>
            </div>
            <div class="detail-card">
              <span>Shape</span>
              <strong>{{ selectedInstance.shape || '-' }}</strong>
            </div>
            <div class="detail-card">
              <span>CPU actuel</span>
              <strong>{{ selectedInstance.cpuCurrent == null ? '-' : (selectedInstance.cpuCurrent | number:'1.0-2') + ' %' }}</strong>
            </div>
            <div class="detail-card">
              <span>AD</span>
              <strong>{{ selectedInstance.availabilityDomain || '-' }}</strong>
            </div>
            <div class="detail-card">
              <span>FD</span>
              <strong>{{ selectedInstance.faultDomain || '-' }}</strong>
            </div>
          </div>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: [`
    .filters-grid {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) 240px;
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
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
    .detail-card {
      display: grid;
      gap: 0.25rem;
      padding: 0.9rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .detail-card span {
      color: var(--text-secondary);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .monospace {
      word-break: break-all;
    }
    @media (max-width: 960px) {
      .filters-grid,
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OciComputePageComponent implements OnInit {
  protected state: PageState = 'loading';
  protected errorMessage = '';
  protected errorDetails = '';
  protected instances: OciComputeInstance[] = [];
  protected selectedInstance: OciComputeInstance | null = null;

  protected readonly filtersForm = this.formBuilder.nonNullable.group({
    search: [''],
    state: ['ALL']
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ociService: OciService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
    this.filtersForm.valueChanges.subscribe(() => this.cdr.markForCheck());
  }

  protected load(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.errorDetails = '';
    this.selectedInstance = null;
    this.ociService.computeInstances().subscribe({
      next: (instances) => {
        this.instances = instances;
        this.state = instances.length ? 'ready' : 'empty';
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.instances = [];
        const code = this.extractErrorCode(error);
        if (code === 'OCI_NOT_CONFIGURED') {
          this.state = 'not-configured';
        } else {
          this.state = 'error';
          this.errorMessage = this.extractErrorMessage(error, 'Impossible de charger les instances OCI.');
          this.errorDetails = this.extractErrorDetails(error);
        }
        this.cdr.markForCheck();
      }
    });
  }

  protected showDetails(instance: OciComputeInstance): void {
    this.ociService.computeInstance(instance.id).subscribe({
      next: (details) => {
        this.selectedInstance = details;
        this.cdr.markForCheck();
      },
      error: () => {
        this.selectedInstance = instance;
        this.cdr.markForCheck();
      }
    });
  }

  protected get filteredInstances(): OciComputeInstance[] {
    const search = this.filtersForm.controls.search.getRawValue().trim().toLowerCase();
    const state = this.filtersForm.controls.state.getRawValue();

    return this.instances.filter((instance) => {
      const stateMatch = state === 'ALL' || instance.lifecycleState === state;
      const haystack = [
        instance.displayName,
        instance.shape,
        instance.availabilityDomain,
        instance.faultDomain,
        instance.region,
        instance.maskedId
      ].join(' ').toLowerCase();

      return stateMatch && (!search || haystack.includes(search));
    });
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
