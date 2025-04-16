import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <span>DotDance</span>
      <span class="spacer"></span>
      Hello, {{ user?.displayName }}!
      <img mat-card-avataar class="user-avataar" [src]="user?.photoURL" />
    </mat-toolbar>
  `,
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);

  user = this.authService.currentUser;

  logout() {
    // this.authService.logout().subscribe();
  }
}
