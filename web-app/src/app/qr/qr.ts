export interface QRCode {
  id: string;
  name: string;
  slug: string;
  slugUrl?: string;
  destinationUrl: string;
  logoUrl?: string;
  backgroundColor: string;
  foregroundColor: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  redirects: QRRedirectHistory[];
  scanLogs: QRScanLog[]; // assuming ScanLog has a known shape
}

export interface QRScanLog {
  id: string;
  ipAddress?: string;
  country?: string;
  deviceInfo?: string;
  scannedAt: Date;
}

export interface QRRedirectHistory {
  id: string;
  previousUrl: string;
  newUrl: string;
  changedAt: Date;
}

export interface CreateQRCodeRequest {
  name?: string;
  destinationUrl: string;
  backgroundColor?: string;
  foregroundColor?: string;
  logoUrl?: string;
}

export interface UpdateQRCodeRequest {
  id: string;
  destinationUrl: string;
}
