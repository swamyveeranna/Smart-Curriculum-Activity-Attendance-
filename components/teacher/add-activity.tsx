"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Calendar, Clock, MapPin } from "lucide-react"

interface Activity {
  id: string
  title: string
  subject: string
  type: "lecture" | "lab" | "assignment" | "exam" | "project"
  date: string
  time: string
  duration: string
  location: string
  description: string
  objectives: string[]
  materials: string[]
  class: string
}

export function AddActivity() {
  const [activity, setActivity] = useState<Partial<Activity>>({
    title: "",
    subject: "",
    type: "lecture",
    date: "",
    time: "",
    duration: "",
    location: "",
    description: "",
    objectives: [],
    materials: [],
    class: "",
  })

  const [newObjective, setNewObjective] = useState("")
  const [newMaterial, setNewMaterial] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const addObjective = () => {
    if (newObjective.trim()) {
      setActivity((prev) => ({
        ...prev,
        objectives: [...(prev.objectives || []), newObjective.trim()],
      }))
      setNewObjective("")
    }
  }

  const removeObjective = (index: number) => {
    setActivity((prev) => ({
      ...prev,
      objectives: prev.objectives?.filter((_, i) => i !== index) || [],
    }))
  }

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setActivity((prev) => ({
        ...prev,
        materials: [...(prev.materials || []), newMaterial.trim()],
      }))
      setNewMaterial("")
    }
  }

  const removeMaterial = (index: number) => {
    setActivity((prev) => ({
      ...prev,
      materials: prev.materials?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    // Reset form or show success message
    setActivity({
      title: "",
      subject: "",
      type: "lecture",
      date: "",
      time: "",
      duration: "",
      location: "",
      description: "",
      objectives: [],
      materials: [],
      class: "",
    })
  }

  const getTypeColor = (type: string) => {
    const colors = {
      lecture: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      lab: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      assignment: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      exam: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      project: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return colors[type as keyof typeof colors] || ""
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Activity
          </CardTitle>
          <CardDescription>Create a new curriculum activity for your students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                placeholder="Enter activity title"
                value={activity.title || ""}
                onChange={(e) => setActivity((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={activity.subject || ""}
                onValueChange={(value) => setActivity((prev) => ({ ...prev, subject: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type</Label>
              <Select
                value={activity.type || "lecture"}
                onValueChange={(value) => setActivity((prev) => ({ ...prev, type: value as Activity["type"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="lab">Laboratory</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="exam">Examination</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={activity.class || ""}
                onValueChange={(value) => setActivity((prev) => ({ ...prev, class: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">CS101 - Computer Science</SelectItem>
                  <SelectItem value="CS102">CS102 - Data Structures</SelectItem>
                  <SelectItem value="CS103">CS103 - Algorithms</SelectItem>
                  <SelectItem value="MATH101">MATH101 - Calculus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={activity.date || ""}
                onChange={(e) => setActivity((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={activity.time || ""}
                onChange={(e) => setActivity((prev) => ({ ...prev, time: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 2 hours"
                value={activity.duration || ""}
                onChange={(e) => setActivity((prev) => ({ ...prev, duration: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Room A-101, Physics Lab"
              value={activity.location || ""}
              onChange={(e) => setActivity((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the activity, what students will learn, and any special instructions"
              value={activity.description || ""}
              onChange={(e) => setActivity((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          {/* Learning Objectives */}
          <div className="space-y-4">
            <Label>Learning Objectives</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a learning objective"
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addObjective()}
              />
              <Button type="button" onClick={addObjective}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activity.objectives?.map((objective, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeObjective(index)}
                >
                  {objective} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <Label>Required Materials</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add required material or resource"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMaterial()}
              />
              <Button type="button" onClick={addMaterial}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activity.materials?.map((material, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeMaterial(index)}>
                  {material} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Preview */}
          {activity.title && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Activity Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <Badge className={getTypeColor(activity.type || "lecture")}>
                    {activity.type?.charAt(0).toUpperCase() + activity.type?.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.subject} • {activity.class}
                </p>
                <div className="grid gap-2 text-sm">
                  {activity.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date}</span>
                    </div>
                  )}
                  {activity.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {activity.time} ({activity.duration})
                      </span>
                    </div>
                  )}
                  {activity.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                </div>
                {activity.description && <p className="text-sm">{activity.description}</p>}
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving || !activity.title} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Activity"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
