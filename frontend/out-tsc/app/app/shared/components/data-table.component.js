import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import * as i0 from "@angular/core";
function DataTableComponent_app_empty_state_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state");
} }
function DataTableComponent_div_1_th_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r1);
} }
function DataTableComponent_div_1_tr_6_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r2 = ctx.$implicit;
    const row_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r3[column_r2]);
} }
function DataTableComponent_div_1_tr_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, DataTableComponent_div_1_tr_6_td_1_Template, 2, 1, "td", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.columns);
} }
function DataTableComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "table")(2, "thead")(3, "tr");
    i0.ɵɵtemplate(4, DataTableComponent_div_1_th_4_Template, 2, 1, "th", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "tbody");
    i0.ɵɵtemplate(6, DataTableComponent_div_1_tr_6_Template, 2, 1, "tr", 3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.columns);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.rows);
} }
export class DataTableComponent {
    constructor() {
        this.columns = [];
        this.rows = [];
    }
    static { this.ɵfac = function DataTableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataTableComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataTableComponent, selectors: [["app-data-table"]], inputs: { columns: "columns", rows: "rows" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], [1, "table-wrapper"], [4, "ngFor", "ngForOf"]], template: function DataTableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DataTableComponent_app_empty_state_0_Template, 1, 0, "app-empty-state", 0)(1, DataTableComponent_div_1_Template, 7, 2, "div", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.rows.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.rows.length);
        } }, dependencies: [NgIf, NgFor, EmptyStateComponent], styles: [".table-wrapper[_ngcontent-%COMP%] { overflow: auto; border: 1px solid var(--border-soft); border-radius: var(--radius-md); }\n    table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; }\n    th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding: 0.85rem 0.9rem; text-align: left; border-bottom: 1px solid var(--border-soft); }\n    th[_ngcontent-%COMP%] { color: var(--text-secondary); font-weight: 600; background: rgba(255,255,255,0.02); }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataTableComponent, [{
        type: Component,
        args: [{ selector: 'app-data-table', standalone: true, imports: [NgIf, NgFor, EmptyStateComponent], template: `
    <app-empty-state *ngIf="!rows.length"></app-empty-state>
    <div class="table-wrapper" *ngIf="rows.length">
      <table>
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .table-wrapper { overflow: auto; border: 1px solid var(--border-soft); border-radius: var(--radius-md); }\n    table { width: 100%; border-collapse: collapse; }\n    th, td { padding: 0.85rem 0.9rem; text-align: left; border-bottom: 1px solid var(--border-soft); }\n    th { color: var(--text-secondary); font-weight: 600; background: rgba(255,255,255,0.02); }\n  "] }]
    }], null, { columns: [{
            type: Input
        }], rows: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DataTableComponent, { className: "DataTableComponent", filePath: "src\\app\\shared\\components\\data-table.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=data-table.component.js.map