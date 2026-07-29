import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class HealthService {
    constructor(http) {
        this.http = http;
    }
    getHealth() {
        return this.http.get('/api/health');
    }
    static { this.ɵfac = function HealthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HealthService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HealthService, factory: HealthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HealthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=health.service.js.map