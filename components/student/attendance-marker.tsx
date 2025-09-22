"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Camera, CheckCircle, MapPin, Wifi } from "lucide-react"
import { QRScanner } from "@/components/advanced/qr-scanner"
import { FaceRecognition } from "@/components/advanced/face-recognition"
import { OfflineSync } from "@/components/advanced/offline-sync"

export function AttendanceMarker() {
  const [markedToday, setMarkedToday] = useState(false)
  const [activeMethod, setActiveMethod] = useState("qr")

  if (markedToday) {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Attendance Marked Successfully
          </CardTitle>
          <CardDescription>You have successfully marked your attendance for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Time:</strong> 09:15 AM
            </p>
            <p className="text-sm">
              <strong>Location:</strong> Classroom A-101
            </p>
            <p className="text-sm">
              <strong>Subject:</strong> Mathematics
            </p>
            <p className="text-sm">
              <strong>Method:</strong> {activeMethod === "qr" ? "QR Code Scan" : "Face Recognition"}
            </p>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Present</Badge>
          </div>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setMarkedToday(false)}>
            Mark Again (Demo)
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Attendance Method</CardTitle>
          <CardDescription>Select your preferred method to mark attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMethod} onValueChange={setActiveMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="face" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Face Recognition
              </TabsTrigger>
              <TabsTrigger value="sync" className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Offline Sync
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr" className="mt-6">
              <QRScanner />
            </TabsContent>

            <TabsContent value="face" className="mt-6">
              <FaceRecognition />
            </TabsContent>

            <TabsContent value="sync" className="mt-6">
              <OfflineSync />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Current Location Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Building:</strong> Academic Block A
            </p>
            <p>
              <strong>Room:</strong> A-101, Mathematics Department
            </p>
            <p>
              <strong>Current Class:</strong> Mathematics (09:00 - 10:30 AM)
            </p>
            <p>
              <strong>Next Class:</strong> Physics at 10:30 AM in Room B-205
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
