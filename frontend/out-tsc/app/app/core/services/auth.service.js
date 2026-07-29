import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./token-storage.service";
import * as i3 from "@angular/router";
export class AuthService {
    constructor(http, tokenStorage, router) {
        this.http = http;
        this.tokenStorage = tokenStorage;
        this.router = router;
        this.sessionSignal = signal(this.tokenStorage.get());
        this.session = computed(() => this.sessionSignal());
        this.isAuthenticated = computed(() => !!this.sessionSignal()?.accessToken);
    }
    login(payload) {
        return this.http.post('/api/auth/login', payload).pipe(tap((session) => {
            this.tokenStorage.set(session);
            this.sessionSignal.set(session);
        }));
    }
    logout() {
        this.tokenStorage.clear();
        this.sessionSignal.set(null);
        void this.router.navigate(['/login']);
    }
    changePassword(payload) {
        return this.http.post('/api/auth/change-password', payload);
    }
    getToken() {
        return this.sessionSignal()?.accessToken ?? null;
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.TokenStorageService), i0.ɵɵinject(i3.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }, { type: i2.TokenStorageService }, { type: i3.Router }], null); })();
//# sourceMappingURL=auth.service.js.map