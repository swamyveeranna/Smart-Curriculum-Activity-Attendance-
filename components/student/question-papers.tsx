"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Search, Filter } from "lucide-react"
import { useState } from "react"

interface QuestionPaper {
  id: string
  title: string
  subject: string
  year: string
  semester: string
  examType: "midterm" | "final" | "quiz" | "assignment"
  duration: string
  marks: number
  downloadUrl: string
  previewUrl: string
}

const mockQuestionPapers: QuestionPaper[] = [
  {
    id: "1",
    title: "Calculus and Analytical Geometry",
    subject: "Mathematics",
    year: "2023",
    semester: "Fall",
    examType: "final",
    duration: "3 hours",
    marks: 100,
    downloadUrl: "/papers/math-2023-final.pdf",
    previewUrl: "/papers/math-2023-final-preview.pdf",
  },
  {
    id: "2",
    title: "Mechanics and Thermodynamics",
    subject: "Physics",
    year: "2023",
    semester: "Fall",
    examType: "midterm",
    duration: "2 hours",
    marks: 75,
    downloadUrl: "/papers/physics-2023-midterm.pdf",
    previewUrl: "/papers/physics-2023-midterm-preview.pdf",
  },
  {
    id: "3",
    title: "Organic Chemistry Fundamentals",
    subject: "Chemistry",
    year: "2023",
    semester: "Spring",
    examType: "final",
    duration: "3 hours",
    marks: 100,
    downloadUrl: "/papers/chemistry-2023-final.pdf",
    previewUrl: "/papers/chemistry-2023-final-preview.pdf",
  },
  {
    id: "4",
    title: "Advanced Calculus",
    subject: "Mathematics",
    year: "2022",
    semester: "Fall",
    examType: "final",
    duration: "3 hours",
    marks: 100,
    downloadUrl: "/papers/math-2022-final.pdf",
    previewUrl: "/papers/math-2022-final-preview.pdf",
  },
]

export function QuestionPapers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedExamType, setSelectedExamType] = useState("all")

  const filteredPapers = mockQuestionPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject
    const matchesYear = selectedYear === "all" || paper.year === selectedYear
    const matchesExamType = selectedExamType === "all" || paper.examType === selectedExamType

    return matchesSearch && matchesSubject && matchesYear && matchesExamType
  })

  const getExamTypeBadge = (type: string) => {
    const variants = {
      final: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      midterm: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      quiz: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      assignment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    }
    return variants[type as keyof typeof variants] || ""
  }

  const subjects = [...new Set(mockQuestionPapers.map((paper) => paper.subject))]
  const years = [...new Set(mockQuestionPapers.map((paper) => paper.year))].sort((a, b) => b.localeCompare(a))
  const examTypes = [...new Set(mockQuestionPapers.map((paper) => paper.examType))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Previous Year Question Papers</h3>
        <Badge variant="outline">{filteredPapers.length} papers found</Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Exam Type</label>
              <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {examTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Papers List */}
      <div className="grid gap-4">
        {filteredPapers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {paper.title}
                  </CardTitle>
                  <CardDescription>
                    {paper.subject} • {paper.year} {paper.semester}
                  </CardDescription>
                </div>
                <Badge className={getExamTypeBadge(paper.examType)}>
                  {paper.examType.charAt(0).toUpperCase() + paper.examType.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Duration: {paper.duration}</p>
                  <p>Total Marks: {paper.marks}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No question papers found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
