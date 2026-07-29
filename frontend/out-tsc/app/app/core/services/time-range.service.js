import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class TimeRangeService {
    constructor() {
        this.options = [
            { label: '15 min', value: '15m', seconds: 900 },
            { label: '1 heure', value: '1h', seconds: 3600 },
            { label: '6 heures', value: '6h', seconds: 21600 },
            { label: '24 heures', value: '24h', seconds: 86400 }
        ];
        this.selected = signal(this.options[1]);
        this.refreshInterval = signal(30000);
    }
    static { this.ɵfac = function TimeRangeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimeRangeService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TimeRangeService, factory: TimeRangeService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimeRangeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=time-range.service.js.map