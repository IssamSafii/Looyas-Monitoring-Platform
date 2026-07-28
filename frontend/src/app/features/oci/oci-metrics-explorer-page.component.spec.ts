import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { OciMetricsExplorerPageComponent } from './oci-metrics-explorer-page.component';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

echarts.use([CanvasRenderer]);

describe('OciMetricsExplorerPageComponent', () => {
  let fixture: ComponentFixture<OciMetricsExplorerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OciMetricsExplorerPageComponent],
      providers: [
        provideRouter([]),
        provideAnimationsAsync(),
        provideEchartsCore({ echarts }),
        {
          provide: OciService,
          useValue: {
            health: () => of({
              status: 'CONNECTED',
              configured: true,
              region: 'eu-frankfurt-1',
              profile: 'DEFAULT',
              compartmentConfigured: true,
              message: 'Connexion OCI reussie',
              checkedAt: '2026-07-28T10:00:00Z'
            }),
            namespaces: () => of({ status: 'success', source: 'OCI', namespaces: ['oci_computeagent'] }),
            definitions: () => of({ status: 'success', source: 'OCI', namespace: 'oci_computeagent', definitions: [] }),
            queryMetrics: () => of({ status: 'success', source: 'OCI', namespace: 'oci_computeagent', query: 'CpuUtilization[1m].mean()', series: [] })
          }
        },
        {
          provide: TimeRangeService,
          useValue: { selected: () => ({ label: '1 heure', seconds: 3600 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OciMetricsExplorerPageComponent);
    fixture.detectChanges();
  });

  it('should render empty result state after query', () => {
    (fixture.componentInstance as any).run('CpuUtilization[1m].mean()');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Aucune donnee OCI');
  });
});
