import { Upload } from "lucide-react"
import ResumeCard from "@/components/resume-card"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
  // Sample resume data
  const resumes = [
    {
      id: "1",
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Inc.",
      createdAt: "2025-05-28T10:30:00Z",
      matchScore: 85,
    },
    {
      id: "2",
      jobTitle: "UX Designer",
      company: "Creative Agency",
      createdAt: "2025-05-25T14:15:00Z",
      matchScore: 92,
    },
    {
      id: "3",
      jobTitle: "Product Manager",
      company: "Startup Hub",
      createdAt: "2025-05-20T09:45:00Z",
      matchScore: 78,
    },
    {
      id: "4",
      jobTitle: "Full Stack Engineer",
      company: "Global Systems",
      createdAt: "2025-05-15T16:20:00Z",
      matchScore: 88,
    },
  ]

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 space-y-8 p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, Alex</h1>
                <p className="text-muted-foreground">
                  Upload your resume to generate tailored versions for job applications.
                </p>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Resumes</CardTitle>
                <div className="text-sm text-muted-foreground">4 resumes</div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Upload className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Resume uploaded</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <Upload className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Resume generated for "Data Scientist"</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Add more specific technical skills to improve matches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Quantify your achievements with metrics and results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Include relevant certifications and education details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Update your profile with recent projects</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
