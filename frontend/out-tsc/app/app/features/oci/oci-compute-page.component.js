import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/oci.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/select";
import * as i7 from "@angular/material/core";
function OciComputePageComponent_app_loading_skeleton_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 25);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 8);
} }
function OciComputePageComponent_app_empty_state_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 26);
} }
function OciComputePageComponent_app_empty_state_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 27);
} }
function OciComputePageComponent_app_error_state_38_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 28);
    i0.ɵɵlistener("retry", function OciComputePageComponent_app_error_state_38_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.errorMessage)("details", ctx_r1.errorDetails);
} }
function OciComputePageComponent_div_39_table_1_tr_22_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 32);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 33);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td")(24, "button", 4);
    i0.ɵɵlistener("click", function OciComputePageComponent_div_39_table_1_tr_22_Template_button_click_24_listener() { const instance_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.showDetails(instance_r4)); });
    i0.ɵɵtext(25, "Detail");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const instance_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(instance_r4.displayName || instance_r4.maskedId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r4.maskedId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(instance_r4.lifecycleState);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r4.shape || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r4.availabilityDomain || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r4.faultDomain || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r4.cpuCurrent == null ? "-" : i0.ɵɵpipeBind2(17, 9, instance_r4.cpuCurrent, "1.0-2") + " %");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(instance_r4.region || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(22, 12, instance_r4.timeCreated, "short"));
} }
function OciComputePageComponent_div_39_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table")(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Shape");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Availability Domain");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Fault Domain");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "CPU actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Region");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Date de creation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵtemplate(22, OciComputePageComponent_div_39_table_1_tr_22_Template, 26, 15, "tr", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredInstances);
} }
function OciComputePageComponent_div_39_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 34);
} }
function OciComputePageComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, OciComputePageComponent_div_39_table_1_Template, 23, 1, "table", 30)(2, OciComputePageComponent_div_39_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filteredEmptyTpl_r5 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.filteredInstances.length)("ngIfElse", filteredEmptyTpl_r5);
} }
function OciComputePageComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "app-panel-container", 35)(2, "div", 36)(3, "div", 37)(4, "span");
    i0.ɵɵtext(5, "ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 37)(9, "span");
    i0.ɵɵtext(10, "Compartment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong", 38);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 37)(14, "span");
    i0.ɵɵtext(15, "Shape");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 37)(19, "span");
    i0.ɵɵtext(20, "CPU actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 37)(25, "span");
    i0.ɵɵtext(26, "AD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "strong");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 37)(30, "span");
    i0.ɵɵtext(31, "FD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "strong");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", ctx_r1.selectedInstance.displayName || ctx_r1.selectedInstance.maskedId);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.maskedId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.maskedCompartmentId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.shape || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.cpuCurrent == null ? "-" : i0.ɵɵpipeBind2(23, 7, ctx_r1.selectedInstance.cpuCurrent, "1.0-2") + " %");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.availabilityDomain || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedInstance.faultDomain || "-");
} }
export class OciComputePageComponent {
    constructor(formBuilder, ociService, cdr) {
        this.formBuilder = formBuilder;
        this.ociService = ociService;
        this.cdr = cdr;
        this.state = 'loading';
        this.errorMessage = '';
        this.errorDetails = '';
        this.instances = [];
        this.selectedInstance = null;
        this.filtersForm = this.formBuilder.nonNullable.group({
            search: [''],
            state: ['ALL']
        });
    }
    ngOnInit() {
        this.load();
        this.filtersForm.valueChanges.subscribe(() => this.cdr.markForCheck());
    }
    load() {
        this.state = 'loading';
        this.errorMessage = '';
        this.errorDetails = '';
        this.selectedInstance = null;
        this.ociService.computeInstances().subscribe({
            next: (instances) => {
                this.instances = instances;
                this.state = instances.length ? 'ready' : 'empty';
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.instances = [];
                const code = this.extractErrorCode(error);
                if (code === 'OCI_NOT_CONFIGURED') {
                    this.state = 'not-configured';
                }
                else {
                    this.state = 'error';
                    this.errorMessage = this.extractErrorMessage(error, 'Impossible de charger les instances OCI.');
                    this.errorDetails = this.extractErrorDetails(error);
                }
                this.cdr.markForCheck();
            }
        });
    }
    showDetails(instance) {
        this.ociService.computeInstance(instance.id).subscribe({
            next: (details) => {
                this.selectedInstance = details;
                this.cdr.markForCheck();
            },
            error: () => {
                this.selectedInstance = instance;
                this.cdr.markForCheck();
            }
        });
    }
    get filteredInstances() {
        const search = this.filtersForm.controls.search.getRawValue().trim().toLowerCase();
        const state = this.filtersForm.controls.state.getRawValue();
        return this.instances.filter((instance) => {
            const stateMatch = state === 'ALL' || instance.lifecycleState === state;
            const haystack = [
                instance.displayName,
                instance.shape,
                instance.availabilityDomain,
                instance.faultDomain,
                instance.region,
                instance.maskedId
            ].join(' ').toLowerCase();
            return stateMatch && (!search || haystack.includes(search));
        });
    }
    extractErrorCode(error) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            return (error.error?.code) || '';
        }
        return '';
    }
    extractErrorMessage(error, fallback) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const payload = error.error;
            if (payload?.message) {
                return payload.message;
            }
        }
        return fallback;
    }
    extractErrorDetails(error) {
        try {
            return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        }
        catch {
            return '';
        }
    }
    static { this.ɵfac = function OciComputePageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciComputePageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OciService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OciComputePageComponent, selectors: [["app-oci-compute-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 41, vars: 8, consts: [["filteredEmptyTpl", ""], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "section-grid"], [1, "span-12"], ["title", "Filtres", "subtitle", "Recherche locale sur le resultat OCI deja charge."], [1, "filters-grid", 3, "formGroup"], ["matInput", "", "formControlName", "search", "placeholder", "Nom, shape, AD, region"], ["formControlName", "state"], ["value", "ALL"], ["value", "RUNNING"], ["value", "STOPPED"], ["value", "STARTING"], ["value", "STOPPING"], ["value", "TERMINATED"], ["title", "Instances OCI", "subtitle", "Tableau responsive et detail a la demande."], [3, "ngSwitch"], [3, "rows", 4, "ngSwitchCase"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree.", 4, "ngSwitchCase"], ["title", "Aucune instance", "description", "Aucune instance Compute n'a ete retournee pour ce compartment.", 4, "ngSwitchCase"], [3, "message", "details", "retry", 4, "ngSwitchCase"], ["class", "table-wrapper", 4, "ngSwitchCase"], ["class", "span-12", 4, "ngIf"], [3, "rows"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree."], ["title", "Aucune instance", "description", "Aucune instance Compute n'a ete retournee pour ce compartment."], [3, "retry", "message", "details"], [1, "table-wrapper"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"], [1, "muted", "monospace"], [1, "chip"], ["title", "Aucun resultat", "description", "Aucune instance ne correspond aux filtres actifs."], ["subtitle", "Detail OCI retourne par le backend.", 3, "title"], [1, "detail-grid"], [1, "detail-card"], [1, "monospace"]], template: function OciComputePageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "h1", 2);
            i0.ɵɵtext(3, "OCI Compute");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtext(5, "Inventaire des instances Compute, filtrage local et vue detaillee sans operation d'ecriture.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 4);
            i0.ɵɵlistener("click", function OciComputePageComponent_Template_button_click_6_listener() { return ctx.load(); });
            i0.ɵɵtext(7, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5)(9, "div", 6)(10, "app-panel-container", 7)(11, "form", 8)(12, "mat-form-field")(13, "mat-label");
            i0.ɵɵtext(14, "Recherche");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "mat-form-field")(17, "mat-label");
            i0.ɵɵtext(18, "Etat");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "mat-select", 10)(20, "mat-option", 11);
            i0.ɵɵtext(21, "Tous");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-option", 12);
            i0.ɵɵtext(23, "RUNNING");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "mat-option", 13);
            i0.ɵɵtext(25, "STOPPED");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "mat-option", 14);
            i0.ɵɵtext(27, "STARTING");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "mat-option", 15);
            i0.ɵɵtext(29, "STOPPING");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "mat-option", 16);
            i0.ɵɵtext(31, "TERMINATED");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(32, "div", 6)(33, "app-panel-container", 17);
            i0.ɵɵelementContainerStart(34, 18);
            i0.ɵɵtemplate(35, OciComputePageComponent_app_loading_skeleton_35_Template, 1, 1, "app-loading-skeleton", 19)(36, OciComputePageComponent_app_empty_state_36_Template, 1, 0, "app-empty-state", 20)(37, OciComputePageComponent_app_empty_state_37_Template, 1, 0, "app-empty-state", 21)(38, OciComputePageComponent_app_error_state_38_Template, 1, 2, "app-error-state", 22)(39, OciComputePageComponent_div_39_Template, 4, 2, "div", 23);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(40, OciComputePageComponent_div_40_Template, 34, 10, "div", 24);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("formGroup", ctx.filtersForm);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("ngSwitch", ctx.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedInstance);
        } }, dependencies: [NgIf,
            NgFor,
            NgSwitch,
            NgSwitchCase,
            DatePipe,
            DecimalPipe,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatInputModule, i5.MatInput, MatSelectModule, i6.MatSelect, i7.MatOption, PanelContainerComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent], styles: [".filters-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(280px, 1fr) 240px;\n      gap: 0.85rem;\n    }\n    .table-wrapper[_ngcontent-%COMP%] {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n      padding: 0.9rem 1rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .detail-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .detail-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .detail-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .monospace[_ngcontent-%COMP%] {\n      word-break: break-all;\n    }\n    @media (max-width: 960px) {\n      .filters-grid[_ngcontent-%COMP%], \n   .detail-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciComputePageComponent, [{
        type: Component,
        args: [{ selector: 'app-oci-compute-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgSwitch,
                    NgSwitchCase,
                    DatePipe,
                    DecimalPipe,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    PanelContainerComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Compute</h1>
        <div class="page-subtitle">Inventaire des instances Compute, filtrage local et vue detaillee sans operation d'ecriture.</div>
      </div>
      <button mat-stroked-button type="button" (click)="load()">Actualiser</button>
    </div>

    <div class="section-grid">
      <div class="span-12">
        <app-panel-container title="Filtres" subtitle="Recherche locale sur le resultat OCI deja charge.">
          <form [formGroup]="filtersForm" class="filters-grid">
            <mat-form-field>
              <mat-label>Recherche</mat-label>
              <input matInput formControlName="search" placeholder="Nom, shape, AD, region">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Etat</mat-label>
              <mat-select formControlName="state">
                <mat-option value="ALL">Tous</mat-option>
                <mat-option value="RUNNING">RUNNING</mat-option>
                <mat-option value="STOPPED">STOPPED</mat-option>
                <mat-option value="STARTING">STARTING</mat-option>
                <mat-option value="STOPPING">STOPPING</mat-option>
                <mat-option value="TERMINATED">TERMINATED</mat-option>
              </mat-select>
            </mat-form-field>
          </form>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Instances OCI" subtitle="Tableau responsive et detail a la demande.">
          <ng-container [ngSwitch]="state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="8"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune instance" description="Aucune instance Compute n'a ete retournee pour ce compartment."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="errorMessage" [details]="errorDetails" (retry)="load()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="table-wrapper">
              <table *ngIf="filteredInstances.length; else filteredEmptyTpl">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Etat</th>
                    <th>Shape</th>
                    <th>Availability Domain</th>
                    <th>Fault Domain</th>
                    <th>CPU actuel</th>
                    <th>Region</th>
                    <th>Date de creation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let instance of filteredInstances">
                    <td>
                      <strong>{{ instance.displayName || instance.maskedId }}</strong>
                      <div class="muted monospace">{{ instance.maskedId }}</div>
                    </td>
                    <td><span class="chip">{{ instance.lifecycleState }}</span></td>
                    <td>{{ instance.shape || '-' }}</td>
                    <td>{{ instance.availabilityDomain || '-' }}</td>
                    <td>{{ instance.faultDomain || '-' }}</td>
                    <td>{{ instance.cpuCurrent == null ? '-' : (instance.cpuCurrent | number:'1.0-2') + ' %' }}</td>
                    <td>{{ instance.region || '-' }}</td>
                    <td>{{ instance.timeCreated | date:'short' }}</td>
                    <td>
                      <button mat-stroked-button type="button" (click)="showDetails(instance)">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ng-template #filteredEmptyTpl>
                <app-empty-state title="Aucun resultat" description="Aucune instance ne correspond aux filtres actifs."></app-empty-state>
              </ng-template>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="selectedInstance">
        <app-panel-container [title]="selectedInstance.displayName || selectedInstance.maskedId" subtitle="Detail OCI retourne par le backend.">
          <div class="detail-grid">
            <div class="detail-card">
              <span>ID</span>
              <strong class="monospace">{{ selectedInstance.maskedId }}</strong>
            </div>
            <div class="detail-card">
              <span>Compartment</span>
              <strong class="monospace">{{ selectedInstance.maskedCompartmentId }}</strong>
            </div>
            <div class="detail-card">
              <span>Shape</span>
              <strong>{{ selectedInstance.shape || '-' }}</strong>
            </div>
            <div class="detail-card">
              <span>CPU actuel</span>
              <strong>{{ selectedInstance.cpuCurrent == null ? '-' : (selectedInstance.cpuCurrent | number:'1.0-2') + ' %' }}</strong>
            </div>
            <div class="detail-card">
              <span>AD</span>
              <strong>{{ selectedInstance.availabilityDomain || '-' }}</strong>
            </div>
            <div class="detail-card">
              <span>FD</span>
              <strong>{{ selectedInstance.faultDomain || '-' }}</strong>
            </div>
          </div>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .filters-grid {\n      display: grid;\n      grid-template-columns: minmax(280px, 1fr) 240px;\n      gap: 0.85rem;\n    }\n    .table-wrapper {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th,\n    td {\n      padding: 0.9rem 1rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .detail-grid {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .detail-card {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .detail-card span {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .monospace {\n      word-break: break-all;\n    }\n    @media (max-width: 960px) {\n      .filters-grid,\n      .detail-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.OciService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OciComputePageComponent, { className: "OciComputePageComponent", filePath: "src\\app\\features\\oci\\oci-compute-page.component.ts", lineNumber: 210 }); })();
//# sourceMappingURL=oci-compute-page.component.js.map