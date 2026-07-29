import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class OciService {
    constructor(http) {
        this.http = http;
    }
    health() {
        return this.http.get('/api/monitoring/oci/health');
    }
    compartments() {
        return this.http.get('/api/monitoring/oci/compartments');
    }
    namespaces(compartmentId) {
        let params = new HttpParams();
        if (compartmentId?.trim()) {
            params = params.set('compartmentId', compartmentId.trim());
        }
        return this.http.get('/api/monitoring/oci/metrics/namespaces', { params });
    }
    definitions(namespace, compartmentId) {
        let params = new HttpParams().set('namespace', namespace);
        if (compartmentId?.trim()) {
            params = params.set('compartmentId', compartmentId.trim());
        }
        return this.http.get('/api/monitoring/oci/metrics/definitions', { params });
    }
    queryMetrics(payload) {
        return this.http.post('/api/monitoring/oci/metrics/query', payload);
    }
    searchLogs(payload) {
        return this.http.post('/api/monitoring/oci/logs/search', payload);
    }
    computeInstances(compartmentId) {
        let params = new HttpParams();
        if (compartmentId?.trim()) {
            params = params.set('compartmentId', compartmentId.trim());
        }
        return this.http.get('/api/monitoring/oci/compute/instances', { params });
    }
    computeInstance(instanceId) {
        return this.http.get(`/api/monitoring/oci/compute/instances/${encodeURIComponent(instanceId)}`);
    }
    workRequests(query) {
        let params = new HttpParams();
        if (query.compartmentId?.trim()) {
            params = params.set('compartmentId', query.compartmentId.trim());
        }
        if (query.status?.trim()) {
            params = params.set('status', query.status.trim());
        }
        if (query.operationType?.trim()) {
            params = params.set('operationType', query.operationType.trim());
        }
        if (query.resource?.trim()) {
            params = params.set('resource', query.resource.trim());
        }
        if (query.from?.trim()) {
            params = params.set('from', query.from.trim());
        }
        if (query.to?.trim()) {
            params = params.set('to', query.to.trim());
        }
        if (query.page != null) {
            params = params.set('page', String(query.page));
        }
        if (query.limit != null) {
            params = params.set('limit', String(query.limit));
        }
        return this.http.get('/api/monitoring/oci/work-requests', { params });
    }
    workRequest(id) {
        return this.http.get(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}`);
    }
    workRequestErrors(id, page, limit) {
        let params = new HttpParams();
        if (page?.trim()) {
            params = params.set('page', page.trim());
        }
        if (limit != null) {
            params = params.set('limit', String(limit));
        }
        return this.http.get(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}/errors`, { params });
    }
    workRequestLogs(id, page, limit) {
        let params = new HttpParams();
        if (page?.trim()) {
            params = params.set('page', page.trim());
        }
        if (limit != null) {
            params = params.set('limit', String(limit));
        }
        return this.http.get(`/api/monitoring/oci/work-requests/${encodeURIComponent(id)}/logs`, { params });
    }
    static { this.ɵfac = function OciService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OciService, factory: OciService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=oci.service.js.map