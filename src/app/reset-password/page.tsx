"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  IconLock,
  IconEye,
  IconEyeOff,
  IconCircleCheck,
  IconSparkles,
} from "@tabler/icons-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      router.push("/login");
      return;
    }
    setToken(tokenParam);
  }, [searchParams, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(token, formData.password);

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "Failed to reset password",
        }));
      }
    } catch (err) {
      let errorMessage = "Network error. Please try again.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { error?: string } };
        };
        errorMessage = axiosError.response?.data?.error || errorMessage;
      }

      setErrors((prev) => ({
        ...prev,
        password: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/assets/images/hero_fireworks.png')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#E31837]/5 rounded-full blur-3xl"></div>

        <Card className="w-full max-w-md bg-[#0a0a0a] border-white/10 relative z-10">
          <CardHeader className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg border-2 border-[#FFD700] overflow-hidden">
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
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Fireworks Store
                </p>
              </div>
            </div>

            <CardTitle className="text-2xl text-white">
              Password Reset Successful
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your password has been successfully reset. You will be redirected to the sign-in page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center py-4">
              <div className="relative">
                <IconCircleCheck size={80} className="text-green-500" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            <Button asChild className="w-full bg-[#FFD700] text-black hover:bg-white font-bold">
              <Link href="/login">Go to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/assets/images/hero_fireworks.png')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#E31837]/5 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md bg-[#0a0a0a] border-white/10 relative z-10">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg border-2 border-[#FFD700] overflow-hidden">
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
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Fireworks Store
              </p>
            </div>
          </div>

          <CardTitle className="text-2xl text-white">Reset Password</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password (8+ chars)"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full h-12 pl-10 pr-12 bg-[#1a1a1a] border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD700] transition-colors"
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full h-12 pl-10 pr-12 bg-[#1a1a1a] border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD700] transition-colors"
                >
                  {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#FFD700] text-black hover:bg-white font-bold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <Link href="/login" className="text-[#FFD700] font-medium hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10 border-t-[#FFD700]"></div>
            <IconSparkles
              size={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFD700] animate-pulse"
            />
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
