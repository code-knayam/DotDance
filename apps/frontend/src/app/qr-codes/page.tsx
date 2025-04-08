"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCode } from "@/components/QRCode";
import { Eye, Trash2 } from "lucide-react";
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
import { useState } from "react";

// Mock data - replace with actual data from your backend
const mockQRCodes = [
  {
    id: "1",
    name: "Company Website",
    currentUrl: "https://example.com/1",
    createdAt: "2024-04-06T12:00:00Z",
    totalScans: 25,
  },
  {
    id: "2",
    name: "Product Page",
    currentUrl: "https://example.com/2",
    createdAt: "2024-04-05T12:00:00Z",
    totalScans: 15,
  },
];

export default function QRCodesPage() {
  const [qrToDelete, setQrToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (qrToDelete) {
      // In a real app, this would make an API call to delete the QR code
      console.log('Deleting QR code:', qrToDelete);
      setQrToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My QR Codes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockQRCodes.map((qr) => (
          <Card key={qr.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-card-foreground truncate">{qr.name}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-1">{qr.currentUrl}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <QRCode url={qr.currentUrl} size={64} />
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Updated: {new Date(qr.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/qr-codes/${qr.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <AlertDialog open={qrToDelete === qr.id} onOpenChange={(open) => !open && setQrToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setQrToDelete(qr.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
                        <AlertDialogCancel onClick={() => setQrToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 