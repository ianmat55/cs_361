"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [jobUrl, setJobUrl] = useState(""); // Store job URL input
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      console.log(session);
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [session, status]);

  const handleGenerate = async () => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (!profileData) {
      router.push("/profile");
      return;
    }

    if (!jobUrl) {
      alert("Please enter a job URL.");
      return;
    }

    try {
      console.log(jobUrl);
      const response = await fetch("http://localhost:1709/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobUrl: jobUrl, userId: 1 }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      console.log("Generated Resume:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>JobFit AI</title>
        <meta name="description" content="AI-powered resume generator" />
      </Head>

      <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <section id="hero" className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">JobFit AI</h1>
          <p className="text-gray-600 mb-4">
            Generate a resume tailored to your job search.
          </p>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="Enter job post URL..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
            />
            <button
              onClick={handleGenerate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Generate
            </button>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-4 text-blue-500 hover:underline"
          >
            {showInfo ? "Hide" : "How to Use"}
          </button>

          {showInfo && (
            <div className="mt-3 p-4 bg-white shadow-md rounded-lg text-gray-700 max-w-lg">
              <p>
                Just drop the link to your desired job post, and our smart
                resume formatter will tailor your resume to match the
                role—perfectly aligned with your skills and experience.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
