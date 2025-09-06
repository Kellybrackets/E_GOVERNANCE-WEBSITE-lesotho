"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardTestPage() {
  const [authStatus, setAuthStatus] = useState<string>("checking...")
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8)
    const logEntry = `[${timestamp}] ${message}`
    setLogs(prev => [...prev, logEntry])
    console.log(logEntry)
  }

  useEffect(() => {
    addLog("🚀 Dashboard test page loaded")
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const isAuth = localStorage.getItem("isAuthenticated")
      const timestamp = localStorage.getItem("loginTimestamp")
      setAuthStatus(`Auth: ${isAuth}, Time: ${timestamp ? new Date(parseInt(timestamp)).toLocaleTimeString() : 'None'}`)
      addLog(`📊 Auth check - isAuthenticated: ${isAuth}`)
      
      if (isAuth !== "true") {
        addLog("❌ Not authenticated - this would normally redirect")
      } else {
        addLog("✅ Authenticated - dashboard should load normally")
      }
    } catch (error) {
      addLog(`❌ Error checking auth: ${error}`)
      setAuthStatus("Error checking auth")
    }
  }

  const simulateLogin = () => {
    addLog("🔐 Simulating login...")
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("loginTimestamp", Date.now().toString())
    checkAuthStatus()
    addLog("✅ Login simulated")
  }

  const clearLogin = () => {
    addLog("🧹 Clearing login...")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("loginTimestamp")
    checkAuthStatus()
    addLog("✅ Login cleared")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Dashboard Test (No Auth Protection)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-semibold mb-2">Current Auth Status:</h3>
              <p className="font-mono text-sm">{authStatus}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={checkAuthStatus} variant="outline">
                🔍 Check Auth
              </Button>
              <Button onClick={simulateLogin} className="bg-green-600">
                🔐 Simulate Login
              </Button>
              <Button onClick={clearLogin} variant="destructive">
                🧹 Clear Auth
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Test Links:</h3>
              <div className="flex flex-wrap gap-3">
                <a href="/dashboard" className="text-blue-600 hover:underline">
                  → Protected Dashboard
                </a>
                <a href="/simple-login" className="text-blue-600 hover:underline">
                  → Simple Login
                </a>
                <a href="/login" className="text-blue-600 hover:underline">
                  → Regular Login
                </a>
                <a href="/debug-login" className="text-blue-600 hover:underline">
                  → Debug Tool
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📋 Real-time Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <p>No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              )}
            </div>
            <Button onClick={() => setLogs([])} variant="outline" size="sm" className="mt-2">
              Clear Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📚 What This Tests:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Basic page loading (no infinite loops)</li>
              <li>✓ localStorage authentication check</li>
              <li>✓ Manual login/logout simulation</li>
              <li>✓ Link navigation to protected pages</li>
              <li>✓ Real-time auth status monitoring</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}