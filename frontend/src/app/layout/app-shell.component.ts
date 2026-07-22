import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../core/services/auth.service';
import { TimeRangePickerComponent } from '../shared/components/time-range-picker.component';
import { RefreshPickerComponent } from '../shared/components/refresh-picker.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, MatButtonModule, MatMenuModule, TimeRangePickerComponent, RefreshPickerComponent],
  template: `
    <div class="shell">
      <aside class="sidebar" [class.collapsed]="collapsed()">
        <div class="brand">
          <div class="brand-mark">SS</div>
          <div *ngIf="!collapsed()">
            <div class="brand-title">Safi Stage</div>
            <div class="brand-subtitle">Monitoring</div>
          </div>
        </div>
        <nav>
          <a *ngFor="let item of navItems" [routerLink]="item.path" routerLinkActive="active">{{ item.label }}</a>
        </nav>
      </aside>

      <div class="main">
        <header class="topbar">
          <div class="breadcrumbs">Safi Stage Monitoring Platform</div>
          <div class="topbar-actions">
            <app-time-range-picker />
            <app-refresh-picker />
            <button mat-stroked-button type="button" (click)="collapsed.set(!collapsed())">Menu</button>
            <button mat-stroked-button [matMenuTriggerFor]="userMenu">{{ username() }}</button>
            <mat-menu #userMenu="matMenu">
              <button mat-menu-item routerLink="/settings">Settings</button>
              <button mat-menu-item (click)="logout()">Déconnexion</button>
            </mat-menu>
          </div>
        </header>
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
    .sidebar { position: sticky; top: 0; height: 100vh; padding: 1.2rem; background: rgba(8, 14, 25, 0.92); border-right: 1px solid var(--border-soft); backdrop-filter: blur(20px); }
    .sidebar.collapsed { width: 92px; }
    .brand { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.8rem; }
    .brand-mark { width: 46px; height: 46px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; font-weight: 700; }
    .brand-title { font-weight: 700; }
    .brand-subtitle { color: var(--text-secondary); font-size: 0.9rem; }
    nav { display: grid; gap: 0.45rem; }
    nav a { text-decoration: none; color: var(--text-secondary); padding: 0.85rem 1rem; border-radius: 14px; transition: all 180ms ease; }
    nav a.active, nav a:hover { color: var(--text-primary); background: rgba(124, 140, 255, 0.12); border: 1px solid rgba(124, 140, 255, 0.16); }
    .main { display: grid; grid-template-rows: auto 1fr; min-width: 0; }
    .topbar { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-soft); background: rgba(10, 18, 31, 0.82); backdrop-filter: blur(20px); z-index: 5; }
    .topbar-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: flex-end; }
    .content { padding: 1.5rem; }
    .breadcrumbs { color: var(--text-secondary); }
    @media (max-width: 980px) {
      .shell { grid-template-columns: 1fr; }
      .sidebar { position: relative; height: auto; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  protected readonly collapsed = signal(false);
  protected readonly username = computed(() => this.authService.session()?.username ?? 'admin');
  protected readonly navItems = [
    { path: '/overview', label: 'Overview' },
    { path: '/infrastructure', label: 'Infrastructure' },
    { path: '/kubernetes', label: 'Kubernetes' },
    { path: '/metrics-explorer', label: 'Metrics Explorer' },
    { path: '/logs-explorer', label: 'Logs Explorer' },
    { path: '/dashboards', label: 'Dashboards' },
    { path: '/data-sources', label: 'Data Sources' },
    { path: '/settings', label: 'Settings' }
  ];

  constructor(private readonly authService: AuthService) {}

  protected logout(): void {
    this.authService.logout();
  }
}
