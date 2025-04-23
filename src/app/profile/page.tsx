"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const steps = [
  "Personal Info",
  "Skills",
  "Experience",
  "Projects",
  "Education",
];

export default function ProfileForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    location: "",
  });
  const [skills, setSkills] = useState([]);
  const [jobExperiences, setJobExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      personalInfo,
      skills,
      jobExperiences,
      projects,
      educationEntries,
    });
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-white border-r border-gray-200 p-6">
        <nav className="space-y-4">
          {steps.map((step, index) => (
            <button
              key={step}
              onClick={() => setCurrentStep(index)}
              className={`w-full text-left px-4 py-2 rounded-md ${
                currentStep === index
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {step}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-2xl font-bold mb-6">{steps[currentStep]}</h1>

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={personalInfo.fullName}
                  onChange={handlePersonalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="location" className="block font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={personalInfo.location}
                  onChange={handlePersonalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          {/* You can insert additional steps like Skills, Experience, etc. similarly */}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={currentStep === 0}
            >
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Profile
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
