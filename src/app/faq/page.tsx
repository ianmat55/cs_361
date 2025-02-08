"use client";

import { useState } from "react";

const faqData = [
  {
    question: "How does JobFit AI generate resumes?",
    answer:
      "JobFit AI analyzes job descriptions and personal data to tailor resumes using AI-powered optimization.",
  },
  {
    question: "Is JobFit AI free to use?",
    answer:
      "We offer both free and premium plans. The free plan includes basic resume generation, while the premium plan offers more customization options.",
  },
  {
    question: "Which platforms does JobFit AI support?",
    answer:
      "Currently, JobFit AI supports downloading resumes in PDF and DOCX formats, making it compatible with most job application platforms.",
  },
  {
    question: "How do I edit my resume after generating it?",
    answer:
      "You can edit your resume directly within JobFit AI’s editor or download it and make changes in your preferred document editor.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out via our support email at support@jobfitai.com or visit our help center for common troubleshooting tips.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h1>
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-4 px-2 text-lg font-semibold flex justify-between items-center focus:outline-none"
            >
              {faq.question}
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="px-2 pb-4 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
