import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, DollarSign, Clock, ExternalLink, Check, Eye } from "lucide-react"

interface JobMatchCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    matchScore: number
    salary: string
    postedDate: string
    status: "new" | "applied" | "reviewing"
    description: string
  }
}

export default function JobMatchCard({ job }: JobMatchCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New Match</Badge>
      case "applied":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Applied
          </Badge>
        )
      case "reviewing":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Under Review
          </Badge>
        )
      default:
        return null
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              {getStatusBadge(job.status)}
            </div>
            <p className="text-muted-foreground font-medium mb-2">{job.company}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.postedDate}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
          </div>

          <div className="flex flex-col items-end gap-3 ml-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(job.matchScore)}`}>
              {job.matchScore}% Match
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              {job.status === "new" && (
                <Button size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              )}
              {job.status === "applied" && (
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Track
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
