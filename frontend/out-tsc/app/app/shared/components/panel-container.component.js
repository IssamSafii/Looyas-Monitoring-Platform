import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = ["*", [["", "panel-actions", ""]]];
const _c1 = ["*", "[panel-actions]"];
function PanelContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "div")(2, "div", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵprojection(6, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
export class PanelContainerComponent {
    constructor() {
        this.title = '';
        this.subtitle = '';
    }
    static { this.ɵfac = function PanelContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PanelContainerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PanelContainerComponent, selectors: [["app-panel-container"]], inputs: { title: "title", subtitle: "subtitle" }, standalone: true, features: [i0.ɵɵStandaloneFeature], ngContentSelectors: _c1, decls: 3, vars: 1, consts: [[1, "app-card", "surface-padding", "panel"], ["class", "panel-header", 4, "ngIf"], [1, "panel-header"], [1, "panel-title"], [1, "muted"]], template: function PanelContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵtemplate(1, PanelContainerComponent_div_1_Template, 7, 2, "div", 1);
            i0.ɵɵprojection(2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.title || ctx.subtitle);
        } }, dependencies: [NgIf], styles: [".panel[_ngcontent-%COMP%] { display: grid; gap: 1rem; min-width: 0; }\n    .panel-header[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }\n    .panel-title[_ngcontent-%COMP%] { font-size: 1rem; font-weight: 700; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PanelContainerComponent, [{
        type: Component,
        args: [{ selector: 'app-panel-container', standalone: true, imports: [NgIf], template: `
    <section class="app-card surface-padding panel">
      <div class="panel-header" *ngIf="title || subtitle">
        <div>
          <div class="panel-title">{{ title }}</div>
          <div class="muted">{{ subtitle }}</div>
        </div>
        <ng-content select="[panel-actions]"></ng-content>
      </div>
      <ng-content></ng-content>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .panel { display: grid; gap: 1rem; min-width: 0; }\n    .panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }\n    .panel-title { font-size: 1rem; font-weight: 700; }\n  "] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PanelContainerComponent, { className: "PanelContainerComponent", filePath: "src\\app\\shared\\components\\panel-container.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=panel-container.component.js.map