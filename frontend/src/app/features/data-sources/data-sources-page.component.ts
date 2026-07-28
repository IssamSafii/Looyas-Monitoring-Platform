import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataSourceConfig, DataSourceConfigPayload } from '../../core/models/datasource.model';
import { OciHealthResponse } from '../../core/models/oci.model';
import { DataSourceService } from '../../core/services/data-source.service';
import { OciService } from '../../core/services/oci.service';
import { SnackbarService } from '../../core/services/snackbar.service';

type SourceType = 'MIMIR' | 'LOKI' | 'OCI';
type AuthType = 'NONE' | 'BASIC' | 'BEARER';

@Component({
  selector: 'app-data-sources-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PanelContainerComponent
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Data Sources</h1>
        <div class="page-subtitle">Configuration backend de Mimir, Loki et OCI. Les secrets restent cote serveur.</div>
      </div>
      <button mat-stroked-button type="button" (click)="beginCreate()">Nouvelle source</button>
    </div>

    <div class="data-sources-grid">
      <div class="editor-column">
        <app-panel-container [title]="selectedSourceId ? 'Modifier une source' : 'Ajouter une source'" subtitle="Les secrets existants sont conserves si tu laisses le champ vide.">
          <form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
            <mat-form-field>
              <mat-label>Nom</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Type</mat-label>
              <mat-select formControlName="type" (valueChange)="onTypeChange($event)">
                <mat-option value="MIMIR">MIMIR</mat-option>
                <mat-option value="LOKI">LOKI</mat-option>
                <mat-option value="OCI">OCI</mat-option>
              </mat-select>
            </mat-form-field>

            <ng-container *ngIf="!isOciType; else ociFields">
              <mat-form-field>
                <mat-label>Base URL</mat-label>
                <input matInput formControlName="baseUrl" placeholder="http://192.168.x.x:port">
              </mat-form-field>

              <mat-form-field>
                <mat-label>API Prefix</mat-label>
                <input matInput formControlName="apiPrefix">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Tenant ID</mat-label>
                <input matInput formControlName="tenantId" placeholder="X-Scope-OrgID si necessaire">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Authentification</mat-label>
                <mat-select formControlName="authenticationType">
                  <mat-option value="NONE">NONE</mat-option>
                  <mat-option value="BASIC">BASIC</mat-option>
                  <mat-option value="BEARER">BEARER</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field *ngIf="authType !== 'NONE'">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username">
              </mat-form-field>

              <mat-form-field *ngIf="authType === 'BASIC'">
                <mat-label>Password</mat-label>
                <input matInput formControlName="password" type="password" [placeholder]="selectedSource?.maskedPassword || ''">
              </mat-form-field>

              <mat-form-field *ngIf="authType === 'BEARER'">
                <mat-label>Token</mat-label>
                <input matInput formControlName="token" type="password" [placeholder]="selectedSource?.maskedToken || ''">
              </mat-form-field>
            </ng-container>

            <ng-template #ociFields>
              <mat-form-field>
                <mat-label>Region</mat-label>
                <input matInput formControlName="region" placeholder="eu-frankfurt-1">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Compartment ID</mat-label>
                <input matInput formControlName="compartmentId" placeholder="ocid1.compartment...">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Profil OCI</mat-label>
                <input matInput formControlName="profile" placeholder="DEFAULT">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Fichier config OCI</mat-label>
                <input matInput formControlName="configFile" placeholder="/app/.oci/config">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Namespace metrique par defaut</mat-label>
                <input matInput formControlName="defaultMetricNamespace" placeholder="oci_computeagent">
              </mat-form-field>

              <mat-checkbox formControlName="includeSubcompartments">Inclure les sous-compartments</mat-checkbox>
            </ng-template>

            <mat-checkbox formControlName="enabled">Source activee</mat-checkbox>

            <div class="hint" *ngIf="selectedSource && !isOciType">
              Secret actuel :
              <span class="chip" *ngIf="selectedSource.maskedPassword">{{ selectedSource.maskedPassword }}</span>
              <span class="chip" *ngIf="selectedSource.maskedToken">{{ selectedSource.maskedToken }}</span>
              <span class="chip" *ngIf="!selectedSource.maskedPassword && !selectedSource.maskedToken">aucun</span>
            </div>

            <div class="hint" *ngIf="selectedSource && isOciType">
              OCI :
              <span class="chip">{{ selectedSource.region || 'region absente' }}</span>
              <span class="chip">{{ selectedSource.maskedCompartmentId || 'compartment absent' }}</span>
              <span class="chip">{{ selectedSource.profile || 'profil absent' }}</span>
            </div>

            <div class="form-actions">
              <button mat-flat-button color="primary" type="submit" [disabled]="saving || form.invalid">
                {{ saving ? 'Sauvegarde...' : (selectedSourceId ? 'Mettre a jour' : 'Creer') }}
              </button>
              <button mat-stroked-button type="button" (click)="resetForm()">Annuler</button>
              <button mat-stroked-button type="button" *ngIf="selectedSourceId" (click)="testSelected()" [disabled]="testingId === selectedSourceId">
                {{ testingId === selectedSourceId ? 'Test en cours...' : 'Tester cette source' }}
              </button>
            </div>

            <div *ngIf="selectedSourceId && selectedTestMessage" class="inline-test-result" [class.inline-test-success]="selectedTestSuccess" [class.inline-test-error]="selectedTestSuccess === false">
              {{ selectedTestMessage }}
            </div>
          </form>
        </app-panel-container>
      </div>

      <div class="list-column">
        <app-panel-container title="Sources disponibles" subtitle="OCI affiche son statut via /api/monitoring/oci/health.">
          <div class="source-list" *ngIf="sources.length; else emptyTpl">
            <article class="source-card" *ngFor="let source of sources" [class.selected-card]="source.id === selectedSourceId">
              <div class="source-head">
                <div>
                  <strong>{{ source.name }}</strong>
                  <div class="muted">{{ source.type }}</div>
                </div>
                <div class="source-badges">
                  <span class="chip" [class.enabled-chip]="source.enabled">{{ source.enabled ? 'Enabled' : 'Disabled' }}</span>
                  <span class="chip" *ngIf="source.type === 'OCI'">{{ ociStatusLabel }}</span>
                </div>
              </div>

              <div class="source-grid">
                <div class="source-cell">
                  <span>Connexion</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.region || '-') : (source.baseUrl || '-') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Prefix / profil</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.profile || '-') : (source.apiPrefix || '/') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Compartment / tenant</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.maskedCompartmentId || '-') : (source.tenantId || '-') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Derniere verification</span>
                  <strong>{{ source.type === 'OCI' ? (ociHealth?.checkedAt | date:'short') || '-' : '-' }}</strong>
                </div>
              </div>

              <div class="row-actions">
                <button mat-stroked-button type="button" (click)="edit(source)">Modifier</button>
                <button mat-stroked-button type="button" (click)="toggleEnabled(source)" [disabled]="saving">
                  {{ source.enabled ? 'Desactiver' : 'Activer' }}
                </button>
                <button mat-stroked-button type="button" (click)="test(source)" [disabled]="testingId === source.id">
                  {{ testingId === source.id ? 'Test en cours...' : 'Tester' }}
                </button>
                <button mat-stroked-button type="button" class="danger-button" (click)="remove(source)">Supprimer</button>
              </div>

              <div class="test-message" *ngIf="testMessages[source.id] as message">{{ message }}</div>
            </article>
          </div>

          <ng-template #emptyTpl>
            <div class="empty-card">Aucune source configuree pour le moment.</div>
          </ng-template>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: [`
    .data-sources-grid {
      display: grid;
      grid-template-columns: minmax(380px, 480px) minmax(0, 1fr);
      gap: 1rem;
      align-items: start;
    }
    .editor-column,
    .list-column {
      min-width: 0;
    }
    .form-grid,
    .source-list {
      display: grid;
      gap: 0.85rem;
    }
    .form-actions,
    .row-actions,
    .source-badges {
      display: flex;
      gap: 0.65rem;
      flex-wrap: wrap;
    }
    .hint {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .inline-test-result {
      margin-top: 0.25rem;
      padding: 0.85rem 1rem;
      border-radius: 14px;
      line-height: 1.45;
      border: 1px solid var(--border-soft);
      background: rgba(255, 255, 255, 0.03);
    }
    .inline-test-success {
      color: #a8f0c7;
      border-color: rgba(61, 220, 151, 0.22);
      background: rgba(61, 220, 151, 0.08);
    }
    .inline-test-error {
      color: #ff9a9a;
      border-color: rgba(255, 107, 107, 0.24);
      background: rgba(255, 107, 107, 0.08);
    }
    .source-card {
      display: grid;
      gap: 0.85rem;
      padding: 1rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .selected-card {
      border-color: rgba(124, 140, 255, 0.34);
      background: rgba(124, 140, 255, 0.08);
    }
    .source-head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: flex-start;
    }
    .source-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .source-cell {
      display: grid;
      gap: 0.2rem;
      padding: 0.8rem 0.85rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.02);
    }
    .source-cell span {
      color: var(--text-secondary);
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .danger-button {
      border-color: rgba(255, 107, 107, 0.3) !important;
      color: #ff9a9a !important;
    }
    .enabled-chip {
      color: var(--success);
      border-color: rgba(61, 220, 151, 0.22);
    }
    .mono {
      font-family: Consolas, 'Courier New', monospace;
      word-break: break-all;
    }
    .test-message {
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .empty-card {
      border: 1px dashed var(--border-soft);
      border-radius: var(--radius-md);
      padding: 1rem;
      color: var(--text-secondary);
    }
    @media (max-width: 1180px) {
      .data-sources-grid,
      .source-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSourcesPageComponent implements OnInit {
  protected sources: DataSourceConfig[] = [];
  protected selectedSourceId: number | null = null;
  protected saving = false;
  protected testingId: number | null = null;
  protected testMessages: Record<number, string> = {};
  protected selectedTestMessage = '';
  protected selectedTestSuccess: boolean | null = null;
  protected ociHealth: OciHealthResponse | null = null;

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['MIMIR' as SourceType, Validators.required],
    baseUrl: ['', Validators.required],
    apiPrefix: ['/prometheus', Validators.required],
    tenantId: [''],
    authenticationType: ['NONE' as AuthType, Validators.required],
    username: [''],
    password: [''],
    token: [''],
    region: [''],
    compartmentId: [''],
    profile: [''],
    configFile: [''],
    defaultMetricNamespace: ['oci_computeagent'],
    includeSubcompartments: [false],
    enabled: [true]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataSourceService: DataSourceService,
    private readonly ociService: OciService,
    private readonly snackbar: SnackbarService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  protected get selectedSource(): DataSourceConfig | undefined {
    return this.sources.find((source) => source.id === this.selectedSourceId);
  }

  protected get isOciType(): boolean {
    return this.form.controls.type.getRawValue() === 'OCI';
  }

  protected get authType(): AuthType {
    return this.form.controls.authenticationType.getRawValue();
  }

  protected get ociStatusLabel(): string {
    return this.ociHealth?.status || 'NOT_CHECKED';
  }

  protected beginCreate(): void {
    this.selectedSourceId = null;
    this.selectedTestMessage = '';
    this.selectedTestSuccess = null;
    this.form.reset({
      name: '',
      type: 'MIMIR',
      baseUrl: '',
      apiPrefix: '/prometheus',
      tenantId: '',
      authenticationType: 'NONE',
      username: '',
      password: '',
      token: '',
      region: '',
      compartmentId: '',
      profile: '',
      configFile: '',
      defaultMetricNamespace: 'oci_computeagent',
      includeSubcompartments: false,
      enabled: true
    });
    this.applyTypeValidators(this.form.controls.type.getRawValue());
    this.cdr.markForCheck();
  }

  protected edit(source: DataSourceConfig): void {
    this.selectedSourceId = source.id;
    this.selectedTestMessage = this.testMessages[source.id] ?? '';
    this.selectedTestSuccess = this.selectedTestMessage ? !this.selectedTestMessage.toLowerCase().includes('impossible') : null;
    this.form.reset({
      name: source.name,
      type: source.type,
      baseUrl: source.baseUrl,
      apiPrefix: source.apiPrefix || this.defaultApiPrefix(source.type),
      tenantId: source.tenantId ?? '',
      authenticationType: source.authenticationType,
      username: source.username ?? '',
      password: '',
      token: '',
      region: source.region ?? '',
      compartmentId: '',
      profile: source.profile ?? '',
      configFile: source.configFile ?? '',
      defaultMetricNamespace: source.defaultMetricNamespace ?? 'oci_computeagent',
      includeSubcompartments: source.includeSubcompartments,
      enabled: source.enabled
    });
    this.applyTypeValidators(source.type);
    this.cdr.markForCheck();
  }

  protected resetForm(): void {
    if (this.selectedSource) {
      this.edit(this.selectedSource);
      return;
    }
    this.beginCreate();
  }

  protected onTypeChange(type: SourceType): void {
    this.applyTypeValidators(type);

    if (type === 'OCI') {
      this.form.patchValue({
        baseUrl: '',
        apiPrefix: '',
        tenantId: '',
        authenticationType: 'NONE',
        username: '',
        password: '',
        token: '',
        defaultMetricNamespace: this.form.controls.defaultMetricNamespace.getRawValue() || 'oci_computeagent'
      });
    } else {
      const currentPrefix = this.form.controls.apiPrefix.getRawValue().trim();
      const defaults = ['/prometheus', '/loki', ''];
      if (!currentPrefix || defaults.includes(currentPrefix)) {
        this.form.controls.apiPrefix.setValue(this.defaultApiPrefix(type));
      }
    }
    this.cdr.markForCheck();
  }

  protected save(): void {
    if (this.form.invalid || this.saving) {
      return;
    }

    this.saving = true;
    this.dataSourceService.save(this.toPayload(), this.selectedSourceId ?? undefined).subscribe({
      next: (saved) => {
        this.saving = false;
        this.snackbar.success(`Source ${saved.name} sauvegardee.`);
        this.load(saved.id);
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.snackbar.error('Impossible de sauvegarder cette source.');
        this.cdr.markForCheck();
      }
    });
  }

  protected toggleEnabled(source: DataSourceConfig): void {
    this.saving = true;
    this.dataSourceService.save(this.toPayloadFromSource(source, !source.enabled), source.id).subscribe({
      next: (saved) => {
        this.saving = false;
        this.snackbar.success(`${saved.name} ${saved.enabled ? 'activee' : 'desactivee'}.`);
        this.load(saved.id);
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.snackbar.error(`Impossible de changer l'etat de ${source.name}.`);
        this.cdr.markForCheck();
      }
    });
  }

  protected testSelected(): void {
    const source = this.selectedSource;
    if (source) {
      this.test(source);
    }
  }

  protected test(source: DataSourceConfig): void {
    this.testingId = source.id;
    if (source.type === 'OCI') {
      this.ociService.health().subscribe({
        next: (result) => {
          this.testingId = null;
          const outcome = this.mapOciHealthResult(result);
          this.ociHealth = result;
          this.applyTestOutcome(source, outcome.success, outcome.message);
        },
        error: () => this.applyTestFailure(source, 'Test OCI impossible.')
      });
      return;
    }

    this.dataSourceService.test(source.id).subscribe({
      next: (result) => {
        this.testingId = null;
        this.applyTestOutcome(source, result.success, result.message);
      },
      error: () => this.applyTestFailure(source, 'Test de connexion impossible.')
    });
  }

  protected remove(source: DataSourceConfig): void {
    if (!window.confirm(`Supprimer la source ${source.name} ?`)) {
      return;
    }

    this.dataSourceService.delete(source.id).subscribe({
      next: () => {
        if (this.selectedSourceId === source.id) {
          this.beginCreate();
        }
        this.snackbar.success(`Source ${source.name} supprimee.`);
        this.load();
        this.cdr.markForCheck();
      },
      error: () => {
        this.snackbar.error(`Impossible de supprimer ${source.name}.`);
        this.cdr.markForCheck();
      }
    });
  }

  private load(selectId?: number): void {
    this.dataSourceService.list().subscribe((sources) => {
      this.sources = sources;

      const ociSource = sources.find((source) => source.type === 'OCI');
      if (ociSource) {
        this.ociService.health().subscribe({
          next: (health) => {
            this.ociHealth = health;
            this.cdr.markForCheck();
          },
          error: () => {
            this.ociHealth = null;
            this.cdr.markForCheck();
          }
        });
      }

      if (selectId != null) {
        const source = sources.find((item) => item.id === selectId);
        if (source) {
          this.edit(source);
        }
      } else if (this.selectedSourceId != null) {
        const current = sources.find((item) => item.id === this.selectedSourceId);
        if (current) {
          this.edit(current);
        }
      }

      this.cdr.markForCheck();
    });
  }

  private toPayload(): DataSourceConfigPayload {
    const raw = this.form.getRawValue();
    const isOci = raw.type === 'OCI';
    return {
      name: raw.name.trim(),
      type: raw.type,
      baseUrl: isOci ? '' : raw.baseUrl.trim(),
      apiPrefix: isOci ? '' : raw.apiPrefix.trim(),
      tenantId: isOci ? null : this.toNull(raw.tenantId),
      authenticationType: isOci ? 'NONE' : raw.authenticationType,
      username: isOci || raw.authenticationType === 'NONE' ? null : this.toNull(raw.username),
      password: isOci || raw.authenticationType !== 'BASIC' ? null : this.toNull(raw.password),
      token: isOci || raw.authenticationType !== 'BEARER' ? null : this.toNull(raw.token),
      region: isOci ? this.toNull(raw.region) : null,
      compartmentId: isOci ? this.toNull(raw.compartmentId) : null,
      profile: isOci ? this.toNull(raw.profile) : null,
      configFile: isOci ? this.toNull(raw.configFile) : null,
      defaultMetricNamespace: isOci ? this.toNull(raw.defaultMetricNamespace) : null,
      includeSubcompartments: isOci ? raw.includeSubcompartments : false,
      enabled: raw.enabled
    };
  }

  private toPayloadFromSource(source: DataSourceConfig, enabled: boolean): DataSourceConfigPayload {
    return {
      name: source.name,
      type: source.type,
      baseUrl: source.baseUrl,
      apiPrefix: source.apiPrefix,
      tenantId: source.tenantId,
      authenticationType: source.authenticationType,
      username: source.username,
      password: null,
      token: null,
      region: source.region,
      compartmentId: null,
      profile: source.profile,
      configFile: source.configFile,
      defaultMetricNamespace: source.defaultMetricNamespace,
      includeSubcompartments: source.includeSubcompartments,
      enabled
    };
  }

  private applyTypeValidators(type: SourceType): void {
    const baseUrlControl = this.form.controls.baseUrl;
    const apiPrefixControl = this.form.controls.apiPrefix;

    if (type === 'OCI') {
      baseUrlControl.clearValidators();
      apiPrefixControl.clearValidators();
    } else {
      baseUrlControl.setValidators([Validators.required]);
      apiPrefixControl.setValidators([Validators.required]);
    }

    baseUrlControl.updateValueAndValidity({ emitEvent: false });
    apiPrefixControl.updateValueAndValidity({ emitEvent: false });
  }

  private mapOciHealthResult(result: OciHealthResponse): { success: boolean; message: string } {
    return {
      success: result.status === 'CONNECTED',
      message: result.message
    };
  }

  private applyTestOutcome(source: DataSourceConfig, success: boolean, message: string): void {
    this.testMessages = { ...this.testMessages, [source.id]: message };
    if (this.selectedSourceId === source.id) {
      this.selectedTestMessage = message;
      this.selectedTestSuccess = success;
    }

    if (success) {
      this.snackbar.success(`${source.name}: ${message}`);
    } else {
      this.snackbar.error(`${source.name}: ${message}`);
    }

    this.cdr.markForCheck();
  }

  private applyTestFailure(source: DataSourceConfig, message: string): void {
    this.testingId = null;
    this.testMessages = { ...this.testMessages, [source.id]: message };
    if (this.selectedSourceId === source.id) {
      this.selectedTestMessage = message;
      this.selectedTestSuccess = false;
    }
    this.snackbar.error(`Test ${source.name} impossible.`);
    this.cdr.markForCheck();
  }

  private defaultApiPrefix(type: SourceType): string {
    return type === 'LOKI' ? '/loki' : '/prometheus';
  }

  private toNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
}
