import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ResumeCardProps {
  resume: {
    id: string
    jobTitle: string
    company: string
    createdAt: string
    matchScore: number
  }
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            {resume.matchScore}% Match
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download resume</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h3 className="text-base font-semibold">{resume.jobTitle}</h3>
        <p className="text-sm text-muted-foreground">{resume.company}</p>
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">Created {formatDate(resume.createdAt)}</span>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
