"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconSparkles,
} from "@tabler/icons-react";

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(
      Math.sqrt(deltaX ** 2 + deltaY ** 2),
      maxDistance,
    );

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isBlinking1, setIsBlinking1] = useState(false);
  const [isBlinking2, setIsBlinking2] = useState(false);
  const [isBlinking3, setIsBlinking3] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const char1Ref = useRef<HTMLDivElement>(null);
  const char2Ref = useRef<HTMLDivElement>(null);
  const char3Ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blinking effects
  useEffect(() => {
    const blinkInterval1 = setInterval(
      () => {
        setIsBlinking1(true);
        setTimeout(() => setIsBlinking1(false), 150);
      },
      Math.random() * 4000 + 3000,
    );

    const blinkInterval2 = setInterval(
      () => {
        setIsBlinking2(true);
        setTimeout(() => setIsBlinking2(false), 150);
      },
      Math.random() * 4000 + 3000,
    );

    const blinkInterval3 = setInterval(
      () => {
        setIsBlinking3(true);
        setTimeout(() => setIsBlinking3(false), 150);
      },
      Math.random() * 4000 + 3000,
    );

    return () => {
      clearInterval(blinkInterval1);
      clearInterval(blinkInterval2);
      clearInterval(blinkInterval3);
    };
  }, []);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const char1Pos = calculatePosition(char1Ref);
  const char2Pos = calculatePosition(char2Ref);
  const char3Pos = calculatePosition(char3Ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      // Suppress console error logging for expected authentication failures
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { status?: number; data?: { error?: string } };
        };
        if (axiosError.response?.status === 401) {
          // Expected authentication error - don't log to console
          setError(
            axiosError.response.data?.error ||
              "Invalid email or password. Please try again.",
          );
        } else {
          // Unexpected error - log it
          console.error("Login error:", err);
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Login error:", err);
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen grid lg:grid-cols-2 bg-black">
        {/* Left Animated Section */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/20 via-black to-secondary/20 p-12 text-white overflow-hidden">
          {/* Logo */}
          <div className="relative z-20">
            <Link href="/" className="flex items-center gap-3">
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
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Fireworks Store
                </p>
              </div>
            </Link>
          </div>

          {/* Animated Firework Characters */}
          <div className="relative z-20 flex items-end justify-center h-[500px]">
            <div
              className="relative"
              style={{ width: "550px", height: "400px" }}
            >
              {/* Rocket Character - Red */}
              <div
                ref={char1Ref}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                  left: "50px",
                  width: "120px",
                  height: isTyping ? "380px" : "350px",
                  background:
                    "linear-gradient(to top, hsl(var(--secondary)), #FF4444)",
                  borderRadius: "60px 60px 0 0",
                  zIndex: 1,
                  transform: `skewX(${char1Pos.bodySkew}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                {/* Eyes */}
                <div
                  className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                  style={{
                    left: `${30 + char1Pos.faceX}px`,
                    top: `${40 + char1Pos.faceY}px`,
                  }}
                >
                  <EyeBall
                    size={16}
                    pupilSize={6}
                    maxDistance={4}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking1}
                    forceLookX={showPassword ? 5 : undefined}
                    forceLookY={showPassword ? -2 : undefined}
                  />
                  <EyeBall
                    size={16}
                    pupilSize={6}
                    maxDistance={4}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking1}
                    forceLookX={showPassword ? 5 : undefined}
                    forceLookY={showPassword ? -2 : undefined}
                  />
                </div>
                {/* Sparkle effect */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <IconSparkles
                    size={20}
                    className="text-primary animate-pulse"
                  />
                </div>
              </div>

              {/* Sparkler Character - Gold */}
              <div
                ref={char2Ref}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                  left: "200px",
                  width: "100px",
                  height: "280px",
                  background:
                    "linear-gradient(to top, hsl(var(--primary)), #FFF700)",
                  borderRadius: "50px 50px 0 0",
                  zIndex: 2,
                  transform: `skewX(${char2Pos.bodySkew}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                {/* Eyes */}
                <div
                  className="absolute flex gap-4 transition-all duration-700 ease-in-out"
                  style={{
                    left: `${25 + char2Pos.faceX}px`,
                    top: `${35 + char2Pos.faceY}px`,
                  }}
                >
                  <EyeBall
                    size={14}
                    pupilSize={5}
                    maxDistance={3}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking2}
                    forceLookX={showPassword ? -3 : undefined}
                    forceLookY={showPassword ? 2 : undefined}
                  />
                  <EyeBall
                    size={14}
                    pupilSize={5}
                    maxDistance={3}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking2}
                    forceLookX={showPassword ? -3 : undefined}
                    forceLookY={showPassword ? 2 : undefined}
                  />
                </div>
                {/* Sparkles */}
                <div className="absolute -top-1 -left-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="absolute -top-3 -right-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Flower Pot Character - Purple */}
              <div
                ref={char3Ref}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                  left: "330px",
                  width: "140px",
                  height: "320px",
                  background: "linear-gradient(to top, #6C3FF5, #8B5CF6)",
                  borderRadius: "70px 70px 0 0",
                  zIndex: 3,
                  transform: `skewX(${char3Pos.bodySkew}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                {/* Eyes */}
                <div
                  className="absolute flex gap-5 transition-all duration-700 ease-in-out"
                  style={{
                    left: `${40 + char3Pos.faceX}px`,
                    top: `${45 + char3Pos.faceY}px`,
                  }}
                >
                  <EyeBall
                    size={18}
                    pupilSize={7}
                    maxDistance={5}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking3}
                  />
                  <EyeBall
                    size={18}
                    pupilSize={7}
                    maxDistance={5}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlinking3}
                  />
                </div>
                {/* Fountain effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-1 h-6 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-4 bg-secondary rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-5 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="relative z-20 flex items-center gap-8 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/assets/images/hero_fireworks.png')] bg-cover bg-center opacity-5"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Login Section */}
        <div className="flex items-center justify-center p-8 bg-card">
          <div className="w-full max-w-[420px]">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
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
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Fireworks Store
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                Welcome back!
              </h1>
              <p className="text-gray-400 text-sm">Light up your celebration</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
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
                    type="email"
                    placeholder="admin@skyspark.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="w-full h-12 pl-10 pr-4 bg-muted border border-white/10 rounded text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <IconLock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 pl-10 pr-12 bg-muted border border-white/10 rounded text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <IconEyeOff size={18} />
                    ) : (
                      <IconEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/10 bg-muted text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-primary text-black font-bold rounded hover:bg-white transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="px-4 text-xs text-muted-foreground uppercase tracking-wider">
                Or
              </span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/google`;
              }}
              className="w-full h-12 bg-muted border border-white/10 text-white rounded hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer01 />
      <Footer02 />
    </>
  );
}
