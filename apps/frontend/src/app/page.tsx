"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCode } from "@/components/QRCode";
import { OctagonX } from "lucide-react"

export default function Home() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerate = async () => {
    if (!url || !name) return;
    
    // In a real app, this would make an API call to create the short URL
    const shortUrl = `https://yourdomain.com/q/${Math.random().toString(36).substring(7)}`;
    setGeneratedUrl(shortUrl);
    setIsDialogOpen(true);
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleReset = () => {
    setUrl("");
    setName("");
    setLogoUrl("");
    setBgColor("#ffffff");
    setFgColor("#000000");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create QR Code</h1>
      </div>

      <div className="flex space-x-8">
        <div className="w-full max-w-lg">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">QR Code Details</CardTitle>
              <CardDescription className="text-muted-foreground">Fill in the details below to create your custom QR code. Ensure the URL is correct as it will be the destination when scanned.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                  QR Code Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g. Company Website"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-card-foreground">
                  Destination URL
                </label>
                <Input
                  id="url"
                  placeholder="e.g. https://example.com"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="logoUrl" className="text-sm font-medium text-card-foreground">
                  Logo URL
                </label>
                <Input
                  id="logoUrl"
                  placeholder="e.g. https://example.com/logo.png"
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="bg-background w-full"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <label htmlFor="bgColor" className="text-sm font-medium text-card-foreground">
                    Background Color
                  </label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="bg-background w-full"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label htmlFor="fgColor" className="text-sm font-medium text-card-foreground">
                    Foreground Color
                  </label>
                  <Input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="bg-background w-full"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleGenerate} 
                  className="flex-8 py-2 text-sm max-w-xs"
                  disabled={!url || !name}
                >
                  Generate
                </Button>
                <Button 
                  onClick={handleReset} 
                  className="flex-1 py-2 text-sm max-w-xs"
                  variant="destructive"
                >
                  <OctagonX className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full max-w-md">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Live Preview</CardTitle>
              <CardDescription className="text-muted-foreground">This is a live preview of your QR code. Make sure all fields are filled correctly.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              {url && name && (
                <QRCode url={url} size={200} logoUrl={logoUrl} bgColor={bgColor} fgColor={fgColor} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
              Your QR code has been generated. You can download it or copy the URL.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {generatedUrl && (
              <>
                <QRCode url={generatedUrl} size={200} logoUrl={logoUrl} bgColor={bgColor} fgColor={fgColor} />
                <Button onClick={handleDownloadQR} variant="outline" className="w-full">
                  Download QR Code
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
