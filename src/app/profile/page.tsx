"use client";

import { useState } from "react";

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
  const [skills, setSkills] = useState([
    { skillName: "", years_exp: "", example: "" },
  ]);
  const [jobExperiences, setJobExperiences] = useState([
    { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
  ]);
  const [projects, setProjects] = useState([
    { projectName: "", description: "", link: "" },
  ]);
  const [educationEntries, setEducationEntries] = useState([
    { degree: "", institution: "", graduationYear: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = [...skills];
    newSkills[index][name] = value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { skillName: "", years_exp: "", example: "" }]);
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const newJobs = [...jobExperiences];
    newJobs[index][name] = value;
    setJobExperiences(newJobs);
  };

  const addJobExperience = () => {
    setJobExperiences([
      ...jobExperiences,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { projectName: "", description: "", link: "" }]);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...educationEntries];
    newEducation[index][name] = value;
    setEducationEntries(newEducation);
  };

  const addEducation = () => {
    setEducationEntries([
      ...educationEntries,
      { degree: "", institution: "", graduationYear: "" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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

      <main className="flex-1 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
        <h1 className="text-2xl font-bold mb-6">{steps[currentStep]}</h1>

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="border p-4 rounded">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={personalInfo.fullName}
                  onChange={(e) => handlePersonalChange(e)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalChange(e)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={personalInfo.location}
                  onChange={(e) => handlePersonalChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    name="skillName"
                    placeholder="Skill Name"
                    value={skill.skillName}
                    onChange={(e) => handleSkillChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="years_exp"
                    placeholder="Years of Experience"
                    value={skill.years_exp}
                    onChange={(e) => handleSkillChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    name="example"
                    placeholder="Example of usage"
                    value={skill.example}
                    onChange={(e) => handleSkillChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Skill
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {jobExperiences.map((job, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={job.jobTitle}
                    onChange={(e) => handleJobChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={job.company}
                    onChange={(e) => handleJobChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <div className="flex gap-4">
                    <input
                      type="date"
                      name="startDate"
                      value={job.startDate}
                      onChange={(e) => handleJobChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={job.endDate}
                      onChange={(e) => handleJobChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <textarea
                    name="description"
                    placeholder="Job Description"
                    value={job.description}
                    onChange={(e) => handleJobChange(index, e)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addJobExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Job Experience
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    name="projectName"
                    placeholder="Project Name"
                    value={project.projectName}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    name="description"
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="url"
                    name="link"
                    placeholder="Project Link (optional)"
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              {educationEntries.map((edu, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="graduationYear"
                    placeholder="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Education
              </button>
            </div>
          )}

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
