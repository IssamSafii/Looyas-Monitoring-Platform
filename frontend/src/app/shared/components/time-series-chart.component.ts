import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MetricSeries } from '../../core/models/monitoring.model';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  selector: 'app-time-series-chart',
  standalone: true,
  imports: [NgIf, NgxEchartsDirective, EmptyStateComponent],
  template: `
    <div *ngIf="!series?.length; else chartTpl">
      <app-empty-state />
    </div>
    <ng-template #chartTpl>
      <div echarts [options]="option" class="chart"></div>
    </ng-template>
  `,
  styles: ['.chart { width: 100%; height: 320px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeSeriesChartComponent {
  @Input() title = '';
  @Input() unit = '';
  @Input() series: MetricSeries[] = [];

  get option(): EChartsOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { textStyle: { color: '#e8eef8' } },
      xAxis: { type: 'time', axisLabel: { color: '#9eabc2' } },
      yAxis: { type: 'value', axisLabel: { color: '#9eabc2', formatter: `{value}${this.unit ? ` ${this.unit}` : ''}` } },
      grid: { left: 28, right: 20, top: 36, bottom: 28, containLabel: true },
      series: this.series.map((item) => ({
        name: item.name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: item.points.map((point) => [point.timestamp, point.value])
      }))
    };
  }
}
