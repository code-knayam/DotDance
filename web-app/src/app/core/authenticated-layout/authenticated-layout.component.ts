import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer mode="side" opened>
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: calc(100% - 64px)
    }
    .content {
      padding: 20px;
    }
  `]
})
export class AuthenticatedLayoutComponent {} 