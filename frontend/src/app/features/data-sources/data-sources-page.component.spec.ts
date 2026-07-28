import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataSourcesPageComponent } from './data-sources-page.component';
import { DataSourceService } from '../../core/services/data-source.service';
import { OciService } from '../../core/services/oci.service';
import { SnackbarService } from '../../core/services/snackbar.service';

describe('DataSourcesPageComponent', () => {
  let fixture: ComponentFixture<DataSourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSourcesPageComponent],
      providers: [
        provideAnimationsAsync(),
        {
          provide: DataSourceService,
          useValue: {
            list: () => of([{
              id: 1,
              name: 'OCI',
              type: 'OCI',
              baseUrl: '',
              apiPrefix: '',
              tenantId: null,
              authenticationType: 'NONE',
              username: null,
              maskedPassword: null,
              maskedToken: null,
              region: 'eu-frankfurt-1',
              maskedCompartmentId: 'ocid1.compartment...a8f2',
              profile: 'DEFAULT',
              configFile: '/app/.oci/config',
              defaultMetricNamespace: 'oci_computeagent',
              includeSubcompartments: false,
              enabled: true,
              createdAt: '2026-07-28T10:00:00Z',
              updatedAt: '2026-07-28T10:00:00Z'
            }]),
            save: () => of(),
            delete: () => of(void 0),
            test: () => of({ success: true, message: 'ok' })
          }
        },
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
            })
          }
        },
        {
          provide: SnackbarService,
          useValue: {
            success: () => void 0,
            error: () => void 0
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataSourcesPageComponent);
    fixture.detectChanges();
  });

  it('should render OCI source and test action', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('OCI');
    expect(content).toContain('Tester');
  });
});
