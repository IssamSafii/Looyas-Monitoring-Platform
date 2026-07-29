import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingSkeletonComponent } from './loading-skeleton.component';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgIf, LoadingSkeletonComponent, EmptyStateComponent],
  template: `
    <section class="app-card surface-padding stat-card">
      <div class="stat-top">
        <div>
          <div class="muted">{{ title }}</div>
          <div class="stat-description">{{ description }}</div>
        </div>
        <div class="chip" [class.status-connected]="status === 'good'" [class.status-degraded]="status === 'warn'" [class.status-disconnected]="status === 'error'">
          {{ lastRefresh }}
        </div>
      </div>

      <app-loading-skeleton *ngIf="loading" [rows]="2" />
      <app-empty-state *ngIf="!loading && noData" title="Aucune donnee recue pour cette periode." />

      <ng-container *ngIf="!loading && !noData">
        <div class="value-row">
          <div class="stat-value">{{ value }}</div>
          <div class="stat-unit">{{ unit }}</div>
        </div>
      </ng-container>
    </section>
  `,
  styles: [`
    .stat-card { min-height: 168px; }
    .stat-top { display: flex; justify-content: space-between; gap: 1rem; }
    .stat-description { color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.88rem; }
    .value-row { display: flex; align-items: baseline; gap: 0.5rem; margin-top: 0.6rem; }
    .stat-value { font-size: 2rem; font-weight: 700; }
    .stat-unit { color: var(--text-secondary); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() value = '0';
  @Input() unit = '';
  @Input() status: 'good' | 'warn' | 'error' | 'neutral' = 'neutral';
  @Input() lastRefresh = 'just now';
  @Input() loading = false;
  @Input() noData = false;
}
