"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, Download, Calendar, Users, GraduationCap, TrendingUp, FileText, PieChart } from "lucide-react"

interface ReportData {
  id: string
  title: string
  type: "attendance" | "academic" | "user" | "system"
  description: string
  generatedAt: string
  period: string
  status: "ready" | "generating" | "failed"
  downloadUrl?: string
}

const mockReports: ReportData[] = [
  {
    id: "1",
    title: "Monthly Attendance Report",
    type: "attendance",
    description: "Comprehensive attendance analysis for January 2024",
    generatedAt: "2024-01-15 10:30",
    period: "January 2024",
    status: "ready",
    downloadUrl: "/reports/attendance-jan-2024.pdf",
  },
  {
    id: "2",
    title: "Academic Performance Summary",
    type: "academic",
    description: "Student grades and performance metrics",
    generatedAt: "2024-01-14 15:45",
    period: "Fall Semester 2023",
    status: "ready",
    downloadUrl: "/reports/academic-fall-2023.pdf",
  },
  {
    id: "3",
    title: "User Activity Report",
    type: "user",
    description: "System usage and user engagement statistics",
    generatedAt: "2024-01-13 09:15",
    period: "December 2023",
    status: "ready",
    downloadUrl: "/reports/user-activity-dec-2023.pdf",
  },
  {
    id: "4",
    title: "System Health Report",
    type: "system",
    description: "System performance and health metrics",
    generatedAt: "2024-01-15 08:00",
    period: "Weekly",
    status: "generating",
  },
]

export function SystemReports() {
  const [reports, setReports] = useState<ReportData[]>(mockReports)
  const [selectedType, setSelectedType] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)
  const [newReportType, setNewReportType] = useState("attendance")
  const [reportPeriod, setReportPeriod] = useState("")

  const filteredReports = reports.filter((report) => {
    return selectedType === "all" || report.type === selectedType
  })

  const getTypeBadge = (type: string) => {
    const variants = {
      attendance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      academic: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      user: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      system: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return variants[type as keyof typeof variants] || ""
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      ready: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      generating: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <Calendar className="h-4 w-4" />
      case "academic":
        return <GraduationCap className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "system":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const generateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newReport: ReportData = {
      id: Date.now().toString(),
      title: `${newReportType.charAt(0).toUpperCase() + newReportType.slice(1)} Report`,
      type: newReportType as ReportData["type"],
      description: `Generated ${newReportType} report for ${reportPeriod}`,
      generatedAt: new Date().toLocaleString(),
      period: reportPeriod,
      status: "ready",
      downloadUrl: `/reports/${newReportType}-${Date.now()}.pdf`,
    }

    setReports((prev) => [newReport, ...prev])
    setIsGenerating(false)
    setReportPeriod("")
  }

  const getReportStats = () => {
    const total = reports.length
    const ready = reports.filter((r) => r.status === "ready").length
    const generating = reports.filter((r) => r.status === "generating").length
    const thisMonth = reports.filter((r) => r.generatedAt.includes("2024-01")).length

    return { total, ready, generating, thisMonth }
  }

  const stats = getReportStats()

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
            <p className="text-sm text-muted-foreground">Ready to Download</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.generating}</div>
            <p className="text-sm text-muted-foreground">Generating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Generate New Report
          </CardTitle>
          <CardDescription>Create custom reports for analysis and compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={newReportType} onValueChange={setNewReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="academic">Academic Performance</SelectItem>
                  <SelectItem value="user">User Activity</SelectItem>
                  <SelectItem value="system">System Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                placeholder="e.g., January 2024, Fall Semester"
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={generateReport} disabled={isGenerating || !reportPeriod} className="w-full">
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold">Daily Attendance</h3>
            <p className="text-sm text-muted-foreground">Today's attendance summary</p>
            <Button size="sm" className="mt-2 w-full">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold">Performance Trends</h3>
            <p className="text-sm text-muted-foreground">Academic performance analysis</p>
            <Button size="sm" className="mt-2 w-full">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold">User Engagement</h3>
            <p className="text-sm text-muted-foreground">System usage statistics</p>
            <Button size="sm" className="mt-2 w-full">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold">System Overview</h3>
            <p className="text-sm text-muted-foreground">Comprehensive system report</p>
            <Button size="sm" className="mt-2 w-full">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generated Reports
              </CardTitle>
              <CardDescription>View and download previously generated reports</CardDescription>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="user">User Activity</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(report.type)}
                      <div className="space-y-1">
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Generated: {report.generatedAt}</span>
                          <span>•</span>
                          <span>Period: {report.period}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeBadge(report.type)}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </Badge>
                      <Badge className={getStatusBadge(report.status)}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                      {report.status === "ready" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reports found for the selected type.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
