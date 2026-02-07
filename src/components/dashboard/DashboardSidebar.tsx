"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ShoppingCart,
  Tag,
  MessageSquare,
  UserCircle,
  Store,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBag,
    color: "text-secondary",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: Tag,
    color: "text-primary",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: Package,
    color: "text-secondary",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    color: "text-primary",
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: MessageSquare,
    color: "text-secondary",
  },
  { name: "POS", href: "/dashboard/pos", icon: Store, color: "text-primary" },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-secondary",
  },
];

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
  toggleSidebar,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "A";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Fixed sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-200 flex flex-col h-screen overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center justify-start h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <Image
            className="h-8 w-auto"
            src="/logo.jpeg"
            alt="Crackers Store"
            width={32}
            height={32}
          />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 transition-all duration-200 rounded-lg group",
                    isActive &&
                      "bg-primary/10 text-primary border-r-2 border-primary",
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "group-hover:scale-110 transition-transform duration-200",
                      isActive ? "text-primary" : item.color,
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User profile section */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center mb-4 p-3 bg-primary/10 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <div className="font-semibold text-gray-900 text-sm">
                {user?.name || "Admin User"}
              </div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
