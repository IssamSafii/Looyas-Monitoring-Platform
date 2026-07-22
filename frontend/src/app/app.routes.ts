import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-page.component').then((m) => m.LoginPageComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', loadComponent: () => import('./features/overview/overview-page.component').then((m) => m.OverviewPageComponent) },
      { path: 'infrastructure', loadComponent: () => import('./features/infrastructure/infrastructure-page.component').then((m) => m.InfrastructurePageComponent) },
      { path: 'kubernetes', loadComponent: () => import('./features/kubernetes/kubernetes-page.component').then((m) => m.KubernetesPageComponent) },
      { path: 'metrics-explorer', loadComponent: () => import('./features/metrics-explorer/metrics-explorer-page.component').then((m) => m.MetricsExplorerPageComponent) },
      { path: 'logs-explorer', loadComponent: () => import('./features/logs-explorer/logs-explorer-page.component').then((m) => m.LogsExplorerPageComponent) },
      { path: 'dashboards', loadComponent: () => import('./features/dashboards/dashboards-page.component').then((m) => m.DashboardsPageComponent) },
      { path: 'data-sources', loadComponent: () => import('./features/data-sources/data-sources-page.component').then((m) => m.DataSourcesPageComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings-page.component').then((m) => m.SettingsPageComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
