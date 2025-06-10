"use client";

import type React from "react"

import { useRouter } from "next/navigation";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    // TODO: Implement NextAuth Google sign up
    // signIn('google', { callbackUrl: '/dashboard' })
    setTimeout(() => setIsLoading(false), 1000) // Temporary for demo
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions")
      return
    }
    setIsLoading(true)
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data?.error || "Something went wrong");
    }

    setTimeout(() => setIsLoading(false), 1000) // Temporary for demo
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            ResuMatch
          </Link>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Create your account</h1>

            <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                required
              />

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center mb-6">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in here
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
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              Sign up with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
