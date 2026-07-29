import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/monitoring.service";
import * as i2 from "../../core/services/time-range.service";
import * as i3 from "@angular/material/button";
function LogsExplorerPageComponent_div_10_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function LogsExplorerPageComponent_div_10_button_5_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.applyExample(item_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2, " ");
} }
function LogsExplorerPageComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "div", 12);
    i0.ɵɵtext(3, "Historique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13);
    i0.ɵɵtemplate(5, LogsExplorerPageComponent_div_10_button_5_Template, 2, 1, "button", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.history);
} }
function LogsExplorerPageComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "app-panel-container", 16);
    i0.ɵɵelement(2, "app-loading-skeleton", 17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("rows", 8);
} }
function LogsExplorerPageComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "app-error-state", 18);
    i0.ɵɵlistener("retry", function LogsExplorerPageComponent_div_12_Template_app_error_state_retry_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.retry()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("message", ctx_r2.errorMessage)("details", ctx_r2.errorDetails);
} }
function LogsExplorerPageComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "app-empty-state", 19);
    i0.ɵɵelementEnd();
} }
function LogsExplorerPageComponent_ng_container_14_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "app-empty-state", 20);
    i0.ɵɵelementEnd();
} }
function LogsExplorerPageComponent_ng_container_14_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 4)(2, "app-panel-container", 21)(3, "div", 22)(4, "div", 23)(5, "span");
    i0.ɵɵtext(6, "Streams");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 23)(10, "span");
    i0.ɵɵtext(11, "Entrees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 23)(15, "span");
    i0.ɵɵtext(16, "Filtre actif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 23)(20, "span");
    i0.ɵɵtext(21, "Derniere requete");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong", 24);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 25)(25, "div", 12);
    i0.ɵɵtext(26, "Filtrer les resultats");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 26)(28, "button", 27);
    i0.ɵɵlistener("click", function LogsExplorerPageComponent_ng_container_14_ng_container_2_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setFilter("ALL")); });
    i0.ɵɵtext(29, " Tout ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 28);
    i0.ɵɵlistener("click", function LogsExplorerPageComponent_ng_container_14_ng_container_2_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setFilter("WARN")); });
    i0.ɵɵtext(31, " Warnings ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 29);
    i0.ɵɵlistener("click", function LogsExplorerPageComponent_ng_container_14_ng_container_2_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setFilter("ERROR")); });
    i0.ɵɵtext(33, " Erreurs ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 30);
    i0.ɵɵelement(35, "app-logs-viewer", 31);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(36, "div", 4)(37, "app-panel-container", 32)(38, "details", 33)(39, "summary");
    i0.ɵɵtext(40, "Afficher la reponse JSON");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "pre", 34);
    i0.ɵɵtext(42);
    i0.ɵɵpipe(43, "json");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r6 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("subtitle", "Periode active : " + ctx_r2.selectedRangeLabel);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.visibleStreamsCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.visibleEntriesCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedFilterLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.query);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("filter-chip-active", ctx_r2.selectedFilter === "ALL");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("filter-chip-active", ctx_r2.selectedFilter === "WARN");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("filter-chip-active", ctx_r2.selectedFilter === "ERROR");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("streams", ctx_r2.filteredStreams);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(43, 13, currentResponse_r6));
} }
function LogsExplorerPageComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, LogsExplorerPageComponent_ng_container_14_div_1_Template, 2, 0, "div", 8)(2, LogsExplorerPageComponent_ng_container_14_ng_container_2_Template, 44, 15, "ng-container", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !currentResponse_r6.streams.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", currentResponse_r6.streams.length);
} }
export class LogsExplorerPageComponent {
    constructor(monitoringService, timeRangeService, cdr) {
        this.monitoringService = monitoringService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.query = '{job=~".+"}';
        this.response = null;
        this.history = this.readHistory();
        this.loading = false;
        this.errorMessage = '';
        this.errorDetails = '';
        this.selectedFilter = 'ALL';
        this.lastExecutedQuery = this.query;
    }
    run(query) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            this.response = null;
            this.errorMessage = 'La requete LogQL est vide.';
            this.errorDetails = '';
            this.cdr.markForCheck();
            return;
        }
        const end = new Date();
        const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
        this.query = trimmedQuery;
        this.lastExecutedQuery = trimmedQuery;
        this.loading = true;
        this.errorMessage = '';
        this.errorDetails = '';
        this.response = null;
        this.cdr.markForCheck();
        this.monitoringService
            .queryLogsRange({
            query: trimmedQuery,
            start: start.toISOString(),
            end: end.toISOString(),
            step: '60',
            limit: 200,
            direction: 'BACKWARD'
        })
            .subscribe({
            next: (response) => {
                this.response = response;
                this.persistHistory(trimmedQuery);
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.loading = false;
                this.response = null;
                this.errorMessage = this.extractErrorMessage(error);
                this.errorDetails = this.extractErrorDetails(error);
                this.cdr.markForCheck();
            }
        });
    }
    retry() {
        this.run(this.lastExecutedQuery);
    }
    applyExample(query) {
        this.query = query;
        this.cdr.markForCheck();
    }
    copy(query) {
        void navigator.clipboard.writeText(query);
    }
    setFilter(filter) {
        this.selectedFilter = filter;
        this.cdr.markForCheck();
    }
    get totalEntries() {
        return (this.response?.streams ?? []).reduce((total, stream) => total + stream.entries.length, 0);
    }
    get filteredStreams() {
        const streams = this.response?.streams ?? [];
        if (this.selectedFilter === 'ALL') {
            return streams;
        }
        return streams
            .map((stream) => ({
            ...stream,
            entries: stream.entries.filter((entry) => this.matchesFilter(entry))
        }))
            .filter((stream) => stream.entries.length > 0);
    }
    get visibleStreamsCount() {
        return this.filteredStreams.length;
    }
    get visibleEntriesCount() {
        return this.filteredStreams.reduce((total, stream) => total + stream.entries.length, 0);
    }
    get selectedFilterLabel() {
        switch (this.selectedFilter) {
            case 'WARN':
                return 'Warnings';
            case 'ERROR':
                return 'Erreurs';
            default:
                return 'Tout';
        }
    }
    get selectedRangeLabel() {
        return this.timeRangeService.selected().label;
    }
    persistHistory(query) {
        this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
        localStorage.setItem('logs-history', JSON.stringify(this.history));
    }
    readHistory() {
        const value = localStorage.getItem('logs-history');
        return value ? JSON.parse(value) : [];
    }
    matchesFilter(entry) {
        return (entry.level || 'INFO').toUpperCase() === this.selectedFilter;
    }
    extractErrorMessage(error) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const errorValue = error.error;
            if (errorValue?.message) {
                return errorValue.message;
            }
        }
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return String(error.message ?? 'Impossible de recuperer les logs.');
        }
        return 'Impossible de recuperer les logs.';
    }
    extractErrorDetails(error) {
        try {
            return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        }
        catch {
            return '';
        }
    }
    static { this.ɵfac = function LogsExplorerPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LogsExplorerPageComponent)(i0.ɵɵdirectiveInject(i1.MonitoringService), i0.ɵɵdirectiveInject(i2.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogsExplorerPageComponent, selectors: [["app-logs-explorer-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 6, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "section-grid", "explorer-grid"], [1, "span-12"], ["title", "Requete LogQL", "subtitle", "Le navigateur ne contacte jamais Loki directement."], ["label", "LogQL", 3, "execute", "copy", "value"], ["class", "query-meta", 4, "ngIf"], ["class", "span-12", 4, "ngIf"], [4, "ngIf"], [1, "query-meta"], [1, "query-block"], [1, "meta-label"], [1, "chip-row"], ["mat-stroked-button", "", "type", "button", "class", "query-chip history-chip", 3, "click", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", "type", "button", 1, "query-chip", "history-chip", 3, "click"], ["title", "Chargement des logs", "subtitle", "Le premier clic doit suffire pour afficher le resultat."], [3, "rows"], [3, "retry", "message", "details"], ["title", "Aucune requete executee.", "description", "Lance une requete LogQL pour afficher un flux de logs lisible et bien organise."], ["title", "Aucune donnee recue pour cette periode.", "description", "Loki a repondu mais n'a retourne aucun stream pour cette requete."], ["title", "Flux de logs", 3, "subtitle"], [1, "stat-strip"], [1, "mini-stat"], [1, "query-preview"], [1, "filter-toolbar"], [1, "filter-actions"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", 3, "click"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", "filter-warn", 3, "click"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", "filter-error", 3, "click"], [1, "logs-frame"], [3, "streams"], ["title", "JSON brut", "subtitle", "Affichage technique de la reponse normalisee."], [1, "raw-panel"], [1, "monospace", "raw-json"]], template: function LogsExplorerPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Logs Explorer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Lecture LogQL centree sur le flux, avec plus d'espace pour lire les messages sans distraction.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3)(7, "div", 4)(8, "app-panel-container", 5)(9, "app-query-editor", 6);
            i0.ɵɵlistener("execute", function LogsExplorerPageComponent_Template_app_query_editor_execute_9_listener($event) { return ctx.run($event); })("copy", function LogsExplorerPageComponent_Template_app_query_editor_copy_9_listener($event) { return ctx.copy($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, LogsExplorerPageComponent_div_10_Template, 6, 1, "div", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, LogsExplorerPageComponent_div_11_Template, 3, 1, "div", 8)(12, LogsExplorerPageComponent_div_12_Template, 2, 2, "div", 8)(13, LogsExplorerPageComponent_div_13_Template, 2, 0, "div", 8)(14, LogsExplorerPageComponent_ng_container_14_Template, 3, 2, "ng-container", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("value", ctx.query);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.history.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.errorMessage && !ctx.response);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.errorMessage && ctx.response);
        } }, dependencies: [NgIf,
            NgFor,
            JsonPipe,
            MatButtonModule, i3.MatButton, PanelContainerComponent,
            QueryEditorComponent,
            LogsViewerComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent], styles: [".explorer-grid[_ngcontent-%COMP%] { align-items: start; }\n    .query-meta[_ngcontent-%COMP%] { display: grid; gap: 0.85rem; }\n    .query-block[_ngcontent-%COMP%] { display: grid; gap: 0.45rem; }\n    .meta-label[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n    .query-chip[_ngcontent-%COMP%] {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      line-height: 1.15;\n    }\n    .history-chip[_ngcontent-%COMP%] {\n      max-width: 100%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .stat-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .query-preview[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 0.9rem;\n      line-height: 1.35;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .filter-toolbar[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.55rem;\n    }\n    .filter-actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.65rem;\n    }\n    .filter-chip[_ngcontent-%COMP%] {\n      min-height: 36px;\n      border-radius: 999px;\n      font-size: 0.82rem;\n    }\n    .filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(124, 140, 255, 0.6) !important;\n      background: rgba(124, 140, 255, 0.14) !important;\n    }\n    .filter-warn.filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.56) !important;\n      background: rgba(255, 180, 84, 0.12) !important;\n    }\n    .filter-error.filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(255, 107, 107, 0.56) !important;\n      background: rgba(255, 107, 107, 0.12) !important;\n    }\n    .logs-frame[_ngcontent-%COMP%] {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .raw-panel[_ngcontent-%COMP%] {\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::-webkit-details-marker {\n      display: none;\n    }\n    .raw-json[_ngcontent-%COMP%] {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 960px) {\n      .stat-strip[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n    }\n    @media (max-width: 720px) {\n      .stat-strip[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n      .query-preview[_ngcontent-%COMP%] {\n        white-space: normal;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogsExplorerPageComponent, [{
        type: Component,
        args: [{ selector: 'app-logs-explorer-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    JsonPipe,
                    MatButtonModule,
                    PanelContainerComponent,
                    QueryEditorComponent,
                    LogsViewerComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Logs Explorer</h1>
        <div class="page-subtitle">Lecture LogQL centree sur le flux, avec plus d'espace pour lire les messages sans distraction.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete LogQL" subtitle="Le navigateur ne contacte jamais Loki directement.">
          <app-query-editor [value]="query" label="LogQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

          <div class="query-meta" *ngIf="history.length">
            <div class="query-block">
              <div class="meta-label">Historique</div>
              <div class="chip-row">
                <button mat-stroked-button type="button" class="query-chip history-chip" *ngFor="let item of history" (click)="applyExample(item)">
                  {{ item }}
                </button>
              </div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="loading">
        <app-panel-container title="Chargement des logs" subtitle="Le premier clic doit suffire pour afficher le resultat.">
          <app-loading-skeleton [rows]="8"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="!loading && errorMessage">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="!loading && !errorMessage && !response">
        <app-empty-state
          title="Aucune requete executee."
          description="Lance une requete LogQL pour afficher un flux de logs lisible et bien organise."
        ></app-empty-state>
      </div>

      <ng-container *ngIf="!loading && !errorMessage && response as currentResponse">
        <div class="span-12" *ngIf="!currentResponse.streams.length">
          <app-empty-state
            title="Aucune donnee recue pour cette periode."
            description="Loki a repondu mais n'a retourne aucun stream pour cette requete."
          ></app-empty-state>
        </div>

        <ng-container *ngIf="currentResponse.streams.length">
          <div class="span-12">
            <app-panel-container title="Flux de logs" [subtitle]="'Periode active : ' + selectedRangeLabel">
              <div class="stat-strip">
                <div class="mini-stat">
                  <span>Streams</span>
                  <strong>{{ visibleStreamsCount }}</strong>
                </div>
                <div class="mini-stat">
                  <span>Entrees</span>
                  <strong>{{ visibleEntriesCount }}</strong>
                </div>
                <div class="mini-stat">
                  <span>Filtre actif</span>
                  <strong>{{ selectedFilterLabel }}</strong>
                </div>
                <div class="mini-stat">
                  <span>Derniere requete</span>
                  <strong class="query-preview">{{ query }}</strong>
                </div>
              </div>

              <div class="filter-toolbar">
                <div class="meta-label">Filtrer les resultats</div>
                <div class="filter-actions">
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip"
                    [class.filter-chip-active]="selectedFilter === 'ALL'"
                    (click)="setFilter('ALL')"
                  >
                    Tout
                  </button>
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip filter-warn"
                    [class.filter-chip-active]="selectedFilter === 'WARN'"
                    (click)="setFilter('WARN')"
                  >
                    Warnings
                  </button>
                  <button
                    mat-stroked-button
                    type="button"
                    class="filter-chip filter-error"
                    [class.filter-chip-active]="selectedFilter === 'ERROR'"
                    (click)="setFilter('ERROR')"
                  >
                    Erreurs
                  </button>
                </div>
              </div>

              <div class="logs-frame">
                <app-logs-viewer [streams]="filteredStreams"></app-logs-viewer>
              </div>
            </app-panel-container>
          </div>

          <div class="span-12">
            <app-panel-container title="JSON brut" subtitle="Affichage technique de la reponse normalisee.">
              <details class="raw-panel">
                <summary>Afficher la reponse JSON</summary>
                <pre class="monospace raw-json">{{ currentResponse | json }}</pre>
              </details>
            </app-panel-container>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .explorer-grid { align-items: start; }\n    .query-meta { display: grid; gap: 0.85rem; }\n    .query-block { display: grid; gap: 0.45rem; }\n    .meta-label {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n    .query-chip {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      line-height: 1.15;\n    }\n    .history-chip {\n      max-width: 100%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .stat-strip {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat span {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat strong {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .query-preview {\n      display: block;\n      font-size: 0.9rem;\n      line-height: 1.35;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .filter-toolbar {\n      display: grid;\n      gap: 0.55rem;\n    }\n    .filter-actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.65rem;\n    }\n    .filter-chip {\n      min-height: 36px;\n      border-radius: 999px;\n      font-size: 0.82rem;\n    }\n    .filter-chip-active {\n      border-color: rgba(124, 140, 255, 0.6) !important;\n      background: rgba(124, 140, 255, 0.14) !important;\n    }\n    .filter-warn.filter-chip-active {\n      border-color: rgba(255, 180, 84, 0.56) !important;\n      background: rgba(255, 180, 84, 0.12) !important;\n    }\n    .filter-error.filter-chip-active {\n      border-color: rgba(255, 107, 107, 0.56) !important;\n      background: rgba(255, 107, 107, 0.12) !important;\n    }\n    .logs-frame {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .raw-panel {\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(8, 14, 25, 0.48);\n      overflow: hidden;\n    }\n    .raw-panel summary {\n      cursor: pointer;\n      padding: 0.85rem 1rem;\n      font-weight: 600;\n      list-style: none;\n    }\n    .raw-panel summary::-webkit-details-marker {\n      display: none;\n    }\n    .raw-json {\n      margin: 0;\n      padding: 0 1rem 1rem;\n      font-size: 0.76rem;\n      line-height: 1.5;\n      overflow: auto;\n    }\n    @media (max-width: 960px) {\n      .stat-strip {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n    }\n    @media (max-width: 720px) {\n      .stat-strip {\n        grid-template-columns: 1fr;\n      }\n      .query-preview {\n        white-space: normal;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.MonitoringService }, { type: i2.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LogsExplorerPageComponent, { className: "LogsExplorerPageComponent", filePath: "src\\app\\features\\logs-explorer\\logs-explorer-page.component.ts", lineNumber: 284 }); })();
//# sourceMappingURL=logs-explorer-page.component.js.map