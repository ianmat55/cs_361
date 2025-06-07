"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

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

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleGenerate = async () => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    // if (!profileData) {
    //   router.push("/profile");
    //   return;
    // }

    if (!jobUrl) {
      alert("Please enter a job URL.");
      return;
    }

    try {
      const text_response = await fetch(
        "http://localhost:1709/generate-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobUrl: jobUrl, userId: session.user }),
        }
      );

      if (!text_response.ok) throw new Error("Failed to fetch");

      const resume_text = await text_response.text();

      if (!resume_text) {
        console.error("resume_text is undefined!");
        return;
      }

      const pdf_response = await fetch("http://localhost:7777/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: resume_text }),
      });

      if (!pdf_response.ok) throw new Error("Failed to fetch");

      const pdfBlob = await pdf_response.blob();
      const pdfObjectUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfObjectUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Head className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">JobFit AI</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </nav>
          </div>
        </div>
      </Head>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Quality First Personalization
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Generate a customized resume from your job posting in seconds.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Paste job post URL..."
                className="flex-1 h-12 text-base"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-6">
                Generate
              </Button>
            </div>
          </div>

          <Link
            href="#how-it-works"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            How to Use
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Why Choose JobFit AI
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Land Your Dream Job Faster
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform creates perfectly tailored resumes that
              match job requirements and pass ATS systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Lightning Fast</h4>
                <p className="text-gray-600">
                  Generate a customized resume in under 30 seconds. No more
                  hours of manual editing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">ATS Optimized</h4>
                <p className="text-gray-600">
                  Our AI ensures your resume passes Applicant Tracking Systems
                  and reaches human recruiters.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">
                  Recruiter Approved
                </h4>
                <p className="text-gray-600">
                  Formats and keywords that hiring managers actually want to see
                  in your application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Simple Process
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How JobFit AI Works
            </h3>
            <p className="text-xl text-gray-600">
              Three simple steps to your perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Paste Job URL</h4>
              <p className="text-gray-600">
                Simply copy and paste the job posting URL from any job board or
                company website.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">AI Analysis</h4>
              <p className="text-gray-600">
                Our AI analyzes the job requirements and matches them with your
                existing experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Download Resume</h4>
              <p className="text-gray-600">
                Get your perfectly tailored resume ready to submit and increase
                your chances of getting hired.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-gray-600 ml-2">
                4.9/5 from 2,000+ users
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Trusted by Job Seekers Worldwide
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "JobFit AI helped me land 3 interviews in my first week. The
                  customization is incredible!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Finally, a tool that understands what recruiters want. Got my
                  dream job in 2 weeks!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Marcus Johnson</p>
                    <p className="text-sm text-gray-500">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI perfectly matched my skills to job requirements. 10x
                  better than generic templates."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Data Analyst</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who've transformed their
            careers with JobFit AI.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Paste job post URL..."
                className="flex-1 h-12 text-base bg-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-6 font-semibold">
                Try Free Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <p className="text-blue-200 text-sm">
            No credit card required • Generate your first resume free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">JobFit AI</h4>
              <p className="text-gray-400">
                AI-powered resume customization for job seekers worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobFit AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
