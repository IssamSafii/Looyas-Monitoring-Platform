import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/time-range.service";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@angular/material/select";
import * as i4 from "@angular/material/core";
function TimeRangePickerComponent_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r1.label);
} }
export class TimeRangePickerComponent {
    constructor(timeRangeService) {
        this.timeRangeService = timeRangeService;
    }
    update(value) {
        const match = this.timeRangeService.options.find((option) => option.value === value);
        if (match) {
            this.timeRangeService.selected.set(match);
        }
    }
    static { this.ɵfac = function TimeRangePickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimeRangePickerComponent)(i0.ɵɵdirectiveInject(i1.TimeRangeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TimeRangePickerComponent, selectors: [["app-time-range-picker"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 2, consts: [["subscriptSizing", "dynamic"], [3, "valueChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function TimeRangePickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0)(1, "mat-label");
            i0.ɵɵtext(2, "P\u00E9riode");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-select", 1);
            i0.ɵɵlistener("valueChange", function TimeRangePickerComponent_Template_mat_select_valueChange_3_listener($event) { return ctx.update($event); });
            i0.ɵɵtemplate(4, TimeRangePickerComponent_mat_option_4_Template, 2, 2, "mat-option", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.timeRangeService.selected().value);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.timeRangeService.options);
        } }, dependencies: [MatSelectModule, i2.MatFormField, i2.MatLabel, i3.MatSelect, i4.MatOption, NgFor], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimeRangePickerComponent, [{
        type: Component,
        args: [{
                selector: 'app-time-range-picker',
                standalone: true,
                imports: [MatSelectModule, NgFor],
                template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-label>Période</mat-label>
      <mat-select [value]="timeRangeService.selected().value" (valueChange)="update($event)">
        <mat-option *ngFor="let option of timeRangeService.options" [value]="option.value">{{ option.label }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], () => [{ type: i1.TimeRangeService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TimeRangePickerComponent, { className: "TimeRangePickerComponent", filePath: "src\\app\\shared\\components\\time-range-picker.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=time-range-picker.component.js.map