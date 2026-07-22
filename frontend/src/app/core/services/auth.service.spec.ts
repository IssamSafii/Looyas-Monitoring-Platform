import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login and store session', () => {
    service.login({ username: 'admin', password: 'admin' }).subscribe((response) => {
      expect(response.username).toBe('admin');
      expect(service.getToken()).toBe('token');
    });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush({ accessToken: 'token', tokenType: 'Bearer', username: 'admin', role: 'ADMIN' });
  });
});
