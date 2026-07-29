import { authGuard } from './core/guards/auth.guard';
export const appRoutes = [
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
            { path: 'oci', loadComponent: () => import('./features/oci/oci-overview-page.component').then((m) => m.OciOverviewPageComponent) },
            { path: 'oci/compute', loadComponent: () => import('./features/oci/oci-compute-page.component').then((m) => m.OciComputePageComponent) },
            { path: 'oci/metrics', loadComponent: () => import('./features/oci/oci-metrics-explorer-page.component').then((m) => m.OciMetricsExplorerPageComponent) },
            { path: 'oci/logs', loadComponent: () => import('./features/oci/oci-logs-explorer-page.component').then((m) => m.OciLogsExplorerPageComponent) },
            { path: 'oci/work-requests', loadComponent: () => import('./features/oci/oci-work-requests-page.component').then((m) => m.OciWorkRequestsPageComponent) },
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
//# sourceMappingURL=app.routes.js.map