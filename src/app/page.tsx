"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Target, Zap, Upload, Search, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session, status } = useSession();
  // const [profileData, setProfileData] = useState(null);
  const [jobUrl, setJobUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (!session?.user?.email) return;

  //     try {
  //       const response = await fetch("/api/profile", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch profile");
  //       }

  //       const data = await response.json();
  //       setProfileData(data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   if (status === "authenticated") {
  //     fetchProfile();
  //   }
  // }, [session, status]);

  const features = [
    {
      icon: Target,
      title: "Smart Resume Matching",
      description:
        "Our AI analyzes your resume against thousands of job postings to find perfect matches based on skills, experience, and requirements.",
      badge: "Core Feature",
    },
    {
      icon: Zap,
      title: "Automated Applications",
      description:
        "Apply to multiple relevant positions automatically with personalized cover letters and optimized submissions.",
      badge: "Core Feature",
    },
    {
      icon: Sparkles,
      title: "AI Resume Tailoring",
      description:
        "Upgrade to generate custom resume versions for specific roles, maximizing your match score and interview chances.",
      badge: "Premium Add-on",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Upload Your Resume",
      description: "Upload your resume and let our AI understand your skills, experience, and career goals.",
    },
    {
      step: "02",
      title: "Discover Perfect Matches",
      description: "Our semantic matching engine finds jobs that align with your profile across multiple job boards.",
    },
    {
      step: "03",
      title: "Apply Automatically",
      description: "Review matches and apply automatically with personalized applications and cover letters.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              🎯 AI-Powered Job Matching
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Stop Job Hunting. Start <span className="text-primary">Job Matching</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Upload your resume once and let our AI find and apply to perfect job matches automatically. Semantic
              matching technology discovers opportunities you'd never find manually.
            </p>

            {/* Upload Resume CTA */}
            <div className="mt-10 mx-auto max-w-md">
              <div className="relative">
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 transition-colors hover:border-primary/40 hover:bg-primary/10">
                  <Upload className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-center">PDF Max 5MB</p>
                  <Button size="lg" className="text-base">
                    Choose File & Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-x-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Instant matching</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Privacy protected</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-x-6">
              <Button variant="outline" size="lg" className="text-base">
                View Demo
              </Button>
              <Button variant="ghost" size="lg" className="text-base">
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Or explore what's out there</h2>
            <p className="mt-4 text-muted-foreground">See how our semantic matching works by searching for any role</p>

            {/* Search Bar */}
            <div className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <div className="flex rounded-full border border-input bg-background shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center pl-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Try 'Senior React Developer' or 'Product Manager at startup'..."
                    className="flex-1 border-0 bg-transparent px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button className="m-1 rounded-full px-6">Search Jobs</Button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Popular searches:</span>
                <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-primary hover:text-primary/80">
                  "Remote Software Engineer"
                </Button>
                <span>•</span>
                <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-primary hover:text-primary/80">
                  "Data Scientist NYC"
                </Button>
                <span>•</span>
                <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-primary hover:text-primary/80">
                  "Marketing Manager"
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/*
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by job seekers worldwide</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of professionals who've automated their job search with ResuMatch
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-muted/50 p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">Jobs Matched Daily</dt>
                <dd className="order-first text-3xl font-bold tracking-tight">10K+</dd>
              </div>
              <div className="flex flex-col bg-muted/50 p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">Match Accuracy</dt>
                <dd className="order-first text-3xl font-bold tracking-tight">94%</dd>
              </div>
              <div className="flex flex-col bg-muted/50 p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">Time Saved Weekly</dt>
                <dd className="order-first text-3xl font-bold tracking-tight">8 Hours</dd>
              </div>
              <div className="flex flex-col bg-muted/50 p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">Success Rate</dt>
                <dd className="order-first text-3xl font-bold tracking-tight">87%</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      */}

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to land your next role
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From intelligent matching to automated applications, we've got your job search covered
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-lg relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge
                        variant={feature.badge === "Premium Add-on" ? "secondary" : "default"}
                        className={feature.badge === "Premium Add-on" ? "bg-orange-100 text-orange-800" : ""}
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Land your dream job in three simple steps</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-16 hidden h-8 w-px bg-border lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to automate your job search?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of professionals who've stopped hunting and started matching
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="text-base">
                Upload Resume & Start Matching
                <Upload className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
