import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { from, switchMap } from 'rxjs';

const protectedEndpoints = ['/api/auth', '/api/qr-codes'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isProtected = protectedEndpoints.some((url) => req.url.includes(url));

  if (!isProtected) {
    return next(req);
  }

  return from(
    authService.currentUser?.getIdToken() || Promise.resolve(null)
  ).pipe(
    switchMap((token) => {
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      }

      return next(req);
    })
  );
};
