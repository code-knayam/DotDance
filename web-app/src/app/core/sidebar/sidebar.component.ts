import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        routerLink="/home"
        [routerLinkActiveOptions]="{ exact: true }"
        routerLinkActive="active"
      >
        <mat-icon matListItemIcon>home</mat-icon>
        <span matListItemTitle>Home</span>
      </a>
      <a mat-list-item routerLink="/home/qr-create" routerLinkActive="active">
        <mat-icon matListItemIcon>add_circle</mat-icon>
        <span matListItemTitle>Create QR</span>
      </a>
      <a mat-list-item routerLink="/home/analytics" routerLinkActive="active">
        <mat-icon matListItemIcon>analytics</mat-icon>
        <span matListItemTitle>Analytics</span>
      </a>
    </mat-nav-list>
    <mat-nav-list>
      <a mat-list-item (click)="logOut()">
        <mat-icon matListItemIcon>logout</mat-icon>
        <span matListItemTitle>Logout</span>
      </a>
    </mat-nav-list>
  `,
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
