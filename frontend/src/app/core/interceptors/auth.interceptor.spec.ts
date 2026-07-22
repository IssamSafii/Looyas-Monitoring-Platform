import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  it('should append bearer token when available', (done) => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: { getToken: () => 'abc123' }
        }
      ]
    });

    const request = new HttpRequest('GET', '/api/test');
    TestBed.runInInjectionContext(() => authInterceptor(request, (next) => {
      expect(next.headers.get('Authorization')).toBe('Bearer abc123');
      done();
      return Promise.resolve({} as never) as never;
    }));
  });
});
