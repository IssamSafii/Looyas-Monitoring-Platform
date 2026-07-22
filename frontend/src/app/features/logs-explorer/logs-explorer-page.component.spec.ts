import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LogsExplorerPageComponent } from './logs-explorer-page.component';
import { MonitoringService } from '../../core/services/monitoring.service';
import { TimeRangeService } from '../../core/services/time-range.service';

echarts.use([CanvasRenderer]);

describe('LogsExplorerPageComponent', () => {
  let fixture: ComponentFixture<LogsExplorerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsExplorerPageComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideAnimationsAsync(),
        provideEchartsCore({ echarts }),
        {
          provide: MonitoringService,
          useValue: {
            queryLogsRange: () => of({ status: 'success', streams: [] })
          }
        },
        {
          provide: TimeRangeService,
          useValue: { selected: () => ({ seconds: 3600 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsExplorerPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
