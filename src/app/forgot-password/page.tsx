"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password reset
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1000) // Temporary for demo
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
              ResuMatch
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto h-16 w-16 text-primary mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
              <p className="text-gray-600 mb-6">We've sent a password reset link to your email address.</p>
              <Button variant="outline" onClick={() => setEmailSent(false)} className="mb-4">
                Try again
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-primary hover:underline text-sm inline-flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Reset your password</h1>
            <p className="text-center text-gray-600 mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <Input
                type="email"
                placeholder="Email"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
              <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link href="/login" className="text-primary hover:underline text-sm inline-flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
