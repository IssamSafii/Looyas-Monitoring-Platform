import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class MonitoringService {
    constructor(http) {
        this.http = http;
    }
    queryMetricsRange(payload) {
        return this.http.post('/api/monitoring/metrics/query-range', payload);
    }
    queryMetrics(payload) {
        return this.http.post('/api/monitoring/metrics/query', payload);
    }
    metricsLabels() {
        return this.http.get('/api/monitoring/metrics/labels');
    }
    metricLabelValues(labelName) {
        return this.http.get(`/api/monitoring/metrics/labels/${labelName}/values`);
    }
    queryLogsRange(payload) {
        return this.http.post('/api/monitoring/logs/query-range', payload);
    }
    queryLogs(payload) {
        return this.http.post('/api/monitoring/logs/query', payload);
    }
    logsLabels() {
        return this.http.get('/api/monitoring/logs/labels');
    }
    logLabelValues(labelName) {
        return this.http.get(`/api/monitoring/logs/labels/${labelName}/values`);
    }
    static { this.ɵfac = function MonitoringService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MonitoringService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MonitoringService, factory: MonitoringService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MonitoringService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=monitoring.service.js.map