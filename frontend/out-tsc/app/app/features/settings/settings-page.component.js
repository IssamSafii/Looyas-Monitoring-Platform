import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/auth.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
export class SettingsPageComponent {
    constructor(formBuilder, authService) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.form = this.formBuilder.nonNullable.group({
            currentPassword: ['', [Validators.required, Validators.minLength(4)]],
            newPassword: ['', [Validators.required, Validators.minLength(4)]]
        });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        this.authService.changePassword(this.form.getRawValue()).subscribe();
    }
    static { this.ɵfac = function SettingsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SettingsPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SettingsPageComponent, selectors: [["app-settings-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 20, vars: 1, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "section-grid"], [1, "span-6"], ["title", "Changer le mot de passe"], [1, "form-grid", 3, "ngSubmit", "formGroup"], ["matInput", "", "type", "password", "formControlName", "currentPassword"], ["matInput", "", "type", "password", "formControlName", "newPassword"], ["mat-flat-button", "", "color", "primary", "type", "submit"]], template: function SettingsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Modification du mot de passe administrateur.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3)(7, "div", 4)(8, "app-panel-container", 5)(9, "form", 6);
            i0.ɵɵlistener("ngSubmit", function SettingsPageComponent_Template_form_ngSubmit_9_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(10, "mat-form-field")(11, "mat-label");
            i0.ɵɵtext(12, "Mot de passe actuel");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "mat-form-field")(15, "mat-label");
            i0.ɵɵtext(16, "Nouveau mot de passe");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 9);
            i0.ɵɵtext(19, "Mettre \u00E0 jour");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.form);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatInputModule, i5.MatInput, PanelContainerComponent], styles: [".form-grid[_ngcontent-%COMP%] { display:grid; gap:0.75rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsPageComponent, [{
        type: Component,
        args: [{ selector: 'app-settings-page', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, PanelContainerComponent], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Settings</h1>
        <div class="page-subtitle">Modification du mot de passe administrateur.</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="span-6">
        <app-panel-container title="Changer le mot de passe">
          <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
            <mat-form-field><mat-label>Mot de passe actuel</mat-label><input matInput type="password" formControlName="currentPassword"></mat-form-field>
            <mat-form-field><mat-label>Nouveau mot de passe</mat-label><input matInput type="password" formControlName="newPassword"></mat-form-field>
            <button mat-flat-button color="primary" type="submit">Mettre à jour</button>
          </form>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".form-grid { display:grid; gap:0.75rem; }"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SettingsPageComponent, { className: "SettingsPageComponent", filePath: "src\\app\\features\\settings\\settings-page.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=settings-page.component.js.map