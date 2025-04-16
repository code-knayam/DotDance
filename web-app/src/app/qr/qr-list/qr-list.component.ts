import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeComponent } from 'angularx-qrcode';
import { QRService } from '../services/qr.service';
import { QRCode } from '../qr';

@Component({
  selector: 'app-qr-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    QRCodeComponent,
  ],
  templateUrl: 'qr-list.component.html',
  styleUrls: ['qr-list.component.scss'],
})
export class QrListComponent implements OnInit {
  private qrService = inject(QRService);

  qrCodes = signal<QRCode[]>([]);

  ngOnInit(): void {
    this.qrService.getQRCodes().subscribe((qrCodes) => {
      this.qrCodes.set(
        qrCodes.map((qr) => ({
          ...qr,
          slugUrl: this.qrService.getSlugUrl(qr.slug),
        }))
      );
    });
  }
}
