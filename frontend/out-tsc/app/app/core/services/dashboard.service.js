import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DashboardService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get('/api/dashboards');
    }
    saveDashboard(payload, id) {
        return id ? this.http.put(`/api/dashboards/${id}`, payload) : this.http.post('/api/dashboards', payload);
    }
    deleteDashboard(id) {
        return this.http.delete(`/api/dashboards/${id}`);
    }
    savePanel(dashboardId, payload, panelId) {
        return panelId
            ? this.http.put(`/api/panels/${panelId}`, payload)
            : this.http.post(`/api/dashboards/${dashboardId}/panels`, payload);
    }
    deletePanel(panelId) {
        return this.http.delete(`/api/panels/${panelId}`);
    }
    preview(panelId) {
        return this.http.post(`/api/panels/${panelId}/preview`, {});
    }
    static { this.ɵfac = function DashboardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardService, factory: DashboardService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=dashboard.service.js.map