import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/oci.service";
import * as i3 from "../../core/services/time-range.service";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/checkbox";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
import * as i8 from "@angular/material/select";
import * as i9 from "@angular/material/core";
function OciMetricsExplorerPageComponent_mat_option_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const namespace_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", namespace_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(namespace_r1);
} }
function OciMetricsExplorerPageComponent_button_38_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function OciMetricsExplorerPageComponent_button_38_Template_button_click_0_listener() { const example_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.applyQuery(example_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const example_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", example_r3, " ");
} }
function OciMetricsExplorerPageComponent_div_39_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function OciMetricsExplorerPageComponent_div_39_button_4_Template_button_click_0_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.applyQuery(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r6, " ");
} }
function OciMetricsExplorerPageComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 21);
    i0.ɵɵtext(2, "Historique local");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22);
    i0.ɵɵtemplate(4, OciMetricsExplorerPageComponent_div_39_button_4_Template, 2, 1, "button", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.history);
} }
function OciMetricsExplorerPageComponent_app_loading_skeleton_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 37);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 6);
} }
function OciMetricsExplorerPageComponent_app_empty_state_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 38);
} }
function OciMetricsExplorerPageComponent_app_empty_state_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 39);
} }
function OciMetricsExplorerPageComponent_app_error_state_46_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 40);
    i0.ɵɵlistener("retry", function OciMetricsExplorerPageComponent_app_error_state_46_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.reloadCatalog()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r3.catalogErrorMessage)("details", ctx_r3.catalogErrorDetails);
} }
function OciMetricsExplorerPageComponent_div_47_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 43)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const definition_r8 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(definition_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(definition_r8.dimensions.join(", ") || "Aucune dimension");
} }
function OciMetricsExplorerPageComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵtemplate(1, OciMetricsExplorerPageComponent_div_47_article_1_Template, 5, 2, "article", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.visibleDefinitions);
} }
function OciMetricsExplorerPageComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "app-panel-container", 44);
    i0.ɵɵelement(2, "app-loading-skeleton", 37);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("rows", 7);
} }
function OciMetricsExplorerPageComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "app-empty-state", 38);
    i0.ɵɵelementEnd();
} }
function OciMetricsExplorerPageComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "app-error-state", 40);
    i0.ɵɵlistener("retry", function OciMetricsExplorerPageComponent_div_50_Template_app_error_state_retry_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.retry()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("message", ctx_r3.resultErrorMessage)("details", ctx_r3.resultErrorDetails);
} }
function OciMetricsExplorerPageComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "app-empty-state", 45);
    i0.ɵɵelementEnd();
} }
function OciMetricsExplorerPageComponent_ng_container_52_article_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 60)(1, "div", 61)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 62)(7, "div")(8, "span");
    i0.ɵɵtext(9, "Derniere valeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "span");
    i0.ɵɵtext(14, "Utilite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "span");
    i0.ɵɵtext(19, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const series_r11 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.displayName(series_r11));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", series_r11.points.length, " pts");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r3.lastValue(series_r11));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.usageLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.primaryDimension(series_r11));
} }
function OciMetricsExplorerPageComponent_ng_container_52_tr_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const series_r12 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.displayName(series_r12));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.lastValue(series_r12));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.usageLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.primaryDimension(series_r12));
} }
function OciMetricsExplorerPageComponent_ng_container_52_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 5)(2, "app-panel-container", 46)(3, "div", 47)(4, "div", 48)(5, "span");
    i0.ɵɵtext(6, "Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 48)(10, "span");
    i0.ɵɵtext(11, "Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 48)(15, "span");
    i0.ɵɵtext(16, "Derniere valeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 48)(20, "span");
    i0.ɵɵtext(21, "Unite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 49);
    i0.ɵɵelement(25, "app-time-series-chart", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 51);
    i0.ɵɵtemplate(27, OciMetricsExplorerPageComponent_ng_container_52_article_27_Template, 22, 5, "article", 52);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 5)(29, "app-panel-container", 53)(30, "div", 54)(31, "table")(32, "thead")(33, "tr")(34, "th");
    i0.ɵɵtext(35, "Serie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "th");
    i0.ɵɵtext(37, "Derniere valeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "th");
    i0.ɵɵtext(39, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "th");
    i0.ɵɵtext(41, "Dimensions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "tbody");
    i0.ɵɵtemplate(43, OciMetricsExplorerPageComponent_ng_container_52_tr_43_Template, 9, 4, "tr", 55);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(44, "div", 5)(45, "app-panel-container", 56)(46, "div", 57)(47, "button", 3);
    i0.ɵɵlistener("click", function OciMetricsExplorerPageComponent_ng_container_52_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.exportCsv()); });
    i0.ɵɵtext(48, "Exporter CSV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "button", 3);
    i0.ɵɵlistener("click", function OciMetricsExplorerPageComponent_ng_container_52_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.copyJson()); });
    i0.ɵɵtext(50, "Copier JSON");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "details", 58)(52, "summary");
    i0.ɵɵtext(53, "Afficher la reponse JSON");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "pre", 59);
    i0.ɵɵtext(55);
    i0.ɵɵpipe(56, "json");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r13 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("subtitle", "Periode active : " + ctx_r3.selectedRangeLabel);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(currentResponse_r13.series.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.totalPoints);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.globalLastValueLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.unitLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("series", ctx_r3.chartSeries)("unit", ctx_r3.chartUnit);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.visibleSeries);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", currentResponse_r13.series);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(56, 10, currentResponse_r13));
} }
export class OciMetricsExplorerPageComponent {
    constructor(formBuilder, ociService, timeRangeService, cdr) {
        this.formBuilder = formBuilder;
        this.ociService = ociService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.examples = [
            'CpuUtilization[1m].mean()',
            'MemoryUtilization[1m].mean()',
            'NetworksBytesIn[1m].mean()',
            'NetworksBytesOut[1m].mean()'
        ];
        this.contextForm = this.formBuilder.nonNullable.group({
            compartmentId: [''],
            namespace: ['oci_computeagent', Validators.required],
            includeSubcompartments: [false]
        });
        this.health = null;
        this.namespaces = ['oci_computeagent'];
        this.definitions = [];
        this.catalogState = 'loading';
        this.catalogErrorMessage = '';
        this.catalogErrorDetails = '';
        this.query = 'CpuUtilization[1m].mean()';
        this.response = null;
        this.resultState = 'idle';
        this.resultErrorMessage = '';
        this.resultErrorDetails = '';
        this.history = this.readHistory();
    }
    ngOnInit() {
        this.loadHealth();
        this.reloadCatalog();
    }
    get healthBadgeStatus() {
        if (this.health?.status === 'CONNECTED') {
            return 'CONNECTED';
        }
        if (this.health?.status === 'NOT_CONFIGURED') {
            return 'UNKNOWN';
        }
        return this.health ? 'DISCONNECTED' : 'UNKNOWN';
    }
    get healthMessage() {
        return this.health?.message || 'Verification OCI en attente.';
    }
    get visibleDefinitions() {
        return this.definitions.slice(0, 14);
    }
    get chartSeries() {
        return (this.response?.series || []).map((series) => ({
            name: series.name,
            labels: series.dimensions,
            points: series.points
        }));
    }
    get visibleSeries() {
        return (this.response?.series || []).slice(0, 6);
    }
    get totalPoints() {
        return (this.response?.series || []).reduce((sum, series) => sum + series.points.length, 0);
    }
    get selectedRangeLabel() {
        return this.timeRangeService.selected().label;
    }
    get usageLabel() {
        return this.resolveUnit().usage;
    }
    get unitLabel() {
        return this.resolveUnit().label;
    }
    get chartUnit() {
        return this.resolveUnit().chartUnit;
    }
    get globalLastValueLabel() {
        const firstValue = this.response?.series
            .map((series) => series.points.at(-1)?.value)
            .find((value) => value != null);
        return firstValue == null ? '-' : this.formatValue(firstValue);
    }
    reloadCatalog() {
        this.catalogState = 'loading';
        this.catalogErrorMessage = '';
        this.catalogErrorDetails = '';
        this.ociService.namespaces(this.contextForm.controls.compartmentId.getRawValue()).subscribe({
            next: (response) => {
                this.namespaces = response.namespaces.length ? response.namespaces : ['oci_computeagent'];
                if (!this.namespaces.includes(this.contextForm.controls.namespace.getRawValue())) {
                    this.contextForm.controls.namespace.setValue(this.namespaces[0]);
                }
                this.loadDefinitions(this.contextForm.controls.namespace.getRawValue());
                this.cdr.markForCheck();
            },
            error: (error) => {
                const code = this.extractErrorCode(error);
                if (code === 'OCI_NOT_CONFIGURED') {
                    this.catalogState = 'not-configured';
                }
                else {
                    this.catalogState = 'error';
                    this.catalogErrorMessage = this.extractErrorMessage(error, 'Impossible de charger les namespaces OCI.');
                    this.catalogErrorDetails = this.extractErrorDetails(error);
                }
                this.cdr.markForCheck();
            }
        });
    }
    onNamespaceChange(namespace) {
        this.loadDefinitions(namespace);
    }
    run(query) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            this.resultState = 'error';
            this.resultErrorMessage = 'La requete OCI MQL est vide.';
            this.resultErrorDetails = '';
            this.response = null;
            this.cdr.markForCheck();
            return;
        }
        this.query = trimmedQuery;
        this.resultState = 'loading';
        this.resultErrorMessage = '';
        this.resultErrorDetails = '';
        this.response = null;
        this.cdr.markForCheck();
        const end = new Date();
        const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
        this.ociService.queryMetrics({
            compartmentId: this.toNull(this.contextForm.controls.compartmentId.getRawValue()),
            namespace: this.contextForm.controls.namespace.getRawValue(),
            query: trimmedQuery,
            from: start.toISOString(),
            to: end.toISOString(),
            includeSubcompartments: this.contextForm.controls.includeSubcompartments.getRawValue()
        }).subscribe({
            next: (response) => {
                this.response = response;
                this.resultState = response.series.length ? 'ready' : 'empty';
                this.persistHistory(trimmedQuery);
                this.cdr.markForCheck();
            },
            error: (error) => {
                const code = this.extractErrorCode(error);
                this.response = null;
                if (code === 'OCI_NOT_CONFIGURED') {
                    this.resultState = 'not-configured';
                }
                else {
                    this.resultState = 'error';
                    this.resultErrorMessage = this.extractErrorMessage(error, 'Impossible de recuperer les metriques OCI.');
                    this.resultErrorDetails = this.extractErrorDetails(error);
                }
                this.cdr.markForCheck();
            }
        });
    }
    retry() {
        this.run(this.query);
    }
    applyQuery(query) {
        this.query = query;
        this.cdr.markForCheck();
    }
    displayName(series) {
        return series.dimensions['resourceDisplayName'] || series.dimensions['displayName'] || series.name || 'Serie OCI';
    }
    primaryDimension(series) {
        const entries = Object.entries(series.dimensions);
        if (!entries.length) {
            return 'Aucune dimension';
        }
        const [key, value] = entries[0];
        return `${key}=${value}`;
    }
    lastValue(series) {
        const value = [...series.points].reverse().find((point) => point.value != null)?.value;
        return value == null ? '-' : this.formatValue(value);
    }
    exportCsv() {
        if (!this.response) {
            return;
        }
        const lines = ['series,lastValue,type,dimensions'];
        for (const series of this.response.series) {
            lines.push([
                this.escapeCsv(this.displayName(series)),
                this.escapeCsv(this.lastValue(series)),
                this.escapeCsv(this.usageLabel),
                this.escapeCsv(this.primaryDimension(series))
            ].join(','));
        }
        this.downloadFile('oci-metrics.csv', lines.join('\n'), 'text/csv;charset=utf-8');
    }
    copyJson() {
        if (this.response) {
            void navigator.clipboard.writeText(JSON.stringify(this.response, null, 2));
        }
    }
    copy(query) {
        void navigator.clipboard.writeText(query);
    }
    loadHealth() {
        this.ociService.health().subscribe({
            next: (health) => {
                this.health = health;
                this.cdr.markForCheck();
            },
            error: () => {
                this.health = null;
                this.cdr.markForCheck();
            }
        });
    }
    loadDefinitions(namespace) {
        this.catalogState = 'loading';
        this.ociService.definitions(namespace, this.contextForm.controls.compartmentId.getRawValue()).subscribe({
            next: (response) => {
                this.definitions = response.definitions;
                this.catalogState = response.definitions.length ? 'ready' : 'empty';
                this.cdr.markForCheck();
            },
            error: (error) => {
                const code = this.extractErrorCode(error);
                if (code === 'OCI_NOT_CONFIGURED') {
                    this.catalogState = 'not-configured';
                }
                else {
                    this.catalogState = 'error';
                    this.catalogErrorMessage = this.extractErrorMessage(error, 'Impossible de charger les definitions OCI.');
                    this.catalogErrorDetails = this.extractErrorDetails(error);
                }
                this.cdr.markForCheck();
            }
        });
    }
    resolveUnit() {
        const normalizedQuery = this.query.toLowerCase();
        if (normalizedQuery.includes('cpuutilization')) {
            return { label: '% CPU', chartUnit: '%', usage: 'Consommation CPU' };
        }
        if (normalizedQuery.includes('memoryutilization')) {
            return { label: '% RAM', chartUnit: '%', usage: 'Consommation memoire' };
        }
        if (normalizedQuery.includes('bytesin') || normalizedQuery.includes('bytesout') || normalizedQuery.includes('bytes')) {
            return { label: 'GB', chartUnit: 'B', usage: 'Trafic reseau' };
        }
        if (normalizedQuery.includes('disk')) {
            return { label: 'GB', chartUnit: 'B', usage: 'E/S disque' };
        }
        return { label: 'valeur', chartUnit: '', usage: 'Valeur OCI' };
    }
    formatValue(value) {
        const unit = this.resolveUnit();
        if (unit.chartUnit === 'B') {
            return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value / (1024 ** 3))} GB`;
        }
        return unit.label === 'valeur'
            ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value)
            : `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value)} ${unit.label}`;
    }
    persistHistory(query) {
        this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
        localStorage.setItem('oci-metrics-history', JSON.stringify(this.history));
    }
    readHistory() {
        const value = localStorage.getItem('oci-metrics-history');
        return value ? JSON.parse(value) : [];
    }
    escapeCsv(value) {
        return `"${value.replaceAll('"', '""')}"`;
    }
    downloadFile(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
    toNull(value) {
        const trimmed = value.trim();
        return trimmed ? trimmed : null;
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
    static { this.ɵfac = function OciMetricsExplorerPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciMetricsExplorerPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OciService), i0.ɵɵdirectiveInject(i3.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OciMetricsExplorerPageComponent, selectors: [["app-oci-metrics-explorer-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 53, vars: 18, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "section-grid", "explorer-grid"], [1, "span-12"], ["title", "Contexte OCI", "subtitle", "Namespace, compartment et options de lecture."], [1, "toolbar-grid"], [1, "status-chip-row"], [1, "muted"], [3, "status"], [1, "context-grid", 3, "formGroup"], ["matInput", "", "formControlName", "compartmentId", "placeholder", "Optionnel, sinon valeur backend"], ["formControlName", "namespace", 3, "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "includeSubcompartments"], [1, "span-8"], ["title", "Requete OCI MQL", "subtitle", "Si la zone est vide, les exemples ci-dessous peuvent etre reappliques en un clic."], ["label", "OCI MQL", 3, "execute", "copy", "value"], [1, "query-meta"], [1, "query-block"], [1, "meta-label"], [1, "chip-row"], ["mat-stroked-button", "", "type", "button", "class", "query-chip", 3, "click", 4, "ngFor", "ngForOf"], ["class", "query-block", 4, "ngIf"], [1, "span-4"], ["title", "Metriques disponibles", "subtitle", "Definitions remontees par OCI pour le namespace actif."], [3, "ngSwitch"], [3, "rows", 4, "ngSwitchCase"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree.", 4, "ngSwitchCase"], ["title", "Aucune definition", "description", "Aucune metrique n'est disponible pour ce namespace.", 4, "ngSwitchCase"], [3, "message", "details", "retry", 4, "ngSwitchCase"], ["class", "definition-list", 4, "ngSwitchCase"], ["class", "span-12", 4, "ngIf"], [4, "ngIf"], [3, "value"], ["mat-stroked-button", "", "type", "button", 1, "query-chip", 3, "click"], [3, "rows"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree."], ["title", "Aucune definition", "description", "Aucune metrique n'est disponible pour ce namespace."], [3, "retry", "message", "details"], [1, "definition-list"], ["class", "definition-card", 4, "ngFor", "ngForOf"], [1, "definition-card"], ["title", "Execution en cours", "subtitle", "OCI Monitoring est interroge via le backend."], ["title", "Aucune donnee OCI", "description", "La requete MQL a repondu, mais sans serie exploitable pour la periode active."], ["title", "Visualisation OCI", 3, "subtitle"], [1, "stat-strip"], [1, "mini-stat"], [1, "chart-frame"], [3, "series", "unit"], [1, "series-grid"], ["class", "series-card", 4, "ngFor", "ngForOf"], ["title", "Tableau des resultats", "subtitle", "Derniere valeur par serie et dimensions principales."], [1, "table-wrapper"], [4, "ngFor", "ngForOf"], ["title", "Export et JSON brut", "subtitle", "Le JSON reste repliable pour garder l'interface lisible."], [1, "action-row"], [1, "raw-panel"], [1, "raw-json"], [1, "series-card"], [1, "series-head"], [1, "series-body"]], template: function OciMetricsExplorerPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "OCI Metrics Explorer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Exploration MQL via le backend Spring Boot, avec definitions, graphe, tableau et export.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 3);
            i0.ɵɵlistener("click", function OciMetricsExplorerPageComponent_Template_button_click_6_listener() { return ctx.reloadCatalog(); });
            i0.ɵɵtext(7, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5)(10, "app-panel-container", 6)(11, "div", 7)(12, "div", 8)(13, "span", 9);
            i0.ɵɵtext(14, "Statut");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "app-health-badge", 10);
            i0.ɵɵelementStart(16, "span", 9);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "form", 11)(19, "mat-form-field")(20, "mat-label");
            i0.ɵɵtext(21, "Compartment ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(22, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "mat-form-field")(24, "mat-label");
            i0.ɵɵtext(25, "Namespace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "mat-select", 13);
            i0.ɵɵlistener("valueChange", function OciMetricsExplorerPageComponent_Template_mat_select_valueChange_26_listener($event) { return ctx.onNamespaceChange($event); });
            i0.ɵɵtemplate(27, OciMetricsExplorerPageComponent_mat_option_27_Template, 2, 2, "mat-option", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "mat-checkbox", 15);
            i0.ɵɵtext(29, "Inclure les sous-compartments");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(30, "div", 16)(31, "app-panel-container", 17)(32, "app-query-editor", 18);
            i0.ɵɵlistener("execute", function OciMetricsExplorerPageComponent_Template_app_query_editor_execute_32_listener($event) { return ctx.run($event); })("copy", function OciMetricsExplorerPageComponent_Template_app_query_editor_copy_32_listener($event) { return ctx.copy($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 19)(34, "div", 20)(35, "div", 21);
            i0.ɵɵtext(36, "Exemples");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 22);
            i0.ɵɵtemplate(38, OciMetricsExplorerPageComponent_button_38_Template, 2, 1, "button", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(39, OciMetricsExplorerPageComponent_div_39_Template, 5, 1, "div", 24);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "div", 25)(41, "app-panel-container", 26);
            i0.ɵɵelementContainerStart(42, 27);
            i0.ɵɵtemplate(43, OciMetricsExplorerPageComponent_app_loading_skeleton_43_Template, 1, 1, "app-loading-skeleton", 28)(44, OciMetricsExplorerPageComponent_app_empty_state_44_Template, 1, 0, "app-empty-state", 29)(45, OciMetricsExplorerPageComponent_app_empty_state_45_Template, 1, 0, "app-empty-state", 30)(46, OciMetricsExplorerPageComponent_app_error_state_46_Template, 1, 2, "app-error-state", 31)(47, OciMetricsExplorerPageComponent_div_47_Template, 2, 1, "div", 32);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(48, OciMetricsExplorerPageComponent_div_48_Template, 3, 1, "div", 33)(49, OciMetricsExplorerPageComponent_div_49_Template, 2, 0, "div", 33)(50, OciMetricsExplorerPageComponent_div_50_Template, 2, 2, "div", 33)(51, OciMetricsExplorerPageComponent_div_51_Template, 2, 0, "div", 33)(52, OciMetricsExplorerPageComponent_ng_container_52_Template, 57, 12, "ng-container", 34);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("status", ctx.healthBadgeStatus);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.healthMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.contextForm);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.namespaces);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.query);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.examples);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.history.length);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.catalogState);
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
            i0.ɵɵproperty("ngIf", ctx.resultState === "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.resultState === "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.resultState === "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.resultState === "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.resultState === "ready" && ctx.response);
        } }, dependencies: [NgIf,
            NgFor,
            NgSwitch,
            NgSwitchCase,
            JsonPipe,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i4.MatButton, MatCheckboxModule, i5.MatCheckbox, MatFormFieldModule, i6.MatFormField, i6.MatLabel, MatInputModule, i7.MatInput, MatSelectModule, i8.MatSelect, i9.MatOption, PanelContainerComponent,
            QueryEditorComponent,
            TimeSeriesChartComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent,
            HealthBadgeComponent], styles: [".explorer-grid[_ngcontent-%COMP%] { align-items: start; }\n    .toolbar-grid[_ngcontent-%COMP%], \n   .query-meta[_ngcontent-%COMP%], \n   .query-block[_ngcontent-%COMP%], \n   .definition-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .status-chip-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      gap: 0.65rem;\n    }\n    .context-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(260px, 1fr) 260px auto;\n      gap: 0.85rem;\n      align-items: center;\n    }\n    .meta-label[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row[_ngcontent-%COMP%], \n   .action-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.6rem;\n    }\n    .query-chip[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      min-height: 34px;\n      font-size: 0.78rem;\n    }\n    .definition-card[_ngcontent-%COMP%], \n   .series-card[_ngcontent-%COMP%], \n   .mini-stat[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .stat-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .series-body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .chart-frame[_ngcontent-%COMP%] {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .series-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .series-head[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n    .series-body[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.65rem;\n    }\n    .table-wrapper[_ngcontent-%COMP%] {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      border-bottom: 1px solid var(--border-soft);\n      vertical-align: top;\n    }\n    th[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .raw-panel[_ngcontent-%COMP%] {\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-json[_ngcontent-%COMP%] {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 1080px) {\n      .context-grid[_ngcontent-%COMP%], \n   .stat-strip[_ngcontent-%COMP%], \n   .series-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciMetricsExplorerPageComponent, [{
        type: Component,
        args: [{ selector: 'app-oci-metrics-explorer-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgSwitch,
                    NgSwitchCase,
                    JsonPipe,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    PanelContainerComponent,
                    QueryEditorComponent,
                    TimeSeriesChartComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent,
                    HealthBadgeComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Metrics Explorer</h1>
        <div class="page-subtitle">Exploration MQL via le backend Spring Boot, avec definitions, graphe, tableau et export.</div>
      </div>
      <button mat-stroked-button type="button" (click)="reloadCatalog()">Actualiser</button>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Contexte OCI" subtitle="Namespace, compartment et options de lecture.">
          <div class="toolbar-grid">
            <div class="status-chip-row">
              <span class="muted">Statut</span>
              <app-health-badge [status]="healthBadgeStatus"></app-health-badge>
              <span class="muted">{{ healthMessage }}</span>
            </div>

            <form [formGroup]="contextForm" class="context-grid">
              <mat-form-field>
                <mat-label>Compartment ID</mat-label>
                <input matInput formControlName="compartmentId" placeholder="Optionnel, sinon valeur backend">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Namespace</mat-label>
                <mat-select formControlName="namespace" (valueChange)="onNamespaceChange($event)">
                  <mat-option *ngFor="let namespace of namespaces" [value]="namespace">{{ namespace }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-checkbox formControlName="includeSubcompartments">Inclure les sous-compartments</mat-checkbox>
            </form>
          </div>
        </app-panel-container>
      </div>

      <div class="span-8">
        <app-panel-container title="Requete OCI MQL" subtitle="Si la zone est vide, les exemples ci-dessous peuvent etre reappliques en un clic.">
          <app-query-editor [value]="query" label="OCI MQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta">
            <div class="query-block">
              <div class="meta-label">Exemples</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip" *ngFor="let example of examples" (click)="applyQuery(example)">
                  {{ example }}
                </button>
              </div>
            </div>

            <div class="query-block" *ngIf="history.length">
              <div class="meta-label">Historique local</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip" *ngFor="let item of history" (click)="applyQuery(item)">
                  {{ item }}
                </button>
              </div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-4">
        <app-panel-container title="Metriques disponibles" subtitle="Definitions remontees par OCI pour le namespace actif.">
          <ng-container [ngSwitch]="catalogState">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="6"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune definition" description="Aucune metrique n'est disponible pour ce namespace."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="catalogErrorMessage" [details]="catalogErrorDetails" (retry)="reloadCatalog()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="definition-list">
              <article *ngFor="let definition of visibleDefinitions" class="definition-card">
                <strong>{{ definition.name }}</strong>
                <div class="muted">{{ definition.dimensions.join(', ') || 'Aucune dimension' }}</div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="resultState === 'loading'">
        <app-panel-container title="Execution en cours" subtitle="OCI Monitoring est interroge via le backend.">
          <app-loading-skeleton [rows]="7"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="resultState === 'not-configured'">
        <app-empty-state title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
      </div>

      <div class="span-12" *ngIf="resultState === 'error'">
        <app-error-state [message]="resultErrorMessage" [details]="resultErrorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="resultState === 'empty'">
        <app-empty-state title="Aucune donnee OCI" description="La requete MQL a repondu, mais sans serie exploitable pour la periode active."></app-empty-state>
      </div>

      <ng-container *ngIf="resultState === 'ready' && response as currentResponse">
        <div class="span-12">
          <app-panel-container title="Visualisation OCI" [subtitle]="'Periode active : ' + selectedRangeLabel">
            <div class="stat-strip">
              <div class="mini-stat">
                <span>Series</span>
                <strong>{{ currentResponse.series.length }}</strong>
              </div>
              <div class="mini-stat">
                <span>Points</span>
                <strong>{{ totalPoints }}</strong>
              </div>
              <div class="mini-stat">
                <span>Derniere valeur</span>
                <strong>{{ globalLastValueLabel }}</strong>
              </div>
              <div class="mini-stat">
                <span>Unite</span>
                <strong>{{ unitLabel }}</strong>
              </div>
            </div>

            <div class="chart-frame">
              <app-time-series-chart [series]="chartSeries" [unit]="chartUnit"></app-time-series-chart>
            </div>

            <div class="series-grid">
              <article class="series-card" *ngFor="let series of visibleSeries">
                <div class="series-head">
                  <strong>{{ displayName(series) }}</strong>
                  <span>{{ series.points.length }} pts</span>
                </div>
                <div class="series-body">
                  <div>
                    <span>Derniere valeur</span>
                    <strong>{{ lastValue(series) }}</strong>
                  </div>
                  <div>
                    <span>Utilite</span>
                    <strong>{{ usageLabel }}</strong>
                  </div>
                  <div>
                    <span>Dimensions</span>
                    <strong>{{ primaryDimension(series) }}</strong>
                  </div>
                </div>
              </article>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Tableau des resultats" subtitle="Derniere valeur par serie et dimensions principales.">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Serie</th>
                    <th>Derniere valeur</th>
                    <th>Type</th>
                    <th>Dimensions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let series of currentResponse.series">
                    <td>{{ displayName(series) }}</td>
                    <td>{{ lastValue(series) }}</td>
                    <td>{{ usageLabel }}</td>
                    <td>{{ primaryDimension(series) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Export et JSON brut" subtitle="Le JSON reste repliable pour garder l'interface lisible.">
            <div class="action-row">
              <button mat-stroked-button type="button" (click)="exportCsv()">Exporter CSV</button>
              <button mat-stroked-button type="button" (click)="copyJson()">Copier JSON</button>
            </div>

            <details class="raw-panel">
              <summary>Afficher la reponse JSON</summary>
              <pre class="raw-json">{{ currentResponse | json }}</pre>
            </details>
          </app-panel-container>
        </div>
      </ng-container>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .explorer-grid { align-items: start; }\n    .toolbar-grid,\n    .query-meta,\n    .query-block,\n    .definition-list {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .status-chip-row {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      gap: 0.65rem;\n    }\n    .context-grid {\n      display: grid;\n      grid-template-columns: minmax(260px, 1fr) 260px auto;\n      gap: 0.85rem;\n      align-items: center;\n    }\n    .meta-label {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row,\n    .action-row {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.6rem;\n    }\n    .query-chip {\n      border-radius: 999px;\n      min-height: 34px;\n      font-size: 0.78rem;\n    }\n    .definition-card,\n    .series-card,\n    .mini-stat {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .stat-strip {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat span,\n    .series-body span {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .chart-frame {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .series-grid {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .series-head {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n    .series-body {\n      display: grid;\n      gap: 0.65rem;\n    }\n    .table-wrapper {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th,\n    td {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      border-bottom: 1px solid var(--border-soft);\n      vertical-align: top;\n    }\n    th {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .raw-panel {\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel summary {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-json {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 1080px) {\n      .context-grid,\n      .stat-strip,\n      .series-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.OciService }, { type: i3.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OciMetricsExplorerPageComponent, { className: "OciMetricsExplorerPageComponent", filePath: "src\\app\\features\\oci\\oci-metrics-explorer-page.component.ts", lineNumber: 369 }); })();
//# sourceMappingURL=oci-metrics-explorer-page.component.js.map