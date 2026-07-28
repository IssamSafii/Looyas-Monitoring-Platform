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
  @Input() palette: string[] = ['#7c8cff', '#4cc9f0', '#7bd88f', '#ffb454', '#ff6b6b', '#c792ea'];

  get option(): EChartsOption {
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
        lineStyle: { width: 2 },
        data: item.points.map((point) => [point.timestamp, point.value])
      }))
    };
  }

  private displayName(series: MetricSeries): string {
    return series.name || series.labels['pod'] || series.labels['node'] || series.labels['instance'] || 'Serie sans nom';
  }
}
