"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Authentication hook
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const checkAuth = () => {
      if (!mounted) {
        console.log("⏹️ Component unmounted, skipping auth check")
        return
      }

      try {
        console.log("🔍 useAuth: Checking authentication status...")
        
        // Check if localStorage is available
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
          console.log("🚫 localStorage not available (SSR)")
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        const authStatus = localStorage.getItem("isAuthenticated")
        const loginTimestamp = localStorage.getItem("loginTimestamp")
        
        console.log("📋 Auth status from localStorage:", { authStatus, loginTimestamp })
        
        // Additional validation: check if login is not too old (optional)
        let isAuth = authStatus === "true"
        if (isAuth && loginTimestamp) {
          const loginTime = parseInt(loginTimestamp)
          const currentTime = Date.now()
          const timeDiff = currentTime - loginTime
          const maxAge = 24 * 60 * 60 * 1000 // 24 hours
          
          if (timeDiff > maxAge) {
            console.log("⏰ Login expired, clearing auth")
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("loginTimestamp")
            isAuth = false
          }
        }
        
        if (mounted) {
          setIsAuthenticated(isAuth)
          console.log("✅ useAuth: Authentication check completed:", isAuth)
        }
      } catch (error) {
        console.error("❌ useAuth: Error checking authentication:", error)
        if (mounted) {
          setIsAuthenticated(false)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
          console.log("🏁 useAuth: Auth loading state reset")
        }
      }
    }

    // Immediate check for faster loading
    checkAuth()

    // Cleanup function
    return () => {
      mounted = false
      console.log("🧹 useAuth: Cleanup - component unmounting")
    }
  }, [])

  const login = (returnUrl?: string) => {
    try {
      console.log("🔐 Login function called with returnUrl:", returnUrl)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("loginTimestamp", Date.now().toString())
      setIsAuthenticated(true)
      console.log("✅ Authentication state updated")
      
      if (returnUrl) {
        console.log("🔄 Redirecting to return URL:", returnUrl)
        router.push(returnUrl)
      }
    } catch (error) {
      console.error("❌ Error in login function:", error)
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/login")
  }

  const redirectToLogin = (returnUrl?: string) => {
    const url = returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login"
    router.push(url)
  }

  return { 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    redirectToLogin 
  }
}

// Auth guard component
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function AuthComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()

    console.log("🛡️ withAuth HOC - isLoading:", isLoading, "isAuthenticated:", isAuthenticated)

    if (isLoading) {
      console.log("⏳ withAuth: Still loading, showing spinner")
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#002F6C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying authentication...</p>
            <p className="text-xs text-gray-500 mt-2">Auth loading state: {String(isLoading)}</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      console.log("❌ withAuth: Not authenticated, showing login prompt")
      // Instead of showing login UI, redirect to login page to avoid loops
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname + window.location.search
        const loginUrl = `/login?returnUrl=${encodeURIComponent(currentPath)}`
        console.log("🔄 Redirecting to login:", loginUrl)
        window.location.href = loginUrl
      }
      
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#002F6C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      )
    }

    console.log("✅ withAuth: Authenticated, rendering component")
    return <WrappedComponent {...props} />
  }
}

// Check authentication function for service buttons
export const checkAuth = (callback: () => void, redirectUrl?: string) => {
  try {
    console.log("🔍 checkAuth called with redirectUrl:", redirectUrl)
    const authStatus = localStorage.getItem("isAuthenticated")
    console.log("📋 Current auth status:", authStatus)
    
    if (authStatus === "true") {
      console.log("✅ User authenticated, executing callback")
      callback()
    } else {
      const url = redirectUrl 
        ? `/login?returnUrl=${encodeURIComponent(redirectUrl)}` 
        : "/login"
      console.log("🔄 User not authenticated, redirecting to:", url)
      window.location.href = url
    }
  } catch (error) {
    console.error("❌ Error in checkAuth:", error)
    // Fallback to login page
    window.location.href = "/login"
  }
}