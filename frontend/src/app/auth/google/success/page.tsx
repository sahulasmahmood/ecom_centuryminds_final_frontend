"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSparkles } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

function GoogleSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleGoogleSuccess = async () => {
      try {
        // Token is already set as HTTP-only cookie by backend
        // Just refresh the user data
        await refreshUser();

        // Redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        console.error("Google auth error:", error);
        router.push("/login?error=google_auth_failed");
      }
    };

    handleGoogleSuccess();
  }, [router, refreshUser, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/assets/images/hero_fireworks.png')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md bg-card border-white/10 relative z-10">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg border-2 border-primary overflow-hidden">
              <Image
                src="/assets/images/hero_fireworks.png"
                alt="SkySpark"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-white">SkySpark</span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Fireworks Store
              </p>
            </div>
          </div>

          <CardTitle className="text-2xl text-white">
            Signing you in...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10 border-t-primary"></div>
            <IconSparkles
              size={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10 border-t-primary"></div>
            <IconSparkles
              size={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse"
            />
          </div>
        </div>
      }
    >
      <GoogleSuccessContent />
    </Suspense>
  );
}
