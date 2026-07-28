import { ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OciLogsExplorerPageComponent } from './oci-logs-explorer-page.component';
import { OciService } from '../../core/services/oci.service';
import { TimeRangeService } from '../../core/services/time-range.service';

describe('OciLogsExplorerPageComponent', () => {
  let fixture: ComponentFixture<OciLogsExplorerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OciLogsExplorerPageComponent],
      providers: [
        provideRouter([]),
        provideAnimationsAsync(),
        {
          provide: OciService,
          useValue: {
            searchLogs: () => throwError(() => ({ error: { message: 'Erreur OCI', code: 'OCI_SERVICE_ERROR' } }))
          }
        },
        {
          provide: TimeRangeService,
          useValue: { selected: () => ({ label: '1 heure', seconds: 3600 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OciLogsExplorerPageComponent);
    fixture.detectChanges();
  });

  it('should render error state when OCI logs fail', () => {
    (fixture.componentInstance as any).run('');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Erreur OCI');
  });
});
