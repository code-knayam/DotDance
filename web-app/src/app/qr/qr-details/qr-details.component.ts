import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QRCodeComponent, QRCodeElementType } from 'angularx-qrcode';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmDeleteDialog } from './qr-confirm-delete-dialog/qr-confirm-delete-dialog.component';
import { LoaderService } from '../../shared/services/loader.service';
import { QRService } from '../services/qr.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QRCode } from '../qr';

@Component({
  selector: 'app-qr-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    QRCodeComponent,
    NgxChartsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: 'qr-details.component.html',
  styleUrls: ['qr-details.component.scss'],
})
export class QrDetailsComponent implements OnInit {
  qrCode = signal<QRCode | null>(null);
  loading = signal(false);

  editForm: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private elementRef = inject(ElementRef);
  private loaderService = inject(LoaderService);
  private qrService = inject(QRService);

  constructor() {
    this.editForm = this.fb.group({
      newDestinationUrl: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
    });
  }

  ngOnInit(): void {
    this.getQRDetails();
  }

  getQRDetails() {
    const params = this.route.snapshot.params;
    const qrId = params['id'];

    if (!qrId) {
      this.router.navigate(['/qr/list']);
      return;
    }

    this.loading.set(true);
    this.qrService.getQR(qrId).subscribe((qrCode: QRCode) => {
      this.qrCode.set({
        ...qrCode,
        slugUrl: this.qrService.getSlugUrl(qrCode.slug),
      });

      this.loading.set(false);
      this.loaderService.hide();

      this.editForm.patchValue({
        newDestinationUrl: qrCode.destinationUrl,
      });
    });
  }

  deleteQR() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loaderService.show();
      if (result) {
        this.qrService.deleteQR(this.qrCode()!.id).subscribe(() => {
          this.loaderService.hide();

          this.snackBar.open('QR Code deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/qr/list']);
        });
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.loaderService.show();

      this.qrService
        .updateQR({
          id: this.qrCode()!.id,
          destinationUrl: this.editForm.value.newDestinationUrl,
        })
        .subscribe((res) => {
          this.snackBar.open('URL updated successfully', 'Close', {
            duration: 3000,
          });
          this.getQRDetails();
        });
    }
  }

  downloadQR() {
    const canvas = this.elementRef.nativeElement.querySelector(
      `div[data-id="${this.qrCode()?.id}"] canvas`
    );

    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${this.qrCode.name}.png`;
      a.click();
    } else {
      console.error('QR code canvas not found');
    }
  }
}
