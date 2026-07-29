import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/time-range.service";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@angular/material/select";
import * as i4 from "@angular/material/core";
function RefreshPickerComponent_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r1.label);
} }
export class RefreshPickerComponent {
    constructor(timeRangeService) {
        this.timeRangeService = timeRangeService;
        this.options = [
            { label: 'Off', value: 0 },
            { label: '15s', value: 15000 },
            { label: '30s', value: 30000 },
            { label: '1m', value: 60000 }
        ];
    }
    static { this.ɵfac = function RefreshPickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RefreshPickerComponent)(i0.ɵɵdirectiveInject(i1.TimeRangeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RefreshPickerComponent, selectors: [["app-refresh-picker"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 2, consts: [["subscriptSizing", "dynamic"], [3, "valueChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function RefreshPickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0)(1, "mat-label");
            i0.ɵɵtext(2, "Rafra\u00EEchissement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-select", 1);
            i0.ɵɵlistener("valueChange", function RefreshPickerComponent_Template_mat_select_valueChange_3_listener($event) { return ctx.timeRangeService.refreshInterval.set($event); });
            i0.ɵɵtemplate(4, RefreshPickerComponent_mat_option_4_Template, 2, 2, "mat-option", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.timeRangeService.refreshInterval());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.options);
        } }, dependencies: [MatSelectModule, i2.MatFormField, i2.MatLabel, i3.MatSelect, i4.MatOption, NgFor], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RefreshPickerComponent, [{
        type: Component,
        args: [{
                selector: 'app-refresh-picker',
                standalone: true,
                imports: [MatSelectModule, NgFor],
                template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-label>Rafraîchissement</mat-label>
      <mat-select [value]="timeRangeService.refreshInterval()" (valueChange)="timeRangeService.refreshInterval.set($event)">
        <mat-option *ngFor="let option of options" [value]="option.value">{{ option.label }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], () => [{ type: i1.TimeRangeService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RefreshPickerComponent, { className: "RefreshPickerComponent", filePath: "src\\app\\shared\\components\\refresh-picker.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=refresh-picker.component.js.map