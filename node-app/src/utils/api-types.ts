/**
 * API Response Types
 * These types can be used in the frontend to ensure type safety
 */

// User related types
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string; // ISO date
}

// QR Code related types
export interface QRCode {
  id: string;
  slug: string;
  name: string | null;
  destinationUrl: string;
  backgroundColor: string;
  foregroundColor: string;
  logoUrl: string | null;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  userId: string;
}

// Redirect history
export interface QRRedirectHistory {
  id: string;
  previousUrl: string;
  newUrl: string;
  changedAt: string; // ISO date
}

// Scan log
export interface QRScanLog {
  id: string;
  ipAddress: string | null;
  country: string | null;
  deviceInfo: string | null;
  scannedAt: string; // ISO date
}

// QR Code with relations
export interface QRCodeWithRelations extends QRCode {
  redirects: QRRedirectHistory[];
  scanLogs: QRScanLog[];
}

// API Response Types
export interface APIResponses {
  // Auth responses
  login: {
    message: string;
    user: User;
  };
  me: User;

  // QR Code responses
  createQRCode: QRCode;
  getQRCode: QRCodeWithRelations;
  updateQRCode: QRCode;
  listQRCodes: QRCodeWithRelations[];

  // Public scan response
  scanQRCode: {
    url: string;
    name: string | null;
  };

  // Error response
  error: {
    error: string;
  };
}

// Request body types
export interface CreateQRCodeRequest {
  name?: string;
  destinationUrl: string;
  backgroundColor?: string;
  foregroundColor?: string;
  logoUrl?: string;
}

export interface UpdateQRCodeRequest {
  name?: string;
  destinationUrl?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  logoUrl?: string;
}

// Query parameter types
export interface ScanQRCodeQuery {
  ipAddress?: string;
  country?: string;
  deviceInfo?: string;
} 