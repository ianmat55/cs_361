"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [jobUrl, setJobUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

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

    if (!profileData) {
      router.push("/profile");
      return;
    }

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

          {pdfUrl && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Resume
              </h2>

              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                className="mt-4 border rounded-lg shadow-md"
              ></iframe>

              <a
                href={pdfUrl}
                download="resume.pdf"
                className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Download PDF
              </a>
            </div>
          )}

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
