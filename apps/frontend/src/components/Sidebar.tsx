"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, List, BarChart, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "Create QR Code",
    href: "/",
    icon: Home,
  },
  {
    title: "My QR Codes",
    href: "/qr-codes",
    icon: List,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 py-4">
        <div className="px-3">
          {/* <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2> */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
} 