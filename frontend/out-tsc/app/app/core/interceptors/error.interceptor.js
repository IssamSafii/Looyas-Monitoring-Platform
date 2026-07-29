import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
export const errorInterceptor = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const snackbar = inject(SnackbarService);
    return next(req).pipe(catchError((error) => {
        if (error.status === 401) {
            authService.logout();
        }
        if (error.status === 403) {
            snackbar.error('Accès refusé pour cette action.');
            void router.navigate(['/overview']);
        }
        return throwError(() => error);
    }));
};
//# sourceMappingURL=error.interceptor.js.map