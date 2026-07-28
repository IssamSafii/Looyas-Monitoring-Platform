import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import { MetricSeries } from '../../core/models/monitoring.model';
import { OciCompartment, OciComputeInstance, OciHealthResponse, OciLogEntry, OciMetricSeries, OciMetricsQueryRequest } from '../../core/models/oci.model';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

type PanelState = 'loading' | 'ready' | 'empty' | 'error' | 'not-configured';

interface DataState<T> {
  state: PanelState;
  data?: T;
  message?: string;
  details?: string;
}

@Component({
  selector: 'app-oci-overview-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    PanelContainerComponent,
    StatCardComponent,
    TimeSeriesChartComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingSkeletonComponent,
    HealthBadgeComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Cloud</h1>
        <div class="page-subtitle">Overview OCI en lecture seule, sans exposer les credentials au frontend.</div>
      </div>
      <div class="header-actions">
        <mat-form-field subscriptSizing="dynamic" class="compartment-select">
          <mat-label>Compartment</mat-label>
          <mat-select [value]="selectedCompartmentId" [disabled]="compartmentsLoading || !compartmentOptions.length" (valueChange)="onCompartmentChange($event)">
            <mat-option *ngFor="let compartment of compartmentOptions" [value]="compartment.id">
              {{ compartment.name }} ({{ compartment.maskedId }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-stroked-button type="button" (click)="reload()">Actualiser</button>
      </div>
    </div>
    <div class="header-hint" *ngIf="compartmentsLoading || compartmentsMessage">
      <span *ngIf="compartmentsLoading">Chargement des compartments OCI...</span>
      <span *ngIf="!compartmentsLoading && compartmentsMessage">{{ compartmentsMessage }}</span>
    </div>

    <div class="grid-tiles">
      <app-stat-card title="Connexion OCI" description="Etat courant de la source OCI." [value]="healthCardValue" unit="" [loading]="healthState.state === 'loading'" [noData]="healthState.state === 'not-configured'"></app-stat-card>
      <app-stat-card title="Instances" description="Instances Compute visibles." [value]="instancesCountLabel" unit="instances" [loading]="computeState.state === 'loading'" [noData]="computeState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Running" description="Instances dans l'etat RUNNING." [value]="runningInstancesLabel" unit="running" [loading]="computeState.state === 'loading'" [noData]="computeState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="CPU moyen" description="CpuUtilization moyen sur la periode." [value]="cpuAverageLabel" unit="%" [loading]="cpuState.state === 'loading'" [noData]="cpuState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Memoire moyenne" description="MemoryUtilization moyen sur la periode." [value]="memoryAverageLabel" unit="%" [loading]="memoryState.state === 'loading'" [noData]="memoryState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Trafic reseau" description="Derniere mesure combinee entrant + sortant." [value]="networkTotalLabel" unit="Mbit" [loading]="networkState.state === 'loading'" [noData]="networkState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Logs OCI" description="Nombre de logs recents recuperes." [value]="logsCountLabel" unit="logs" [loading]="logsState.state === 'loading'" [noData]="logsState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Erreurs recentes" description="Logs ERROR ou WARN dans la periode." [value]="recentErrorsCountLabel" unit="alerts" [loading]="logsState.state === 'loading'" [noData]="logsState.state !== 'ready'"></app-stat-card>
    </div>

    <div class="section-grid overview-grid">
      <div class="span-4">
        <app-panel-container title="Statut OCI" subtitle="Verification backend de la configuration et de la connexion.">
          <ng-container [ngSwitch]="healthState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="4"></app-loading-skeleton>

            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>

            <app-error-state *ngSwitchCase="'error'" [message]="healthState.message || 'Impossible de verifier OCI.'" [details]="healthState.details || ''" (retry)="reload()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="health-card">
              <div class="health-row">
                <span>Etat</span>
                <app-health-badge [status]="healthBadgeStatus"></app-health-badge>
              </div>
              <div class="health-row">
                <span>Region</span>
                <strong>{{ healthState.data?.region || '-' }}</strong>
              </div>
              <div class="health-row">
                <span>Profil</span>
                <strong>{{ healthState.data?.profile || '-' }}</strong>
              </div>
              <div class="health-row">
                <span>Compartment</span>
                <strong>{{ healthState.data?.compartmentConfigured ? 'Configure' : 'Absent' }}</strong>
              </div>
              <div class="muted">{{ healthState.data?.message }}</div>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-8">
        <app-panel-container title="Instances Compute" subtitle="Inventaire rapide des instances OCI accessibles.">
          <ng-container [ngSwitch]="computeState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="Configure OCI pour afficher les instances Compute."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune instance visible" description="Aucune instance Compute n'a ete retournee pour ce compartment."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="computeState.message || 'Impossible de charger les instances.'" [details]="computeState.details || ''" (retry)="loadCompute()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="instance-list">
              <article *ngFor="let instance of topInstances" class="instance-card">
                <div class="instance-head">
                  <div>
                    <strong>{{ instance.displayName || instance.maskedId }}</strong>
                    <div class="muted">{{ instance.shape }} · {{ instance.region }}</div>
                  </div>
                  <span class="chip">{{ instance.lifecycleState }}</span>
                </div>
                <div class="instance-meta">
                  <span>AD {{ instance.availabilityDomain || '-' }}</span>
                  <span>FD {{ instance.faultDomain || '-' }}</span>
                  <span>CPU {{ instance.cpuCurrent == null ? '-' : (instance.cpuCurrent | number:'1.0-2') + ' %' }}</span>
                </div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="CPU OCI" subtitle="CpuUtilization[1m].mean()">
          <ng-container [ngSwitch]="cpuState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee CPU" description="CpuUtilization n'est pas disponible sur cette periode."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="cpuState.message || 'Impossible de charger la metrique CPU.'" [details]="cpuState.details || ''" (retry)="loadCpu()"></app-error-state>
            <app-time-series-chart *ngSwitchCase="'ready'" [series]="cpuChartSeries" unit="%"></app-time-series-chart>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Memoire OCI" subtitle="MemoryUtilization[1m].mean()">
          <ng-container [ngSwitch]="memoryState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee memoire" description="MemoryUtilization n'est pas disponible sur cette periode."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="memoryState.message || 'Impossible de charger la metrique memoire.'" [details]="memoryState.details || ''" (retry)="loadMemory()"></app-error-state>
            <app-time-series-chart *ngSwitchCase="'ready'" [series]="memoryChartSeries" unit="%"></app-time-series-chart>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Reseau OCI" subtitle="Entrant et sortant separes, convertis dans une unite reseau lisible.">
          <ng-container [ngSwitch]="networkState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee reseau" description="Aucune serie reseau OCI n'a ete retournee."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="networkState.message || 'Impossible de charger le reseau OCI.'" [details]="networkState.details || ''" (retry)="loadNetwork()"></app-error-state>
            <div *ngSwitchCase="'ready'" class="network-panel">
              <div class="network-summary">
                <article class="network-summary-card network-in">
                  <div class="network-summary-label">
                    <span class="network-dot network-in-dot"></span>
                    <span>Entrant</span>
                  </div>
                  <strong>{{ networkInboundLabel }}</strong>
                </article>
                <article class="network-summary-card network-out">
                  <div class="network-summary-label">
                    <span class="network-dot network-out-dot"></span>
                    <span>Sortant</span>
                  </div>
                  <strong>{{ networkOutboundLabel }}</strong>
                </article>
              </div>
              <app-time-series-chart [series]="networkChartSeries" unit="Mbit" [palette]="networkPalette"></app-time-series-chart>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Derniers logs OCI" subtitle="Flux recent issu de OCI Logging Search.">
          <ng-container [ngSwitch]="logsState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="6"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucun log recent" description="OCI n'a retourne aucun log sur la periode active."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="logsState.message || 'Impossible de charger les logs OCI.'" [details]="logsState.details || ''" (retry)="loadLogs()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="log-list">
              <article *ngFor="let log of latestLogs" class="log-card">
                <div class="log-head">
                  <span class="chip" [class.warn-chip]="isWarning(log)" [class.error-chip]="isError(log)">{{ severityLabel(log) }}</span>
                  <span class="muted">{{ log.timestamp | date:'short' }}</span>
                </div>
                <strong>{{ log.resourceName || log.service || 'OCI' }}</strong>
                <div class="muted">{{ log.message || 'Message absent' }}</div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Erreurs recentes" subtitle="Warnings et erreurs extraits des logs OCI.">
          <ng-container [ngSwitch]="logsState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune alerte recente" description="Aucun WARNING ou ERROR n'a ete remonte sur la periode active."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="logsState.message || 'Impossible de charger les logs OCI.'" [details]="logsState.details || ''" (retry)="loadLogs()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="alerts-table-wrapper">
              <table *ngIf="recentErrorLogs.length; else noAlertsTpl">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Service</th>
                    <th>Ressource</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let log of recentErrorLogs">
                    <td>{{ log.timestamp | date:'short' }}</td>
                    <td>{{ severityLabel(log) }}</td>
                    <td>{{ log.service || '-' }}</td>
                    <td>{{ log.resourceName || '-' }}</td>
                    <td>{{ log.message || '-' }}</td>
                  </tr>
                </tbody>
              </table>
              <ng-template #noAlertsTpl>
                <app-empty-state title="Aucune alerte recente" description="Les logs OCI recuperes ne contiennent pas de WARNING ou ERROR."></app-empty-state>
              </ng-template>
            </div>
          </ng-container>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: [`
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }
    .compartment-select {
      min-width: 320px;
    }
    .header-hint {
      margin: -0.5rem 0 1rem;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
    .overview-grid { align-items: start; }
    .health-card,
    .instance-list,
    .log-list {
      display: grid;
      gap: 0.8rem;
    }
    .network-panel,
    .network-summary {
      display: grid;
      gap: 0.8rem;
    }
    .network-summary {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .network-summary-card {
      display: grid;
      gap: 0.35rem;
      padding: 0.9rem 0.95rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .network-summary-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.84rem;
    }
    .network-dot {
      width: 0.65rem;
      height: 0.65rem;
      border-radius: 999px;
      display: inline-block;
    }
    .network-in {
      border-color: rgba(76, 201, 240, 0.24);
    }
    .network-out {
      border-color: rgba(255, 180, 84, 0.24);
    }
    .network-in-dot {
      background: #4cc9f0;
    }
    .network-out-dot {
      background: #ffb454;
    }
    .health-row,
    .instance-head,
    .log-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .instance-card,
    .log-card {
      display: grid;
      gap: 0.45rem;
      padding: 0.95rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .instance-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      color: var(--text-secondary);
      font-size: 0.82rem;
    }
    .alerts-table-wrapper {
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
      vertical-align: top;
      border-bottom: 1px solid var(--border-soft);
    }
    th {
      color: var(--text-secondary);
      font-weight: 700;
      background: rgba(255, 255, 255, 0.02);
    }
    .warn-chip {
      border-color: rgba(255, 180, 84, 0.28);
      background: rgba(255, 180, 84, 0.1);
    }
    .error-chip {
      border-color: rgba(255, 107, 107, 0.28);
      background: rgba(255, 107, 107, 0.1);
    }
    @media (max-width: 900px) {
      .header-actions {
        width: 100%;
        flex-wrap: wrap;
      }
      .compartment-select {
        width: 100%;
        min-width: 0;
      }
      .network-summary {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OciOverviewPageComponent implements OnInit {
  protected healthState: DataState<OciHealthResponse> = { state: 'loading' };
  protected computeState: DataState<OciComputeInstance[]> = { state: 'loading' };
  protected cpuState: DataState<OciMetricSeries[]> = { state: 'loading' };
  protected memoryState: DataState<OciMetricSeries[]> = { state: 'loading' };
  protected networkState: DataState<OciMetricSeries[]> = { state: 'loading' };
  protected logsState: DataState<OciLogEntry[]> = { state: 'loading' };
  protected readonly networkPalette = ['#4cc9f0', '#31b8e0', '#ffb454', '#ff9b3d'];
  protected compartmentOptions: OciCompartment[] = [];
  protected selectedCompartmentId: string | null = null;
  protected compartmentsLoading = false;
  protected compartmentsMessage = '';

  constructor(
    private readonly ociService: OciService,
    private readonly timeRangeService: TimeRangeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  protected reload(): void {
    this.loadHealth();
    this.loadCompartments();
    this.loadCompute();
    this.loadCpu();
    this.loadMemory();
    this.loadNetwork();
    this.loadLogs();
  }

  protected loadHealth(): void {
    this.healthState = { state: 'loading' };
    this.ociService.health().subscribe({
      next: (response) => {
        this.healthState = response.status === 'NOT_CONFIGURED'
          ? { state: 'not-configured', data: response, message: response.message }
          : { state: 'ready', data: response };
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.healthState = this.toFailureState(error, 'Impossible de verifier la connexion OCI.');
        this.cdr.markForCheck();
      }
    });
  }

  protected loadCompartments(): void {
    this.compartmentsLoading = true;
    this.compartmentsMessage = '';
    this.ociService.compartments().subscribe({
      next: (response) => {
        this.compartmentOptions = response.compartments || [];
        if (!this.selectedCompartmentId) {
          this.selectedCompartmentId = response.configuredCompartmentId || this.compartmentOptions[0]?.id || null;
        } else if (!this.compartmentOptions.some((compartment) => compartment.id === this.selectedCompartmentId)) {
          this.selectedCompartmentId = response.configuredCompartmentId || this.compartmentOptions[0]?.id || null;
        }

        this.compartmentsMessage = this.compartmentOptions.length
          ? ''
          : "Aucun compartment OCI accessible n'a ete retourne pour ce scope.";
        this.compartmentsLoading = false;
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        const code = this.extractErrorCode(error);
        this.compartmentOptions = [];
        this.compartmentsMessage = code === 'OCI_NOT_CONFIGURED'
          ? "La source OCI n'est pas encore configuree."
          : this.extractErrorMessage(error, 'Impossible de lister les compartments OCI.');
        this.compartmentsLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  protected onCompartmentChange(compartmentId: string | null): void {
    this.selectedCompartmentId = compartmentId;
    this.loadCompute();
    this.loadCpu();
    this.loadMemory();
    this.loadNetwork();
    this.loadLogs();
  }

  protected loadCompute(): void {
    this.computeState = { state: 'loading' };
    this.ociService.computeInstances(this.selectedCompartmentId).subscribe({
      next: (instances) => {
        this.computeState = instances.length ? { state: 'ready', data: instances } : { state: 'empty', data: [] };
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.computeState = this.toFailureState(error, 'Impossible de charger les instances Compute.');
        this.cdr.markForCheck();
      }
    });
  }

  protected loadCpu(): void {
    this.loadMetricPanel('CpuUtilization[1m].mean()', 'oci_computeagent', (state) => {
      this.cpuState = state;
    });
  }

  protected loadMemory(): void {
    this.loadMetricPanel('MemoryUtilization[1m].mean()', 'oci_computeagent', (state) => {
      this.memoryState = state;
    });
  }

  protected loadNetwork(): void {
    this.loadMetricPanel('NetworksBytesIn[1m].mean()', 'oci_computeagent', (bytesInState) => {
      if (bytesInState.state !== 'ready') {
        this.networkState = bytesInState;
        this.cdr.markForCheck();
        return;
      }

      this.loadMetricPanel('NetworksBytesOut[1m].mean()', 'oci_computeagent', (bytesOutState) => {
        if (bytesOutState.state !== 'ready') {
          this.networkState = bytesOutState;
          this.cdr.markForCheck();
          return;
        }

        const networkSeries = [
          ...(bytesInState.data || []).map((series) => this.withNetworkDirection(series, 'in')),
          ...(bytesOutState.data || []).map((series) => this.withNetworkDirection(series, 'out'))
        ];
        this.networkState = { state: 'ready', data: networkSeries };
        this.cdr.markForCheck();
      });
    });
  }

  protected loadLogs(): void {
    this.logsState = { state: 'loading' };
    const { from, to } = this.resolveRange();

    this.ociService.searchLogs({
      searchQuery: null,
      compartmentId: this.selectedCompartmentId,
      from,
      to,
      limit: 120
    }).subscribe({
      next: (response) => {
        this.logsState = response.logs.length ? { state: 'ready', data: response.logs } : { state: 'empty', data: [] };
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        this.logsState = this.toFailureState(error, 'Impossible de charger les logs OCI.');
        this.cdr.markForCheck();
      }
    });
  }

  protected get healthCardValue(): string {
    if (this.healthState.state === 'ready') {
      return this.healthState.data?.status || '-';
    }
    if (this.healthState.state === 'not-configured') {
      return 'NOT_CONFIGURED';
    }
    if (this.healthState.state === 'error') {
      return 'ERROR';
    }
    return '-';
  }

  protected get healthBadgeStatus(): 'CONNECTED' | 'DEGRADED' | 'DISCONNECTED' | 'UNKNOWN' {
    const status = this.healthState.data?.status;
    if (status === 'CONNECTED') {
      return 'CONNECTED';
    }
    if (status === 'NOT_CONFIGURED') {
      return 'UNKNOWN';
    }
    return status ? 'DISCONNECTED' : 'UNKNOWN';
  }

  protected get topInstances(): OciComputeInstance[] {
    return (this.computeState.data || []).slice(0, 5);
  }

  protected get cpuChartSeries(): MetricSeries[] {
    return this.toChartSeries(this.cpuState.data || []);
  }

  protected get memoryChartSeries(): MetricSeries[] {
    return this.toChartSeries(this.memoryState.data || []);
  }

  protected get networkChartSeries(): MetricSeries[] {
    return (this.networkState.data || []).map((item) => ({
      name: this.networkSeriesLabel(item),
      labels: item.dimensions,
      color: this.networkSeriesColor(item),
      points: item.points.map((point) => ({
        timestamp: point.timestamp,
        value: point.value == null ? null : this.bytesToMbit(point.value)
      }))
    }));
  }

  protected get latestLogs(): OciLogEntry[] {
    return (this.logsState.data || []).slice(0, 8);
  }

  protected get recentErrorLogs(): OciLogEntry[] {
    return (this.logsState.data || []).filter((log) => this.isWarning(log) || this.isError(log)).slice(0, 12);
  }

  protected get instancesCountLabel(): string {
    return this.computeState.state === 'ready' ? this.formatInteger((this.computeState.data || []).length) : '-';
  }

  protected get runningInstancesLabel(): string {
    if (this.computeState.state !== 'ready') {
      return '-';
    }
    return this.formatInteger((this.computeState.data || []).filter((instance) => instance.lifecycleState === 'RUNNING').length);
  }

  protected get cpuAverageLabel(): string {
    return this.averageMetricLabel(this.cpuState.data || [], '%');
  }

  protected get memoryAverageLabel(): string {
    return this.averageMetricLabel(this.memoryState.data || [], '%');
  }

  protected get networkTotalLabel(): string {
    if (this.networkState.state !== 'ready') {
      return '-';
    }
    const total = this.sumLatestNetworkValue();
    return total == null ? '-' : this.formatNetworkRate(total);
  }

  protected get networkInboundLabel(): string {
    const total = this.sumLatestNetworkValue('in');
    return total == null ? '-' : this.formatNetworkRate(total);
  }

  protected get networkOutboundLabel(): string {
    const total = this.sumLatestNetworkValue('out');
    return total == null ? '-' : this.formatNetworkRate(total);
  }

  protected get logsCountLabel(): string {
    return this.logsState.state === 'ready' ? this.formatInteger((this.logsState.data || []).length) : '-';
  }

  protected get recentErrorsCountLabel(): string {
    return this.logsState.state === 'ready' ? this.formatInteger(this.recentErrorLogs.length) : '-';
  }

  protected severityLabel(log: OciLogEntry): string {
    return (log.severity || 'INFO').toUpperCase();
  }

  protected isWarning(log: OciLogEntry): boolean {
    return this.severityLabel(log).includes('WARN');
  }

  protected isError(log: OciLogEntry): boolean {
    return this.severityLabel(log).includes('ERROR');
  }

  private loadMetricPanel(query: string, namespace: string, onResolved: (state: DataState<OciMetricSeries[]>) => void): void {
    const payload = this.metricRequest(query, namespace);
    onResolved({ state: 'loading' });
    this.ociService.queryMetrics(payload).subscribe({
      next: (response) => {
        onResolved(response.series.length ? { state: 'ready', data: response.series } : { state: 'empty', data: [] });
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        onResolved(this.toFailureState(error, `Impossible de charger ${query}.`));
        this.cdr.markForCheck();
      }
    });
  }

  private metricRequest(query: string, namespace: string): OciMetricsQueryRequest {
    const { from, to } = this.resolveRange();
    return {
      compartmentId: this.selectedCompartmentId,
      namespace,
      query,
      from,
      to,
      includeSubcompartments: null
    };
  }

  private resolveRange(): { from: string; to: string } {
    const end = new Date();
    const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
    return { from: start.toISOString(), to: end.toISOString() };
  }

  private toChartSeries(series: OciMetricSeries[]): MetricSeries[] {
    return series.map((item) => ({
      name: item.name,
      labels: item.dimensions,
      points: item.points
    }));
  }

  private averageMetricLabel(series: OciMetricSeries[], unit: string): string {
    if (!series.length) {
      return '-';
    }

    const values = series
      .map((item) => item.points.at(-1)?.value)
      .filter((value): value is number => value != null);

    if (!values.length) {
      return '-';
    }

    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    return `${this.formatDecimal(average)} ${unit}`.trim();
  }

  private formatInteger(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
  }

  private formatDecimal(value: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
  }

  private withNetworkDirection(series: OciMetricSeries, direction: 'in' | 'out'): OciMetricSeries {
    return {
      ...series,
      metadata: {
        ...(series.metadata || {}),
        direction
      }
    };
  }

  private networkSeriesLabel(series: OciMetricSeries): string {
    const direction = this.networkDirection(series);
    const baseName = series.name || series.dimensions['resourceDisplayName'] || series.dimensions['resourceId'] || 'OCI';
    if (direction === 'in') {
      return `Entrant - ${baseName}`;
    }
    if (direction === 'out') {
      return `Sortant - ${baseName}`;
    }
    return baseName;
  }

  private networkSeriesColor(series: OciMetricSeries): string {
    return this.networkDirection(series) === 'in' ? '#4cc9f0' : '#ffb454';
  }

  private networkDirection(series: OciMetricSeries): 'in' | 'out' | 'unknown' {
    const direction = series.metadata?.['direction'];
    if (direction === 'in' || direction === 'out') {
      return direction;
    }
    return 'unknown';
  }

  private sumLatestNetworkValue(direction?: 'in' | 'out'): number | null {
    const values = (this.networkState.data || [])
      .filter((series) => !direction || this.networkDirection(series) === direction)
      .map((series) => series.points.at(-1)?.value)
      .filter((value): value is number => value != null);

    if (!values.length) {
      return null;
    }

    return values.reduce((sum, value) => sum + value, 0);
  }

  private formatNetworkRate(bytesValue: number): string {
    const mbitValue = this.bytesToMbit(bytesValue);
    if (mbitValue >= 1024) {
      return `${this.formatDecimal(mbitValue / 1024)} Gbit`;
    }
    return `${this.formatDecimal(mbitValue)} Mbit`;
  }

  private bytesToMbit(value: number): number {
    return (value * 8) / (1024 ** 2);
  }

  private toFailureState(error: unknown, fallback: string): DataState<never> {
    const code = this.extractErrorCode(error);
    if (code === 'OCI_NOT_CONFIGURED') {
      return { state: 'not-configured', message: "La source OCI n'est pas encore configuree." };
    }

    return {
      state: 'error',
      message: this.extractErrorMessage(error, fallback),
      details: this.extractErrorDetails(error)
    };
  }

  private extractErrorCode(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const payload = (error as { error?: { code?: string } }).error;
      return payload?.code || '';
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
