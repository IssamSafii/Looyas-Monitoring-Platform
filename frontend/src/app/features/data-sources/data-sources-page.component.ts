import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataSourceConfig, DataSourceConfigPayload } from '../../core/models/datasource.model';
import { DataSourceService } from '../../core/services/data-source.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-data-sources-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
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
        <div class="page-subtitle">Configuration des acces Mimir et Loki stockee cote backend.</div>
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
              </mat-select>
            </mat-form-field>

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

            <mat-checkbox formControlName="enabled">Source activee</mat-checkbox>

            <div class="hint" *ngIf="selectedSource">
              Secret actuel :
              <span class="chip" *ngIf="selectedSource.maskedPassword">{{ selectedSource.maskedPassword }}</span>
              <span class="chip" *ngIf="selectedSource.maskedToken">{{ selectedSource.maskedToken }}</span>
              <span class="chip" *ngIf="!selectedSource.maskedPassword && !selectedSource.maskedToken">aucun</span>
            </div>

            <div class="form-actions">
              <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || saving">
                {{ saving ? 'Sauvegarde...' : (selectedSourceId ? 'Mettre a jour' : 'Creer') }}
              </button>
              <button mat-stroked-button type="button" (click)="resetForm()">Annuler</button>
              <button mat-stroked-button type="button" *ngIf="selectedSourceId" (click)="testSelected()" [disabled]="testingId === selectedSourceId">
                {{ testingId === selectedSourceId ? 'Test...' : 'Tester cette source' }}
              </button>
            </div>

            <div *ngIf="selectedSourceId && selectedTestMessage" class="inline-test-result" [class.inline-test-success]="selectedTestSuccess" [class.inline-test-error]="selectedTestSuccess === false">
              {{ selectedTestMessage }}
            </div>
          </form>
        </app-panel-container>
      </div>

      <div class="list-column">
        <app-panel-container title="Sources disponibles" subtitle="Selectionne une ligne via le bouton Modifier pour remplir le formulaire.">
          <div class="table-wrapper" *ngIf="sources.length; else emptyTpl">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Base URL</th>
                  <th>Prefix</th>
                  <th>Auth</th>
                  <th>Etat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let source of sources" [class.selected-row]="source.id === selectedSourceId">
                  <td>{{ source.name }}</td>
                  <td>{{ source.type }}</td>
                  <td class="mono">{{ source.baseUrl }}</td>
                  <td class="mono">{{ source.apiPrefix || '/' }}</td>
                  <td>{{ source.authenticationType }}</td>
                  <td>
                    <span class="chip" [class.enabled-chip]="source.enabled">{{ source.enabled ? 'Enabled' : 'Disabled' }}</span>
                  </td>
                  <td>
                    <div class="row-actions">
                      <button mat-stroked-button type="button" (click)="edit(source)">Modifier</button>
                      <button mat-stroked-button type="button" (click)="test(source)" [disabled]="testingId === source.id">
                        {{ testingId === source.id ? 'Test...' : 'Tester' }}
                      </button>
                      <button mat-stroked-button type="button" class="danger-button" (click)="remove(source)">Supprimer</button>
                    </div>
                    <div class="test-message" *ngIf="testMessages[source.id] as message">{{ message }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      grid-template-columns: minmax(380px, 460px) minmax(0, 1fr);
      gap: 1rem;
      align-items: start;
    }

    .editor-column,
    .list-column {
      min-width: 0;
    }

    .form-grid {
      display: grid;
      gap: 0.85rem;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
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

    .table-wrapper {
      overflow: auto;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.95rem 1rem;
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid var(--border-soft);
    }

    th {
      color: var(--text-secondary);
      font-weight: 700;
      background: rgba(255, 255, 255, 0.02);
    }

    .selected-row {
      background: rgba(124, 140, 255, 0.08);
    }

    .row-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
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
      margin-top: 0.6rem;
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
      .data-sources-grid {
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

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['MIMIR' as 'MIMIR' | 'LOKI', Validators.required],
    baseUrl: ['', Validators.required],
    apiPrefix: ['/prometheus', Validators.required],
    tenantId: [''],
    authenticationType: ['NONE' as 'NONE' | 'BASIC' | 'BEARER', Validators.required],
    username: [''],
    password: [''],
    token: [''],
    enabled: [true]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataSourceService: DataSourceService,
    private readonly snackbar: SnackbarService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  protected get selectedSource(): DataSourceConfig | undefined {
    return this.sources.find((source) => source.id === this.selectedSourceId);
  }

  protected get authType(): 'NONE' | 'BASIC' | 'BEARER' {
    return this.form.controls.authenticationType.getRawValue();
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
      enabled: true
    });
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
      enabled: source.enabled
    });
  }

  protected resetForm(): void {
    if (this.selectedSource) {
      this.edit(this.selectedSource);
      return;
    }
    this.beginCreate();
  }

  protected onTypeChange(type: 'MIMIR' | 'LOKI'): void {
    const currentPrefix = this.form.controls.apiPrefix.getRawValue().trim();
    const defaults = ['/prometheus', '/loki', ''];
    if (!currentPrefix || defaults.includes(currentPrefix)) {
      this.form.controls.apiPrefix.setValue(this.defaultApiPrefix(type));
    }
  }

  protected save(): void {
    if (this.form.invalid || this.saving) {
      return;
    }

    this.saving = true;
    const payload = this.toPayload();

    this.dataSourceService.save(payload, this.selectedSourceId ?? undefined).subscribe({
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

  protected testSelected(): void {
    const source = this.selectedSource;
    if (source) {
      this.test(source);
    }
  }

  protected test(source: DataSourceConfig): void {
    this.testingId = source.id;
    this.dataSourceService.test(source.id).subscribe({
      next: (result) => {
        this.testingId = null;
        this.testMessages = { ...this.testMessages, [source.id]: result.message };
        if (this.selectedSourceId === source.id) {
          this.selectedTestMessage = result.message;
          this.selectedTestSuccess = result.success;
        }
        if (result.success) {
          this.snackbar.success(`${source.name}: ${result.message}`);
        } else {
          this.snackbar.error(`${source.name}: ${result.message}`);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.testingId = null;
        const message = 'Test de connexion impossible.';
        this.testMessages = { ...this.testMessages, [source.id]: message };
        if (this.selectedSourceId === source.id) {
          this.selectedTestMessage = message;
          this.selectedTestSuccess = false;
        }
        this.snackbar.error(`Test ${source.name} impossible.`);
        this.cdr.markForCheck();
      }
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

  private toPayload(): DataSourceConfigPayload {
    const raw = this.form.getRawValue();
    return {
      name: raw.name.trim(),
      type: raw.type,
      baseUrl: raw.baseUrl.trim(),
      apiPrefix: raw.apiPrefix.trim(),
      tenantId: this.toNull(raw.tenantId),
      authenticationType: raw.authenticationType,
      username: raw.authenticationType === 'NONE' ? null : this.toNull(raw.username),
      password: raw.authenticationType === 'BASIC' ? this.toNull(raw.password) : null,
      token: raw.authenticationType === 'BEARER' ? this.toNull(raw.token) : null,
      enabled: raw.enabled
    };
  }

  private load(selectId?: number): void {
    this.dataSourceService.list().subscribe((sources) => {
      this.sources = sources;
      if (selectId != null) {
        const source = sources.find((item) => item.id === selectId);
        if (source) {
          this.edit(source);
        }
      }
      this.cdr.markForCheck();
    });
  }

  private defaultApiPrefix(type: 'MIMIR' | 'LOKI'): string {
    return type === 'MIMIR' ? '/prometheus' : '/loki';
  }

  private toNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
}
