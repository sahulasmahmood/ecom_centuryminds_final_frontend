"use client";

import { useState } from "react";
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
import { IconMail, IconArrowLeft, IconCircleCheck } from "@tabler/icons-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.forgotPassword(email);

      if (response.success) {
        setIsSubmitted(true);
      } else {
        setError("Failed to send reset email");
      }
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { error?: string } } })?.response
              ?.data?.error
          : undefined;

      setError(errorMessage || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
              Check Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We&apos;ve sent a password reset link to{" "}
              <span className="text-primary font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center py-4">
              <div className="relative">
                <IconCircleCheck size={80} className="text-green-500" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              If you don&apos;t see the email, check your spam folder or try
              again.
            </p>

            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              <Link href="/login">
                <IconArrowLeft size={18} className="mr-2" />
                Back to Sign In
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Forgot Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={isLoading}
                  className="w-full h-12 pl-10 pr-4 bg-muted border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Remember your password?{" "}
            </span>
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
