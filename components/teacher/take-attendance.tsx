"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Users, Search, Save, Clock, Calendar } from "lucide-react"

interface Student {
  id: string
  name: string
  rollNumber: string
  email: string
  status: "present" | "absent" | "late" | null
}

const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", rollNumber: "CS001", email: "alice@example.com", status: null },
  { id: "2", name: "Bob Smith", rollNumber: "CS002", email: "bob@example.com", status: null },
  { id: "3", name: "Carol Davis", rollNumber: "CS003", email: "carol@example.com", status: null },
  { id: "4", name: "David Wilson", rollNumber: "CS004", email: "david@example.com", status: null },
  { id: "5", name: "Eva Brown", rollNumber: "CS005", email: "eva@example.com", status: null },
  { id: "6", name: "Frank Miller", rollNumber: "CS006", email: "frank@example.com", status: null },
  { id: "7", name: "Grace Taylor", rollNumber: "CS007", email: "grace@example.com", status: null },
  { id: "8", name: "Henry Anderson", rollNumber: "CS008", email: "henry@example.com", status: null },
]

export function TakeAttendance() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedClass, setSelectedClass] = useState("CS101")
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateStudentStatus = (studentId: string, status: "present" | "absent" | "late") => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "present" })))
  }

  const markAllAbsent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "absent" })))
  }

  const saveAttendance = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    // Show success message or redirect
  }

  const getStatusCount = (status: "present" | "absent" | "late") => {
    return students.filter((student) => student.status === status).length
  }

  const getStatusBadge = (status: string | null) => {
    if (!status) return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    const variants = {
      present: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      absent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  return (
    <div className="space-y-6">
      {/* Class and Subject Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Session
          </CardTitle>
          <CardDescription>Select class and subject for today's attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">CS101 - Computer Science</SelectItem>
                  <SelectItem value="CS102">CS102 - Data Structures</SelectItem>
                  <SelectItem value="CS103">CS103 - Algorithms</SelectItem>
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
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Today: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{getStatusCount("present")}</div>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{getStatusCount("absent")}</div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{getStatusCount("late")}</div>
            <p className="text-sm text-muted-foreground">Late</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Attendance
              </CardTitle>
              <CardDescription>Mark attendance for each student</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllPresent} size="sm">
                Mark All Present
              </Button>
              <Button variant="outline" onClick={markAllAbsent} size="sm">
                Mark All Absent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Student List */}
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Roll: {student.rollNumber} • {student.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadge(student.status)}>
                    {student.status ? student.status.charAt(0).toUpperCase() + student.status.slice(1) : "Not Marked"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={student.status === "present" ? "default" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "present")}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "late" ? "default" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "late")}
                    >
                      Late
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "absent" ? "destructive" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "absent")}
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={saveAttendance} disabled={isSaving} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
