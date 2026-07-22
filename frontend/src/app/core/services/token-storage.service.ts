import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/auth.model';

const TOKEN_KEY = 'safi-monitoring-session';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  set(session: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
  }

  get(): LoginResponse | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? (JSON.parse(raw) as LoginResponse) : null;
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
