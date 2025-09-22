"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, RefreshCw, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface OfflineRecord {
  id: string
  type: "attendance" | "activity" | "grade"
  data: any
  timestamp: string
  status: "pending" | "syncing" | "synced" | "failed"
}

const mockOfflineRecords: OfflineRecord[] = [
  {
    id: "1",
    type: "attendance",
    data: { studentId: "CS001", status: "present", subject: "Mathematics" },
    timestamp: "2024-01-15 09:15",
    status: "pending",
  },
  {
    id: "2",
    type: "attendance",
    data: { studentId: "CS002", status: "late", subject: "Mathematics" },
    timestamp: "2024-01-15 09:20",
    status: "pending",
  },
  {
    id: "3",
    type: "activity",
    data: { title: "Lab Assignment", subject: "Physics", dueDate: "2024-01-20" },
    timestamp: "2024-01-15 10:30",
    status: "synced",
  },
]

export function OfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [records, setRecords] = useState<OfflineRecord[]>(mockOfflineRecords)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Auto-sync when coming back online
      if (records.some((r) => r.status === "pending")) {
        syncData()
      }
    }

    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [records])

  const syncData = async () => {
    if (!isOnline) return

    setIsSyncing(true)
    setSyncProgress(0)

    const pendingRecords = records.filter((r) => r.status === "pending")

    for (let i = 0; i < pendingRecords.length; i++) {
      const record = pendingRecords[i]

      // Update status to syncing
      setRecords((prev) => prev.map((r) => (r.id === record.id ? { ...r, status: "syncing" } : r)))

      // Simulate sync delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate sync success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1

      setRecords((prev) =>
        prev.map((r) => (r.id === record.id ? { ...r, status: isSuccess ? "synced" : "failed" } : r)),
      )

      setSyncProgress(((i + 1) / pendingRecords.length) * 100)
    }

    setIsSyncing(false)
  }

  const retryFailedSync = (recordId: string) => {
    setRecords((prev) => prev.map((r) => (r.id === recordId ? { ...r, status: "pending" } : r)))
  }

  const clearSyncedRecords = () => {
    setRecords((prev) => prev.filter((r) => r.status !== "synced"))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      case "synced":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      syncing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      synced: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return variants[status as keyof typeof variants] || ""
  }

  const pendingCount = records.filter((r) => r.status === "pending").length
  const failedCount = records.filter((r) => r.status === "failed").length
  const syncedCount = records.filter((r) => r.status === "synced").length

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card
        className={`${isOnline ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-700 dark:text-green-300">Online</span>
                  <span className="text-sm text-green-600 dark:text-green-400">All systems operational</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-700 dark:text-red-300">Offline</span>
                  <span className="text-sm text-red-600 dark:text-red-400">Data will sync when connected</span>
                </>
              )}
            </div>
            {isOnline && pendingCount > 0 && (
              <Button size="sm" onClick={syncData} disabled={isSyncing}>
                <RefreshCw className={`h-4 w-4 mr-1 ${isSyncing ? "animate-spin" : ""}`} />
                Sync Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sync Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-sm text-muted-foreground">Pending Sync</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{syncedCount}</div>
            <p className="text-sm text-muted-foreground">Synced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
      </div>

      {/* Sync Progress */}
      {isSyncing && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Syncing data...</span>
                <span className="text-sm text-muted-foreground">{Math.round(syncProgress)}%</span>
              </div>
              <Progress value={syncProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offline Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Offline Data Queue</CardTitle>
              <CardDescription>Records waiting to be synchronized</CardDescription>
            </div>
            {syncedCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearSyncedRecords}>
                Clear Synced
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium capitalize">{record.type} Record</p>
                    <p className="text-sm text-muted-foreground">
                      {record.timestamp} • {JSON.stringify(record.data).substring(0, 50)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadge(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                  {record.status === "failed" && (
                    <Button size="sm" variant="outline" onClick={() => retryFailedSync(record.id)}>
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {records.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-muted-foreground">All data is synchronized</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offline Mode Info */}
      {!isOnline && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Offline Mode Active</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
            <p>• You can continue using the app while offline</p>
            <p>• All actions will be saved locally and synced when you're back online</p>
            <p>• Some features may be limited without internet connection</p>
            <p>• Data will automatically sync when connection is restored</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
