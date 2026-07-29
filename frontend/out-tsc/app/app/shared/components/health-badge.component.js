import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import * as i0 from "@angular/core";
export class HealthBadgeComponent {
    get label() {
        return this.status === 'CONNECTED' ? 'Connected'
            : this.status === 'DEGRADED' ? 'Degraded'
                : this.status === 'DISCONNECTED' ? 'Disconnected'
                    : 'Unknown';
    }
    get badgeClass() {
        return `status-${this.label.toLowerCase()}`;
    }
    static { this.ɵfac = function HealthBadgeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HealthBadgeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HealthBadgeComponent, selectors: [["app-health-badge"]], inputs: { status: "status" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 2, consts: [[1, "chip", 3, "ngClass"]], template: function HealthBadgeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", ctx.badgeClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
        } }, dependencies: [NgClass], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HealthBadgeComponent, [{
        type: Component,
        args: [{
                selector: 'app-health-badge',
                standalone: true,
                imports: [NgClass],
                template: `
    <span class="chip" [ngClass]="badgeClass">
      {{ label }}
    </span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], null, { status: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HealthBadgeComponent, { className: "HealthBadgeComponent", filePath: "src\\app\\shared\\components\\health-badge.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=health-badge.component.js.map