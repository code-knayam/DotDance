"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-background">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-xl text-muted-foreground">Coming Soon</p>
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground text-center">What to Expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-card-foreground">
              <p className="text-center">
                We're working on bringing you powerful analytics features including:
              </p>
              <ul className="mt-4 space-y-2 text-center">
                <li>• Real-time scan tracking</li>
                <li>• Visitor demographics</li>
                <li>• Usage patterns</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 