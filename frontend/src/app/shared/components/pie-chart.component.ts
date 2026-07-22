import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `<div echarts [options]="option" class="chart"></div>`,
  styles: ['.chart { width: 100%; height: 320px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
  @Input() data: { name: string; value: number }[] = [];

  get option(): EChartsOption {
    return {
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color: '#e8eef8' } },
      series: [{ type: 'pie', radius: ['45%', '72%'], data: this.data }]
    };
  }
}
