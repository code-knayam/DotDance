"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCode } from "@/components/QRCode";
import { Copy, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock data - replace with actual data from your backend
const mockQRDetails = {
  id: "1",
  name: "Company Website",
  currentUrl: "https://example.com/1",
  createdAt: "2024-04-06T12:00:00Z",
  totalScans: 25,
  history: [
    {
      url: "https://example.com/1",
      updatedAt: "2024-04-06T12:00:00Z",
      scans: 25,
    },
    {
      url: "https://old-example.com/1",
      updatedAt: "2024-04-05T12:00:00Z",
      scans: 15,
    },
  ],
};

export default function QRCodeDetailsPage() {
  const [url, setUrl] = useState(mockQRDetails.currentUrl);
  const [logoUrl, setLogoUrl] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const params = useParams();
  const router = useRouter();

  const handleUpdate = () => {
    // In a real app, this would make an API call to update the QR code details
    console.log('Updated QR code details:', { url, logoUrl, bgColor, fgColor });
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${mockQRDetails.name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleDelete = async () => {
    // In a real app, this would make an API call to delete the QR code
    router.push('/qr-codes');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{mockQRDetails.name}</h1>
          <p className="text-sm text-muted-foreground">Created on: {new Date(mockQRDetails.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground">Total Scans: {mockQRDetails.totalScans}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete QR Code
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your QR code
                and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex space-x-4">
        <Card className="bg-card border-border flex-1">
          <CardContent className="flex flex-col items-center">
            <QRCode url={url} size={200} logoUrl={logoUrl} bgColor={bgColor} fgColor={fgColor} />
            <Button onClick={handleDownloadQR} variant="outline" className="mt-4">
              Download QR
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card border-border flex-1">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-card-foreground">Edit QR Code URL</h2>
            <p className="text-sm text-muted-foreground">Update the URL for your QR code below. This will change the destination when the QR code is scanned.</p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Current URL</label>
              <Input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-background w-3/4"
              />
            </div>
            <Button onClick={handleUpdate} className="w-1/2 mt-4">
              Update
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">URL History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockQRDetails.history.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{entry.url}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.scans} scans
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 