import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EmptyStateComponent } from './empty-state.component';
import * as i0 from "@angular/core";
function TimeSeriesChartComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-empty-state");
    i0.ɵɵelementEnd();
} }
function TimeSeriesChartComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("options", ctx_r0.option);
} }
export class TimeSeriesChartComponent {
    constructor() {
        this.title = '';
        this.unit = '';
        this.series = [];
        this.palette = ['#7c8cff', '#4cc9f0', '#7bd88f', '#ffb454', '#ff6b6b', '#c792ea'];
    }
    get option() {
        return {
            color: this.palette,
            animation: false,
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(16, 26, 45, 0.96)',
                borderColor: 'rgba(148, 163, 184, 0.18)',
                textStyle: { color: '#e8eef8' },
                confine: true
            },
            legend: { show: false },
            xAxis: {
                type: 'time',
                axisLabel: { color: '#9eabc2' },
                axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.18)' } },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: '#9eabc2', formatter: `{value}${this.unit ? ` ${this.unit}` : ''}` },
                axisLine: { show: false },
                splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.16)' } }
            },
            grid: { left: 18, right: 18, top: 18, bottom: 42, containLabel: true },
            dataZoom: [
                {
                    type: 'inside',
                    zoomLock: false
                }
            ],
            series: this.series.map((item) => ({
                name: this.displayName(item),
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    color: item.color
                },
                itemStyle: {
                    color: item.color
                },
                data: item.points.map((point) => [point.timestamp, point.value])
            }))
        };
    }
    displayName(series) {
        return series.name || series.labels['pod'] || series.labels['node'] || series.labels['instance'] || 'Serie sans nom';
    }
    static { this.ɵfac = function TimeSeriesChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimeSeriesChartComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TimeSeriesChartComponent, selectors: [["app-time-series-chart"]], inputs: { title: "title", unit: "unit", series: "series", palette: "palette" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 2, consts: [["chartTpl", ""], [4, "ngIf", "ngIfElse"], ["echarts", "", 1, "chart", 3, "options"]], template: function TimeSeriesChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TimeSeriesChartComponent_div_0_Template, 2, 0, "div", 1)(1, TimeSeriesChartComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const chartTpl_r2 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", !(ctx.series == null ? null : ctx.series.length))("ngIfElse", chartTpl_r2);
        } }, dependencies: [NgIf, NgxEchartsDirective, EmptyStateComponent], styles: [".chart[_ngcontent-%COMP%] { width: 100%; height: 320px; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimeSeriesChartComponent, [{
        type: Component,
        args: [{ selector: 'app-time-series-chart', standalone: true, imports: [NgIf, NgxEchartsDirective, EmptyStateComponent], template: `
    <div *ngIf="!series?.length; else chartTpl">
      <app-empty-state />
    </div>
    <ng-template #chartTpl>
      <div echarts [options]="option" class="chart"></div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".chart { width: 100%; height: 320px; }"] }]
    }], null, { title: [{
            type: Input
        }], unit: [{
            type: Input
        }], series: [{
            type: Input
        }], palette: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TimeSeriesChartComponent, { className: "TimeSeriesChartComponent", filePath: "src\\app\\shared\\components\\time-series-chart.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=time-series-chart.component.js.map