import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map, take } from 'rxjs/operators';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    return new Promise<boolean>((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        user?.getIdToken().then((res) => console.log(res));
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/']);
          resolve(false);
        }
      });
    });
  }
}
