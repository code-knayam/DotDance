import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateQRCodeRequest, QRCode, UpdateQRCodeRequest } from '../qr';
import { environment as env } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  private apiUrl = `${env.apiUrl}/api/qr-codes`;
  private redirectUrl = `${env.redirectUrl}?slugId=`;

  constructor(private http: HttpClient) {}

  createQR(qr: CreateQRCodeRequest): Observable<QRCode> {
    return this.http.post<QRCode>(this.apiUrl, qr);
  }

  getQRCodes(): Observable<QRCode[]> {
    return this.http.get<QRCode[]>(this.apiUrl);
  }

  getQR(id: string): Observable<QRCode> {
    return this.http.get<QRCode>(`${this.apiUrl}/${id}`);
  }

  updateQR(qr: UpdateQRCodeRequest): Observable<QRCode> {
    return this.http.put<QRCode>(`${this.apiUrl}/${qr.id}`, qr);
  }

  deleteQR(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSlugUrl(slug: string): string {
    return `${this.redirectUrl}${slug}`;
  }

  // getQRStats(id: string): Observable<ScanData[]> {
  //   return this.http.get<ScanData[]>(`${this.apiUrl}/${id}/stats`);
  // }
}
