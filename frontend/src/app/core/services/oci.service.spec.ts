import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OciService } from './oci.service';

describe('OciService', () => {
  let service: OciService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OciService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should request OCI health', () => {
    service.health().subscribe((response) => {
      expect(response.status).toBe('CONNECTED');
    });

    const req = httpMock.expectOne('/api/monitoring/oci/health');
    expect(req.request.method).toBe('GET');
    req.flush({
      status: 'CONNECTED',
      configured: true,
      region: 'eu-frankfurt-1',
      profile: 'DEFAULT',
      compartmentConfigured: true,
      message: 'Connexion OCI reussie',
      checkedAt: '2026-07-28T10:00:00Z'
    });
  });

  it('should post OCI metrics query', () => {
    service.queryMetrics({
      compartmentId: null,
      namespace: 'oci_computeagent',
      query: 'CpuUtilization[1m].mean()',
      from: '2026-07-28T09:00:00Z',
      to: '2026-07-28T10:00:00Z',
      includeSubcompartments: false
    }).subscribe((response) => {
      expect(response.source).toBe('OCI');
    });

    const req = httpMock.expectOne('/api/monitoring/oci/metrics/query');
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'success',
      source: 'OCI',
      namespace: 'oci_computeagent',
      query: 'CpuUtilization[1m].mean()',
      series: []
    });
  });
});
