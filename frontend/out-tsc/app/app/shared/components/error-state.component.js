import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
function ErrorStateComponent_details_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "details")(1, "summary");
    i0.ɵɵtext(2, "Details techniques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "pre", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.details);
} }
export class ErrorStateComponent {
    constructor() {
        this.message = 'Une erreur est survenue.';
        this.details = '';
        this.retry = new EventEmitter();
    }
    static { this.ɵfac = function ErrorStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorStateComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorStateComponent, selectors: [["app-error-state"]], inputs: { message: "message", details: "details" }, outputs: { retry: "retry" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 8, vars: 2, consts: [[1, "state-card", "error"], [1, "state-title"], [1, "muted"], ["mat-stroked-button", "", "type", "button", 3, "click"], [4, "ngIf"], [1, "details"]], template: function ErrorStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2, "Impossible de recuperer les donnees.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 3);
            i0.ɵɵlistener("click", function ErrorStateComponent_Template_button_click_5_listener() { return ctx.retry.emit(); });
            i0.ɵɵtext(6, "Reessayer");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, ErrorStateComponent_details_7_Template, 5, 1, "details", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.details);
        } }, dependencies: [NgIf, MatButtonModule, i1.MatButton], styles: [".state-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.75rem;\n      padding: 1.1rem;\n      border-radius: var(--radius-md);\n    }\n    .error[_ngcontent-%COMP%] {\n      border: 1px solid rgba(255, 107, 107, 0.28);\n      background: rgba(255, 107, 107, 0.05);\n    }\n    .state-title[_ngcontent-%COMP%] {\n      font-weight: 700;\n    }\n    .details[_ngcontent-%COMP%] {\n      white-space: pre-wrap;\n      margin: 0;\n      font-size: 0.8rem;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorStateComponent, [{
        type: Component,
        args: [{ selector: 'app-error-state', standalone: true, imports: [NgIf, MatButtonModule], template: `
    <div class="state-card error">
      <div class="state-title">Impossible de recuperer les donnees.</div>
      <div class="muted">{{ message }}</div>
      <button mat-stroked-button type="button" (click)="retry.emit()">Reessayer</button>
      <details *ngIf="details">
        <summary>Details techniques</summary>
        <pre class="details">{{ details }}</pre>
      </details>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .state-card {\n      display: grid;\n      gap: 0.75rem;\n      padding: 1.1rem;\n      border-radius: var(--radius-md);\n    }\n    .error {\n      border: 1px solid rgba(255, 107, 107, 0.28);\n      background: rgba(255, 107, 107, 0.05);\n    }\n    .state-title {\n      font-weight: 700;\n    }\n    .details {\n      white-space: pre-wrap;\n      margin: 0;\n      font-size: 0.8rem;\n    }\n  "] }]
    }], null, { message: [{
            type: Input
        }], details: [{
            type: Input
        }], retry: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ErrorStateComponent, { className: "ErrorStateComponent", filePath: "src\\app\\shared\\components\\error-state.component.ts", lineNumber: 42 }); })();
//# sourceMappingURL=error-state.component.js.map