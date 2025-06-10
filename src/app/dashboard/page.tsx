import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import JobMatchCard from "@/components/job-match-card"
import { Eye, Settings, TrendingUp, Upload } from "lucide-react"

export default function Dashboard() {
  // Sample job matches data
  const jobMatches = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      matchScore: 94,
      salary: "$120k - $160k",
      postedDate: "2 days ago",
      status: "new",
      description: "React, TypeScript, Node.js experience required...",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      matchScore: 89,
      salary: "$100k - $140k",
      postedDate: "1 day ago",
      status: "applied",
      description: "Looking for a versatile engineer with React and Python...",
    },
    {
      id: "3",
      title: "React Developer",
      company: "Digital Agency",
      location: "New York, NY",
      matchScore: 87,
      salary: "$90k - $120k",
      postedDate: "3 days ago",
      status: "new",
      description: "Frontend specialist needed for client projects...",
    },
    {
      id: "4",
      title: "Software Engineer",
      company: "Enterprise Corp",
      location: "Austin, TX",
      matchScore: 82,
      salary: "$110k - $150k",
      postedDate: "1 week ago",
      status: "reviewing",
      description: "Join our engineering team building scalable solutions...",
    },
  ]

  const profileStats = {
    profileCompleteness: 85,
    totalMatches: 47,
    applicationsThisWeek: 12,
    responseRate: 23,
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 space-y-8 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, Alex</h1>
                <p className="text-muted-foreground">
                  You have {jobMatches.filter((job) => job.status === "new").length} new job matches waiting for review.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Update Resume
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Strength</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileStats.profileCompleteness}%</div>
                  <Progress value={profileStats.profileCompleteness} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">Add skills to improve matching</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileStats.totalMatches}</div>
                  <p className="text-xs text-muted-foreground">+12 new this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileStats.applicationsThisWeek}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileStats.responseRate}%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Job Matches */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Job Matches</CardTitle>
                  <CardDescription>Jobs that match your profile, ranked by compatibility</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{jobMatches.filter((job) => job.status === "new").length} New</Badge>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobMatches.map((job) => (
                    <JobMatchCard key={job.id} job={job} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Insights */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Review pending applications</p>
                      <p className="text-sm text-muted-foreground">3 applications need your approval</p>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Update job preferences</p>
                      <p className="text-sm text-muted-foreground">Refine your matching criteria</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Upgrade to Premium</p>
                      <p className="text-sm text-muted-foreground">Get AI-tailored resumes</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Upgrade
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">Strong match for React roles</p>
                        <p className="text-sm text-muted-foreground">Your React experience is highly valued</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500" />
                      <div>
                        <p className="font-medium">Add cloud certifications</p>
                        <p className="text-sm text-muted-foreground">AWS/Azure skills could increase matches by 15%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-medium">Consider remote opportunities</p>
                        <p className="text-sm text-muted-foreground">Remote roles have 40% higher match rates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
