import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/oci.service";
import * as i3 from "../../core/services/time-range.service";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
import * as i7 from "@angular/material/select";
import * as i8 from "@angular/material/core";
function OciLogsExplorerPageComponent_div_31_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function OciLogsExplorerPageComponent_div_31_button_4_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.applyQuery(item_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2 || "Requete par defaut backend", " ");
} }
function OciLogsExplorerPageComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 17);
    i0.ɵɵtext(2, "Historique local");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 18);
    i0.ɵɵtemplate(4, OciLogsExplorerPageComponent_div_31_button_4_Template, 2, 1, "button", 19);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.history);
} }
function OciLogsExplorerPageComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "app-panel-container", 21);
    i0.ɵɵelement(2, "app-loading-skeleton", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("rows", 8);
} }
function OciLogsExplorerPageComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "app-empty-state", 23);
    i0.ɵɵelementEnd();
} }
function OciLogsExplorerPageComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "app-error-state", 24);
    i0.ɵɵlistener("retry", function OciLogsExplorerPageComponent_div_34_Template_app_error_state_retry_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.retry()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("message", ctx_r2.errorMessage)("details", ctx_r2.errorDetails);
} }
function OciLogsExplorerPageComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "app-empty-state", 25);
    i0.ɵɵelementEnd();
} }
function OciLogsExplorerPageComponent_ng_container_36_tr_46_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "button", 3);
    i0.ɵɵlistener("click", function OciLogsExplorerPageComponent_ng_container_36_tr_46_Template_button_click_12_listener() { const log_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.copyMessage(log_r7)); });
    i0.ɵɵtext(13, "Copier");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const log_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r7.timestamp || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.severity(log_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r7.service || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r7.resourceName || log_r7.resourceId || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r7.message || "-");
} }
function OciLogsExplorerPageComponent_ng_container_36_details_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "details", 34)(1, "summary");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "pre", 35);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "json");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const log_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.severity(log_r8), " \u00B7 ", log_r8.resourceName || log_r8.service || "OCI", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 3, log_r8.data));
} }
function OciLogsExplorerPageComponent_ng_container_36_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 5)(2, "app-panel-container", 26)(3, "div", 27)(4, "div", 28)(5, "span");
    i0.ɵɵtext(6, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 28)(10, "span");
    i0.ɵɵtext(11, "Affiches");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 28)(15, "span");
    i0.ɵɵtext(16, "Warnings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 28)(20, "span");
    i0.ɵɵtext(21, "Erreurs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 29)(25, "button", 3);
    i0.ɵɵlistener("click", function OciLogsExplorerPageComponent_ng_container_36_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.exportJson()); });
    i0.ɵɵtext(26, "Exporter JSON");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 3);
    i0.ɵɵlistener("click", function OciLogsExplorerPageComponent_ng_container_36_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.exportCsv()); });
    i0.ɵɵtext(28, "Exporter CSV");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 30)(30, "table")(31, "thead")(32, "tr")(33, "th");
    i0.ɵɵtext(34, "Timestamp");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "th");
    i0.ɵɵtext(36, "Severity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "th");
    i0.ɵɵtext(38, "Service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "th");
    i0.ɵɵtext(40, "Ressource");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "th");
    i0.ɵɵtext(42, "Message");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "th");
    i0.ɵɵtext(44, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "tbody");
    i0.ɵɵtemplate(46, OciLogsExplorerPageComponent_ng_container_36_tr_46_Template, 14, 5, "tr", 31);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(47, "div", 5)(48, "app-panel-container", 32);
    i0.ɵɵtemplate(49, OciLogsExplorerPageComponent_ng_container_36_details_49_Template, 6, 5, "details", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r9 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("subtitle", "Periode active : " + ctx_r2.selectedRangeLabel);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(currentResponse_r9.count);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.filteredLogs.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.warningCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.errorCount);
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredLogs);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredLogs.slice(0, 8));
} }
export class OciLogsExplorerPageComponent {
    constructor(formBuilder, ociService, timeRangeService, cdr) {
        this.formBuilder = formBuilder;
        this.ociService = ociService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.filtersForm = this.formBuilder.nonNullable.group({
            compartmentId: [''],
            limit: [200, Validators.required],
            textFilter: ['']
        });
        this.state = 'idle';
        this.response = null;
        this.errorMessage = '';
        this.errorDetails = '';
        this.query = '';
        this.history = this.readHistory();
        this.filtersForm.valueChanges.subscribe(() => this.cdr.markForCheck());
    }
    run(query) {
        this.query = query;
        this.state = 'loading';
        this.response = null;
        this.errorMessage = '';
        this.errorDetails = '';
        this.cdr.markForCheck();
        const end = new Date();
        const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
        this.ociService.searchLogs({
            searchQuery: query.trim() ? query.trim() : null,
            compartmentId: this.toNull(this.filtersForm.controls.compartmentId.getRawValue()),
            from: start.toISOString(),
            to: end.toISOString(),
            limit: this.filtersForm.controls.limit.getRawValue()
        }).subscribe({
            next: (response) => {
                this.response = response;
                this.state = response.logs.length ? 'ready' : 'empty';
                this.persistHistory(query.trim());
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.response = null;
                const code = this.extractErrorCode(error);
                if (code === 'OCI_NOT_CONFIGURED') {
                    this.state = 'not-configured';
                }
                else {
                    this.state = 'error';
                    this.errorMessage = this.extractErrorMessage(error, 'Impossible de recuperer les logs OCI.');
                    this.errorDetails = this.extractErrorDetails(error);
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
    copy(query) {
        void navigator.clipboard.writeText(query);
    }
    copyMessage(log) {
        void navigator.clipboard.writeText(log.message || '');
    }
    severity(log) {
        return (log.severity || 'INFO').toUpperCase();
    }
    get filteredLogs() {
        const textFilter = this.filtersForm.controls.textFilter.getRawValue().trim().toLowerCase();
        return (this.response?.logs || []).filter((log) => {
            if (!textFilter) {
                return true;
            }
            return [
                log.message,
                log.service,
                log.resourceName,
                log.resourceId,
                log.severity
            ].join(' ').toLowerCase().includes(textFilter);
        });
    }
    get warningCount() {
        return this.filteredLogs.filter((log) => this.severity(log).includes('WARN')).length;
    }
    get errorCount() {
        return this.filteredLogs.filter((log) => this.severity(log).includes('ERROR')).length;
    }
    get selectedRangeLabel() {
        return this.timeRangeService.selected().label;
    }
    exportJson() {
        if (!this.response) {
            return;
        }
        this.downloadFile('oci-logs.json', JSON.stringify(this.response, null, 2), 'application/json;charset=utf-8');
    }
    exportCsv() {
        const rows = ['timestamp,severity,service,resource,message'];
        for (const log of this.filteredLogs) {
            rows.push([
                this.escapeCsv(log.timestamp || ''),
                this.escapeCsv(this.severity(log)),
                this.escapeCsv(log.service || ''),
                this.escapeCsv(log.resourceName || log.resourceId || ''),
                this.escapeCsv(log.message || '')
            ].join(','));
        }
        this.downloadFile('oci-logs.csv', rows.join('\n'), 'text/csv;charset=utf-8');
    }
    persistHistory(query) {
        this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
        localStorage.setItem('oci-logs-history', JSON.stringify(this.history));
    }
    readHistory() {
        const value = localStorage.getItem('oci-logs-history');
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
    static { this.ɵfac = function OciLogsExplorerPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciLogsExplorerPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OciService), i0.ɵɵdirectiveInject(i3.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OciLogsExplorerPageComponent, selectors: [["app-oci-logs-explorer-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 37, vars: 11, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "section-grid", "explorer-grid"], [1, "span-12"], ["title", "Recherche OCI", "subtitle", "Si la requete est vide, le backend utilise automatiquement la recherche par compartment configure."], [1, "filters-grid", 3, "formGroup"], ["matInput", "", "formControlName", "compartmentId", "placeholder", "Optionnel"], ["formControlName", "limit"], [3, "value"], ["matInput", "", "formControlName", "textFilter", "placeholder", "message, service, severity"], ["label", "OCI Logging Search", 3, "execute", "copy", "value"], ["class", "query-meta", 4, "ngIf"], ["class", "span-12", 4, "ngIf"], [4, "ngIf"], [1, "query-meta"], [1, "meta-label"], [1, "chip-row"], ["mat-stroked-button", "", "type", "button", "class", "query-chip", 3, "click", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", "type", "button", 1, "query-chip", 3, "click"], ["title", "Chargement OCI", "subtitle", "Le backend interroge OCI Logging Search."], [3, "rows"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree."], [3, "retry", "message", "details"], ["title", "Aucun log OCI", "description", "La recherche n'a retourne aucun log pour la periode active."], ["title", "Flux de logs OCI", 3, "subtitle"], [1, "stat-strip"], [1, "mini-stat"], [1, "action-row"], [1, "table-wrapper"], [4, "ngFor", "ngForOf"], ["title", "Details JSON", "subtitle", "Chaque entree peut avoir une structure OCI differente, le JSON reste accessible."], ["class", "raw-panel", 4, "ngFor", "ngForOf"], [1, "raw-panel"], [1, "raw-json"]], template: function OciLogsExplorerPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "OCI Logs Explorer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "OCI Logging Search, filtrage local, copie rapide et export JSON ou CSV.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 3);
            i0.ɵɵlistener("click", function OciLogsExplorerPageComponent_Template_button_click_6_listener() { return ctx.run(ctx.query); });
            i0.ɵɵtext(7, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5)(10, "app-panel-container", 6)(11, "form", 7)(12, "mat-form-field")(13, "mat-label");
            i0.ɵɵtext(14, "Compartment ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "mat-form-field")(17, "mat-label");
            i0.ɵɵtext(18, "Limite");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "mat-select", 9)(20, "mat-option", 10);
            i0.ɵɵtext(21, "100");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-option", 10);
            i0.ɵɵtext(23, "200");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "mat-option", 10);
            i0.ɵɵtext(25, "500");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "mat-form-field")(27, "mat-label");
            i0.ɵɵtext(28, "Filtre local");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "input", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "app-query-editor", 12);
            i0.ɵɵlistener("execute", function OciLogsExplorerPageComponent_Template_app_query_editor_execute_30_listener($event) { return ctx.run($event); })("copy", function OciLogsExplorerPageComponent_Template_app_query_editor_copy_30_listener($event) { return ctx.copy($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, OciLogsExplorerPageComponent_div_31_Template, 5, 1, "div", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, OciLogsExplorerPageComponent_div_32_Template, 3, 1, "div", 14)(33, OciLogsExplorerPageComponent_div_33_Template, 2, 0, "div", 14)(34, OciLogsExplorerPageComponent_div_34_Template, 2, 2, "div", 14)(35, OciLogsExplorerPageComponent_div_35_Template, 2, 0, "div", 14)(36, OciLogsExplorerPageComponent_ng_container_36_Template, 50, 7, "ng-container", 15);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("formGroup", ctx.filtersForm);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("value", 100);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 200);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 500);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.query);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.history.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "ready" && ctx.response);
        } }, dependencies: [NgIf,
            NgFor,
            JsonPipe,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i4.MatButton, MatFormFieldModule, i5.MatFormField, i5.MatLabel, MatInputModule, i6.MatInput, MatSelectModule, i7.MatSelect, i8.MatOption, PanelContainerComponent,
            QueryEditorComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent], styles: [".explorer-grid[_ngcontent-%COMP%], \n   .query-meta[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .filters-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(240px, 1fr) 180px minmax(220px, 1fr);\n      gap: 0.85rem;\n    }\n    .meta-label[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row[_ngcontent-%COMP%], \n   .action-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.6rem;\n    }\n    .query-chip[_ngcontent-%COMP%] {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n    }\n    .stat-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .mini-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .table-wrapper[_ngcontent-%COMP%] {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      border-bottom: 1px solid var(--border-soft);\n      vertical-align: top;\n    }\n    th[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .raw-panel[_ngcontent-%COMP%] {\n      margin-top: 0.75rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-json[_ngcontent-%COMP%] {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 1080px) {\n      .filters-grid[_ngcontent-%COMP%], \n   .stat-strip[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciLogsExplorerPageComponent, [{
        type: Component,
        args: [{ selector: 'app-oci-logs-explorer-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    JsonPipe,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    PanelContainerComponent,
                    QueryEditorComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Logs Explorer</h1>
        <div class="page-subtitle">OCI Logging Search, filtrage local, copie rapide et export JSON ou CSV.</div>
      </div>
      <button mat-stroked-button type="button" (click)="run(query)">Actualiser</button>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Recherche OCI" subtitle="Si la requete est vide, le backend utilise automatiquement la recherche par compartment configure.">
          <form [formGroup]="filtersForm" class="filters-grid">
            <mat-form-field>
              <mat-label>Compartment ID</mat-label>
              <input matInput formControlName="compartmentId" placeholder="Optionnel">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Limite</mat-label>
              <mat-select formControlName="limit">
                <mat-option [value]="100">100</mat-option>
                <mat-option [value]="200">200</mat-option>
                <mat-option [value]="500">500</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Filtre local</mat-label>
              <input matInput formControlName="textFilter" placeholder="message, service, severity">
            </mat-form-field>
          </form>

          <app-query-editor [value]="query" label="OCI Logging Search" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta" *ngIf="history.length">
            <div class="meta-label">Historique local</div>
            <div class="chip-row">
              <button mat-stroked-button type="button" class="query-chip" *ngFor="let item of history" (click)="applyQuery(item)">
                {{ item || 'Requete par defaut backend' }}
              </button>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="state === 'loading'">
        <app-panel-container title="Chargement OCI" subtitle="Le backend interroge OCI Logging Search.">
          <app-loading-skeleton [rows]="8"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="state === 'not-configured'">
        <app-empty-state title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
      </div>

      <div class="span-12" *ngIf="state === 'error'">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="state === 'empty'">
        <app-empty-state title="Aucun log OCI" description="La recherche n'a retourne aucun log pour la periode active."></app-empty-state>
      </div>

      <ng-container *ngIf="state === 'ready' && response as currentResponse">
        <div class="span-12">
          <app-panel-container title="Flux de logs OCI" [subtitle]="'Periode active : ' + selectedRangeLabel">
            <div class="stat-strip">
              <div class="mini-stat">
                <span>Total</span>
                <strong>{{ currentResponse.count }}</strong>
              </div>
              <div class="mini-stat">
                <span>Affiches</span>
                <strong>{{ filteredLogs.length }}</strong>
              </div>
              <div class="mini-stat">
                <span>Warnings</span>
                <strong>{{ warningCount }}</strong>
              </div>
              <div class="mini-stat">
                <span>Erreurs</span>
                <strong>{{ errorCount }}</strong>
              </div>
            </div>

            <div class="action-row">
              <button mat-stroked-button type="button" (click)="exportJson()">Exporter JSON</button>
              <button mat-stroked-button type="button" (click)="exportCsv()">Exporter CSV</button>
            </div>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Service</th>
                    <th>Ressource</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let log of filteredLogs">
                    <td>{{ log.timestamp || '-' }}</td>
                    <td>{{ severity(log) }}</td>
                    <td>{{ log.service || '-' }}</td>
                    <td>{{ log.resourceName || log.resourceId || '-' }}</td>
                    <td>{{ log.message || '-' }}</td>
                    <td><button mat-stroked-button type="button" (click)="copyMessage(log)">Copier</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </app-panel-container>
        </div>

        <div class="span-12">
          <app-panel-container title="Details JSON" subtitle="Chaque entree peut avoir une structure OCI differente, le JSON reste accessible.">
            <details class="raw-panel" *ngFor="let log of filteredLogs.slice(0, 8)">
              <summary>{{ severity(log) }} · {{ log.resourceName || log.service || 'OCI' }}</summary>
              <pre class="raw-json">{{ log.data | json }}</pre>
            </details>
          </app-panel-container>
        </div>
      </ng-container>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .explorer-grid,\n    .query-meta {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .filters-grid {\n      display: grid;\n      grid-template-columns: minmax(240px, 1fr) 180px minmax(220px, 1fr);\n      gap: 0.85rem;\n    }\n    .meta-label {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row,\n    .action-row {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.6rem;\n    }\n    .query-chip {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n    }\n    .stat-strip {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat {\n      display: grid;\n      gap: 0.25rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .mini-stat span {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .table-wrapper {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th,\n    td {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      border-bottom: 1px solid var(--border-soft);\n      vertical-align: top;\n    }\n    th {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .raw-panel {\n      margin-top: 0.75rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel summary {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-json {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 1080px) {\n      .filters-grid,\n      .stat-strip {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.OciService }, { type: i3.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OciLogsExplorerPageComponent, { className: "OciLogsExplorerPageComponent", filePath: "src\\app\\features\\oci\\oci-logs-explorer-page.component.ts", lineNumber: 263 }); })();
//# sourceMappingURL=oci-logs-explorer-page.component.js.map