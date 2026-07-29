import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { QueryEditorComponent } from '../../shared/components/query-editor.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/monitoring.service";
import * as i2 from "../../core/services/time-range.service";
import * as i3 from "@angular/material/button";
function MetricsExplorerPageComponent_div_10_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function MetricsExplorerPageComponent_div_10_button_5_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.applyExample(item_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2, " ");
} }
function MetricsExplorerPageComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "div", 12);
    i0.ɵɵtext(3, "Historique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13);
    i0.ɵɵtemplate(5, MetricsExplorerPageComponent_div_10_button_5_Template, 2, 1, "button", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.history);
} }
function MetricsExplorerPageComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "app-panel-container", 16);
    i0.ɵɵelement(2, "app-loading-skeleton", 17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("rows", 6);
} }
function MetricsExplorerPageComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "app-error-state", 18);
    i0.ɵɵlistener("retry", function MetricsExplorerPageComponent_div_12_Template_app_error_state_retry_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.retry()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("message", ctx_r2.errorMessage)("details", ctx_r2.errorDetails);
} }
function MetricsExplorerPageComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "app-empty-state", 19);
    i0.ɵɵelementEnd();
} }
function MetricsExplorerPageComponent_ng_container_14_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "app-empty-state", 20);
    i0.ɵɵelementEnd();
} }
function MetricsExplorerPageComponent_ng_container_14_ng_container_2_article_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 36)(1, "div", 37)(2, "div", 38);
    i0.ɵɵelement(3, "span", 39);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 40)(9, "div")(10, "span");
    i0.ɵɵtext(11, "Derniere valeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "span");
    i0.ɵɵtext(16, "Label cle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const series_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", ctx_r2.seriesColor(series_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.displayName(series_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", series_r5.points.length, " pts");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.lastValue(series_r5));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.primaryLabel(series_r5.labels));
} }
function MetricsExplorerPageComponent_ng_container_14_ng_container_2_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentResponse_r6 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" + ", currentResponse_r6.series.length - ctx_r2.visibleSeriesCount, " autres series restent visibles dans le graphe. ");
} }
function MetricsExplorerPageComponent_ng_container_14_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 4)(2, "app-panel-container", 21)(3, "div", 22)(4, "div", 23)(5, "div", 24)(6, "span");
    i0.ɵɵtext(7, "Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 24)(11, "span");
    i0.ɵɵtext(12, "Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 24)(16, "span");
    i0.ɵɵtext(17, "Unite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 24)(21, "span");
    i0.ɵɵtext(22, "Derniere requete");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 25);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 26);
    i0.ɵɵelement(26, "app-time-series-chart", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "section", 28)(28, "div", 29)(29, "div")(30, "div", 30);
    i0.ɵɵtext(31, "Series principales");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 31);
    i0.ɵɵtext(33, "Lecture rapide des courbes les plus visibles.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 32);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 33);
    i0.ɵɵtemplate(37, MetricsExplorerPageComponent_ng_container_14_ng_container_2_article_37_Template, 19, 6, "article", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, MetricsExplorerPageComponent_ng_container_14_ng_container_2_div_38_Template, 2, 1, "div", 35);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r6 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("subtitle", "Periode active : " + ctx_r2.selectedRangeLabel);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(currentResponse_r6.series.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.totalPoints);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.inferredUnitLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.query);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("series", currentResponse_r6.series)("palette", ctx_r2.seriesPalette)("unit", ctx_r2.chartUnit);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r2.visibleSeriesCount, " affichees");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.visibleSeries);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", currentResponse_r6.series.length > ctx_r2.visibleSeriesCount);
} }
function MetricsExplorerPageComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MetricsExplorerPageComponent_ng_container_14_div_1_Template, 2, 0, "div", 8)(2, MetricsExplorerPageComponent_ng_container_14_ng_container_2_Template, 39, 11, "ng-container", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const currentResponse_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !currentResponse_r6.series.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", currentResponse_r6.series.length);
} }
export class MetricsExplorerPageComponent {
    constructor(monitoringService, timeRangeService, cdr) {
        this.monitoringService = monitoringService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.query = 'sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)';
        this.response = null;
        this.history = this.readHistory();
        this.loading = false;
        this.errorMessage = '';
        this.errorDetails = '';
        this.seriesPalette = ['#7c8cff', '#4cc9f0', '#7bd88f', '#ffb454', '#ff6b6b', '#c792ea', '#5eead4', '#f472b6'];
        this.lastExecutedQuery = this.query;
    }
    run(query) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            this.response = null;
            this.errorMessage = 'La requete PromQL est vide.';
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
            .queryMetricsRange({
            query: trimmedQuery,
            start: start.toISOString(),
            end: end.toISOString(),
            step: '60'
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
    displayName(series) {
        return series.name || series.labels['pod'] || series.labels['node'] || series.labels['instance'] || 'Serie sans nom';
    }
    lastValue(series) {
        const value = [...series.points].reverse().find((point) => point.value !== null)?.value;
        return value == null ? '-' : this.formatValueWithUnit(value);
    }
    primaryLabel(labels) {
        const preferredKeys = ['pod', 'node', 'instance', 'job', 'namespace'];
        const key = preferredKeys.find((entry) => labels[entry]) ?? Object.keys(labels)[0];
        return key ? `${key}=${labels[key]}` : 'Aucun label';
    }
    seriesColor(series) {
        const index = this.visibleSeries.findIndex((item) => item === series);
        return this.seriesPalette[(index === -1 ? 0 : index) % this.seriesPalette.length];
    }
    get visibleSeries() {
        return (this.response?.series ?? []).slice(0, 6);
    }
    get visibleSeriesCount() {
        return this.visibleSeries.length;
    }
    get totalPoints() {
        return (this.response?.series ?? []).reduce((total, series) => total + series.points.length, 0);
    }
    get inferredUnitLabel() {
        return this.resolveMetricUnit().label;
    }
    get chartUnit() {
        return this.resolveMetricUnit().chartUnit;
    }
    get selectedRangeLabel() {
        return this.timeRangeService.selected().label;
    }
    formatNumber(value) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
    }
    formatValueWithUnit(value) {
        const unit = this.resolveMetricUnit();
        switch (unit.kind) {
            case 'bytes':
                return this.formatBytes(value);
            case 'cpu':
                return `${this.formatNumber(value)} ${unit.label}`;
            case 'percent':
                return `${this.formatNumber(value)} ${unit.label}`;
            case 'seconds':
                return `${this.formatNumber(value)} ${unit.label}`;
            case 'count':
                return `${this.formatInteger(value)} ${unit.label}`;
            default:
                return unit.label === 'valeur' ? this.formatNumber(value) : `${this.formatNumber(value)} ${unit.label}`;
        }
    }
    formatBytes(value) {
        const gib = value / (1024 ** 3);
        if (gib >= 1) {
            return `${this.formatNumber(gib)} GiB`;
        }
        const mib = value / (1024 ** 2);
        if (mib >= 1) {
            return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(mib)} MiB`;
        }
        const kib = value / 1024;
        if (kib >= 1) {
            return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(kib)} KiB`;
        }
        return `${this.formatInteger(value)} B`;
    }
    formatInteger(value) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
    }
    resolveMetricUnit() {
        const normalizedQuery = this.query.toLowerCase();
        if (normalizedQuery.includes('_bytes') || normalizedQuery.includes('memory_') || normalizedQuery.includes('working_set')) {
            return { kind: 'bytes', label: 'GiB', chartUnit: 'B' };
        }
        if (normalizedQuery.includes('container_cpu_usage_seconds_total') || normalizedQuery.includes('rate(') && normalizedQuery.includes('cpu')) {
            return { kind: 'cpu', label: 'CPU', chartUnit: 'CPU' };
        }
        if (normalizedQuery.includes('%') || normalizedQuery.includes(' 100 *') || normalizedQuery.startsWith('100 *') || normalizedQuery.includes('percentage')) {
            return { kind: 'percent', label: '%', chartUnit: '%' };
        }
        if (normalizedQuery.includes('_seconds') || normalizedQuery.includes('duration')) {
            return { kind: 'seconds', label: 's', chartUnit: 's' };
        }
        if (normalizedQuery.includes('count(') ||
            normalizedQuery.includes('sum(') ||
            normalizedQuery.includes('kube_node_info') ||
            normalizedQuery.includes('kube_pod_status_phase')) {
            return { kind: 'count', label: 'items', chartUnit: '' };
        }
        return { kind: 'generic', label: 'valeur', chartUnit: '' };
    }
    persistHistory(query) {
        this.history = [query, ...this.history.filter((item) => item !== query)].slice(0, 6);
        localStorage.setItem('metrics-history', JSON.stringify(this.history));
    }
    readHistory() {
        const value = localStorage.getItem('metrics-history');
        return value ? JSON.parse(value) : [];
    }
    extractErrorMessage(error) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const errorValue = error.error;
            if (errorValue?.message) {
                return errorValue.message;
            }
        }
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return String(error.message ?? 'Impossible de recuperer les metriques.');
        }
        return 'Impossible de recuperer les metriques.';
    }
    extractErrorDetails(error) {
        try {
            return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        }
        catch {
            return '';
        }
    }
    static { this.ɵfac = function MetricsExplorerPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MetricsExplorerPageComponent)(i0.ɵɵdirectiveInject(i1.MonitoringService), i0.ɵɵdirectiveInject(i2.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MetricsExplorerPageComponent, selectors: [["app-metrics-explorer-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 6, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "section-grid", "explorer-grid"], [1, "span-12"], ["title", "Requete PromQL", "subtitle", "Les appels passent uniquement par le backend Spring Boot."], ["label", "PromQL", 3, "execute", "copy", "value"], ["class", "query-meta", 4, "ngIf"], ["class", "span-12", 4, "ngIf"], [4, "ngIf"], [1, "query-meta"], [1, "query-block"], [1, "meta-label"], [1, "chip-row"], ["mat-stroked-button", "", "type", "button", "class", "query-chip history-chip", 3, "click", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", "type", "button", 1, "query-chip", "history-chip", 3, "click"], ["title", "Execution en cours", "subtitle", "Le resultat arrivera ici des la premiere reponse."], [3, "rows"], [3, "retry", "message", "details"], ["title", "Aucune requete executee.", "description", "Choisis une requete PromQL puis lance Executer pour afficher une visualisation claire des series."], ["title", "Aucune donnee recue pour cette periode.", "description", "La requete a bien ete envoyee, mais Mimir n'a retourne aucune serie exploitable."], ["title", "Visualisation", 3, "subtitle"], [1, "visualization-layout"], [1, "stat-strip"], [1, "mini-stat"], [1, "query-preview"], [1, "chart-frame"], [3, "series", "palette", "unit"], [1, "visualization-sidebar"], [1, "sidebar-header"], [1, "sidebar-title"], [1, "sidebar-subtitle"], [1, "chip"], [1, "series-overview"], ["class", "series-overview-card", 4, "ngFor", "ngForOf"], ["class", "series-footnote", 4, "ngIf"], [1, "series-overview-card"], [1, "series-overview-head"], [1, "series-name-row"], [1, "series-swatch"], [1, "series-metrics"], [1, "series-footnote"]], template: function MetricsExplorerPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Metrics Explorer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Lecture PromQL concentree sur le graphe, les indicateurs clefs et un apercu propre des series.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3)(7, "div", 4)(8, "app-panel-container", 5)(9, "app-query-editor", 6);
            i0.ɵɵlistener("execute", function MetricsExplorerPageComponent_Template_app_query_editor_execute_9_listener($event) { return ctx.run($event); })("copy", function MetricsExplorerPageComponent_Template_app_query_editor_copy_9_listener($event) { return ctx.copy($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, MetricsExplorerPageComponent_div_10_Template, 6, 1, "div", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, MetricsExplorerPageComponent_div_11_Template, 3, 1, "div", 8)(12, MetricsExplorerPageComponent_div_12_Template, 2, 2, "div", 8)(13, MetricsExplorerPageComponent_div_13_Template, 2, 0, "div", 8)(14, MetricsExplorerPageComponent_ng_container_14_Template, 3, 2, "ng-container", 9);
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
            MatButtonModule, i3.MatButton, PanelContainerComponent,
            QueryEditorComponent,
            TimeSeriesChartComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent], styles: [".explorer-grid[_ngcontent-%COMP%] { align-items: start; }\n    .query-meta[_ngcontent-%COMP%] { display: grid; gap: 0.85rem; }\n    .query-block[_ngcontent-%COMP%] { display: grid; gap: 0.45rem; }\n    .meta-label[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n    .query-chip[_ngcontent-%COMP%] {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      line-height: 1.15;\n    }\n    .history-chip[_ngcontent-%COMP%] {\n      max-width: 100%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .visualization-layout[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1rem;\n      align-items: start;\n    }\n    .visualization-sidebar[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.9rem;\n      min-width: 0;\n      padding: 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),\n        rgba(8, 14, 25, 0.42);\n    }\n    .sidebar-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n      align-items: flex-start;\n    }\n    .sidebar-title[_ngcontent-%COMP%] {\n      font-size: 0.98rem;\n      font-weight: 700;\n    }\n    .sidebar-subtitle[_ngcontent-%COMP%] {\n      margin-top: 0.2rem;\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      line-height: 1.45;\n    }\n    .stat-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .query-preview[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 0.9rem;\n      line-height: 1.35;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .chart-frame[_ngcontent-%COMP%] {\n      min-width: 0;\n      padding: 0.35rem 0.35rem 0.15rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .series-overview[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.75rem;\n    }\n    .series-overview-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.7rem;\n      padding: 0.85rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .series-overview-head[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n      font-size: 0.82rem;\n      align-items: center;\n    }\n    .series-overview-head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .series-overview-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      min-width: 0;\n    }\n    .series-overview-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      white-space: nowrap;\n    }\n    .series-name-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.6rem;\n      min-width: 0;\n    }\n    .series-name-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n    .series-swatch[_ngcontent-%COMP%] {\n      width: 10px;\n      height: 10px;\n      border-radius: 999px;\n      flex: 0 0 auto;\n      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.04);\n    }\n    .series-metrics[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.7rem;\n    }\n    .series-metrics[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.22rem;\n      min-width: 0;\n    }\n    .series-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n    .series-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 0.92rem;\n      font-weight: 600;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n    .series-footnote[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      line-height: 1.45;\n    }\n    @media (max-width: 1180px) {\n      .stat-strip[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n    }\n    @media (max-width: 720px) {\n      .stat-strip[_ngcontent-%COMP%], \n   .series-metrics[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n      .sidebar-header[_ngcontent-%COMP%], \n   .series-overview-head[_ngcontent-%COMP%] {\n        display: grid;\n      }\n      .query-preview[_ngcontent-%COMP%] {\n        white-space: normal;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MetricsExplorerPageComponent, [{
        type: Component,
        args: [{ selector: 'app-metrics-explorer-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    MatButtonModule,
                    PanelContainerComponent,
                    QueryEditorComponent,
                    TimeSeriesChartComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Metrics Explorer</h1>
        <div class="page-subtitle">Lecture PromQL concentree sur le graphe, les indicateurs clefs et un apercu propre des series.</div>
      </div>
    </div>

    <div class="section-grid explorer-grid">
      <div class="span-12">
        <app-panel-container title="Requete PromQL" subtitle="Les appels passent uniquement par le backend Spring Boot.">
          <app-query-editor [value]="query" label="PromQL" (execute)="run($event)" (copy)="copy($event)"></app-query-editor>

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
        <app-panel-container title="Execution en cours" subtitle="Le resultat arrivera ici des la premiere reponse.">
          <app-loading-skeleton [rows]="6"></app-loading-skeleton>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="!loading && errorMessage">
        <app-error-state [message]="errorMessage" [details]="errorDetails" (retry)="retry()"></app-error-state>
      </div>

      <div class="span-12" *ngIf="!loading && !errorMessage && !response">
        <app-empty-state
          title="Aucune requete executee."
          description="Choisis une requete PromQL puis lance Executer pour afficher une visualisation claire des series."
        ></app-empty-state>
      </div>

      <ng-container *ngIf="!loading && !errorMessage && response as currentResponse">
        <div class="span-12" *ngIf="!currentResponse.series.length">
          <app-empty-state
            title="Aucune donnee recue pour cette periode."
            description="La requete a bien ete envoyee, mais Mimir n'a retourne aucune serie exploitable."
          ></app-empty-state>
        </div>

        <ng-container *ngIf="currentResponse.series.length">
          <div class="span-12">
            <app-panel-container title="Visualisation" [subtitle]="'Periode active : ' + selectedRangeLabel">
              <div class="visualization-layout">
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
                    <span>Unite</span>
                    <strong>{{ inferredUnitLabel }}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Derniere requete</span>
                    <strong class="query-preview">{{ query }}</strong>
                  </div>
                </div>

                <div class="chart-frame">
                  <app-time-series-chart [series]="currentResponse.series" [palette]="seriesPalette" [unit]="chartUnit"></app-time-series-chart>
                </div>

                <section class="visualization-sidebar">
                  <div class="sidebar-header">
                    <div>
                      <div class="sidebar-title">Series principales</div>
                      <div class="sidebar-subtitle">Lecture rapide des courbes les plus visibles.</div>
                    </div>
                    <div class="chip">{{ visibleSeriesCount }} affichees</div>
                  </div>

                  <div class="series-overview">
                    <article class="series-overview-card" *ngFor="let series of visibleSeries">
                      <div class="series-overview-head">
                        <div class="series-name-row">
                          <span class="series-swatch" [style.background]="seriesColor(series)"></span>
                          <strong>{{ displayName(series) }}</strong>
                        </div>
                        <span>{{ series.points.length }} pts</span>
                      </div>

                      <div class="series-metrics">
                        <div>
                          <span>Derniere valeur</span>
                          <strong>{{ lastValue(series) }}</strong>
                        </div>
                        <div>
                          <span>Label cle</span>
                          <strong>{{ primaryLabel(series.labels) }}</strong>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div class="series-footnote" *ngIf="currentResponse.series.length > visibleSeriesCount">
                    + {{ currentResponse.series.length - visibleSeriesCount }} autres series restent visibles dans le graphe.
                  </div>
                </section>
              </div>
            </app-panel-container>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .explorer-grid { align-items: start; }\n    .query-meta { display: grid; gap: 0.85rem; }\n    .query-block { display: grid; gap: 0.45rem; }\n    .meta-label {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .chip-row {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n    .query-chip {\n      min-height: 34px;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      line-height: 1.15;\n    }\n    .history-chip {\n      max-width: 100%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .visualization-layout {\n      display: grid;\n      gap: 1rem;\n      align-items: start;\n    }\n    .visualization-sidebar {\n      display: grid;\n      gap: 0.9rem;\n      min-width: 0;\n      padding: 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),\n        rgba(8, 14, 25, 0.42);\n    }\n    .sidebar-header {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n      align-items: flex-start;\n    }\n    .sidebar-title {\n      font-size: 0.98rem;\n      font-weight: 700;\n    }\n    .sidebar-subtitle {\n      margin-top: 0.2rem;\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      line-height: 1.45;\n    }\n    .stat-strip {\n      display: grid;\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat span {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat strong {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .query-preview {\n      display: block;\n      font-size: 0.9rem;\n      line-height: 1.35;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .chart-frame {\n      min-width: 0;\n      padding: 0.35rem 0.35rem 0.15rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    .series-overview {\n      display: grid;\n      gap: 0.75rem;\n    }\n    .series-overview-card {\n      display: grid;\n      gap: 0.7rem;\n      padding: 0.85rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .series-overview-head {\n      display: flex;\n      justify-content: space-between;\n      gap: 0.75rem;\n      font-size: 0.82rem;\n      align-items: center;\n    }\n    .series-overview-head strong,\n    .series-overview-head span {\n      min-width: 0;\n    }\n    .series-overview-head span {\n      color: var(--text-secondary);\n      white-space: nowrap;\n    }\n    .series-name-row {\n      display: flex;\n      align-items: center;\n      gap: 0.6rem;\n      min-width: 0;\n    }\n    .series-name-row strong {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n    .series-swatch {\n      width: 10px;\n      height: 10px;\n      border-radius: 999px;\n      flex: 0 0 auto;\n      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.04);\n    }\n    .series-metrics {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.7rem;\n    }\n    .series-metrics div {\n      display: grid;\n      gap: 0.22rem;\n      min-width: 0;\n    }\n    .series-metrics span {\n      color: var(--text-secondary);\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n    .series-metrics strong {\n      font-size: 0.92rem;\n      font-weight: 600;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n    .series-footnote {\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      line-height: 1.45;\n    }\n    @media (max-width: 1180px) {\n      .stat-strip {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n    }\n    @media (max-width: 720px) {\n      .stat-strip,\n      .series-metrics {\n        grid-template-columns: 1fr;\n      }\n      .sidebar-header,\n      .series-overview-head {\n        display: grid;\n      }\n      .query-preview {\n        white-space: normal;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.MonitoringService }, { type: i2.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MetricsExplorerPageComponent, { className: "MetricsExplorerPageComponent", filePath: "src\\app\\features\\metrics-explorer\\metrics-explorer-page.component.ts", lineNumber: 340 }); })();
//# sourceMappingURL=metrics-explorer-page.component.js.map