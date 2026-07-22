import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TimeSeriesChartComponent } from './time-series-chart.component';

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

describe('TimeSeriesChartComponent', () => {
  let fixture: ComponentFixture<TimeSeriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSeriesChartComponent],
      providers: [provideEchartsCore({ echarts })]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSeriesChartComponent);
    fixture.componentInstance.series = [
      { name: 'node-01', labels: { node: 'node-01' }, points: [{ timestamp: Date.now(), value: 10 }] }
    ];
    fixture.detectChanges();
  });

  it('should create and expose chart options', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.option).toBeTruthy();
  });
});
