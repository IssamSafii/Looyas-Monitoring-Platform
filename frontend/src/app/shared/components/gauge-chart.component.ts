import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `<div echarts [options]="option" class="chart"></div>`,
  styles: ['.chart { width: 100%; height: 260px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeChartComponent {
  @Input() value = 0;
  @Input() label = 'Usage';

  get option(): EChartsOption {
    return {
      series: [{
        type: 'gauge',
        progress: { show: true, width: 12 },
        axisLine: { lineStyle: { width: 12 } },
        detail: { formatter: '{value}%', color: '#e8eef8' },
        data: [{ value: this.value, name: this.label }]
      }]
    };
  }
}
