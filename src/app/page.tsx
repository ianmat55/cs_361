"use client";

import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGenerate = () => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const profileData = localStorage.getItem("userProfile");
    if (!profileData) {
      router.push("/profile");
      return;
    }

    // temp until generation func is ready
    console.log("Generating resume...");
    // router.push("/generate-resume"); // Uncomment when a generation page is ready
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
              placeholder="Enter job title or description..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                role-perfectly aligned with your skills and experience.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
