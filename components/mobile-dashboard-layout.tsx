"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Settings, 
  Bell, 
  LogOut,
  Shield
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import EnhancedBottomNavigation from "@/components/bottom-navigation"

interface MobileDashboardLayoutProps {
  children: React.ReactNode
  userData?: {
    name: string
    id: string
    email: string
  }
}


export default function MobileDashboardLayout({ children, userData }: MobileDashboardLayoutProps) {
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Mock user data if not provided
  const user = userData || {
    name: "Thabo M.",
    id: "1001023456",
    email: "thabo.m@email.com"
  }

  const unreadNotifications = 2

  return (
    <div className="min-h-screen bg-gray-50 bottom-nav-content md:pb-0">
      {/* Top Header - Mobile */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm md:text-lg">L</span>
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl text-[#002F6C]">Lesotho eGov</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">Digital Services Portal</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Application Update</p>
                    <p className="text-xs text-gray-600">Your passport application is ready for collection</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Document Verified</p>
                    <p className="text-xs text-gray-600">Your National ID application has been verified</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* User Profile */}
            <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#002F6C] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium text-sm">{user.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Profile Menu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#002F6C] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">ID: {user.id}</p>
                      <div className="flex items-center mt-1">
                        <Shield className="w-3 h-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600 font-medium">Verified Account</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href="/dashboard/profile">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setShowProfileDialog(false)}>
                        <User className="w-4 h-4 mr-3" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setShowProfileDialog(false)}>
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Button>
                    </Link>
                    <hr />
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <EnhancedBottomNavigation />

    </div>
  )
}