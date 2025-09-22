"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, Eye, FileText, Video, Link } from "lucide-react"

interface LessonPlan {
  id: string
  title: string
  subject: string
  chapter: string
  date: string
  instructor: string
  objectives: string[]
  materials: Array<{
    type: "pdf" | "video" | "link" | "document"
    title: string
    url: string
  }>
  importantQuestions: string[]
}

const mockLessonPlans: LessonPlan[] = [
  {
    id: "1",
    title: "Integration by Parts",
    subject: "Mathematics",
    chapter: "Chapter 7: Integration Techniques",
    date: "2024-01-15",
    instructor: "Dr. Smith",
    objectives: [
      "Understand the integration by parts formula",
      "Apply the technique to solve complex integrals",
      "Identify when to use integration by parts",
    ],
    materials: [
      { type: "pdf", title: "Lesson Notes", url: "/materials/integration-notes.pdf" },
      { type: "video", title: "Video Lecture", url: "/materials/integration-video.mp4" },
      { type: "link", title: "Practice Problems", url: "https://example.com/practice" },
    ],
    importantQuestions: [
      "What is the integration by parts formula?",
      "When should you use integration by parts vs substitution?",
      "How do you choose u and dv in the formula?",
    ],
  },
  {
    id: "2",
    title: "Wave Properties and Interference",
    subject: "Physics",
    chapter: "Chapter 12: Wave Motion",
    date: "2024-01-14",
    instructor: "Prof. Johnson",
    objectives: [
      "Understand wave properties: amplitude, frequency, wavelength",
      "Analyze wave interference patterns",
      "Calculate wave speeds and frequencies",
    ],
    materials: [
      { type: "pdf", title: "Wave Theory Notes", url: "/materials/wave-notes.pdf" },
      { type: "video", title: "Wave Simulation", url: "/materials/wave-sim.mp4" },
      { type: "document", title: "Lab Manual", url: "/materials/wave-lab.docx" },
    ],
    importantQuestions: [
      "What determines the speed of a wave?",
      "How do constructive and destructive interference occur?",
      "What is the relationship between frequency and wavelength?",
    ],
  },
]

export function LessonPlans() {
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "link":
        return <Link className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Lesson Plans</h3>
        <Badge variant="outline">{mockLessonPlans.length} lessons</Badge>
      </div>

      <div className="space-y-6">
        {mockLessonPlans.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>
                    {lesson.subject} • {lesson.chapter} • {lesson.date}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">Instructor: {lesson.instructor}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Learning Objectives</h4>
                <ul className="space-y-1">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Study Materials</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {lesson.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {getMaterialIcon(material.type)}
                        <span className="text-sm">{material.title}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Important Questions</h4>
                <div className="space-y-2">
                  {lesson.importantQuestions.map((question, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-sm">
                      <span className="font-medium text-primary">Q{index + 1}:</span> {question}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm">View Full Plan</Button>
                <Button size="sm" variant="outline">
                  Download All Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
