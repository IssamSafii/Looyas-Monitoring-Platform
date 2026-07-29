import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingSkeletonComponent } from './loading-skeleton.component';
import { EmptyStateComponent } from './empty-state.component';
import * as i0 from "@angular/core";
function StatCardComponent_app_loading_skeleton_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 8);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 2);
} }
function StatCardComponent_app_empty_state_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 9);
} }
function StatCardComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 10)(2, "div", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.unit);
} }
export class StatCardComponent {
    constructor() {
        this.title = '';
        this.description = '';
        this.value = '0';
        this.unit = '';
        this.status = 'neutral';
        this.lastRefresh = 'just now';
        this.loading = false;
        this.noData = false;
    }
    static { this.ɵfac = function StatCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatCardComponent, selectors: [["app-stat-card"]], inputs: { title: "title", description: "description", value: "value", unit: "unit", status: "status", lastRefresh: "lastRefresh", loading: "loading", noData: "noData" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 12, vars: 12, consts: [[1, "app-card", "surface-padding", "stat-card"], [1, "stat-top"], [1, "muted"], [1, "stat-description"], [1, "chip"], [3, "rows", 4, "ngIf"], ["title", "Aucune donnee recue pour cette periode.", 4, "ngIf"], [4, "ngIf"], [3, "rows"], ["title", "Aucune donnee recue pour cette periode."], [1, "value-row"], [1, "stat-value"], [1, "stat-unit"]], template: function StatCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "div", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, StatCardComponent_app_loading_skeleton_9_Template, 1, 1, "app-loading-skeleton", 5)(10, StatCardComponent_app_empty_state_10_Template, 1, 0, "app-empty-state", 6)(11, StatCardComponent_ng_container_11_Template, 6, 2, "ng-container", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.description);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("status-connected", ctx.status === "good")("status-degraded", ctx.status === "warn")("status-disconnected", ctx.status === "error");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.lastRefresh, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.noData);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.noData);
        } }, dependencies: [NgIf, LoadingSkeletonComponent, EmptyStateComponent], styles: [".stat-card[_ngcontent-%COMP%] { min-height: 168px; }\n    .stat-top[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 1rem; }\n    .stat-description[_ngcontent-%COMP%] { color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.88rem; }\n    .value-row[_ngcontent-%COMP%] { display: flex; align-items: baseline; gap: 0.5rem; margin-top: 0.6rem; }\n    .stat-value[_ngcontent-%COMP%] { font-size: 2rem; font-weight: 700; }\n    .stat-unit[_ngcontent-%COMP%] { color: var(--text-secondary); }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatCardComponent, [{
        type: Component,
        args: [{ selector: 'app-stat-card', standalone: true, imports: [NgIf, LoadingSkeletonComponent, EmptyStateComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .stat-card { min-height: 168px; }\n    .stat-top { display: flex; justify-content: space-between; gap: 1rem; }\n    .stat-description { color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.88rem; }\n    .value-row { display: flex; align-items: baseline; gap: 0.5rem; margin-top: 0.6rem; }\n    .stat-value { font-size: 2rem; font-weight: 700; }\n    .stat-unit { color: var(--text-secondary); }\n  "] }]
    }], null, { title: [{
            type: Input
        }], description: [{
            type: Input
        }], value: [{
            type: Input
        }], unit: [{
            type: Input
        }], status: [{
            type: Input
        }], lastRefresh: [{
            type: Input
        }], loading: [{
            type: Input
        }], noData: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatCardComponent, { className: "StatCardComponent", filePath: "src\\app\\shared\\components\\stat-card.component.ts", lineNumber: 43 }); })();
//# sourceMappingURL=stat-card.component.js.map