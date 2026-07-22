import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `<div echarts [options]="option" class="chart"></div>`,
  styles: ['.chart { width: 100%; height: 320px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  @Input() labels: string[] = [];
  @Input() values: number[] = [];

  get option(): EChartsOption {
    return {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.labels, axisLabel: { color: '#9eabc2', rotate: 20 } },
      yAxis: { type: 'value', axisLabel: { color: '#9eabc2' } },
      series: [{ type: 'bar', data: this.values, itemStyle: { color: '#7c8cff' } }],
      grid: { left: 28, right: 20, top: 24, bottom: 40, containLabel: true }
    };
  }
}
