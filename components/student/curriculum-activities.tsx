"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react"

interface Activity {
  id: string
  title: string
  subject: string
  type: "lecture" | "lab" | "assignment" | "exam" | "project"
  time: string
  duration: string
  location: string
  instructor: string
  description: string
  status: "upcoming" | "ongoing" | "completed"
}

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Calculus Integration Methods",
    subject: "Mathematics",
    type: "lecture",
    time: "09:00 AM",
    duration: "1.5 hours",
    location: "Room A-101",
    instructor: "Dr. Smith",
    description: "Advanced integration techniques and applications",
    status: "ongoing",
  },
  {
    id: "2",
    title: "Physics Lab: Wave Mechanics",
    subject: "Physics",
    type: "lab",
    time: "11:00 AM",
    duration: "2 hours",
    location: "Physics Lab B",
    instructor: "Prof. Johnson",
    description: "Hands-on experiments with wave properties",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Chemistry Assignment Due",
    subject: "Chemistry",
    type: "assignment",
    time: "11:59 PM",
    duration: "Due today",
    location: "Online Submission",
    instructor: "Dr. Brown",
    description: "Organic compounds analysis report",
    status: "upcoming",
  },
]

export function CurriculumActivities() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />
      case "lab":
        return <Users className="h-4 w-4" />
      case "assignment":
        return <Calendar className="h-4 w-4" />
      case "exam":
        return <Clock className="h-4 w-4" />
      case "project":
        return <MapPin className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      ongoing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      upcoming: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      lecture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      lab: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      assignment: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      exam: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      project: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    }
    return variants[type as keyof typeof variants] || ""
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Today's Activities</h3>
        <Badge variant="outline">{mockActivities.length} activities</Badge>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(activity.type)}
                    {activity.title}
                  </CardTitle>
                  <CardDescription>{activity.subject}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusBadge(activity.status)}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Badge>
                  <Badge className={getTypeBadge(activity.type)}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{activity.description}</p>

              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {activity.time} ({activity.duration})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{activity.instructor}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                {activity.type === "assignment" && <Button size="sm">Submit Work</Button>}
                {activity.status === "upcoming" && (
                  <Button size="sm" variant="outline">
                    Set Reminder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
