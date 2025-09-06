"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    setIsLoading(true)
    setMessage("🔄 Starting login...")

    try {
      // Simple localStorage approach
      setMessage("💾 Setting authentication...")
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("loginTimestamp", Date.now().toString())
      
      setMessage("✅ Authentication set successfully")
      
      // Direct redirect
      setMessage("🔄 Redirecting...")
      window.location.href = "/dashboard"
      
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
      setIsLoading(false)
    }
  }

  const checkAuth = () => {
    const auth = localStorage.getItem("isAuthenticated")
    const timestamp = localStorage.getItem("loginTimestamp")
    setMessage(`Current auth: ${auth}, timestamp: ${timestamp}`)
  }

  const clearAuth = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("loginTimestamp")
    setMessage("🧹 Authentication cleared")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🧪 Simple Login Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input placeholder="Username (any text)" />
            <Input type="password" placeholder="Password (any text)" />
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="space-y-2">
            <Button onClick={checkAuth} variant="outline" className="w-full">
              Check Auth Status
            </Button>
            <Button onClick={clearAuth} variant="destructive" className="w-full">
              Clear Auth
            </Button>
          </div>

          <div className="p-3 bg-gray-100 rounded text-sm">
            {message || "Ready to test login..."}
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm text-gray-600">Quick Links:</p>
            <div className="flex justify-center space-x-4 text-sm">
              <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
              <a href="/login" className="text-blue-600 hover:underline">Regular Login</a>
              <a href="/debug-login" className="text-blue-600 hover:underline">Debug Tool</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}