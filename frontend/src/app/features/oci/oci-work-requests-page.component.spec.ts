import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of, throwError } from 'rxjs';
import { OciWorkRequestsPageComponent } from './oci-work-requests-page.component';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

describe('OciWorkRequestsPageComponent', () => {
  let fixture: ComponentFixture<OciWorkRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OciWorkRequestsPageComponent],
      providers: [
        provideRouter([]),
        provideAnimationsAsync(),
        {
          provide: OciService,
          useValue: {
            compartments: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } })),
            workRequests: () => throwError(() => ({ error: { code: 'OCI_NOT_CONFIGURED' } })),
            workRequest: () => of(null),
            workRequestErrors: () => of({ items: [], limit: 10, nextPage: null, hasNext: false, partialSupport: false, message: null }),
            workRequestLogs: () => of({ items: [], limit: 10, nextPage: null, hasNext: false, partialSupport: false, message: null })
          }
        },
        {
          provide: TimeRangeService,
          useValue: { selected: () => ({ label: '1 heure', seconds: 3600 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OciWorkRequestsPageComponent);
    fixture.detectChanges();
  });

  it('should render not configured state', () => {
    expect(fixture.nativeElement.textContent).toContain('OCI non configure');
  });
});
