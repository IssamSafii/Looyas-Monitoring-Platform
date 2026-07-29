import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/data-source.service";
import * as i3 from "../../core/services/oci.service";
import * as i4 from "../../core/services/snackbar.service";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/checkbox";
import * as i7 from "@angular/material/form-field";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/select";
import * as i10 from "@angular/material/core";
function DataSourcesPageComponent_ng_container_26_mat_form_field_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-form-field")(1, "mat-label");
    i0.ɵɵtext(2, "Username");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 33);
    i0.ɵɵelementEnd();
} }
function DataSourcesPageComponent_ng_container_26_mat_form_field_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-form-field")(1, "mat-label");
    i0.ɵɵtext(2, "Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", (ctx_r1.selectedSource == null ? null : ctx_r1.selectedSource.maskedPassword) || "");
} }
function DataSourcesPageComponent_ng_container_26_mat_form_field_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-form-field")(1, "mat-label");
    i0.ɵɵtext(2, "Token");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", (ctx_r1.selectedSource == null ? null : ctx_r1.selectedSource.maskedToken) || "");
} }
function DataSourcesPageComponent_ng_container_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-form-field")(2, "mat-label");
    i0.ɵɵtext(3, "Base URL");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-form-field")(6, "mat-label");
    i0.ɵɵtext(7, "API Prefix");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "mat-form-field")(10, "mat-label");
    i0.ɵɵtext(11, "Tenant ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "mat-form-field")(14, "mat-label");
    i0.ɵɵtext(15, "Authentification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "mat-select", 28)(17, "mat-option", 29);
    i0.ɵɵtext(18, "NONE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "mat-option", 30);
    i0.ɵɵtext(20, "BASIC");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "mat-option", 31);
    i0.ɵɵtext(22, "BEARER");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(23, DataSourcesPageComponent_ng_container_26_mat_form_field_23_Template, 4, 0, "mat-form-field", 32)(24, DataSourcesPageComponent_ng_container_26_mat_form_field_24_Template, 4, 1, "mat-form-field", 32)(25, DataSourcesPageComponent_ng_container_26_mat_form_field_25_Template, 4, 1, "mat-form-field", 32);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("ngIf", ctx_r1.authType !== "NONE");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.authType === "BASIC");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.authType === "BEARER");
} }
function DataSourcesPageComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-form-field")(1, "mat-label");
    i0.ɵɵtext(2, "Region");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-form-field")(5, "mat-label");
    i0.ɵɵtext(6, "Compartment ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "input", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "mat-form-field")(9, "mat-label");
    i0.ɵɵtext(10, "Profil OCI");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "mat-form-field")(13, "mat-label");
    i0.ɵɵtext(14, "Fichier config OCI");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "mat-form-field")(17, "mat-label");
    i0.ɵɵtext(18, "Namespace metrique par defaut");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "mat-checkbox", 41);
    i0.ɵɵtext(21, "Inclure les sous-compartments");
    i0.ɵɵelementEnd();
} }
function DataSourcesPageComponent_div_31_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.selectedSource.maskedPassword);
} }
function DataSourcesPageComponent_div_31_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.selectedSource.maskedToken);
} }
function DataSourcesPageComponent_div_31_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1, "aucun");
    i0.ɵɵelementEnd();
} }
function DataSourcesPageComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1, " Secret actuel : ");
    i0.ɵɵtemplate(2, DataSourcesPageComponent_div_31_span_2_Template, 2, 1, "span", 43)(3, DataSourcesPageComponent_div_31_span_3_Template, 2, 1, "span", 43)(4, DataSourcesPageComponent_div_31_span_4_Template, 2, 0, "span", 43);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.selectedSource.maskedPassword);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedSource.maskedToken);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.selectedSource.maskedPassword && !ctx_r1.selectedSource.maskedToken);
} }
function DataSourcesPageComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1, " OCI : ");
    i0.ɵɵelementStart(2, "span", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 44);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 44);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.selectedSource.region || "region absente");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedSource.maskedCompartmentId || "compartment absent");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedSource.profile || "profil absent");
} }
function DataSourcesPageComponent_button_38_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function DataSourcesPageComponent_button_38_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.testSelected()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.testingId === ctx_r1.selectedSourceId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.testingId === ctx_r1.selectedSourceId ? "Test en cours..." : "Tester cette source", " ");
} }
function DataSourcesPageComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("inline-test-success", ctx_r1.selectedTestSuccess)("inline-test-error", ctx_r1.selectedTestSuccess === false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.selectedTestMessage, " ");
} }
function DataSourcesPageComponent_div_42_article_1_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.ociStatusLabel);
} }
function DataSourcesPageComponent_div_42_article_1_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(message_r6);
} }
function DataSourcesPageComponent_div_42_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 49)(1, "div", 50)(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 51);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 52)(8, "span", 44);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, DataSourcesPageComponent_div_42_article_1_span_10_Template, 2, 1, "span", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 53)(12, "div", 54)(13, "span");
    i0.ɵɵtext(14, "Connexion");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong", 55);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 54)(18, "span");
    i0.ɵɵtext(19, "Prefix / profil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong", 55);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 54)(23, "span");
    i0.ɵɵtext(24, "Compartment / tenant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong", 55);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 54)(28, "span");
    i0.ɵɵtext(29, "Derniere verification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "strong");
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div", 56)(34, "button", 5);
    i0.ɵɵlistener("click", function DataSourcesPageComponent_div_42_article_1_Template_button_click_34_listener() { const source_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.edit(source_r5)); });
    i0.ɵɵtext(35, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 45);
    i0.ɵɵlistener("click", function DataSourcesPageComponent_div_42_article_1_Template_button_click_36_listener() { const source_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleEnabled(source_r5)); });
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 45);
    i0.ɵɵlistener("click", function DataSourcesPageComponent_div_42_article_1_Template_button_click_38_listener() { const source_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.test(source_r5)); });
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 57);
    i0.ɵɵlistener("click", function DataSourcesPageComponent_div_42_article_1_Template_button_click_40_listener() { const source_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.remove(source_r5)); });
    i0.ɵɵtext(41, "Supprimer");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(42, DataSourcesPageComponent_div_42_article_1_div_42_Template, 2, 1, "div", 58);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const source_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected-card", source_r5.id === ctx_r1.selectedSourceId);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(source_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(source_r5.type);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("enabled-chip", source_r5.enabled);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(source_r5.enabled ? "Enabled" : "Disabled");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", source_r5.type === "OCI");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(source_r5.type === "OCI" ? source_r5.region || "-" : source_r5.baseUrl || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(source_r5.type === "OCI" ? source_r5.profile || "-" : source_r5.apiPrefix || "/");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(source_r5.type === "OCI" ? source_r5.maskedCompartmentId || "-" : source_r5.tenantId || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(source_r5.type === "OCI" ? i0.ɵɵpipeBind2(32, 17, ctx_r1.ociHealth == null ? null : ctx_r1.ociHealth.checkedAt, "short") || "-" : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", source_r5.enabled ? "Desactiver" : "Activer", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.testingId === source_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.testingId === source_r5.id ? "Test en cours..." : "Tester", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.testMessages[source_r5.id]);
} }
function DataSourcesPageComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtemplate(1, DataSourcesPageComponent_div_42_article_1_Template, 43, 20, "article", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.sources);
} }
function DataSourcesPageComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1, "Aucune source configuree pour le moment.");
    i0.ɵɵelementEnd();
} }
export class DataSourcesPageComponent {
    constructor(formBuilder, dataSourceService, ociService, snackbar, cdr) {
        this.formBuilder = formBuilder;
        this.dataSourceService = dataSourceService;
        this.ociService = ociService;
        this.snackbar = snackbar;
        this.cdr = cdr;
        this.sources = [];
        this.selectedSourceId = null;
        this.saving = false;
        this.testingId = null;
        this.testMessages = {};
        this.selectedTestMessage = '';
        this.selectedTestSuccess = null;
        this.ociHealth = null;
        this.form = this.formBuilder.nonNullable.group({
            name: ['', Validators.required],
            type: ['MIMIR', Validators.required],
            baseUrl: ['', Validators.required],
            apiPrefix: ['/prometheus', Validators.required],
            tenantId: [''],
            authenticationType: ['NONE', Validators.required],
            username: [''],
            password: [''],
            token: [''],
            region: [''],
            compartmentId: [''],
            profile: [''],
            configFile: [''],
            defaultMetricNamespace: ['oci_computeagent'],
            includeSubcompartments: [false],
            enabled: [true]
        });
    }
    ngOnInit() {
        this.load();
    }
    get selectedSource() {
        return this.sources.find((source) => source.id === this.selectedSourceId);
    }
    get isOciType() {
        return this.form.controls.type.getRawValue() === 'OCI';
    }
    get authType() {
        return this.form.controls.authenticationType.getRawValue();
    }
    get ociStatusLabel() {
        return this.ociHealth?.status || 'NOT_CHECKED';
    }
    beginCreate() {
        this.selectedSourceId = null;
        this.selectedTestMessage = '';
        this.selectedTestSuccess = null;
        this.form.reset({
            name: '',
            type: 'MIMIR',
            baseUrl: '',
            apiPrefix: '/prometheus',
            tenantId: '',
            authenticationType: 'NONE',
            username: '',
            password: '',
            token: '',
            region: '',
            compartmentId: '',
            profile: '',
            configFile: '',
            defaultMetricNamespace: 'oci_computeagent',
            includeSubcompartments: false,
            enabled: true
        });
        this.applyTypeValidators(this.form.controls.type.getRawValue());
        this.cdr.markForCheck();
    }
    edit(source) {
        this.selectedSourceId = source.id;
        this.selectedTestMessage = this.testMessages[source.id] ?? '';
        this.selectedTestSuccess = this.selectedTestMessage ? !this.selectedTestMessage.toLowerCase().includes('impossible') : null;
        this.form.reset({
            name: source.name,
            type: source.type,
            baseUrl: source.baseUrl,
            apiPrefix: source.apiPrefix || this.defaultApiPrefix(source.type),
            tenantId: source.tenantId ?? '',
            authenticationType: source.authenticationType,
            username: source.username ?? '',
            password: '',
            token: '',
            region: source.region ?? '',
            compartmentId: '',
            profile: source.profile ?? '',
            configFile: source.configFile ?? '',
            defaultMetricNamespace: source.defaultMetricNamespace ?? 'oci_computeagent',
            includeSubcompartments: source.includeSubcompartments,
            enabled: source.enabled
        });
        this.applyTypeValidators(source.type);
        this.cdr.markForCheck();
    }
    resetForm() {
        if (this.selectedSource) {
            this.edit(this.selectedSource);
            return;
        }
        this.beginCreate();
    }
    onTypeChange(type) {
        this.applyTypeValidators(type);
        if (type === 'OCI') {
            this.form.patchValue({
                baseUrl: '',
                apiPrefix: '',
                tenantId: '',
                authenticationType: 'NONE',
                username: '',
                password: '',
                token: '',
                defaultMetricNamespace: this.form.controls.defaultMetricNamespace.getRawValue() || 'oci_computeagent'
            });
        }
        else {
            const currentPrefix = this.form.controls.apiPrefix.getRawValue().trim();
            const defaults = ['/prometheus', '/loki', ''];
            if (!currentPrefix || defaults.includes(currentPrefix)) {
                this.form.controls.apiPrefix.setValue(this.defaultApiPrefix(type));
            }
        }
        this.cdr.markForCheck();
    }
    save() {
        if (this.form.invalid || this.saving) {
            return;
        }
        this.saving = true;
        this.dataSourceService.save(this.toPayload(), this.selectedSourceId ?? undefined).subscribe({
            next: (saved) => {
                this.saving = false;
                this.snackbar.success(`Source ${saved.name} sauvegardee.`);
                this.load(saved.id);
                this.cdr.markForCheck();
            },
            error: () => {
                this.saving = false;
                this.snackbar.error('Impossible de sauvegarder cette source.');
                this.cdr.markForCheck();
            }
        });
    }
    toggleEnabled(source) {
        this.saving = true;
        this.dataSourceService.save(this.toPayloadFromSource(source, !source.enabled), source.id).subscribe({
            next: (saved) => {
                this.saving = false;
                this.snackbar.success(`${saved.name} ${saved.enabled ? 'activee' : 'desactivee'}.`);
                this.load(saved.id);
                this.cdr.markForCheck();
            },
            error: () => {
                this.saving = false;
                this.snackbar.error(`Impossible de changer l'etat de ${source.name}.`);
                this.cdr.markForCheck();
            }
        });
    }
    testSelected() {
        const source = this.selectedSource;
        if (source) {
            this.test(source);
        }
    }
    test(source) {
        this.testingId = source.id;
        if (source.type === 'OCI') {
            this.ociService.health().subscribe({
                next: (result) => {
                    this.testingId = null;
                    const outcome = this.mapOciHealthResult(result);
                    this.ociHealth = result;
                    this.applyTestOutcome(source, outcome.success, outcome.message);
                },
                error: () => this.applyTestFailure(source, 'Test OCI impossible.')
            });
            return;
        }
        this.dataSourceService.test(source.id).subscribe({
            next: (result) => {
                this.testingId = null;
                this.applyTestOutcome(source, result.success, result.message);
            },
            error: () => this.applyTestFailure(source, 'Test de connexion impossible.')
        });
    }
    remove(source) {
        if (!window.confirm(`Supprimer la source ${source.name} ?`)) {
            return;
        }
        this.dataSourceService.delete(source.id).subscribe({
            next: () => {
                if (this.selectedSourceId === source.id) {
                    this.beginCreate();
                }
                this.snackbar.success(`Source ${source.name} supprimee.`);
                this.load();
                this.cdr.markForCheck();
            },
            error: () => {
                this.snackbar.error(`Impossible de supprimer ${source.name}.`);
                this.cdr.markForCheck();
            }
        });
    }
    load(selectId) {
        this.dataSourceService.list().subscribe((sources) => {
            this.sources = sources;
            const ociSource = sources.find((source) => source.type === 'OCI');
            if (ociSource) {
                this.ociService.health().subscribe({
                    next: (health) => {
                        this.ociHealth = health;
                        this.cdr.markForCheck();
                    },
                    error: () => {
                        this.ociHealth = null;
                        this.cdr.markForCheck();
                    }
                });
            }
            if (selectId != null) {
                const source = sources.find((item) => item.id === selectId);
                if (source) {
                    this.edit(source);
                }
            }
            else if (this.selectedSourceId != null) {
                const current = sources.find((item) => item.id === this.selectedSourceId);
                if (current) {
                    this.edit(current);
                }
            }
            this.cdr.markForCheck();
        });
    }
    toPayload() {
        const raw = this.form.getRawValue();
        const isOci = raw.type === 'OCI';
        return {
            name: raw.name.trim(),
            type: raw.type,
            baseUrl: isOci ? '' : raw.baseUrl.trim(),
            apiPrefix: isOci ? '' : raw.apiPrefix.trim(),
            tenantId: isOci ? null : this.toNull(raw.tenantId),
            authenticationType: isOci ? 'NONE' : raw.authenticationType,
            username: isOci || raw.authenticationType === 'NONE' ? null : this.toNull(raw.username),
            password: isOci || raw.authenticationType !== 'BASIC' ? null : this.toNull(raw.password),
            token: isOci || raw.authenticationType !== 'BEARER' ? null : this.toNull(raw.token),
            region: isOci ? this.toNull(raw.region) : null,
            compartmentId: isOci ? this.toNull(raw.compartmentId) : null,
            profile: isOci ? this.toNull(raw.profile) : null,
            configFile: isOci ? this.toNull(raw.configFile) : null,
            defaultMetricNamespace: isOci ? this.toNull(raw.defaultMetricNamespace) : null,
            includeSubcompartments: isOci ? raw.includeSubcompartments : false,
            enabled: raw.enabled
        };
    }
    toPayloadFromSource(source, enabled) {
        return {
            name: source.name,
            type: source.type,
            baseUrl: source.baseUrl,
            apiPrefix: source.apiPrefix,
            tenantId: source.tenantId,
            authenticationType: source.authenticationType,
            username: source.username,
            password: null,
            token: null,
            region: source.region,
            compartmentId: null,
            profile: source.profile,
            configFile: source.configFile,
            defaultMetricNamespace: source.defaultMetricNamespace,
            includeSubcompartments: source.includeSubcompartments,
            enabled
        };
    }
    applyTypeValidators(type) {
        const baseUrlControl = this.form.controls.baseUrl;
        const apiPrefixControl = this.form.controls.apiPrefix;
        if (type === 'OCI') {
            baseUrlControl.clearValidators();
            apiPrefixControl.clearValidators();
        }
        else {
            baseUrlControl.setValidators([Validators.required]);
            apiPrefixControl.setValidators([Validators.required]);
        }
        baseUrlControl.updateValueAndValidity({ emitEvent: false });
        apiPrefixControl.updateValueAndValidity({ emitEvent: false });
    }
    mapOciHealthResult(result) {
        return {
            success: result.status === 'CONNECTED',
            message: result.message
        };
    }
    applyTestOutcome(source, success, message) {
        this.testMessages = { ...this.testMessages, [source.id]: message };
        if (this.selectedSourceId === source.id) {
            this.selectedTestMessage = message;
            this.selectedTestSuccess = success;
        }
        if (success) {
            this.snackbar.success(`${source.name}: ${message}`);
        }
        else {
            this.snackbar.error(`${source.name}: ${message}`);
        }
        this.cdr.markForCheck();
    }
    applyTestFailure(source, message) {
        this.testingId = null;
        this.testMessages = { ...this.testMessages, [source.id]: message };
        if (this.selectedSourceId === source.id) {
            this.selectedTestMessage = message;
            this.selectedTestSuccess = false;
        }
        this.snackbar.error(`Test ${source.name} impossible.`);
        this.cdr.markForCheck();
    }
    defaultApiPrefix(type) {
        return type === 'LOKI' ? '/loki' : '/prometheus';
    }
    toNull(value) {
        const trimmed = value.trim();
        return trimmed ? trimmed : null;
    }
    static { this.ɵfac = function DataSourcesPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataSourcesPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.DataSourceService), i0.ɵɵdirectiveInject(i3.OciService), i0.ɵɵdirectiveInject(i4.SnackbarService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataSourcesPageComponent, selectors: [["app-data-sources-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 45, vars: 12, consts: [["ociFields", ""], ["emptyTpl", ""], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "data-sources-grid"], [1, "editor-column"], ["subtitle", "Les secrets existants sont conserves si tu laisses le champ vide.", 3, "title"], [1, "form-grid", 3, "ngSubmit", "formGroup"], ["matInput", "", "formControlName", "name"], ["formControlName", "type", 3, "valueChange"], ["value", "MIMIR"], ["value", "LOKI"], ["value", "OCI"], [4, "ngIf", "ngIfElse"], ["formControlName", "enabled"], ["class", "hint", 4, "ngIf"], [1, "form-actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["mat-stroked-button", "", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "inline-test-result", 3, "inline-test-success", "inline-test-error", 4, "ngIf"], [1, "list-column"], ["title", "Sources disponibles", "subtitle", "OCI affiche son statut via /api/monitoring/oci/health."], ["class", "source-list", 4, "ngIf", "ngIfElse"], ["matInput", "", "formControlName", "baseUrl", "placeholder", "http://192.168.x.x:port"], ["matInput", "", "formControlName", "apiPrefix"], ["matInput", "", "formControlName", "tenantId", "placeholder", "X-Scope-OrgID si necessaire"], ["formControlName", "authenticationType"], ["value", "NONE"], ["value", "BASIC"], ["value", "BEARER"], [4, "ngIf"], ["matInput", "", "formControlName", "username"], ["matInput", "", "formControlName", "password", "type", "password", 3, "placeholder"], ["matInput", "", "formControlName", "token", "type", "password", 3, "placeholder"], ["matInput", "", "formControlName", "region", "placeholder", "eu-frankfurt-1"], ["matInput", "", "formControlName", "compartmentId", "placeholder", "ocid1.compartment..."], ["matInput", "", "formControlName", "profile", "placeholder", "DEFAULT"], ["matInput", "", "formControlName", "configFile", "placeholder", "/app/.oci/config"], ["matInput", "", "formControlName", "defaultMetricNamespace", "placeholder", "oci_computeagent"], ["formControlName", "includeSubcompartments"], [1, "hint"], ["class", "chip", 4, "ngIf"], [1, "chip"], ["mat-stroked-button", "", "type", "button", 3, "click", "disabled"], [1, "inline-test-result"], [1, "source-list"], ["class", "source-card", 3, "selected-card", 4, "ngFor", "ngForOf"], [1, "source-card"], [1, "source-head"], [1, "muted"], [1, "source-badges"], [1, "source-grid"], [1, "source-cell"], [1, "mono"], [1, "row-actions"], ["mat-stroked-button", "", "type", "button", 1, "danger-button", 3, "click"], ["class", "test-message", 4, "ngIf"], [1, "test-message"], [1, "empty-card"]], template: function DataSourcesPageComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "div")(2, "h1", 3);
            i0.ɵɵtext(3, "Data Sources");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵtext(5, "Configuration backend de Mimir, Loki et OCI. Les secrets restent cote serveur.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 5);
            i0.ɵɵlistener("click", function DataSourcesPageComponent_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.beginCreate()); });
            i0.ɵɵtext(7, "Nouvelle source");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 6)(9, "div", 7)(10, "app-panel-container", 8)(11, "form", 9);
            i0.ɵɵlistener("ngSubmit", function DataSourcesPageComponent_Template_form_ngSubmit_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.save()); });
            i0.ɵɵelementStart(12, "mat-form-field")(13, "mat-label");
            i0.ɵɵtext(14, "Nom");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "mat-form-field")(17, "mat-label");
            i0.ɵɵtext(18, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "mat-select", 11);
            i0.ɵɵlistener("valueChange", function DataSourcesPageComponent_Template_mat_select_valueChange_19_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTypeChange($event)); });
            i0.ɵɵelementStart(20, "mat-option", 12);
            i0.ɵɵtext(21, "MIMIR");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-option", 13);
            i0.ɵɵtext(23, "LOKI");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "mat-option", 14);
            i0.ɵɵtext(25, "OCI");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(26, DataSourcesPageComponent_ng_container_26_Template, 26, 3, "ng-container", 15)(27, DataSourcesPageComponent_ng_template_27_Template, 22, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(29, "mat-checkbox", 16);
            i0.ɵɵtext(30, "Source activee");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, DataSourcesPageComponent_div_31_Template, 5, 3, "div", 17)(32, DataSourcesPageComponent_div_32_Template, 8, 3, "div", 17);
            i0.ɵɵelementStart(33, "div", 18)(34, "button", 19);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "button", 5);
            i0.ɵɵlistener("click", function DataSourcesPageComponent_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.resetForm()); });
            i0.ɵɵtext(37, "Annuler");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(38, DataSourcesPageComponent_button_38_Template, 2, 2, "button", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(39, DataSourcesPageComponent_div_39_Template, 2, 5, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "div", 22)(41, "app-panel-container", 23);
            i0.ɵɵtemplate(42, DataSourcesPageComponent_div_42_Template, 2, 1, "div", 24)(43, DataSourcesPageComponent_ng_template_43_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const ociFields_r7 = i0.ɵɵreference(28);
            const emptyTpl_r8 = i0.ɵɵreference(44);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("title", ctx.selectedSourceId ? "Modifier une source" : "Ajouter une source");
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", !ctx.isOciType)("ngIfElse", ociFields_r7);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.selectedSource && !ctx.isOciType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedSource && ctx.isOciType);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.saving || ctx.form.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.saving ? "Sauvegarde..." : ctx.selectedSourceId ? "Mettre a jour" : "Creer", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.selectedSourceId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedSourceId && ctx.selectedTestMessage);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.sources.length)("ngIfElse", emptyTpl_r8);
        } }, dependencies: [NgFor,
            NgIf,
            DatePipe,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i5.MatButton, MatCheckboxModule, i6.MatCheckbox, MatFormFieldModule, i7.MatFormField, i7.MatLabel, MatInputModule, i8.MatInput, MatSelectModule, i9.MatSelect, i10.MatOption, PanelContainerComponent], styles: [".data-sources-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(380px, 480px) minmax(0, 1fr);\n      gap: 1rem;\n      align-items: start;\n    }\n    .editor-column[_ngcontent-%COMP%], \n   .list-column[_ngcontent-%COMP%] {\n      min-width: 0;\n    }\n    .form-grid[_ngcontent-%COMP%], \n   .source-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .form-actions[_ngcontent-%COMP%], \n   .row-actions[_ngcontent-%COMP%], \n   .source-badges[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 0.65rem;\n      flex-wrap: wrap;\n    }\n    .hint[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n    .inline-test-result[_ngcontent-%COMP%] {\n      margin-top: 0.25rem;\n      padding: 0.85rem 1rem;\n      border-radius: 14px;\n      line-height: 1.45;\n      border: 1px solid var(--border-soft);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .inline-test-success[_ngcontent-%COMP%] {\n      color: #a8f0c7;\n      border-color: rgba(61, 220, 151, 0.22);\n      background: rgba(61, 220, 151, 0.08);\n    }\n    .inline-test-error[_ngcontent-%COMP%] {\n      color: #ff9a9a;\n      border-color: rgba(255, 107, 107, 0.24);\n      background: rgba(255, 107, 107, 0.08);\n    }\n    .source-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n      padding: 1rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .selected-card[_ngcontent-%COMP%] {\n      border-color: rgba(124, 140, 255, 0.34);\n      background: rgba(124, 140, 255, 0.08);\n    }\n    .source-head[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      align-items: flex-start;\n    }\n    .source-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .source-cell[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.8rem 0.85rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .source-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .danger-button[_ngcontent-%COMP%] {\n      border-color: rgba(255, 107, 107, 0.3) !important;\n      color: #ff9a9a !important;\n    }\n    .enabled-chip[_ngcontent-%COMP%] {\n      color: var(--success);\n      border-color: rgba(61, 220, 151, 0.22);\n    }\n    .mono[_ngcontent-%COMP%] {\n      font-family: Consolas, 'Courier New', monospace;\n      word-break: break-all;\n    }\n    .test-message[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      line-height: 1.4;\n    }\n    .empty-card[_ngcontent-%COMP%] {\n      border: 1px dashed var(--border-soft);\n      border-radius: var(--radius-md);\n      padding: 1rem;\n      color: var(--text-secondary);\n    }\n    @media (max-width: 1180px) {\n      .data-sources-grid[_ngcontent-%COMP%], \n   .source-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourcesPageComponent, [{
        type: Component,
        args: [{ selector: 'app-data-sources-page', standalone: true, imports: [
                    NgFor,
                    NgIf,
                    DatePipe,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    PanelContainerComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Data Sources</h1>
        <div class="page-subtitle">Configuration backend de Mimir, Loki et OCI. Les secrets restent cote serveur.</div>
      </div>
      <button mat-stroked-button type="button" (click)="beginCreate()">Nouvelle source</button>
    </div>

    <div class="data-sources-grid">
      <div class="editor-column">
        <app-panel-container [title]="selectedSourceId ? 'Modifier une source' : 'Ajouter une source'" subtitle="Les secrets existants sont conserves si tu laisses le champ vide.">
          <form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
            <mat-form-field>
              <mat-label>Nom</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Type</mat-label>
              <mat-select formControlName="type" (valueChange)="onTypeChange($event)">
                <mat-option value="MIMIR">MIMIR</mat-option>
                <mat-option value="LOKI">LOKI</mat-option>
                <mat-option value="OCI">OCI</mat-option>
              </mat-select>
            </mat-form-field>

            <ng-container *ngIf="!isOciType; else ociFields">
              <mat-form-field>
                <mat-label>Base URL</mat-label>
                <input matInput formControlName="baseUrl" placeholder="http://192.168.x.x:port">
              </mat-form-field>

              <mat-form-field>
                <mat-label>API Prefix</mat-label>
                <input matInput formControlName="apiPrefix">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Tenant ID</mat-label>
                <input matInput formControlName="tenantId" placeholder="X-Scope-OrgID si necessaire">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Authentification</mat-label>
                <mat-select formControlName="authenticationType">
                  <mat-option value="NONE">NONE</mat-option>
                  <mat-option value="BASIC">BASIC</mat-option>
                  <mat-option value="BEARER">BEARER</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field *ngIf="authType !== 'NONE'">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username">
              </mat-form-field>

              <mat-form-field *ngIf="authType === 'BASIC'">
                <mat-label>Password</mat-label>
                <input matInput formControlName="password" type="password" [placeholder]="selectedSource?.maskedPassword || ''">
              </mat-form-field>

              <mat-form-field *ngIf="authType === 'BEARER'">
                <mat-label>Token</mat-label>
                <input matInput formControlName="token" type="password" [placeholder]="selectedSource?.maskedToken || ''">
              </mat-form-field>
            </ng-container>

            <ng-template #ociFields>
              <mat-form-field>
                <mat-label>Region</mat-label>
                <input matInput formControlName="region" placeholder="eu-frankfurt-1">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Compartment ID</mat-label>
                <input matInput formControlName="compartmentId" placeholder="ocid1.compartment...">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Profil OCI</mat-label>
                <input matInput formControlName="profile" placeholder="DEFAULT">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Fichier config OCI</mat-label>
                <input matInput formControlName="configFile" placeholder="/app/.oci/config">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Namespace metrique par defaut</mat-label>
                <input matInput formControlName="defaultMetricNamespace" placeholder="oci_computeagent">
              </mat-form-field>

              <mat-checkbox formControlName="includeSubcompartments">Inclure les sous-compartments</mat-checkbox>
            </ng-template>

            <mat-checkbox formControlName="enabled">Source activee</mat-checkbox>

            <div class="hint" *ngIf="selectedSource && !isOciType">
              Secret actuel :
              <span class="chip" *ngIf="selectedSource.maskedPassword">{{ selectedSource.maskedPassword }}</span>
              <span class="chip" *ngIf="selectedSource.maskedToken">{{ selectedSource.maskedToken }}</span>
              <span class="chip" *ngIf="!selectedSource.maskedPassword && !selectedSource.maskedToken">aucun</span>
            </div>

            <div class="hint" *ngIf="selectedSource && isOciType">
              OCI :
              <span class="chip">{{ selectedSource.region || 'region absente' }}</span>
              <span class="chip">{{ selectedSource.maskedCompartmentId || 'compartment absent' }}</span>
              <span class="chip">{{ selectedSource.profile || 'profil absent' }}</span>
            </div>

            <div class="form-actions">
              <button mat-flat-button color="primary" type="submit" [disabled]="saving || form.invalid">
                {{ saving ? 'Sauvegarde...' : (selectedSourceId ? 'Mettre a jour' : 'Creer') }}
              </button>
              <button mat-stroked-button type="button" (click)="resetForm()">Annuler</button>
              <button mat-stroked-button type="button" *ngIf="selectedSourceId" (click)="testSelected()" [disabled]="testingId === selectedSourceId">
                {{ testingId === selectedSourceId ? 'Test en cours...' : 'Tester cette source' }}
              </button>
            </div>

            <div *ngIf="selectedSourceId && selectedTestMessage" class="inline-test-result" [class.inline-test-success]="selectedTestSuccess" [class.inline-test-error]="selectedTestSuccess === false">
              {{ selectedTestMessage }}
            </div>
          </form>
        </app-panel-container>
      </div>

      <div class="list-column">
        <app-panel-container title="Sources disponibles" subtitle="OCI affiche son statut via /api/monitoring/oci/health.">
          <div class="source-list" *ngIf="sources.length; else emptyTpl">
            <article class="source-card" *ngFor="let source of sources" [class.selected-card]="source.id === selectedSourceId">
              <div class="source-head">
                <div>
                  <strong>{{ source.name }}</strong>
                  <div class="muted">{{ source.type }}</div>
                </div>
                <div class="source-badges">
                  <span class="chip" [class.enabled-chip]="source.enabled">{{ source.enabled ? 'Enabled' : 'Disabled' }}</span>
                  <span class="chip" *ngIf="source.type === 'OCI'">{{ ociStatusLabel }}</span>
                </div>
              </div>

              <div class="source-grid">
                <div class="source-cell">
                  <span>Connexion</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.region || '-') : (source.baseUrl || '-') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Prefix / profil</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.profile || '-') : (source.apiPrefix || '/') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Compartment / tenant</span>
                  <strong class="mono">{{ source.type === 'OCI' ? (source.maskedCompartmentId || '-') : (source.tenantId || '-') }}</strong>
                </div>
                <div class="source-cell">
                  <span>Derniere verification</span>
                  <strong>{{ source.type === 'OCI' ? (ociHealth?.checkedAt | date:'short') || '-' : '-' }}</strong>
                </div>
              </div>

              <div class="row-actions">
                <button mat-stroked-button type="button" (click)="edit(source)">Modifier</button>
                <button mat-stroked-button type="button" (click)="toggleEnabled(source)" [disabled]="saving">
                  {{ source.enabled ? 'Desactiver' : 'Activer' }}
                </button>
                <button mat-stroked-button type="button" (click)="test(source)" [disabled]="testingId === source.id">
                  {{ testingId === source.id ? 'Test en cours...' : 'Tester' }}
                </button>
                <button mat-stroked-button type="button" class="danger-button" (click)="remove(source)">Supprimer</button>
              </div>

              <div class="test-message" *ngIf="testMessages[source.id] as message">{{ message }}</div>
            </article>
          </div>

          <ng-template #emptyTpl>
            <div class="empty-card">Aucune source configuree pour le moment.</div>
          </ng-template>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .data-sources-grid {\n      display: grid;\n      grid-template-columns: minmax(380px, 480px) minmax(0, 1fr);\n      gap: 1rem;\n      align-items: start;\n    }\n    .editor-column,\n    .list-column {\n      min-width: 0;\n    }\n    .form-grid,\n    .source-list {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .form-actions,\n    .row-actions,\n    .source-badges {\n      display: flex;\n      gap: 0.65rem;\n      flex-wrap: wrap;\n    }\n    .hint {\n      color: var(--text-secondary);\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n    .inline-test-result {\n      margin-top: 0.25rem;\n      padding: 0.85rem 1rem;\n      border-radius: 14px;\n      line-height: 1.45;\n      border: 1px solid var(--border-soft);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .inline-test-success {\n      color: #a8f0c7;\n      border-color: rgba(61, 220, 151, 0.22);\n      background: rgba(61, 220, 151, 0.08);\n    }\n    .inline-test-error {\n      color: #ff9a9a;\n      border-color: rgba(255, 107, 107, 0.24);\n      background: rgba(255, 107, 107, 0.08);\n    }\n    .source-card {\n      display: grid;\n      gap: 0.85rem;\n      padding: 1rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .selected-card {\n      border-color: rgba(124, 140, 255, 0.34);\n      background: rgba(124, 140, 255, 0.08);\n    }\n    .source-head {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      align-items: flex-start;\n    }\n    .source-grid {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .source-cell {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.8rem 0.85rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .source-cell span {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .danger-button {\n      border-color: rgba(255, 107, 107, 0.3) !important;\n      color: #ff9a9a !important;\n    }\n    .enabled-chip {\n      color: var(--success);\n      border-color: rgba(61, 220, 151, 0.22);\n    }\n    .mono {\n      font-family: Consolas, 'Courier New', monospace;\n      word-break: break-all;\n    }\n    .test-message {\n      color: var(--text-secondary);\n      line-height: 1.4;\n    }\n    .empty-card {\n      border: 1px dashed var(--border-soft);\n      border-radius: var(--radius-md);\n      padding: 1rem;\n      color: var(--text-secondary);\n    }\n    @media (max-width: 1180px) {\n      .data-sources-grid,\n      .source-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.DataSourceService }, { type: i3.OciService }, { type: i4.SnackbarService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DataSourcesPageComponent, { className: "DataSourcesPageComponent", filePath: "src\\app\\features\\data-sources\\data-sources-page.component.ts", lineNumber: 336 }); })();
//# sourceMappingURL=data-sources-page.component.js.map