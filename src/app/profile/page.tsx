"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PersonalInfo {
  fullName: string;
  email: string;
  location: string;
}

interface Skill {
  skillName: string;
  years: string;
  demonstration: string;
}

interface JobExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  projectName: string;
  description: string;
  link: string;
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
}

// Combined profile interface
interface UserProfile {
  personalInfo: PersonalInfo;
  skills: Skill[];
  jobExperiences: JobExperience[];
  projects: Project[];
  educationEntries: Education[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "unauthenticated") {
    return null;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    location: "",
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educationEntries, setEducationEntries] = useState<Education[]>([]);

  // On mount, load stored profile (if any)
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const parsed: UserProfile = JSON.parse(storedProfile);
      setProfile(parsed);
      // Pre-fill each section’s state
      setPersonalInfo(parsed.personalInfo);
      setSkills(parsed.skills);
      setJobExperiences(parsed.jobExperiences);
      setProjects(parsed.projects);
      setEducationEntries(parsed.educationEntries);
      setIsEditing(false);
    } else {
      // No stored profile – start editing
      setIsEditing(true);
    }
  }, []);

  // Handlers for the personal information fields
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Handler functions for dynamic fields (skills, job experiences, projects, education)
  const handleSkillChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [e.target.name]: e.target.value };
    setSkills(newSkills);
  };

  const handleJobChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newJobs = [...jobExperiences];
    newJobs[index] = { ...newJobs[index], [e.target.name]: e.target.value };
    setJobExperiences(newJobs);
  };

  const handleProjectChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [e.target.name]: e.target.value,
    };
    setProjects(newProjects);
  };

  const handleEducationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newEducations = [...educationEntries];
    newEducations[index] = {
      ...newEducations[index],
      [e.target.name]: e.target.value,
    };
    setEducationEntries(newEducations);
  };

  // Functions to add new empty entries for sections
  const addSkill = () => {
    setSkills([...skills, { skillName: "", years: "", demonstration: "" }]);
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

  const addProject = () => {
    setProjects([...projects, { projectName: "", description: "", link: "" }]);
  };

  const addEducation = () => {
    setEducationEntries([
      ...educationEntries,
      { degree: "", institution: "", graduationYear: "" },
    ]);
  };

  // Handle form submission – save profile data to localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData: UserProfile = {
      personalInfo,
      skills,
      jobExperiences,
      projects,
      educationEntries,
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setProfile(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        {isEditing ? (
          // EDIT MODE: Show the multi‑section Q&A style form
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Personal Information
              </h2>
              <p className="text-gray-600 mb-4">
                Please provide your basic details.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block font-medium mb-1">
                    What is your full name?
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium mb-1">
                    What is your email address?
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block font-medium mb-1">
                    Where are you located?
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handlePersonalChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="City, State, Country"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              <p className="text-gray-600 mb-4">
                For each skill, please list your years of experience and
                describe a time you used this skill in a work or project
                setting.
              </p>
              {skills.map((skill, index) => (
                <div key={index} className="mb-6 border p-4 rounded">
                  <div className="mb-3">
                    <label
                      htmlFor={`skillName-${index}`}
                      className="block font-medium mb-1"
                    >
                      What is the name of the skill?
                    </label>
                    <input
                      type="text"
                      id={`skillName-${index}`}
                      name="skillName"
                      value={skill.skillName}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. JavaScript"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`years-${index}`}
                      className="block font-medium mb-1"
                    >
                      How many years of experience do you have with this skill?
                    </label>
                    <input
                      type="text"
                      id={`years-${index}`}
                      name="years"
                      value={skill.years}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. 3 years"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`demonstration-${index}`}
                      className="block font-medium mb-1"
                    >
                      Can you describe a time when you applied this skill
                      effectively?
                    </label>
                    <textarea
                      id={`demonstration-${index}`}
                      name="demonstration"
                      value={skill.demonstration}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe an experience where this skill made an impact..."
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Skill
              </button>
            </section>

            {/* Job Experience Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Job Experience</h2>
              <p className="text-gray-600 mb-4">
                Please enter your job experiences. For each job, provide your
                title, company, duration, and a brief description of your
                responsibilities or achievements.
              </p>
              {jobExperiences.map((job, index) => (
                <div key={index} className="mb-6 border p-4 rounded">
                  <div className="mb-3">
                    <label
                      htmlFor={`jobTitle-${index}`}
                      className="block font-medium mb-1"
                    >
                      What was your job title?
                    </label>
                    <input
                      type="text"
                      id={`jobTitle-${index}`}
                      name="jobTitle"
                      value={job.jobTitle}
                      onChange={(e) => handleJobChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. Software Engineer"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`company-${index}`}
                      className="block font-medium mb-1"
                    >
                      Which company did you work for?
                    </label>
                    <input
                      type="text"
                      id={`company-${index}`}
                      name="company"
                      value={job.company}
                      onChange={(e) => handleJobChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. Google"
                      required
                    />
                  </div>
                  <div className="mb-3 flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1 mb-3 md:mb-0">
                      <label
                        htmlFor={`startDate-${index}`}
                        className="block font-medium mb-1"
                      >
                        When did you start?
                      </label>
                      <input
                        type="date"
                        id={`startDate-${index}`}
                        name="startDate"
                        value={job.startDate}
                        onChange={(e) => handleJobChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`endDate-${index}`}
                        className="block font-medium mb-1"
                      >
                        When did you finish? (Leave blank if current)
                      </label>
                      <input
                        type="date"
                        id={`endDate-${index}`}
                        name="endDate"
                        value={job.endDate}
                        onChange={(e) => handleJobChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={`description-${index}`}
                      className="block font-medium mb-1"
                    >
                      Can you describe your role and achievements in this
                      position?
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={job.description}
                      onChange={(e) => handleJobChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe your responsibilities, accomplishments, and skills used..."
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addJobExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Job Experience
              </button>
            </section>

            {/* Projects Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Projects</h2>
              <p className="text-gray-600 mb-4">
                Please list your projects. For each project, include its name, a
                brief description, and a link (if available).
              </p>
              {projects.map((project, index) => (
                <div key={index} className="mb-6 border p-4 rounded">
                  <div className="mb-3">
                    <label
                      htmlFor={`projectName-${index}`}
                      className="block font-medium mb-1"
                    >
                      What is the name of the project?
                    </label>
                    <input
                      type="text"
                      id={`projectName-${index}`}
                      name="projectName"
                      value={project.projectName}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. Portfolio Website"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`description-${index}`}
                      className="block font-medium mb-1"
                    >
                      Please describe the project.
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe the goals, challenges, and your contributions..."
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`link-${index}`}
                      className="block font-medium mb-1"
                    >
                      Do you have a link to the project? (optional)
                    </label>
                    <input
                      type="url"
                      id={`link-${index}`}
                      name="link"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Project
              </button>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Education</h2>
              <p className="text-gray-600 mb-4">
                Please list your educational background. Include your degree,
                the institution you attended, and your graduation year.
              </p>
              {educationEntries.map((edu, index) => (
                <div key={index} className="mb-6 border p-4 rounded">
                  <div className="mb-3">
                    <label
                      htmlFor={`degree-${index}`}
                      className="block font-medium mb-1"
                    >
                      What degree did you earn?
                    </label>
                    <input
                      type="text"
                      id={`degree-${index}`}
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. B.Sc. in Computer Science"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`institution-${index}`}
                      className="block font-medium mb-1"
                    >
                      Which institution did you attend?
                    </label>
                    <input
                      type="text"
                      id={`institution-${index}`}
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. University of XYZ"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`graduationYear-${index}`}
                      className="block font-medium mb-1"
                    >
                      What was your graduation year?
                    </label>
                    <input
                      type="text"
                      id={`graduationYear-${index}`}
                      name="graduationYear"
                      value={edu.graduationYear}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. 2022"
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Education
              </button>
            </section>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Save Profile
              </button>
            </div>
          </form>
        ) : (
          // DISPLAY MODE: Show the resume-like profile details
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Personal Information
              </h2>
              <p>
                <strong>Full Name:</strong> {personalInfo.fullName}
              </p>
              <p>
                <strong>Email:</strong> {personalInfo.email}
              </p>
              <p>
                <strong>Location:</strong> {personalInfo.location}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>{skill.skillName}</strong> – {skill.years} of
                      experience
                    </p>
                    <p className="ml-4 text-gray-700">{skill.demonstration}</p>
                  </div>
                ))
              ) : (
                <p>No skills provided.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Job Experience</h2>
              {jobExperiences.length > 0 ? (
                jobExperiences.map((job, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>{job.jobTitle}</strong> at {job.company}
                    </p>
                    <p>
                      <strong>Duration:</strong> {job.startDate} -{" "}
                      {job.endDate || "Present"}
                    </p>
                    <p className="ml-4 text-gray-700">{job.description}</p>
                  </div>
                ))
              ) : (
                <p>No job experiences provided.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Projects</h2>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>{project.projectName}</strong>
                    </p>
                    <p className="ml-4 text-gray-700">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Project Link
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p>No projects provided.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Education</h2>
              {educationEntries.length > 0 ? (
                educationEntries.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>{edu.degree}</strong> from {edu.institution} (
                      {edu.graduationYear})
                    </p>
                  </div>
                ))
              ) : (
                <p>No education provided.</p>
              )}
            </section>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
