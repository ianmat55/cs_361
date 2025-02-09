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

// Dummy data simulating previously applied jobs (replace with DB queries later)
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
    jobTitle: "Quality Assurance Engineer",
    company: "IBM",
    applicationLink: "https://www.ibm.com/employment",
    resumeLink: "https://example.com/resume10.pdf",
    date: "2023-05-01",
  },
];

const ITEMS_PER_PAGE = 5;

export default function JobHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  // Calculate total pages and current page items
  const totalPages = Math.ceil(dummyApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = dummyApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSelect = (application: JobApplication) => {
    setSelectedApplication(application);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Job Application History</h1>
      <div className="flex gap-6">
        {/* Left Side: Paginated List of Job Applications */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <ul>
            {currentItems.map((application) => (
              <li
                key={application.id}
                onClick={() => handleSelect(application)}
                className={`p-3 rounded cursor-pointer mb-2 hover:bg-gray-200 ${
                  selectedApplication?.id === application.id
                    ? "bg-gray-300"
                    : ""
                }`}
              >
                <p className="font-semibold">{application.jobTitle}</p>
                <p className="text-sm text-gray-600">{application.company}</p>
                <p className="text-xs text-gray-500">{application.date}</p>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Side: Details of Selected Application */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          {selectedApplication ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {selectedApplication.jobTitle}
              </h2>
              <p className="mb-2">
                <strong>Company:</strong> {selectedApplication.company}
              </p>
              <p className="mb-2">
                <strong>Date Applied:</strong> {selectedApplication.date}
              </p>
              <a
                href={selectedApplication.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mb-2"
              >
                View Job Posting
              </a>
              <a
                href={selectedApplication.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Resume Used
              </a>
            </>
          ) : (
            <p className="text-gray-600">
              Select an application from the list to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
