"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, CheckCircle, XCircle, MapPin, Clock, Wifi, WifiOff } from "lucide-react"

interface QRScanResult {
  success: boolean
  data?: {
    classId: string
    className: string
    subject: string
    teacher: string
    location: string
    time: string
  }
  error?: string
}

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "prompt">("prompt")

  useEffect(() => {
    // Simulate checking camera permission
    const checkCameraPermission = async () => {
      try {
        // In a real app, you would use navigator.mediaDevices.getUserMedia
        // For demo purposes, we'll simulate permission check
        setCameraPermission("granted")
      } catch (error) {
        setCameraPermission("denied")
      }
    }

    checkCameraPermission()

    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const startScanning = async () => {
    if (cameraPermission === "denied") {
      setScanResult({
        success: false,
        error: "Camera permission denied. Please enable camera access in your browser settings.",
      })
      return
    }

    setIsScanning(true)
    setScanResult(null)

    // Simulate QR code scanning process
    setTimeout(() => {
      // Simulate successful scan
      const mockQRData = {
        classId: "CS101",
        className: "Computer Science 101",
        subject: "Mathematics",
        teacher: "Dr. Smith",
        location: "Room A-101",
        time: new Date().toLocaleTimeString(),
      }

      setScanResult({
        success: true,
        data: mockQRData,
      })
      setIsScanning(false)
    }, 3000)
  }

  const markAttendance = () => {
    // In a real app, this would send the attendance data to the server
    console.log("Attendance marked successfully")
    setScanResult(null)
  }

  if (cameraPermission === "denied") {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <Camera className="h-5 w-5" />
            Camera Access Required
          </CardTitle>
          <CardDescription>Camera permission is needed to scan QR codes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            Please enable camera access in your browser settings and refresh the page to use QR code scanning.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card
        className={`${isOnline ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"}`}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">Connected - Ready to scan</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 dark:text-yellow-300">
                  Offline - Attendance will sync when connected
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>Scan the classroom QR code to mark your attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning && !scanResult && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Position QR code within the frame</p>
                </div>
              </div>
              <Button onClick={startScanning} className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto border-2 border-primary rounded-lg flex items-center justify-center bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
                <div className="text-center z-10">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-sm text-primary font-medium">Scanning QR Code...</p>
                </div>
                {/* Scanning line animation */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-bounce"></div>
              </div>
              <Button variant="outline" onClick={() => setIsScanning(false)}>
                Cancel Scan
              </Button>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              {scanResult.success ? (
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5" />
                      QR Code Scanned Successfully
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{scanResult.data?.classId}</Badge>
                        <span>{scanResult.data?.className}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{scanResult.data?.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{scanResult.data?.time}</span>
                      </div>
                      <p>
                        <strong>Subject:</strong> {scanResult.data?.subject}
                      </p>
                      <p>
                        <strong>Teacher:</strong> {scanResult.data?.teacher}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={markAttendance} className="flex-1">
                        Mark Attendance
                      </Button>
                      <Button variant="outline" onClick={() => setScanResult(null)}>
                        Scan Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                      <XCircle className="h-5 w-5" />
                      Scan Failed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      {scanResult.error || "Unable to read QR code. Please try again."}
                    </p>
                    <Button variant="outline" onClick={() => setScanResult(null)}>
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Scanning Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Ensure good lighting for better scanning</p>
          <p>• Hold your device steady and at arm's length</p>
          <p>• Make sure the entire QR code is visible in the frame</p>
          <p>• Clean your camera lens if scanning fails repeatedly</p>
        </CardContent>
      </Card>
    </div>
  )
}
