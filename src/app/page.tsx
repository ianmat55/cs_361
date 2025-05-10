"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <>
      <Head>
        <title>JobFit AI</title>
        <meta name="description" content="AI-powered resume generator" />
      </Head>

      <main className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 pt-12">
        <section id="hero" className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quality First Personalization
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
            Generate a customized resume from your job posting in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <input
              type="text"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="Paste job post URL..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
            />
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Generate
            </button>
          </div>

          {pdfUrl && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your Tailored Resume
              </h2>
              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                className="mt-2 border border-gray-300 rounded-lg shadow-sm"
              ></iframe>
              <a
                href={pdfUrl}
                download="resume.pdf"
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Download PDF
              </a>
            </div>
          )}

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-6 text-blue-500 hover:underline"
          >
            {showInfo ? "Hide Instructions" : "How to Use"}
          </button>

          {showInfo && (
            <div className="mt-4 p-4 bg-white shadow-sm rounded-lg text-gray-700 max-w-lg mx-auto border border-gray-200">
              <p>
                Just paste the job listing link, and JobFit AI will analyze the
                posting and align your resume to match the role — highlighting
                your most relevant skills and experience.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
