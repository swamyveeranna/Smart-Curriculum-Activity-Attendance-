"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarDays, Clock } from "lucide-react"

interface Holiday {
  id: string
  name: string
  date: string
  endDate?: string
  type: "national" | "religious" | "academic" | "local"
  description: string
  isUpcoming: boolean
  daysUntil?: number
}

const mockHolidays: Holiday[] = [
  {
    id: "1",
    name: "Winter Break",
    date: "2024-01-20",
    endDate: "2024-02-05",
    type: "academic",
    description: "Winter vacation for all students and faculty",
    isUpcoming: true,
    daysUntil: 5,
  },
  {
    id: "2",
    name: "Republic Day",
    date: "2024-01-26",
    type: "national",
    description: "National holiday celebrating the Constitution of India",
    isUpcoming: true,
    daysUntil: 11,
  },
  {
    id: "3",
    name: "Holi Festival",
    date: "2024-03-13",
    type: "religious",
    description: "Festival of colors and spring celebration",
    isUpcoming: true,
    daysUntil: 58,
  },
  {
    id: "4",
    name: "Spring Break",
    date: "2024-03-25",
    endDate: "2024-04-02",
    type: "academic",
    description: "Spring vacation period",
    isUpcoming: true,
    daysUntil: 70,
  },
  {
    id: "5",
    name: "Good Friday",
    date: "2024-03-29",
    type: "religious",
    description: "Christian holiday commemorating the crucifixion of Jesus",
    isUpcoming: true,
    daysUntil: 74,
  },
]

export function HolidayCalendar() {
  const getTypeBadge = (type: string) => {
    const variants = {
      national: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      religious: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      local: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return variants[type as keyof typeof variants] || ""
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const upcomingHolidays = mockHolidays.filter((holiday) => holiday.isUpcoming).slice(0, 3)
  const nextHoliday = upcomingHolidays[0]

  return (
    <div className="space-y-6">
      {/* Next Holiday Highlight */}
      {nextHoliday && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CalendarDays className="h-5 w-5" />
              Next Holiday
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{nextHoliday.name}</h3>
              <p className="text-muted-foreground">{formatDate(nextHoliday.date)}</p>
              {nextHoliday.endDate && (
                <p className="text-sm text-muted-foreground">Until: {formatDate(nextHoliday.endDate)}</p>
              )}
              <div className="flex items-center gap-2">
                <Badge className={getTypeBadge(nextHoliday.type)}>
                  {nextHoliday.type.charAt(0).toUpperCase() + nextHoliday.type.slice(1)}
                </Badge>
                {nextHoliday.daysUntil && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {nextHoliday.daysUntil} days
                  </Badge>
                )}
              </div>
              <p className="text-sm">{nextHoliday.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Holidays List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Holiday Calendar
          </CardTitle>
          <CardDescription>Upcoming holidays and academic breaks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{holiday.name}</h4>
                    <Badge className={getTypeBadge(holiday.type)}>
                      {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(holiday.date)}</p>
                  {holiday.endDate && (
                    <p className="text-sm text-muted-foreground">Until: {formatDate(holiday.endDate)}</p>
                  )}
                  <p className="text-sm">{holiday.description}</p>
                </div>
                {holiday.daysUntil && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {holiday.daysUntil} days
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Holiday Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {mockHolidays.filter((h) => h.type === "academic").length}
            </div>
            <p className="text-sm text-muted-foreground">Academic Breaks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {mockHolidays.filter((h) => h.type === "national").length}
            </div>
            <p className="text-sm text-muted-foreground">National Holidays</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {mockHolidays.filter((h) => h.type === "religious").length}
            </div>
            <p className="text-sm text-muted-foreground">Religious Holidays</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{mockHolidays.filter((h) => h.isUpcoming).length}</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
