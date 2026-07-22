import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { Dashboard } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboards-page',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, PanelContainerComponent, DataTableComponent],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboards</h1>
        <div class="page-subtitle">CRUD natif pour dashboards et panels, avec import Grafana côté backend.</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="span-4">
        <app-panel-container title="Nouveau dashboard">
          <form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
            <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="name"></mat-form-field>
            <mat-form-field><mat-label>Slug</mat-label><input matInput formControlName="slug"></mat-form-field>
            <mat-form-field><mat-label>Description</mat-label><textarea matInput formControlName="description"></textarea></mat-form-field>
            <button mat-flat-button color="primary" type="submit">Enregistrer</button>
          </form>
        </app-panel-container>
      </div>
      <div class="span-8">
        <app-panel-container title="Dashboards">
          <app-data-table [columns]="['id', 'name', 'slug', 'panels']" [rows]="rows"></app-data-table>
          <div class="actions">
            <button *ngFor="let dashboard of dashboards" mat-stroked-button type="button" (click)="remove(dashboard.id)">
              Supprimer {{ dashboard.name }}
            </button>
          </div>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: ['.form-grid { display:grid; gap:0.75rem; } .actions { display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardsPageComponent implements OnInit {
  protected dashboards: Dashboard[] = [];
  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    description: ['']
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  protected save(): void {
    if (this.form.invalid) {
      return;
    }
    this.dashboardService.saveDashboard({
      ...this.form.getRawValue(),
      enabled: true,
      icon: 'dashboard',
      refreshInterval: '30s',
      defaultTimeRange: '1h'
    }).subscribe(() => {
      this.form.reset({ name: '', slug: '', description: '' });
      this.load();
    });
  }

  protected remove(id: number): void {
    this.dashboardService.deleteDashboard(id).subscribe(() => this.load());
  }

  protected get rows(): Record<string, unknown>[] {
    return this.dashboards.map((dashboard) => ({
      id: dashboard.id,
      name: dashboard.name,
      slug: dashboard.slug,
      panels: dashboard.panels.length
    }));
  }

  private load(): void {
    this.dashboardService.list().subscribe((dashboards) => (this.dashboards = dashboards));
  }
}
