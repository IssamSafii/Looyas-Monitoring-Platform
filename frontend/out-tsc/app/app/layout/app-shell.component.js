import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TimeRangePickerComponent } from '../shared/components/time-range-picker.component';
import { RefreshPickerComponent } from '../shared/components/refresh-picker.component';
import * as i0 from "@angular/core";
import * as i1 from "../core/services/auth.service";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/menu";
function AppShellComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 16);
    i0.ɵɵtext(2, "Safi Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 17);
    i0.ɵɵtext(4, "Monitoring");
    i0.ɵɵelementEnd()();
} }
function AppShellComponent_a_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r2.path);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r2.label);
} }
export class AppShellComponent {
    constructor(authService) {
        this.authService = authService;
        this.collapsed = signal(false);
        this.username = computed(() => this.authService.session()?.username ?? 'admin');
        this.navItems = [
            { path: '/overview', label: 'Overview' },
            { path: '/oci', label: 'OCI Cloud' },
            { path: '/oci/compute', label: 'OCI Compute' },
            { path: '/oci/metrics', label: 'OCI Metrics' },
            { path: '/oci/logs', label: 'OCI Logs' },
            { path: '/oci/work-requests', label: 'Work Requests' },
            { path: '/metrics-explorer', label: 'Metrics Explorer' },
            { path: '/logs-explorer', label: 'Logs Explorer' },
            { path: '/dashboards', label: 'Dashboards' },
            { path: '/data-sources', label: 'Data Sources' },
            { path: '/settings', label: 'Settings' }
        ];
    }
    logout() {
        this.authService.logout();
    }
    static { this.ɵfac = function AppShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppShellComponent)(i0.ɵɵdirectiveInject(i1.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppShellComponent, selectors: [["app-shell"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 27, vars: 6, consts: [["userMenu", "matMenu"], [1, "shell"], [1, "sidebar"], [1, "brand"], [1, "brand-mark"], [4, "ngIf"], ["routerLinkActive", "active", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "main"], [1, "topbar"], [1, "breadcrumbs"], [1, "topbar-actions"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-stroked-button", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", "routerLink", "/settings"], ["mat-menu-item", "", 3, "click"], [1, "content"], [1, "brand-title"], [1, "brand-subtitle"], ["routerLinkActive", "active", 3, "routerLink"]], template: function AppShellComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1)(1, "aside", 2)(2, "div", 3)(3, "div", 4);
            i0.ɵɵtext(4, "SS");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, AppShellComponent_div_5_Template, 5, 0, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "nav");
            i0.ɵɵtemplate(7, AppShellComponent_a_7_Template, 2, 2, "a", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7)(9, "header", 8)(10, "div", 9);
            i0.ɵɵtext(11, "Safi Stage Monitoring Platform");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 10);
            i0.ɵɵelement(13, "app-time-range-picker")(14, "app-refresh-picker");
            i0.ɵɵelementStart(15, "button", 11);
            i0.ɵɵlistener("click", function AppShellComponent_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.collapsed.set(!ctx.collapsed())); });
            i0.ɵɵtext(16, "Menu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 12);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "mat-menu", null, 0)(21, "button", 13);
            i0.ɵɵtext(22, "Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 14);
            i0.ɵɵlistener("click", function AppShellComponent_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.logout()); });
            i0.ɵɵtext(24, "D\u00E9connexion");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "main", 15);
            i0.ɵɵelement(26, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const userMenu_r3 = i0.ɵɵreference(20);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("collapsed", ctx.collapsed());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("matMenuTriggerFor", userMenu_r3);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.username());
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, MatButtonModule, i2.MatButton, MatMenuModule, i3.MatMenu, i3.MatMenuItem, i3.MatMenuTrigger, TimeRangePickerComponent, RefreshPickerComponent], styles: [".shell[_ngcontent-%COMP%] { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }\n    .sidebar[_ngcontent-%COMP%] { position: sticky; top: 0; height: 100vh; padding: 1.2rem; background: rgba(8, 14, 25, 0.92); border-right: 1px solid var(--border-soft); backdrop-filter: blur(20px); }\n    .sidebar.collapsed[_ngcontent-%COMP%] { width: 92px; }\n    .brand[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.8rem; }\n    .brand-mark[_ngcontent-%COMP%] { width: 46px; height: 46px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; font-weight: 700; }\n    .brand-title[_ngcontent-%COMP%] { font-weight: 700; }\n    .brand-subtitle[_ngcontent-%COMP%] { color: var(--text-secondary); font-size: 0.9rem; }\n    nav[_ngcontent-%COMP%] { display: grid; gap: 0.45rem; }\n    nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { text-decoration: none; color: var(--text-secondary); padding: 0.85rem 1rem; border-radius: 14px; transition: all 180ms ease; }\n    nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { color: var(--text-primary); background: rgba(124, 140, 255, 0.12); border: 1px solid rgba(124, 140, 255, 0.16); }\n    .main[_ngcontent-%COMP%] { display: grid; grid-template-rows: auto 1fr; min-width: 0; }\n    .topbar[_ngcontent-%COMP%] { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-soft); background: rgba(10, 18, 31, 0.82); backdrop-filter: blur(20px); z-index: 5; }\n    .topbar-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: flex-end; }\n    .content[_ngcontent-%COMP%] { padding: 1.5rem; }\n    .breadcrumbs[_ngcontent-%COMP%] { color: var(--text-secondary); }\n    @media (max-width: 980px) {\n      .shell[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .sidebar[_ngcontent-%COMP%] { position: relative; height: auto; }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppShellComponent, [{
        type: Component,
        args: [{ selector: 'app-shell', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, MatButtonModule, MatMenuModule, TimeRangePickerComponent, RefreshPickerComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }\n    .sidebar { position: sticky; top: 0; height: 100vh; padding: 1.2rem; background: rgba(8, 14, 25, 0.92); border-right: 1px solid var(--border-soft); backdrop-filter: blur(20px); }\n    .sidebar.collapsed { width: 92px; }\n    .brand { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.8rem; }\n    .brand-mark { width: 46px; height: 46px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; font-weight: 700; }\n    .brand-title { font-weight: 700; }\n    .brand-subtitle { color: var(--text-secondary); font-size: 0.9rem; }\n    nav { display: grid; gap: 0.45rem; }\n    nav a { text-decoration: none; color: var(--text-secondary); padding: 0.85rem 1rem; border-radius: 14px; transition: all 180ms ease; }\n    nav a.active, nav a:hover { color: var(--text-primary); background: rgba(124, 140, 255, 0.12); border: 1px solid rgba(124, 140, 255, 0.16); }\n    .main { display: grid; grid-template-rows: auto 1fr; min-width: 0; }\n    .topbar { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-soft); background: rgba(10, 18, 31, 0.82); backdrop-filter: blur(20px); z-index: 5; }\n    .topbar-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: flex-end; }\n    .content { padding: 1.5rem; }\n    .breadcrumbs { color: var(--text-secondary); }\n    @media (max-width: 980px) {\n      .shell { grid-template-columns: 1fr; }\n      .sidebar { position: relative; height: auto; }\n    }\n  "] }]
    }], () => [{ type: i1.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppShellComponent, { className: "AppShellComponent", filePath: "src\\app\\layout\\app-shell.component.ts", lineNumber: 72 }); })();
//# sourceMappingURL=app-shell.component.js.map