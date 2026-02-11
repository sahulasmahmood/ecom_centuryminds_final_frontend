"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
}) => {
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "admin") {
        // Redirect non-admin users to home page
        router.replace("/");
        return;
      }
    }
  }, [isLoading, user, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show loading while redirecting non-admin users
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
