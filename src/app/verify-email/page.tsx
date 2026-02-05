"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import {
  IconCircleCheck,
  IconCircleX,
  IconSparkles,
} from "@tabler/icons-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setStatus("error");
          setMessage(
            "Invalid verification link. Please check your email and try again.",
          );
          return;
        }

        console.log("🔍 Verifying email with token...");

        const response = await authService.verifyEmail(token);

        console.log("✅ Verification response:", response);

        if (response.success) {
          setStatus("success");
          if (response.alreadyVerified === true) {
            setMessage("Email already verified. You can sign in now.");
          } else {
            setMessage("Email verified successfully! You can now sign in.");
          }
        } else {
          setStatus("error");
          setMessage("Email verification failed");
        }
      } catch (error) {
        console.error("❌ Verification error:", error);

        const errorResponse =
          error instanceof Error && "response" in error
            ? (
                error as {
                  response?: { data?: { error?: string }; status?: number };
                }
              ).response
            : undefined;

        let errorMessage = "Network error. Please try again.";

        if (errorResponse?.status === 400) {
          const backendError = errorResponse.data?.error || "";

          if (
            backendError.includes("already verified") ||
            backendError.includes("Email already verified")
          ) {
            errorMessage = "Email already verified. You can sign in now.";
            setStatus("success");
          } else {
            errorMessage =
              backendError ||
              "Invalid or expired verification token. Please try registering again.";
            setStatus("error");
          }
        } else if (errorResponse?.status === 500) {
          errorMessage = "Server error. Please try again later.";
          setStatus("error");
        } else if (errorResponse?.data?.error) {
          errorMessage = errorResponse.data.error;
          setStatus("error");
        } else {
          setStatus("error");
        }

        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/assets/images/hero_fireworks.png')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md bg-card border-border relative z-10">
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
              <span className="text-xl font-bold text-foreground">
                SkySpark
              </span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Fireworks Store
              </p>
            </div>
          </div>

          <CardTitle className="text-2xl text-foreground">
            {status === "loading" && "Verifying Email"}
            {status === "success" && "Email Verified"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-border border-t-primary"></div>
                <IconSparkles
                  size={24}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse"
                />
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <div className="relative">
                  <IconCircleCheck size={80} className="text-green-500" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                <Link href="/login">Go to Sign In</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <div className="relative">
                  <IconCircleX size={80} className="text-red-500" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted"
                >
                  <Link href="/login">Back to Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                >
                  <Link href="/register">Register Again</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact support
                  </Link>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">
                Verifying Email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Please wait...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-border border-t-primary"></div>
                  <IconSparkles
                    size={24}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
