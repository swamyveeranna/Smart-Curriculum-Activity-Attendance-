"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, Download, Eye, Search, Filter, BarChart3 } from "lucide-react"

interface AttendanceRecord {
  id: string
  studentName: string
  rollNumber: string
  date: string
  subject: string
  status: "present" | "absent" | "late"
  class: string
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    rollNumber: "CS001",
    date: "2024-01-15",
    subject: "Mathematics",
    status: "present",
    class: "CS101",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    rollNumber: "CS002",
    date: "2024-01-15",
    subject: "Mathematics",
    status: "absent",
    class: "CS101",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    rollNumber: "CS003",
    date: "2024-01-15",
    subject: "Mathematics",
    status: "late",
    class: "CS101",
  },
  {
    id: "4",
    studentName: "Alice Johnson",
    rollNumber: "CS001",
    date: "2024-01-14",
    subject: "Physics",
    status: "present",
    class: "CS101",
  },
  {
    id: "5",
    studentName: "Bob Smith",
    rollNumber: "CS002",
    date: "2024-01-14",
    subject: "Physics",
    status: "present",
    class: "CS101",
  },
]

export function AttendanceRecords() {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords)
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || record.class === selectedClass
    const matchesSubject = selectedSubject === "all" || record.subject === selectedSubject
    const matchesDate = !selectedDate || record.date === selectedDate

    return matchesSearch && matchesClass && matchesSubject && matchesDate
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      absent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  const getAttendanceStats = () => {
    const total = filteredRecords.length
    const present = filteredRecords.filter((r) => r.status === "present").length
    const absent = filteredRecords.filter((r) => r.status === "absent").length
    const late = filteredRecords.filter((r) => r.status === "late").length
    const percentage = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0

    return { total, present, absent, late, percentage }
  }

  const stats = getAttendanceStats()
  const classes = [...new Set(records.map((r) => r.class))]
  const subjects = [...new Set(records.map((r) => r.subject))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Records
          </CardTitle>
          <CardDescription>Filter attendance records by various criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedClass("all")
                  setSelectedSubject("all")
                  setSelectedDate("")
                  setSearchTerm("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <p className="text-sm text-muted-foreground">Late</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.percentage}%</div>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Attendance Records
              </CardTitle>
              <CardDescription>View and manage student attendance records</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{record.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.rollNumber} • {record.class}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <Badge className={getStatusBadge(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No attendance records found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
