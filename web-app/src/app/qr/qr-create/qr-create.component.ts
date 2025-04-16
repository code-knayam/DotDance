import { Component, inject, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { QRCodeComponent } from 'angularx-qrcode';
import { LoaderService } from '../../shared/services/loader.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QRService } from '../services/qr.service';

@Component({
  selector: 'app-qr-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    QRCodeComponent,
  ],
  templateUrl: 'qr-create.component.html',
  styleUrls: ['qr-create.component.scss'],
})
export class QrCreateComponent {
  qrForm: FormGroup;
  window: any;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private loaderService = inject(LoaderService);
  private snackBar = inject(MatSnackBar);
  private qrService = inject(QRService);

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    this.qrForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      backgroundColor: ['#ffffff'],
      foregroundColor: ['#000000'],
      logoUrl: [''],
    });
  }

  onSubmit() {
    if (this.qrForm.valid) {
      console.log('Creating QR:', this.qrForm.value);
      this.loaderService.show();

      this.qrService
        .createQR({
          name: this.qrForm.value.name,
          backgroundColor: this.qrForm.value.backgroundColor,
          foregroundColor: this.qrForm.value.foregroundColor,
          logoUrl: this.qrForm.value.logoUrl,
          destinationUrl: this.qrForm.value.url,
        })
        .subscribe((resp) => {
          this.loaderService.hide();

          this.qrForm.reset({
            name: '',
            url: '',
            backgroundColor: '#ffffff',
            foregroundColor: '#000000',
            logoUrl: '',
          });

          this.snackBar.open('QR Code created successfully', 'Close', {
            duration: 3000,
          });

          this.router.navigate(['/home/qr-details', resp.id]);
        });
    }
  }
}
