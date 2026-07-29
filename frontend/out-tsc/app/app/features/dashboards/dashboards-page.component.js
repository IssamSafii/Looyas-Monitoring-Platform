import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/dashboard.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
const _c0 = () => ["id", "name", "slug", "panels"];
function DashboardsPageComponent_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function DashboardsPageComponent_button_28_Template_button_click_0_listener() { const dashboard_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove(dashboard_r2.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dashboard_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Supprimer ", dashboard_r2.name, " ");
} }
export class DashboardsPageComponent {
    constructor(formBuilder, dashboardService) {
        this.formBuilder = formBuilder;
        this.dashboardService = dashboardService;
        this.dashboards = [];
        this.form = this.formBuilder.nonNullable.group({
            name: ['', Validators.required],
            slug: ['', Validators.required],
            description: ['']
        });
    }
    ngOnInit() {
        this.load();
    }
    save() {
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
    remove(id) {
        this.dashboardService.deleteDashboard(id).subscribe(() => this.load());
    }
    get rows() {
        return this.dashboards.map((dashboard) => ({
            id: dashboard.id,
            name: dashboard.name,
            slug: dashboard.slug,
            panels: dashboard.panels.length
        }));
    }
    load() {
        this.dashboardService.list().subscribe((dashboards) => (this.dashboards = dashboards));
    }
    static { this.ɵfac = function DashboardsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardsPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.DashboardService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardsPageComponent, selectors: [["app-dashboards-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 29, vars: 5, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "section-grid"], [1, "span-4"], ["title", "Nouveau dashboard"], [1, "form-grid", 3, "ngSubmit", "formGroup"], ["matInput", "", "formControlName", "name"], ["matInput", "", "formControlName", "slug"], ["matInput", "", "formControlName", "description"], ["mat-flat-button", "", "color", "primary", "type", "submit"], [1, "span-8"], ["title", "Dashboards"], [3, "columns", "rows"], [1, "actions"], ["mat-stroked-button", "", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", "type", "button", 3, "click"]], template: function DashboardsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Dashboards");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "CRUD natif pour dashboards et panels, avec import Grafana c\u00F4t\u00E9 backend.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3)(7, "div", 4)(8, "app-panel-container", 5)(9, "form", 6);
            i0.ɵɵlistener("ngSubmit", function DashboardsPageComponent_Template_form_ngSubmit_9_listener() { return ctx.save(); });
            i0.ɵɵelementStart(10, "mat-form-field")(11, "mat-label");
            i0.ɵɵtext(12, "Nom");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "mat-form-field")(15, "mat-label");
            i0.ɵɵtext(16, "Slug");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "mat-form-field")(19, "mat-label");
            i0.ɵɵtext(20, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(21, "textarea", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 10);
            i0.ɵɵtext(23, "Enregistrer");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(24, "div", 11)(25, "app-panel-container", 12);
            i0.ɵɵelement(26, "app-data-table", 13);
            i0.ɵɵelementStart(27, "div", 14);
            i0.ɵɵtemplate(28, DashboardsPageComponent_button_28_Template, 2, 1, "button", 15);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("columns", i0.ɵɵpureFunction0(4, _c0))("rows", ctx.rows);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.dashboards);
        } }, dependencies: [NgFor, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatInputModule, i5.MatInput, PanelContainerComponent, DataTableComponent], styles: [".form-grid[_ngcontent-%COMP%] { display:grid; gap:0.75rem; } .actions[_ngcontent-%COMP%] { display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardsPageComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboards-page', standalone: true, imports: [NgIf, NgFor, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, PanelContainerComponent, DataTableComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".form-grid { display:grid; gap:0.75rem; } .actions { display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1rem; }"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.DashboardService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardsPageComponent, { className: "DashboardsPageComponent", filePath: "src\\app\\features\\dashboards\\dashboards-page.component.ts", lineNumber: 50 }); })();
//# sourceMappingURL=dashboards-page.component.js.map