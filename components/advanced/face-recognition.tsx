"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, User, CheckCircle, XCircle, Eye, Shield, AlertTriangle } from "lucide-react"

interface FaceRecognitionResult {
  success: boolean
  confidence?: number
  studentName?: string
  studentId?: string
  error?: string
}

export function FaceRecognition() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<FaceRecognitionResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Simulate checking camera permission
    const checkCameraPermission = async () => {
      try {
        setCameraPermission("granted")
      } catch (error) {
        setCameraPermission("denied")
      }
    }

    checkCameraPermission()
  }, [])

  const startFaceRecognition = async () => {
    if (cameraPermission === "denied") {
      setScanResult({
        success: false,
        error: "Camera permission denied. Please enable camera access in your browser settings.",
      })
      return
    }

    setIsScanning(true)
    setScanResult(null)
    setProgress(0)
    setIsProcessing(false)

    // Simulate face detection and recognition process
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsProcessing(true)

          // Simulate processing delay
          setTimeout(() => {
            // Simulate successful recognition (90% of the time)
            const isSuccessful = Math.random() > 0.1

            if (isSuccessful) {
              setScanResult({
                success: true,
                confidence: Math.floor(Math.random() * 15) + 85, // 85-99% confidence
                studentName: "Alice Johnson",
                studentId: "CS001",
              })
            } else {
              setScanResult({
                success: false,
                error: "Face not recognized. Please ensure good lighting and face the camera directly.",
              })
            }

            setIsScanning(false)
            setIsProcessing(false)
          }, 2000)

          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const markAttendance = () => {
    // In a real app, this would send the attendance data to the server
    console.log("Attendance marked via face recognition")
    setScanResult(null)
    setProgress(0)
  }

  if (cameraPermission === "denied") {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <Camera className="h-5 w-5" />
            Camera Access Required
          </CardTitle>
          <CardDescription>Camera permission is needed for face recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            Please enable camera access in your browser settings and refresh the page to use face recognition.
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
      {/* Privacy Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">Privacy Protected</p>
              <p>Face recognition data is processed locally and not stored permanently.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Face Recognition Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Face Recognition
          </CardTitle>
          <CardDescription>Use facial recognition to mark your attendance automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning && !scanResult && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Position your face in the center</p>
                </div>
              </div>
              <Button onClick={startFaceRecognition} className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Start Face Recognition
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto border-2 border-primary rounded-full flex items-center justify-center bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-primary/50 rounded-full"></div>
                <div className="absolute inset-8 border-2 border-primary/30 rounded-full"></div>
                <div className="text-center z-10">
                  {!isProcessing ? (
                    <>
                      <User className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-primary font-medium">Detecting Face...</p>
                    </>
                  ) : (
                    <>
                      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-primary font-medium">Processing...</p>
                    </>
                  )}
                </div>
                {/* Scanning animation */}
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20"></div>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  {isProcessing ? "Recognizing face..." : `Scanning... ${progress}%`}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setIsScanning(false)
                  setProgress(0)
                  setIsProcessing(false)
                }}
              >
                Cancel
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
                      Face Recognized Successfully
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{scanResult.studentName}</h3>
                        <p className="text-sm text-muted-foreground">ID: {scanResult.studentId}</p>
                        <Badge variant="outline" className="text-green-600">
                          {scanResult.confidence}% Confidence
                        </Badge>
                      </div>
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
                      Recognition Failed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      {scanResult.error || "Unable to recognize face. Please try again."}
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
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Recognition Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Ensure your face is well-lit and clearly visible</p>
          <p>• Remove sunglasses, hats, or face coverings</p>
          <p>• Look directly at the camera and remain still</p>
          <p>• Make sure you're enrolled in the face recognition system</p>
          <p>• Contact IT support if recognition consistently fails</p>
        </CardContent>
      </Card>
    </div>
  )
}
