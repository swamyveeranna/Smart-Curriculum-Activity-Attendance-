"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, Shield } from "lucide-react"
import { AttendanceView } from "@/components/student/attendance-view"
import { AttendanceMarker } from "@/components/student/attendance-marker"
import { CurriculumActivities } from "@/components/student/curriculum-activities"
import { LessonPlans } from "@/components/student/lesson-plans"
import { QuestionPapers } from "@/components/student/question-papers"
import { HolidayCalendar } from "@/components/student/holiday-calendar"
import { TakeAttendance } from "@/components/teacher/take-attendance"
import { AttendanceRecords } from "@/components/teacher/attendance-records"
import { AddActivity } from "@/components/teacher/add-activity"
import { StudentRecords } from "@/components/teacher/student-records"
import { UserManagement } from "@/components/admin/user-management"
import { AttendanceControl } from "@/components/admin/attendance-control"
import { SystemReports } from "@/components/admin/system-reports"

type UserRole = "student" | "teacher" | "admin"

interface LoginFormProps {
  role: UserRole
  onLogin: (credentials: { username: string; password: string; role: UserRole }) => void
}

function LoginForm({ role, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ username, password, role })
  }

  const roleConfig = {
    student: { icon: GraduationCap, title: "Student Portal", color: "text-blue-600" },
    teacher: { icon: Users, title: "Teacher Portal", color: "text-green-600" },
    admin: { icon: Shield, title: "Admin Portal", color: "text-red-600" },
  }

  const { icon: Icon, title, color } = roleConfig[role]

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ username: string; role: UserRole } | null>(null)

  const handleLogin = (credentials: { username: string; password: string; role: UserRole }) => {
    // Mock authentication - in real app, this would validate against database
    setCurrentUser({ username: credentials.username, role: credentials.role })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">EduManage</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {currentUser.username} ({currentUser.role})
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-6">
          {currentUser.role === "student" && <StudentDashboard />}
          {currentUser.role === "teacher" && <TeacherDashboard />}
          {currentUser.role === "admin" && <AdminDashboard />}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">EduManage</h1>
          </div>
          <p className="text-xl text-muted-foreground">Comprehensive Curriculum Management System</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <Label htmlFor="role-select" className="text-lg font-medium">
              Select Your Role
            </Label>
            <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
              <SelectTrigger className="w-full max-w-xs mx-auto mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <LoginForm role={selectedRole} onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance-view", label: "View Attendance" },
    { id: "attendance-mark", label: "Mark Attendance" },
    { id: "activities", label: "Activities" },
    { id: "lessons", label: "Lesson Plans" },
    { id: "papers", label: "Question Papers" },
    { id: "holidays", label: "Holidays" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Student Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance</CardTitle>
                <CardDescription>View your attendance record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">95%</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>QR Code or Face Recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveTab("attendance-mark")}>
                  Mark Present
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Curriculum Activities</CardTitle>
                <CardDescription>Today's activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">3 activities scheduled</p>
                <Button
                  variant="outline"
                  className="w-full mt-2 bg-transparent"
                  onClick={() => setActiveTab("activities")}
                >
                  View Activities
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lesson Plans</CardTitle>
                <CardDescription>Access study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("lessons")}>
                  View Plans
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Papers</CardTitle>
                <CardDescription>Previous year papers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("papers")}>
                  Browse Papers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holiday Calendar</CardTitle>
                <CardDescription>Upcoming holidays</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Next: Winter Break</p>
                <Button
                  variant="outline"
                  className="w-full mt-2 bg-transparent"
                  onClick={() => setActiveTab("holidays")}
                >
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "attendance-view" && <AttendanceView />}
        {activeTab === "attendance-mark" && <AttendanceMarker />}
        {activeTab === "activities" && <CurriculumActivities />}
        {activeTab === "lessons" && <LessonPlans />}
        {activeTab === "papers" && <QuestionPapers />}
        {activeTab === "holidays" && <HolidayCalendar />}
      </div>
    </div>
  )
}

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "take-attendance", label: "Take Attendance" },
    { id: "view-attendance", label: "View Attendance" },
    { id: "add-activity", label: "Add Activity" },
    { id: "student-records", label: "Student Records" },
    { id: "schedule", label: "Schedule" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Take Attendance</CardTitle>
                <CardDescription>Mark student attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveTab("take-attendance")}>
                  Take Attendance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>View Attendance</CardTitle>
                <CardDescription>Student attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab("view-attendance")}
                >
                  View Records
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Activities</CardTitle>
                <CardDescription>Create curriculum activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveTab("add-activity")}>
                  Add Activity
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Records</CardTitle>
                <CardDescription>Manage student information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab("student-records")}
                >
                  Manage Records
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>Today's classes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">5 classes scheduled</p>
                <Button
                  variant="outline"
                  className="w-full mt-2 bg-transparent"
                  onClick={() => setActiveTab("schedule")}
                >
                  View Schedule
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Today's overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Students Present: 85%</p>
                  <p>Activities: 3 scheduled</p>
                  <p>Assignments Due: 2</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "take-attendance" && <TakeAttendance />}
        {activeTab === "view-attendance" && <AttendanceRecords />}
        {activeTab === "add-activity" && <AddActivity />}
        {activeTab === "student-records" && <StudentRecords />}
        {activeTab === "schedule" && (
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Your teaching schedule and upcoming classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Schedule management feature coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "user-management", label: "User Management" },
    { id: "attendance-control", label: "Attendance Control" },
    { id: "system-reports", label: "System Reports" },
    { id: "curriculum-management", label: "Curriculum" },
    { id: "system-settings", label: "Settings" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Administrator Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Total Users: 1,247</p>
                  <p>Active: 1,156 • Inactive: 91</p>
                  <p>Students: 1,000 • Teachers: 45 • Admins: 2</p>
                </div>
                <Button className="w-full" onClick={() => setActiveTab("user-management")}>
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Control</CardTitle>
                <CardDescription>Modify attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Today's Records: 856</p>
                  <p>Modified Records: 12</p>
                  <p>Pending Reviews: 3</p>
                </div>
                <Button className="w-full" onClick={() => setActiveTab("attendance-control")}>
                  Edit Attendance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Reports Generated: 24</p>
                  <p>This Month: 8</p>
                  <p>Ready to Download: 6</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab("system-reports")}
                >
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Curriculum Management</CardTitle>
                <CardDescription>Oversee all activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Active Activities: 156</p>
                  <p>This Week: 45</p>
                  <p>Pending Approval: 8</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab("curriculum-management")}
                >
                  Manage Curriculum
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holiday Management</CardTitle>
                <CardDescription>Set holiday calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Upcoming Holidays: 5</p>
                  <p>Academic Breaks: 3</p>
                  <p>National Holidays: 2</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Holidays
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>System Health: Good</p>
                  <p>Last Backup: 2 hours ago</p>
                  <p>Updates Available: 1</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab("system-settings")}
                >
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "user-management" && <UserManagement />}
        {activeTab === "attendance-control" && <AttendanceControl />}
        {activeTab === "system-reports" && <SystemReports />}
        {activeTab === "curriculum-management" && (
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Management</CardTitle>
              <CardDescription>Oversee and manage all curriculum activities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Curriculum management features coming soon...</p>
            </CardContent>
          </Card>
        )}
        {activeTab === "system-settings" && (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide parameters and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">System settings panel coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
