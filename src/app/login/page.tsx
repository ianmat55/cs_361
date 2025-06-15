"use client";

import type React from "react";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
    setTimeout(() => setIsLoading(false), 1000);
  };

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid email or password");
    }

    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
          >
            ResuMatch
          </Link>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Log in to JobFit
            </h1>

            <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
              <Input
                type="email"
                placeholder="Email"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="text-center mb-6">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Register here
              </Link>
            </div>

            <div className="text-center mb-6">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-primary"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">OR</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
