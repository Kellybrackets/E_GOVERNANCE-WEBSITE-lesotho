"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function DebugLoginPage() {
  const [authStatus, setAuthStatus] = useState<string>("")
  const [logs, setLogs] = useState<string[]>([])
  const { isAuthenticated, isLoading, login, logout } = useAuth()

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8)
    const logEntry = `[${timestamp}] ${message}`
    setLogs(prev => [...prev, logEntry])
    console.log(logEntry)
  }

  useEffect(() => {
    addLog("🚀 Debug page loaded")
    checkStatus()
  }, [])

  useEffect(() => {
    addLog(`📊 Auth state changed - isAuthenticated: ${isAuthenticated}, isLoading: ${isLoading}`)
  }, [isAuthenticated, isLoading])

  const checkStatus = () => {
    try {
      const status = localStorage.getItem("isAuthenticated")
      const timestamp = localStorage.getItem("loginTimestamp")
      setAuthStatus(`Auth: ${status}, Timestamp: ${timestamp}`)
      addLog(`💾 localStorage check - Auth: ${status}, Timestamp: ${timestamp}`)
    } catch (error) {
      addLog(`❌ localStorage error: ${error}`)
    }
  }

  const testLogin = async () => {
    addLog("🧪 Testing login flow...")
    try {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("loginTimestamp", Date.now().toString())
      addLog("✅ Manually set authentication in localStorage")
      checkStatus()
      // Force component re-render
      window.location.reload()
    } catch (error) {
      addLog(`❌ Test login failed: ${error}`)
    }
  }

  const clearAuth = () => {
    addLog("🧹 Clearing authentication...")
    try {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("loginTimestamp")
      addLog("✅ Authentication cleared")
      checkStatus()
      window.location.reload()
    } catch (error) {
      addLog(`❌ Clear auth failed: ${error}`)
    }
  }

  const testRedirect = () => {
    addLog("🔄 Testing redirect to dashboard...")
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🔧 Authentication Debug Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm text-gray-600">isAuthenticated</p>
                <p className="font-bold text-lg">{String(isAuthenticated)}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                <p className="text-sm text-gray-600">isLoading</p>
                <p className="font-bold text-lg">{String(isLoading)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm text-gray-600">localStorage</p>
                <p className="font-bold text-sm">{authStatus}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="font-bold text-sm">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={checkStatus} variant="outline">
                🔍 Check Status
              </Button>
              <Button onClick={testLogin} className="bg-green-600 hover:bg-green-700">
                🧪 Test Login
              </Button>
              <Button onClick={clearAuth} variant="destructive">
                🧹 Clear Auth
              </Button>
              <Button onClick={testRedirect} className="bg-blue-600 hover:bg-blue-700">
                🔄 Test Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📋 Debug Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p>No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => setLogs([])} variant="outline" size="sm">
                Clear Logs
              </Button>
              <Button 
                onClick={() => {
                  const logText = logs.join('\n')
                  navigator.clipboard.writeText(logText)
                  addLog("📋 Logs copied to clipboard")
                }} 
                variant="outline" 
                size="sm"
              >
                Copy Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🚀 Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <a href="/login" className="text-blue-600 hover:underline">→ Login Page</a>
              <a href="/dashboard" className="text-blue-600 hover:underline">→ Dashboard</a>
              <a href="/dashboard/services" className="text-blue-600 hover:underline">→ Services</a>
              <a href="/" className="text-blue-600 hover:underline">→ Home</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}