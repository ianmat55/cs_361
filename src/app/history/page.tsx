"use client";

import { useState } from "react";

interface JobApplication {
  id: number;
  jobTitle: string;
  company: string;
  applicationLink: string;
  resumeLink: string;
  date: string;
}

// Dummy data simulating job applications (replace with real DB data later)
const dummyApplications: JobApplication[] = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Google",
    applicationLink: "https://careers.google.com/jobs/results/123456789",
    resumeLink: "https://example.com/resume1.pdf",
    date: "2023-01-15",
  },
  {
    id: 2,
    jobTitle: "Software Engineer",
    company: "LinkedIn",
    applicationLink: "https://www.linkedin.com/jobs/view/987654321",
    resumeLink: "https://example.com/resume2.pdf",
    date: "2023-02-01",
  },
  {
    id: 3,
    jobTitle: "Full Stack Developer",
    company: "Facebook",
    applicationLink: "https://www.facebook.com/careers/jobs/11223344",
    resumeLink: "https://example.com/resume3.pdf",
    date: "2023-02-15",
  },
  {
    id: 4,
    jobTitle: "UI/UX Designer",
    company: "Adobe",
    applicationLink:
      "https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced",
    resumeLink: "https://example.com/resume4.pdf",
    date: "2023-03-01",
  },
  {
    id: 5,
    jobTitle: "Data Scientist",
    company: "Amazon",
    applicationLink: "https://www.amazon.jobs/en/jobs/55667788",
    resumeLink: "https://example.com/resume5.pdf",
    date: "2023-03-10",
  },
  {
    id: 6,
    jobTitle: "Backend Developer",
    company: "Netflix",
    applicationLink: "https://jobs.netflix.com/job/44556677",
    resumeLink: "https://example.com/resume6.pdf",
    date: "2023-03-20",
  },
  {
    id: 7,
    jobTitle: "Mobile Developer",
    company: "Uber",
    applicationLink: "https://www.uber.com/global/en/careers/list/44556677/",
    resumeLink: "https://example.com/resume7.pdf",
    date: "2023-04-01",
  },
  {
    id: 8,
    jobTitle: "DevOps Engineer",
    company: "Microsoft",
    applicationLink: "https://careers.microsoft.com/us/en/job/123456",
    resumeLink: "https://example.com/resume8.pdf",
    date: "2023-04-10",
  },
  {
    id: 9,
    jobTitle: "Product Manager",
    company: "Apple",
    applicationLink: "https://jobs.apple.com/en-us/details/123456",
    resumeLink: "https://example.com/resume9.pdf",
    date: "2023-04-15",
  },
  {
    id: 10,
    jobTitle: "QA Engineer",
    company: "IBM",
    applicationLink: "https://www.ibm.com/employment",
    resumeLink: "https://example.com/resume10.pdf",
    date: "2023-05-01",
  },
];

// --------------------
// Desktop Layout State
// --------------------
const ITEMS_PER_PAGE = 5;

export default function JobHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const totalPages = Math.ceil(dummyApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = dummyApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSelectDesktop = (app: JobApplication) => {
    setSelectedApplication(app);
  };

  // --------------------
  // Mobile Accordion State
  // --------------------
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpandMobile = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Job Application History
      </h1>

      {/* Desktop Layout: Two Columns (Visible on md and up) */}
      <div className="hidden md:flex gap-6">
        {/* Left Sidebar: Paginated List */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <ul>
            {currentItems.map((app) => (
              <li
                key={app.id}
                onClick={() => handleSelectDesktop(app)}
                className={`p-3 rounded cursor-pointer mb-2 hover:bg-gray-200 transition 
                  ${selectedApplication?.id === app.id ? "bg-gray-300" : "bg-gray-100"}`}
              >
                <p className="font-medium text-base">{app.jobTitle}</p>
                <p className="text-gray-600 text-sm">{app.company}</p>
                <p className="text-gray-500 text-xs">{app.date}</p>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 text-sm"
            >
              Prev
            </button>
            <span className="text-gray-700 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Panel: Selected Application Details */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          {selectedApplication ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {selectedApplication.jobTitle}
              </h2>
              <p className="mb-2 text-base">
                <strong>Company:</strong> {selectedApplication.company}
              </p>
              <p className="mb-2 text-base">
                <strong>Date Applied:</strong> {selectedApplication.date}
              </p>
              <a
                href={selectedApplication.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mb-2 text-base"
              >
                View Job Posting
              </a>
              <a
                href={selectedApplication.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-base"
              >
                View Resume Used
              </a>
            </>
          ) : (
            <p className="text-gray-600 text-base">
              Select an application from the list to view details.
            </p>
          )}
        </div>
      </div>

      {/* Mobile Layout: Accordion Style (Visible on small screens) */}
      <div className="md:hidden">
        {dummyApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
          >
            <div
              onClick={() => toggleExpandMobile(app.id)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
            >
              <div>
                <p className="font-medium text-base">{app.jobTitle}</p>
                <p className="text-gray-600 text-sm">{app.company}</p>
                <p className="text-gray-500 text-xs">{app.date}</p>
              </div>
              <div className="text-gray-500 text-xl">
                {expandedId === app.id ? "−" : "+"}
              </div>
            </div>
            {expandedId === app.id && (
              <div className="p-4 border-t border-gray-200">
                <a
                  href={app.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mb-2 text-sm"
                >
                  View Job Posting
                </a>
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Resume Used
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
