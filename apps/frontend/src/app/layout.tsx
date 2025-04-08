import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { AuthButton } from "@/components/AuthButton";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DotDance - Dynamic QR Code Generator",
  description: "Create and manage dynamic QR codes with analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
              <div className="container flex h-16 items-center px-4">
                <a href="/" className="font-bold text-2xl">DotDance</a>
                <div className="ml-auto flex items-center space-x-4">
                  <AuthButton />
                </div>
              </div>
            </nav>
            <div className="flex flex-1 pt-16">
              <aside className="fixed left-0 top-16 bottom-0 w-64 border-r bg-background overflow-y-auto">
                <Sidebar />
              </aside>
              <main className="ml-64 flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
