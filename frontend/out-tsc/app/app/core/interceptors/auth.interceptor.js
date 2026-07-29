import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authInterceptor = (req, next) => {
    const token = inject(AuthService).getToken();
    if (!token) {
        return next(req);
    }
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
//# sourceMappingURL=auth.interceptor.js.map