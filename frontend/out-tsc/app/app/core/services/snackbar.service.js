import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class SnackbarService {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    success(message) {
        this.snackBar.open(message, 'Fermer', { duration: 3500 });
    }
    error(message) {
        this.snackBar.open(message, 'Fermer', { duration: 5000 });
    }
    static { this.ɵfac = function SnackbarService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SnackbarService)(i0.ɵɵinject(i1.MatSnackBar)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SnackbarService, factory: SnackbarService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SnackbarService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.MatSnackBar }], null); })();
//# sourceMappingURL=snackbar.service.js.map