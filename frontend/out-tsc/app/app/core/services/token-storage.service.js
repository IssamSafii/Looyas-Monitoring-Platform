import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'safi-monitoring-session';
export class TokenStorageService {
    set(session) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
    }
    get() {
        const raw = localStorage.getItem(TOKEN_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    clear() {
        localStorage.removeItem(TOKEN_KEY);
    }
    static { this.ɵfac = function TokenStorageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TokenStorageService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TokenStorageService, factory: TokenStorageService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TokenStorageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=token-storage.service.js.map