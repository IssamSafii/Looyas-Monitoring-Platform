import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import * as i0 from "@angular/core";
function LoadingSkeletonComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} }
export class LoadingSkeletonComponent {
    constructor() {
        this.rows = 5;
    }
    get rowsArray() {
        return Array.from({ length: this.rows }, (_, index) => index);
    }
    static { this.ɵfac = function LoadingSkeletonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingSkeletonComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoadingSkeletonComponent, selectors: [["app-loading-skeleton"]], inputs: { rows: "rows" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 1, consts: [[1, "skeleton-wrapper"], ["class", "skeleton-line", 4, "ngFor", "ngForOf"], [1, "skeleton-line"]], template: function LoadingSkeletonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, LoadingSkeletonComponent_div_1_Template, 1, 0, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.rowsArray);
        } }, dependencies: [NgFor], styles: [".skeleton-wrapper[_ngcontent-%COMP%] { display: grid; gap: 0.8rem; }\n    .skeleton-line[_ngcontent-%COMP%] {\n      height: 18px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.12), rgba(255,255,255,0.05));\n      background-size: 200% 100%;\n      animation: _ngcontent-%COMP%_shimmer 1.3s infinite linear;\n    }\n    @keyframes _ngcontent-%COMP%_shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingSkeletonComponent, [{
        type: Component,
        args: [{ selector: 'app-loading-skeleton', standalone: true, imports: [NgFor], template: `
    <div class="skeleton-wrapper">
      <div *ngFor="let _ of rowsArray" class="skeleton-line"></div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .skeleton-wrapper { display: grid; gap: 0.8rem; }\n    .skeleton-line {\n      height: 18px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.12), rgba(255,255,255,0.05));\n      background-size: 200% 100%;\n      animation: shimmer 1.3s infinite linear;\n    }\n    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }\n  "] }]
    }], null, { rows: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoadingSkeletonComponent, { className: "LoadingSkeletonComponent", filePath: "src\\app\\shared\\components\\loading-skeleton.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=loading-skeleton.component.js.map