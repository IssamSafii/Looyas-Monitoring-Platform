import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
function LoginPageComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class LoginPageComponent {
    constructor(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.form = this.formBuilder.nonNullable.group({
            username: ['admin', [Validators.required]],
            password: ['admin', [Validators.required]]
        });
        this.hidePassword = true;
        this.loading = false;
        this.error = '';
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.error = '';
        this.authService.login(this.form.getRawValue())
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
            next: () => void this.router.navigate(['/overview']),
            error: () => {
                this.error = 'Connexion impossible. Vérifie que le backend répond et que le mot de passe admin est correct.';
            }
        });
    }
    static { this.ɵfac = function LoginPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPageComponent, selectors: [["app-login-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 40, vars: 6, consts: [[1, "login-shell"], [1, "ambient", "ambient-a"], [1, "ambient", "ambient-b"], [1, "login-panel"], [1, "login-hero"], [1, "brand"], [1, "brand-mark"], [1, "eyebrow"], [1, "hero-copy"], [1, "hero-title"], [1, "hero-text"], [1, "login-card", "app-card"], [1, "card-header"], [1, "card-title"], [1, "card-subtitle"], [3, "ngSubmit", "formGroup"], ["matInput", "", "formControlName", "username", "autocomplete", "username"], ["matInput", "", "formControlName", "password", "autocomplete", "current-password", 3, "type"], ["mat-button", "", "matSuffix", "", "type", "button", 1, "toggle-visibility", 3, "click"], ["class", "error", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "submit-button", 3, "disabled"], [1, "error"]], template: function LoginPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2);
            i0.ɵɵelementStart(3, "section", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
            i0.ɵɵtext(7, "SS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div")(9, "div", 7);
            i0.ɵɵtext(10, "Observability Platform");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "h1");
            i0.ɵɵtext(12, "Safi Stage Monitoring");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p");
            i0.ɵɵtext(14, "Monitoring unifi\u00E9 pour Mimir, Loki et votre infrastructure Kubernetes.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "div", 8)(16, "div", 9);
            i0.ɵɵtext(17, "Console d\u2019acc\u00E8s administrateur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 10);
            i0.ɵɵtext(19, "Connexion s\u00E9curis\u00E9e au backend Spring Boot. Les tokens et credentials de vos sources restent c\u00F4t\u00E9 serveur.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 11)(21, "div", 12)(22, "div", 13);
            i0.ɵɵtext(23, "Connexion");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 14);
            i0.ɵɵtext(25, "Utilise le compte administrateur configur\u00E9 au premier d\u00E9marrage.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "form", 15);
            i0.ɵɵlistener("ngSubmit", function LoginPageComponent_Template_form_ngSubmit_26_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(27, "mat-form-field")(28, "mat-label");
            i0.ɵɵtext(29, "Nom d\u2019utilisateur");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(30, "input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "mat-form-field")(32, "mat-label");
            i0.ɵɵtext(33, "Mot de passe");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "input", 17);
            i0.ɵɵelementStart(35, "button", 18);
            i0.ɵɵlistener("click", function LoginPageComponent_Template_button_click_35_listener() { return ctx.hidePassword = !ctx.hidePassword; });
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(37, LoginPageComponent_div_37_Template, 2, 1, "div", 19);
            i0.ɵɵelementStart(38, "button", 20);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(26);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("type", ctx.hidePassword ? "password" : "text");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.hidePassword ? "Afficher" : "Masquer", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading || ctx.form.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading ? "Connexion en cours..." : "Se connecter", " ");
        } }, dependencies: [NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i4.MatButton, MatFormFieldModule, i5.MatFormField, i5.MatLabel, i5.MatSuffix, MatInputModule, i6.MatInput], styles: [".login-shell[_ngcontent-%COMP%] {\n      position: relative;\n      min-height: 100vh;\n      overflow: hidden;\n      display: grid;\n      place-items: center;\n      padding: 2rem;\n      background:\n        radial-gradient(circle at 15% 20%, rgba(76, 201, 240, 0.16), transparent 24%),\n        radial-gradient(circle at 85% 12%, rgba(124, 140, 255, 0.18), transparent 22%),\n        linear-gradient(180deg, #07101d 0%, #0a1220 100%);\n    }\n\n    .ambient[_ngcontent-%COMP%] {\n      position: absolute;\n      border-radius: 999px;\n      filter: blur(72px);\n      opacity: 0.7;\n      pointer-events: none;\n    }\n\n    .ambient-a[_ngcontent-%COMP%] {\n      width: 300px;\n      height: 300px;\n      left: 8%;\n      top: 10%;\n      background: rgba(76, 201, 240, 0.14);\n    }\n\n    .ambient-b[_ngcontent-%COMP%] {\n      width: 340px;\n      height: 340px;\n      right: 6%;\n      bottom: 8%;\n      background: rgba(124, 140, 255, 0.14);\n    }\n\n    .login-panel[_ngcontent-%COMP%] {\n      position: relative;\n      z-index: 1;\n      width: min(1080px, 100%);\n      display: grid;\n      grid-template-columns: 1.05fr 0.95fr;\n      gap: 1.5rem;\n      align-items: stretch;\n    }\n\n    .login-hero[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%] {\n      padding: 2.2rem;\n      border-radius: 30px;\n    }\n\n    .login-hero[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      border: 1px solid rgba(148, 163, 184, 0.12);\n      background: linear-gradient(180deg, rgba(16, 26, 45, 0.62), rgba(10, 18, 32, 0.4));\n      backdrop-filter: blur(24px);\n    }\n\n    .brand[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n    }\n\n    .brand-mark[_ngcontent-%COMP%] {\n      width: 72px;\n      height: 72px;\n      border-radius: 24px;\n      display: grid;\n      place-items: center;\n      background: linear-gradient(135deg, #6f86ff, #4cc9f0);\n      color: white;\n      font-size: 1.5rem;\n      font-weight: 800;\n      box-shadow: 0 16px 36px rgba(76, 201, 240, 0.22);\n    }\n\n    .eyebrow[_ngcontent-%COMP%] {\n      color: var(--accent-2);\n      font-size: 0.82rem;\n      letter-spacing: 0.12em;\n      text-transform: uppercase;\n      margin-bottom: 0.55rem;\n    }\n\n    h1[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: clamp(2rem, 4vw, 3.3rem);\n      line-height: 0.98;\n      font-weight: 800;\n    }\n\n    p[_ngcontent-%COMP%] {\n      margin: 0.85rem 0 0;\n      color: var(--text-secondary);\n      max-width: 36rem;\n      font-size: 1.05rem;\n      line-height: 1.6;\n    }\n\n    .hero-copy[_ngcontent-%COMP%] {\n      padding-top: 2rem;\n      border-top: 1px solid rgba(148, 163, 184, 0.12);\n    }\n\n    .hero-title[_ngcontent-%COMP%] {\n      font-size: 1.1rem;\n      font-weight: 700;\n      margin-bottom: 0.55rem;\n    }\n\n    .hero-text[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      line-height: 1.6;\n    }\n\n    .login-card[_ngcontent-%COMP%] {\n      width: 100%;\n      align-self: center;\n      border: 1px solid rgba(148, 163, 184, 0.14);\n    }\n\n    .card-header[_ngcontent-%COMP%] {\n      margin-bottom: 1.5rem;\n    }\n\n    .card-title[_ngcontent-%COMP%] {\n      font-size: 1.5rem;\n      font-weight: 700;\n      margin-bottom: 0.35rem;\n    }\n\n    .card-subtitle[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      line-height: 1.5;\n    }\n\n    form[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1rem;\n    }\n\n    .toggle-visibility[_ngcontent-%COMP%] {\n      min-width: auto;\n      padding-inline: 0.35rem;\n      color: var(--accent-2) !important;\n      font-weight: 600;\n    }\n\n    .submit-button[_ngcontent-%COMP%] {\n      width: 100%;\n      min-height: 52px;\n      border-radius: 16px;\n      background: linear-gradient(135deg, #7c8cff, #4cc9f0) !important;\n      color: white !important;\n      font-weight: 700;\n      box-shadow: 0 18px 36px rgba(124, 140, 255, 0.24);\n    }\n\n    .submit-button[disabled][_ngcontent-%COMP%] {\n      opacity: 0.72;\n    }\n\n    .error[_ngcontent-%COMP%] {\n      color: #ff8a8a;\n      background: rgba(255, 107, 107, 0.08);\n      border: 1px solid rgba(255, 107, 107, 0.18);\n      border-radius: 14px;\n      padding: 0.85rem 1rem;\n      line-height: 1.4;\n    }\n\n    @media (max-width: 960px) {\n      .login-panel[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .login-hero[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPageComponent, [{
        type: Component,
        args: [{ selector: 'app-login-page', standalone: true, imports: [NgIf, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule], template: `
    <div class="login-shell">
      <div class="ambient ambient-a"></div>
      <div class="ambient ambient-b"></div>

      <section class="login-panel">
        <div class="login-hero">
          <div class="brand">
            <div class="brand-mark">SS</div>
            <div>
              <div class="eyebrow">Observability Platform</div>
              <h1>Safi Stage Monitoring</h1>
              <p>Monitoring unifié pour Mimir, Loki et votre infrastructure Kubernetes.</p>
            </div>
          </div>

          <div class="hero-copy">
            <div class="hero-title">Console d’accès administrateur</div>
            <div class="hero-text">Connexion sécurisée au backend Spring Boot. Les tokens et credentials de vos sources restent côté serveur.</div>
          </div>
        </div>

        <div class="login-card app-card">
          <div class="card-header">
            <div class="card-title">Connexion</div>
            <div class="card-subtitle">Utilise le compte administrateur configuré au premier démarrage.</div>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field>
              <mat-label>Nom d’utilisateur</mat-label>
              <input matInput formControlName="username" autocomplete="username">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" autocomplete="current-password">
              <button mat-button matSuffix type="button" class="toggle-visibility" (click)="hidePassword = !hidePassword">
                {{ hidePassword ? 'Afficher' : 'Masquer' }}
              </button>
            </mat-form-field>

            <div class="error" *ngIf="error">{{ error }}</div>

            <button mat-flat-button color="primary" class="submit-button" type="submit" [disabled]="loading || form.invalid">
              {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </form>
        </div>
      </section>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .login-shell {\n      position: relative;\n      min-height: 100vh;\n      overflow: hidden;\n      display: grid;\n      place-items: center;\n      padding: 2rem;\n      background:\n        radial-gradient(circle at 15% 20%, rgba(76, 201, 240, 0.16), transparent 24%),\n        radial-gradient(circle at 85% 12%, rgba(124, 140, 255, 0.18), transparent 22%),\n        linear-gradient(180deg, #07101d 0%, #0a1220 100%);\n    }\n\n    .ambient {\n      position: absolute;\n      border-radius: 999px;\n      filter: blur(72px);\n      opacity: 0.7;\n      pointer-events: none;\n    }\n\n    .ambient-a {\n      width: 300px;\n      height: 300px;\n      left: 8%;\n      top: 10%;\n      background: rgba(76, 201, 240, 0.14);\n    }\n\n    .ambient-b {\n      width: 340px;\n      height: 340px;\n      right: 6%;\n      bottom: 8%;\n      background: rgba(124, 140, 255, 0.14);\n    }\n\n    .login-panel {\n      position: relative;\n      z-index: 1;\n      width: min(1080px, 100%);\n      display: grid;\n      grid-template-columns: 1.05fr 0.95fr;\n      gap: 1.5rem;\n      align-items: stretch;\n    }\n\n    .login-hero,\n    .login-card {\n      padding: 2.2rem;\n      border-radius: 30px;\n    }\n\n    .login-hero {\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      border: 1px solid rgba(148, 163, 184, 0.12);\n      background: linear-gradient(180deg, rgba(16, 26, 45, 0.62), rgba(10, 18, 32, 0.4));\n      backdrop-filter: blur(24px);\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n    }\n\n    .brand-mark {\n      width: 72px;\n      height: 72px;\n      border-radius: 24px;\n      display: grid;\n      place-items: center;\n      background: linear-gradient(135deg, #6f86ff, #4cc9f0);\n      color: white;\n      font-size: 1.5rem;\n      font-weight: 800;\n      box-shadow: 0 16px 36px rgba(76, 201, 240, 0.22);\n    }\n\n    .eyebrow {\n      color: var(--accent-2);\n      font-size: 0.82rem;\n      letter-spacing: 0.12em;\n      text-transform: uppercase;\n      margin-bottom: 0.55rem;\n    }\n\n    h1 {\n      margin: 0;\n      font-size: clamp(2rem, 4vw, 3.3rem);\n      line-height: 0.98;\n      font-weight: 800;\n    }\n\n    p {\n      margin: 0.85rem 0 0;\n      color: var(--text-secondary);\n      max-width: 36rem;\n      font-size: 1.05rem;\n      line-height: 1.6;\n    }\n\n    .hero-copy {\n      padding-top: 2rem;\n      border-top: 1px solid rgba(148, 163, 184, 0.12);\n    }\n\n    .hero-title {\n      font-size: 1.1rem;\n      font-weight: 700;\n      margin-bottom: 0.55rem;\n    }\n\n    .hero-text {\n      color: var(--text-secondary);\n      line-height: 1.6;\n    }\n\n    .login-card {\n      width: 100%;\n      align-self: center;\n      border: 1px solid rgba(148, 163, 184, 0.14);\n    }\n\n    .card-header {\n      margin-bottom: 1.5rem;\n    }\n\n    .card-title {\n      font-size: 1.5rem;\n      font-weight: 700;\n      margin-bottom: 0.35rem;\n    }\n\n    .card-subtitle {\n      color: var(--text-secondary);\n      line-height: 1.5;\n    }\n\n    form {\n      display: grid;\n      gap: 1rem;\n    }\n\n    .toggle-visibility {\n      min-width: auto;\n      padding-inline: 0.35rem;\n      color: var(--accent-2) !important;\n      font-weight: 600;\n    }\n\n    .submit-button {\n      width: 100%;\n      min-height: 52px;\n      border-radius: 16px;\n      background: linear-gradient(135deg, #7c8cff, #4cc9f0) !important;\n      color: white !important;\n      font-weight: 700;\n      box-shadow: 0 18px 36px rgba(124, 140, 255, 0.24);\n    }\n\n    .submit-button[disabled] {\n      opacity: 0.72;\n    }\n\n    .error {\n      color: #ff8a8a;\n      background: rgba(255, 107, 107, 0.08);\n      border: 1px solid rgba(255, 107, 107, 0.18);\n      border-radius: 14px;\n      padding: 0.85rem 1rem;\n      line-height: 1.4;\n    }\n\n    @media (max-width: 960px) {\n      .login-panel {\n        grid-template-columns: 1fr;\n      }\n\n      .login-hero,\n      .login-card {\n        padding: 1.5rem;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPageComponent, { className: "LoginPageComponent", filePath: "src\\app\\features\\auth\\login-page.component.ts", lineNumber: 257 }); })();
//# sourceMappingURL=login-page.component.js.map