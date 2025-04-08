"use client";

import React from 'react';
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import { Card } from './ui/card';

interface QRCodeProps {
  url: string;
  size?: number;
  logoUrl?: string;
  bgColor?: string;
  fgColor?: string;
}

export function QRCode({ url, size = 200, logoUrl, bgColor = '#ffffff', fgColor = '#000000' }: QRCodeProps) {
  return (
      <QRCodeLogo
        value={url}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        logoImage={logoUrl}
        logoWidth={size ? size * 0.2 : undefined}
        logoHeight={size ? size * 0.2 : undefined}
        removeQrCodeBehindLogo={true}
      />
  );
}; 