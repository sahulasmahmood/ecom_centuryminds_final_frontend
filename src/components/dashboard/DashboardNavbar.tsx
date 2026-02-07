"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  User,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface DashboardNavbarProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function DashboardNavbar({
  setSidebarOpen,
  sidebarOpen,
  toggleSidebar,
}: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    router.push("/login");
  };

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    const segment = pathname.split("/").pop();
    if (!segment) return "Admin Panel";
    return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
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
    <div className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 mr-4"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5 text-gray-600" />
          ) : (
            <PanelLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <p className="text-sm text-gray-500">Manage your crackers store</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Go to Website Button */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Store
        </button>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:flex lg:items-center">
              <span className="text-sm font-semibold text-gray-900">
                {user?.name || "Admin"}
              </span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                userDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "admin@store.com"}
                  </p>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4 mr-3 text-primary" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
