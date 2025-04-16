import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);

  constructor() {
    this.authService.user$.subscribe((user) => {
      console.log(user);
      if (!!user) {
        this.loaderService.hide();
        this.router.navigate(['/home']);
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
    this.loaderService.show();
  }
}
