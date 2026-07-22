import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<LoginResponse | null>(this.tokenStorage.get());
  readonly session = computed(() => this.sessionSignal());
  readonly isAuthenticated = computed(() => !!this.sessionSignal()?.accessToken);

  constructor(
    private readonly http: HttpClient,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router
  ) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', payload).pipe(
      tap((session) => {
        this.tokenStorage.set(session);
        this.sessionSignal.set(session);
      })
    );
  }

  logout(): void {
    this.tokenStorage.clear();
    this.sessionSignal.set(null);
    void this.router.navigate(['/login']);
  }

  changePassword(payload: { currentPassword: string; newPassword: string }): Observable<void> {
    return this.http.post<void>('/api/auth/change-password', payload);
  }

  getToken(): string | null {
    return this.sessionSignal()?.accessToken ?? null;
  }
}
