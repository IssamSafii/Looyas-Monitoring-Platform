import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DataSourceService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get('/api/admin/data-sources');
    }
    save(payload, id) {
        return id
            ? this.http.put(`/api/admin/data-sources/${id}`, payload)
            : this.http.post('/api/admin/data-sources', payload);
    }
    delete(id) {
        return this.http.delete(`/api/admin/data-sources/${id}`);
    }
    test(id) {
        return this.http.post(`/api/admin/data-sources/${id}/test`, {});
    }
    static { this.ɵfac = function DataSourceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataSourceService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DataSourceService, factory: DataSourceService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=data-source.service.js.map