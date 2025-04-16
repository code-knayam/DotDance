import { Routes } from '@angular/router';
import { QrListComponent } from './qr-list/qr-list.component';
import { QrCreateComponent } from './qr-create/qr-create.component';
import { QrDetailsComponent } from './qr-details/qr-details.component';

export const QR_ROUTES: Routes = [
  {
    path: '',
    component: QrListComponent,
  },
  {
    path: 'qr-create',
    component: QrCreateComponent,
  },
  {
    path: 'qr-details/:id',
    component: QrDetailsComponent,
  },
];
