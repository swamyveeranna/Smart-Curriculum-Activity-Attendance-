"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Save, AlertTriangle } from "lucide-react"

interface AttendanceRecord {
  id: string
  studentName: string
  rollNumber: string
  date: string
  subject: string
  status: "present" | "absent" | "late"
  class: string
  teacher: string
  modifiedBy?: string
  modifiedAt?: string
  originalStatus?: "present" | "absent" | "late"
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
    teacher: "Dr. Smith",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    rollNumber: "CS002",
    date: "2024-01-15",
    subject: "Mathematics",
    status: "absent",
    class: "CS101",
    teacher: "Dr. Smith",
    modifiedBy: "Admin",
    modifiedAt: "2024-01-15 14:30",
    originalStatus: "present",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    rollNumber: "CS003",
    date: "2024-01-15",
    subject: "Mathematics",
    status: "late",
    class: "CS101",
    teacher: "Dr. Smith",
  },
  {
    id: "4",
    studentName: "David Wilson",
    rollNumber: "CS004",
    date: "2024-01-14",
    subject: "Physics",
    status: "present",
    class: "CS101",
    teacher: "Prof. Johnson",
  },
]

export function AttendanceControl() {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")
  const [editingRecord, setEditingRecord] = useState<string | null>(null)
  const [pendingChanges, setPendingChanges] = useState<Record<string, AttendanceRecord>>({})

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

  const updateRecordStatus = (recordId: string, newStatus: "present" | "absent" | "late") => {
    const record = records.find((r) => r.id === recordId)
    if (record) {
      const updatedRecord = {
        ...record,
        status: newStatus,
        modifiedBy: "Admin",
        modifiedAt: new Date().toLocaleString(),
        originalStatus: record.originalStatus || record.status,
      }
      setPendingChanges((prev) => ({ ...prev, [recordId]: updatedRecord }))
    }
  }

  const saveChanges = () => {
    setRecords((prev) => prev.map((record) => pendingChanges[record.id] || record))
    setPendingChanges({})
    setEditingRecord(null)
  }

  const cancelChanges = () => {
    setPendingChanges({})
    setEditingRecord(null)
  }

  const getAttendanceStats = () => {
    const total = filteredRecords.length
    const present = filteredRecords.filter((r) => r.status === "present").length
    const absent = filteredRecords.filter((r) => r.status === "absent").length
    const late = filteredRecords.filter((r) => r.status === "late").length
    const modified = filteredRecords.filter((r) => r.modifiedBy).length

    return { total, present, absent, late, modified }
  }

  const stats = getAttendanceStats()
  const classes = [...new Set(records.map((r) => r.class))]
  const subjects = [...new Set(records.map((r) => r.subject))]
  const hasPendingChanges = Object.keys(pendingChanges).length > 0

  return (
    <div className="space-y-6">
      {/* Alert for pending changes */}
      {hasPendingChanges && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">You have {Object.keys(pendingChanges).length} unsaved changes</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={cancelChanges}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveChanges}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            <div className="text-2xl font-bold text-blue-600">{stats.modified}</div>
            <p className="text-sm text-muted-foreground">Modified</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filter Attendance Records
          </CardTitle>
          <CardDescription>Search and filter attendance records to modify</CardDescription>
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
                  setSearchTerm("")
                  setSelectedClass("all")
                  setSelectedSubject("all")
                  setSelectedDate("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Records ({filteredRecords.length})
          </CardTitle>
          <CardDescription>Modify attendance records with administrative privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const pendingRecord = pendingChanges[record.id]
              const displayRecord = pendingRecord || record
              const hasChanges = !!pendingRecord

              return (
                <Card
                  key={record.id}
                  className={`hover:shadow-md transition-shadow ${hasChanges ? "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{record.studentName}</h3>
                          {hasChanges && (
                            <Badge variant="outline" className="text-yellow-600">
                              Modified
                            </Badge>
                          )}
                          {record.modifiedBy && !hasChanges && (
                            <Badge variant="outline" className="text-blue-600">
                              Previously Modified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Roll: {record.rollNumber} • Class: {record.class}
                          </p>
                          <p>
                            Subject: {record.subject} • Date: {record.date}
                          </p>
                          <p>Teacher: {record.teacher}</p>
                          {record.modifiedBy && (
                            <p className="text-blue-600">
                              Modified by {record.modifiedBy} at {record.modifiedAt}
                              {record.originalStatus && ` (was ${record.originalStatus})`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(displayRecord.status)}>
                          {displayRecord.status.charAt(0).toUpperCase() + displayRecord.status.slice(1)}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant={displayRecord.status === "present" ? "default" : "outline"}
                            onClick={() => updateRecordStatus(record.id, "present")}
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={displayRecord.status === "late" ? "default" : "outline"}
                            onClick={() => updateRecordStatus(record.id, "late")}
                          >
                            Late
                          </Button>
                          <Button
                            size="sm"
                            variant={displayRecord.status === "absent" ? "destructive" : "outline"}
                            onClick={() => updateRecordStatus(record.id, "absent")}
                          >
                            Absent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
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
