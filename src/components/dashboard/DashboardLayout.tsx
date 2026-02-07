"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarOpen");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean): boolean => {
      const newState: boolean = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      // Check if we have user data in localStorage
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        router.replace("/login");
        return;
      }

      try {
        // Validate token expiry if it's a JWT
        if (token.includes(".")) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.replace("/login");
            return;
          }
        }

        const userData = JSON.parse(userStr);

        // Check if user is admin
        if (userData.role !== "admin") {
          router.replace("/");
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
      }
    };

    if (!loading) {
      checkAuth();
    }
  }, [loading, router]);

  // Show loading while checking authentication
  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don&apos;t have permission to access this area.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Go to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <DashboardNavbar
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          <main className="flex-1 overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
