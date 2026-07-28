import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { OciOverviewPageComponent } from './oci-overview-page.component';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

echarts.use([CanvasRenderer]);

describe('OciOverviewPageComponent', () => {
  let fixture: ComponentFixture<OciOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OciOverviewPageComponent],
      providers: [
        provideRouter([]),
        provideAnimationsAsync(),
        provideEchartsCore({ echarts }),
        {
          provide: OciService,
          useValue: {
            health: () => of({
              status: 'NOT_CONFIGURED',
              configured: false,
              region: null,
              profile: null,
              compartmentConfigured: false,
              message: "La source OCI n'est pas encore configuree.",
              checkedAt: '2026-07-28T10:00:00Z'
            }),
            compartments: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } })),
            computeInstances: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } })),
            queryMetrics: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } })),
            searchLogs: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } }))
          }
        },
        {
          provide: TimeRangeService,
          useValue: { selected: () => ({ label: '1 heure', seconds: 3600 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OciOverviewPageComponent);
    fixture.detectChanges();
  });

  it('should render not configured state', () => {
    expect(fixture.nativeElement.textContent).toContain("OCI non configure");
  });
});
