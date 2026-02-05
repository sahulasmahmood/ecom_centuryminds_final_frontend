"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
        if (token.includes('.')) {
          const payload = JSON.parse(atob(token.split('.')[1]));
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this area.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Go to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main content */}
      <div className="lg:pl-64">
        <DashboardNavbar 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}