import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AuthenticatedLayoutComponent } from './core/authenticated-layout/authenticated-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./qr/qr.routes').then((m) => m.QR_ROUTES),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./analytics/analytics.routes').then(
            (m) => m.ANALYTICS_ROUTES
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
