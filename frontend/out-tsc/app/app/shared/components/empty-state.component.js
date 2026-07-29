import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class EmptyStateComponent {
    constructor() {
        this.title = 'Aucune donnee recue pour cette periode.';
        this.description = 'Ajustez la periode, les filtres ou verifiez la source.';
    }
    static { this.ɵfac = function EmptyStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmptyStateComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { title: "title", description: "description" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 2, consts: [[1, "state-card"], [1, "state-title"], [1, "muted"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.description);
        } }, styles: [".state-card[_ngcontent-%COMP%] {\n      padding: 1.1rem;\n      border: 1px dashed var(--border-soft);\n      border-radius: var(--radius-md);\n      color: var(--text-primary);\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .state-title[_ngcontent-%COMP%] {\n      font-weight: 600;\n      margin-bottom: 0.35rem;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmptyStateComponent, [{
        type: Component,
        args: [{ selector: 'app-empty-state', standalone: true, template: `
    <div class="state-card">
      <div class="state-title">{{ title }}</div>
      <div class="muted">{{ description }}</div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .state-card {\n      padding: 1.1rem;\n      border: 1px dashed var(--border-soft);\n      border-radius: var(--radius-md);\n      color: var(--text-primary);\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .state-title {\n      font-weight: 600;\n      margin-bottom: 0.35rem;\n    }\n  "] }]
    }], null, { title: [{
            type: Input
        }], description: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src\\app\\shared\\components\\empty-state.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=empty-state.component.js.map