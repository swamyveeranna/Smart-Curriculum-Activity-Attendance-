"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

interface AttendanceRecord {
  date: string
  status: "present" | "absent" | "late"
  subject: string
  time: string
}

const mockAttendanceData: AttendanceRecord[] = [
  { date: "2024-01-15", status: "present", subject: "Mathematics", time: "09:00 AM" },
  { date: "2024-01-15", status: "present", subject: "Physics", time: "10:30 AM" },
  { date: "2024-01-15", status: "late", subject: "Chemistry", time: "12:00 PM" },
  { date: "2024-01-14", status: "present", subject: "Mathematics", time: "09:00 AM" },
  { date: "2024-01-14", status: "absent", subject: "Physics", time: "10:30 AM" },
  { date: "2024-01-14", status: "present", subject: "Chemistry", time: "12:00 PM" },
]

export function AttendanceView() {
  const totalClasses = mockAttendanceData.length
  const presentCount = mockAttendanceData.filter((record) => record.status === "present").length
  const lateCount = mockAttendanceData.filter((record) => record.status === "late").length
  const attendancePercentage = Math.round(((presentCount + lateCount * 0.5) / totalClasses) * 100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      absent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentCount + lateCount}</div>
            <p className="text-xs text-muted-foreground">Out of {totalClasses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockAttendanceData.filter((record) => record.status === "absent").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance History
          </CardTitle>
          <CardDescription>Your recent attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAttendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.date} at {record.time}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusBadge(record.status)}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
