import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/material/button";
export class QueryEditorComponent {
    constructor() {
        this.label = 'Query';
        this.execute = new EventEmitter();
        this.copy = new EventEmitter();
        this.control = new FormControl('', { nonNullable: true });
    }
    set value(value) {
        this.control.setValue(value, { emitEvent: false });
    }
    static { this.ɵfac = function QueryEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QueryEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QueryEditorComponent, selectors: [["app-query-editor"]], inputs: { label: "label", value: "value" }, outputs: { execute: "execute", copy: "copy" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 10, vars: 2, consts: [[1, "editor-actions"], ["subscriptSizing", "dynamic", "appearance", "outline", 1, "editor-field"], ["matInput", "", "rows", "4", "spellcheck", "false", 3, "formControl"], [1, "actions"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click"]], template: function QueryEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "textarea", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "button", 4);
            i0.ɵɵlistener("click", function QueryEditorComponent_Template_button_click_6_listener() { return ctx.copy.emit(ctx.control.getRawValue()); });
            i0.ɵɵtext(7, "Copier");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 5);
            i0.ɵɵlistener("click", function QueryEditorComponent_Template_button_click_8_listener() { return ctx.execute.emit(ctx.control.getRawValue()); });
            i0.ɵɵtext(9, "Executer");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formControl", ctx.control);
        } }, dependencies: [ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlDirective, MatFormFieldModule, i2.MatFormField, i2.MatLabel, MatInputModule, i3.MatInput, MatButtonModule, i4.MatButton], styles: [".editor-actions[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .editor-field[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n    .editor-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n      min-height: 108px;\n      font-family: Consolas, \"Courier New\", monospace;\n      font-size: 0.88rem;\n      line-height: 1.5;\n    }\n    .actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n      justify-content: flex-end;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QueryEditorComponent, [{
        type: Component,
        args: [{ selector: 'app-query-editor', standalone: true, imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule], template: `
    <div class="editor-actions">
      <mat-form-field class="editor-field" subscriptSizing="dynamic" appearance="outline">
        <mat-label>{{ label }}</mat-label>
        <textarea matInput rows="4" [formControl]="control" spellcheck="false"></textarea>
      </mat-form-field>

      <div class="actions">
        <button mat-stroked-button type="button" (click)="copy.emit(control.getRawValue())">Copier</button>
        <button mat-flat-button color="primary" type="button" (click)="execute.emit(control.getRawValue())">Executer</button>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .editor-actions {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .editor-field {\n      width: 100%;\n    }\n    .editor-field textarea {\n      min-height: 108px;\n      font-family: Consolas, \"Courier New\", monospace;\n      font-size: 0.88rem;\n      line-height: 1.5;\n    }\n    .actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n      justify-content: flex-end;\n    }\n  "] }]
    }], null, { label: [{
            type: Input
        }], value: [{
            type: Input
        }], execute: [{
            type: Output
        }], copy: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QueryEditorComponent, { className: "QueryEditorComponent", filePath: "src\\app\\shared\\components\\query-editor.component.ts", lineNumber: 47 }); })();
//# sourceMappingURL=query-editor.component.js.map