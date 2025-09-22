"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Edit, Eye, Mail, Phone, Calendar, GraduationCap } from "lucide-react"

interface StudentRecord {
  id: string
  name: string
  rollNumber: string
  email: string
  phone: string
  dateOfBirth: string
  class: string
  enrollmentDate: string
  attendancePercentage: number
  grades: {
    subject: string
    grade: string
    marks: number
    totalMarks: number
  }[]
  status: "active" | "inactive" | "graduated"
  avatar?: string
}

const mockStudentRecords: StudentRecord[] = [
  {
    id: "1",
    name: "Alice Johnson",
    rollNumber: "CS001",
    email: "alice@example.com",
    phone: "+1234567890",
    dateOfBirth: "2000-05-15",
    class: "CS101",
    enrollmentDate: "2023-09-01",
    attendancePercentage: 95,
    grades: [
      { subject: "Mathematics", grade: "A", marks: 85, totalMarks: 100 },
      { subject: "Physics", grade: "B+", marks: 78, totalMarks: 100 },
      { subject: "Chemistry", grade: "A-", marks: 82, totalMarks: 100 },
    ],
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    rollNumber: "CS002",
    email: "bob@example.com",
    phone: "+1234567891",
    dateOfBirth: "1999-12-03",
    class: "CS101",
    enrollmentDate: "2023-09-01",
    attendancePercentage: 87,
    grades: [
      { subject: "Mathematics", grade: "B", marks: 75, totalMarks: 100 },
      { subject: "Physics", grade: "A-", marks: 82, totalMarks: 100 },
      { subject: "Chemistry", grade: "B+", marks: 78, totalMarks: 100 },
    ],
    status: "active",
  },
  {
    id: "3",
    name: "Carol Davis",
    rollNumber: "CS003",
    email: "carol@example.com",
    phone: "+1234567892",
    dateOfBirth: "2001-03-22",
    class: "CS102",
    enrollmentDate: "2023-09-01",
    attendancePercentage: 92,
    grades: [
      { subject: "Data Structures", grade: "A+", marks: 95, totalMarks: 100 },
      { subject: "Algorithms", grade: "A", marks: 88, totalMarks: 100 },
      { subject: "Database Systems", grade: "A-", marks: 83, totalMarks: 100 },
    ],
    status: "active",
  },
]

export function StudentRecords() {
  const [students, setStudents] = useState<StudentRecord[]>(mockStudentRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus

    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      graduated: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const classes = [...new Set(students.map((s) => s.class))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Students
          </CardTitle>
          <CardDescription>Find and filter student records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
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
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedClass("all")
                  setSelectedStatus("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredStudents.length}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredStudents.filter((s) => s.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                filteredStudents.reduce((acc, s) => acc + s.attendancePercentage, 0) / filteredStudents.length,
              ) || 0}
              %
            </div>
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {filteredStudents.filter((s) => s.attendancePercentage >= 90).length}
            </div>
            <p className="text-sm text-muted-foreground">High Performers</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Records
          </CardTitle>
          <CardDescription>Manage and view detailed student information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Roll: {student.rollNumber} • Class: {student.class}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.attendancePercentage}%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Recent Grades:</p>
                          <div className="flex gap-2 mt-1">
                            {student.grades.slice(0, 3).map((grade, index) => (
                              <Badge key={index} variant="outline" className={getGradeColor(grade.grade)}>
                                {grade.subject}: {grade.grade}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Modal/Card */}
      {selectedStudent && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Student Details: {selectedStudent.name}
              </CardTitle>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>DOB: {selectedStudent.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <p>Enrollment: {selectedStudent.enrollmentDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Academic Performance</h4>
                <div className="space-y-2">
                  {selectedStudent.grades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{grade.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {grade.marks}/{grade.totalMarks}
                        </span>
                        <Badge variant="outline" className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
