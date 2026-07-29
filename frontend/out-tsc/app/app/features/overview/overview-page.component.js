import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { LogsViewerComponent } from '../../shared/components/logs-viewer.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/monitoring.service";
import * as i2 from "../../core/services/health.service";
import * as i3 from "../../core/services/time-range.service";
import * as i4 from "@angular/material/button";
function OverviewPageComponent_app_stat_card_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-stat-card", 32);
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵproperty("title", stat_r1.title)("description", stat_r1.description)("value", stat_r1.value)("unit", stat_r1.unit)("loading", stat_r1.loading)("noData", stat_r1.noData);
} }
function OverviewPageComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 34)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "app-health-badge", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 36);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.component);
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", item_r2.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.message);
} }
export class OverviewPageComponent {
    constructor(monitoringService, healthService, timeRangeService, cdr) {
        this.monitoringService = monitoringService;
        this.healthService = healthService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.lastRefresh = new Date();
        this.health = [];
        this.cpuSeries = [];
        this.memorySeries = [];
        this.logVolumeSeries = [];
        this.recentLogs = [];
        this.selectedLogFilter = 'ALL';
        this.stats = [
            { title: 'Clusters detectes', description: 'Approximation via le label cluster expose.', unit: 'clusters', value: '-', loading: true, noData: false },
            { title: 'Nodes', description: 'Nombre de noeuds visibles dans le cluster.', unit: 'nodes', value: '-', loading: true, noData: false },
            { title: 'Pods running', description: 'Pods actuellement en phase Running.', unit: 'pods', value: '-', loading: true, noData: false },
            { title: 'CPU totale', description: 'Consommation totale des containers sur la periode.', unit: 'CPU', value: '-', loading: true, noData: false },
            { title: 'Memoire totale', description: 'Working set total des containers.', unit: 'GB', value: '-', loading: true, noData: false },
            { title: 'Logs recents', description: "Nombre d'entrees observees dans Loki.", unit: 'logs', value: '-', loading: true, noData: false }
        ];
    }
    ngOnInit() {
        this.load();
    }
    setLogFilter(filter) {
        this.selectedLogFilter = filter;
        this.cdr.markForCheck();
    }
    get filteredRecentLogs() {
        if (this.selectedLogFilter === 'ALL') {
            return this.recentLogs;
        }
        return this.recentLogs
            .map((stream) => ({
            ...stream,
            entries: stream.entries.filter((entry) => this.matchesLogFilter(entry))
        }))
            .filter((stream) => stream.entries.length > 0);
    }
    get visibleStreamsCount() {
        return this.filteredRecentLogs.length;
    }
    get visibleEntriesCount() {
        return this.filteredRecentLogs.reduce((total, stream) => total + stream.entries.length, 0);
    }
    get selectedLogFilterLabel() {
        switch (this.selectedLogFilter) {
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
    load() {
        const end = new Date();
        const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
        const rangePayload = { start: start.toISOString(), end: end.toISOString(), step: '60' };
        forkJoin({
            health: this.healthService.getHealth().pipe(catchError(() => of({ components: [] }))),
            clusters: this.monitoringService.queryMetrics({ query: 'count(count by (cluster) (up))' }).pipe(catchError(() => of(null))),
            nodes: this.monitoringService.queryMetrics({ query: 'count(kube_node_info)' }).pipe(catchError(() => of(null))),
            podsRunning: this.monitoringService.queryMetrics({ query: 'sum(kube_pod_status_phase{phase="Running"})' }).pipe(catchError(() => of(null))),
            cpuStat: this.monitoringService.queryMetrics({ query: 'sum(rate(container_cpu_usage_seconds_total[5m]))' }).pipe(catchError(() => of(null))),
            memoryStat: this.monitoringService.queryMetrics({ query: 'sum(container_memory_working_set_bytes)' }).pipe(catchError(() => of(null))),
            cpuSeries: this.monitoringService.queryMetricsRange({ query: 'sum(rate(container_cpu_usage_seconds_total[5m]))', ...rangePayload }).pipe(catchError(() => of(null))),
            memorySeries: this.monitoringService.queryMetricsRange({ query: 'sum(container_memory_working_set_bytes)', ...rangePayload }).pipe(catchError(() => of(null))),
            recentLogs: this.monitoringService.queryLogsRange({ query: '{job=~".+"}', limit: 80, direction: 'BACKWARD', ...rangePayload }).pipe(catchError(() => of(null)))
        }).subscribe((result) => {
            this.lastRefresh = new Date();
            this.health = result.health.components;
            this.cpuSeries = result.cpuSeries?.series ?? [];
            this.memorySeries = this.convertSeriesToGb(result.memorySeries?.series ?? []);
            this.recentLogs = result.recentLogs?.streams ?? [];
            this.logVolumeSeries = this.logsToSeries(result.recentLogs, start.getTime(), end.getTime());
            this.applyStat(0, result.clusters, (value) => this.formatInteger(value));
            this.applyStat(1, result.nodes, (value) => this.formatInteger(value));
            this.applyStat(2, result.podsRunning, (value) => this.formatInteger(value));
            this.applyStat(3, result.cpuStat, (value) => this.formatDecimal(value, 2));
            this.applyStat(4, result.memoryStat, (value) => this.formatBytesToGb(value));
            this.stats[5].loading = false;
            this.stats[5].value = this.formatInteger(this.recentLogs.reduce((acc, stream) => acc + stream.entries.length, 0));
            this.stats[5].noData = !this.recentLogs.length;
            this.cdr.markForCheck();
        });
    }
    applyStat(index, response, formatter) {
        const card = this.stats[index];
        card.loading = false;
        card.noData = false;
        const point = response?.series?.[0]?.points?.at(-1);
        if (point?.value == null) {
            card.noData = true;
            card.value = '-';
            return;
        }
        card.value = formatter(point.value);
    }
    logsToSeries(response, startTimestamp, endTimestamp) {
        if (!response?.streams?.length) {
            return [];
        }
        const total = response.streams.reduce((acc, stream) => acc + stream.entries.length, 0);
        return [{
                name: 'logs',
                labels: { source: 'loki' },
                points: [
                    { timestamp: startTimestamp, value: 0 },
                    { timestamp: endTimestamp, value: total }
                ]
            }];
    }
    matchesLogFilter(entry) {
        return (entry.level || 'INFO').toUpperCase() === this.selectedLogFilter;
    }
    formatInteger(value) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
    }
    formatDecimal(value, maximumFractionDigits) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits }).format(value);
    }
    convertSeriesToGb(series) {
        return series.map((item) => ({
            ...item,
            points: item.points.map((point) => ({
                ...point,
                value: point.value == null ? null : point.value / (1024 ** 3)
            }))
        }));
    }
    formatBytesToGb(value) {
        const gb = value / (1024 ** 3);
        return this.formatDecimal(gb, 2);
    }
    static { this.ɵfac = function OverviewPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OverviewPageComponent)(i0.ɵɵdirectiveInject(i1.MonitoringService), i0.ɵɵdirectiveInject(i2.HealthService), i0.ɵɵdirectiveInject(i3.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OverviewPageComponent, selectors: [["app-overview-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 56, vars: 20, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "chip"], [1, "grid-tiles"], ["lastRefresh", "updated", 3, "title", "description", "value", "unit", "loading", "noData", 4, "ngFor", "ngForOf"], [1, "section-grid", "overview-grid"], [1, "span-8"], ["title", "CPU globale", "subtitle", "Consommation totale observee sur la periode selectionnee."], ["unit", "CPU", 3, "series"], [1, "span-4"], ["title", "Sante des sources", "subtitle", "Etat backend, PostgreSQL, Mimir et Loki"], [1, "health-list"], ["class", "health-row", 4, "ngFor", "ngForOf"], [1, "span-6"], ["title", "Memoire globale", "subtitle", "Volume total observe via working set."], ["unit", "GB", 3, "series"], ["title", "Volume de logs", "subtitle", "Nombre d'entrees recuperees dans la periode active."], [3, "series"], [1, "span-12"], ["title", "Derniers logs", 3, "subtitle"], [1, "logs-toolbar"], [1, "logs-summary"], [1, "mini-stat"], [1, "filter-toolbar"], [1, "meta-label"], [1, "filter-actions"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", 3, "click"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", "filter-warn", 3, "click"], ["mat-stroked-button", "", "type", "button", 1, "filter-chip", "filter-error", 3, "click"], [1, "logs-frame"], [3, "streams"], ["lastRefresh", "updated", 3, "title", "description", "value", "unit", "loading", "noData"], [1, "health-row"], [1, "health-head"], [3, "status"], [1, "muted"]], template: function OverviewPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Vue globale des metriques et des logs avec des valeurs lisibles, pr\u00EAtes pour l'exploitation.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 3);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "date");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4);
            i0.ɵɵtemplate(10, OverviewPageComponent_app_stat_card_10_Template, 1, 6, "app-stat-card", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 6)(12, "div", 7)(13, "app-panel-container", 8);
            i0.ɵɵelement(14, "app-time-series-chart", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 10)(16, "app-panel-container", 11)(17, "div", 12);
            i0.ɵɵtemplate(18, OverviewPageComponent_div_18_Template, 7, 3, "div", 13);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "div", 14)(20, "app-panel-container", 15);
            i0.ɵɵelement(21, "app-time-series-chart", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 14)(23, "app-panel-container", 17);
            i0.ɵɵelement(24, "app-time-series-chart", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 19)(26, "app-panel-container", 20)(27, "div", 21)(28, "div", 22)(29, "div", 23)(30, "span");
            i0.ɵɵtext(31, "Streams");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "strong");
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 23)(35, "span");
            i0.ɵɵtext(36, "Entrees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "strong");
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "div", 23)(40, "span");
            i0.ɵɵtext(41, "Filtre actif");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "strong");
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "div", 24)(45, "div", 25);
            i0.ɵɵtext(46, "Filtrer les resultats");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 26)(48, "button", 27);
            i0.ɵɵlistener("click", function OverviewPageComponent_Template_button_click_48_listener() { return ctx.setLogFilter("ALL"); });
            i0.ɵɵtext(49, " Tout ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "button", 28);
            i0.ɵɵlistener("click", function OverviewPageComponent_Template_button_click_50_listener() { return ctx.setLogFilter("WARN"); });
            i0.ɵɵtext(51, " Warnings ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "button", 29);
            i0.ɵɵlistener("click", function OverviewPageComponent_Template_button_click_52_listener() { return ctx.setLogFilter("ERROR"); });
            i0.ɵɵtext(53, " Erreurs ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(54, "div", 30);
            i0.ɵɵelement(55, "app-logs-viewer", 31);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 17, ctx.lastRefresh, "short"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("series", ctx.cpuSeries);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.health);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("series", ctx.memorySeries);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("series", ctx.logVolumeSeries);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("subtitle", "Periode active : " + ctx.selectedRangeLabel);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.visibleStreamsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.visibleEntriesCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectedLogFilterLabel);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("filter-chip-active", ctx.selectedLogFilter === "ALL");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("filter-chip-active", ctx.selectedLogFilter === "WARN");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("filter-chip-active", ctx.selectedLogFilter === "ERROR");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("streams", ctx.filteredRecentLogs);
        } }, dependencies: [NgFor,
            DatePipe,
            MatButtonModule, i4.MatButton, PanelContainerComponent,
            StatCardComponent,
            TimeSeriesChartComponent,
            LogsViewerComponent,
            HealthBadgeComponent], styles: [".overview-grid[_ngcontent-%COMP%] {\n      margin-top: 1rem;\n      align-items: start;\n    }\n    .health-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .health-row[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.3rem;\n    }\n    .health-head[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 1rem;\n    }\n    .logs-toolbar[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.9rem;\n    }\n    .logs-summary[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .meta-label[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .filter-toolbar[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.55rem;\n    }\n    .filter-actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.65rem;\n    }\n    .filter-chip[_ngcontent-%COMP%] {\n      min-height: 36px;\n      border-radius: 999px;\n      font-size: 0.82rem;\n    }\n    .filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(124, 140, 255, 0.6) !important;\n      background: rgba(124, 140, 255, 0.14) !important;\n    }\n    .filter-warn.filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.56) !important;\n      background: rgba(255, 180, 84, 0.12) !important;\n    }\n    .filter-error.filter-chip-active[_ngcontent-%COMP%] {\n      border-color: rgba(255, 107, 107, 0.56) !important;\n      background: rgba(255, 107, 107, 0.12) !important;\n    }\n    .logs-frame[_ngcontent-%COMP%] {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    @media (max-width: 960px) {\n      .logs-summary[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OverviewPageComponent, [{
        type: Component,
        args: [{ selector: 'app-overview-page', standalone: true, imports: [
                    NgFor,
                    NgIf,
                    DatePipe,
                    MatButtonModule,
                    PanelContainerComponent,
                    StatCardComponent,
                    TimeSeriesChartComponent,
                    LogsViewerComponent,
                    HealthBadgeComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Overview</h1>
        <div class="page-subtitle">Vue globale des metriques et des logs avec des valeurs lisibles, prêtes pour l'exploitation.</div>
      </div>
      <div class="chip">{{ lastRefresh | date:'short' }}</div>
    </div>

    <div class="grid-tiles">
      <app-stat-card
        *ngFor="let stat of stats"
        [title]="stat.title"
        [description]="stat.description"
        [value]="stat.value"
        [unit]="stat.unit"
        [loading]="stat.loading"
        [noData]="stat.noData"
        lastRefresh="updated"
      ></app-stat-card>
    </div>

    <div class="section-grid overview-grid">
      <div class="span-8">
        <app-panel-container title="CPU globale" subtitle="Consommation totale observee sur la periode selectionnee.">
          <app-time-series-chart [series]="cpuSeries" unit="CPU"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-4">
        <app-panel-container title="Sante des sources" subtitle="Etat backend, PostgreSQL, Mimir et Loki">
          <div class="health-list">
            <div *ngFor="let item of health" class="health-row">
              <div class="health-head">
                <span>{{ item.component }}</span>
                <app-health-badge [status]="item.status"></app-health-badge>
              </div>
              <div class="muted">{{ item.message }}</div>
            </div>
          </div>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Memoire globale" subtitle="Volume total observe via working set.">
          <app-time-series-chart [series]="memorySeries" unit="GB"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Volume de logs" subtitle="Nombre d'entrees recuperees dans la periode active.">
          <app-time-series-chart [series]="logVolumeSeries"></app-time-series-chart>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Derniers logs" [subtitle]="'Periode active : ' + selectedRangeLabel">
          <div class="logs-toolbar">
            <div class="logs-summary">
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
                <strong>{{ selectedLogFilterLabel }}</strong>
              </div>
            </div>

            <div class="filter-toolbar">
              <div class="meta-label">Filtrer les resultats</div>
              <div class="filter-actions">
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip"
                  [class.filter-chip-active]="selectedLogFilter === 'ALL'"
                  (click)="setLogFilter('ALL')"
                >
                  Tout
                </button>
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip filter-warn"
                  [class.filter-chip-active]="selectedLogFilter === 'WARN'"
                  (click)="setLogFilter('WARN')"
                >
                  Warnings
                </button>
                <button
                  mat-stroked-button
                  type="button"
                  class="filter-chip filter-error"
                  [class.filter-chip-active]="selectedLogFilter === 'ERROR'"
                  (click)="setLogFilter('ERROR')"
                >
                  Erreurs
                </button>
              </div>
            </div>
          </div>

          <div class="logs-frame">
            <app-logs-viewer [streams]="filteredRecentLogs"></app-logs-viewer>
          </div>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .overview-grid {\n      margin-top: 1rem;\n      align-items: start;\n    }\n    .health-list {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .health-row {\n      display: grid;\n      gap: 0.3rem;\n    }\n    .health-head {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 1rem;\n    }\n    .logs-toolbar {\n      display: grid;\n      gap: 0.9rem;\n    }\n    .logs-summary {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.75rem;\n    }\n    .mini-stat {\n      display: grid;\n      gap: 0.2rem;\n      padding: 0.85rem 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n      min-width: 0;\n    }\n    .mini-stat span {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .mini-stat strong {\n      font-size: 1rem;\n      font-weight: 700;\n    }\n    .meta-label {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .filter-toolbar {\n      display: grid;\n      gap: 0.55rem;\n    }\n    .filter-actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.65rem;\n    }\n    .filter-chip {\n      min-height: 36px;\n      border-radius: 999px;\n      font-size: 0.82rem;\n    }\n    .filter-chip-active {\n      border-color: rgba(124, 140, 255, 0.6) !important;\n      background: rgba(124, 140, 255, 0.14) !important;\n    }\n    .filter-warn.filter-chip-active {\n      border-color: rgba(255, 180, 84, 0.56) !important;\n      background: rgba(255, 180, 84, 0.12) !important;\n    }\n    .filter-error.filter-chip-active {\n      border-color: rgba(255, 107, 107, 0.56) !important;\n      background: rgba(255, 107, 107, 0.12) !important;\n    }\n    .logs-frame {\n      min-width: 0;\n      padding: 0.35rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(5, 10, 18, 0.35);\n    }\n    @media (max-width: 960px) {\n      .logs-summary {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.MonitoringService }, { type: i2.HealthService }, { type: i3.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OverviewPageComponent, { className: "OverviewPageComponent", filePath: "src\\app\\features\\overview\\overview-page.component.ts", lineNumber: 249 }); })();
//# sourceMappingURL=overview-page.component.js.map