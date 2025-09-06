"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  Download, 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Plus,
  TrendingUp,
  Star,
  Activity
} from "lucide-react"
import Link from "next/link"
import MobileDashboardLayout from "@/components/mobile-dashboard-layout"
import { withAuth } from "@/lib/auth"

// Mock user data
const userData = {
  name: "Thabo M.",
  id: "1001023456",
  email: "thabo.m@email.com",
  phone: "+266 5012 3456",
}

const applications = [
  {
    id: "NID-2024-001234",
    service: "National ID Application",
    status: "under_review",
    progress: 75,
    currentStep: "Under Review",
    submittedDate: "2024-01-15",
    estimatedCompletion: "2024-01-22",
    fee: "M60.00",
    paid: true,
  },
  {
    id: "PSP-2024-000567",
    service: "Passport Application",
    status: "identity_verified",
    progress: 50,
    currentStep: "Identity Verified",
    submittedDate: "2024-01-10",
    estimatedCompletion: "2024-01-25",
    fee: "M350.00",
    paid: true,
  },
  {
    id: "DL-2024-000890",
    service: "Driver's License Renewal",
    status: "ready",
    progress: 100,
    currentStep: "Ready for Collection",
    submittedDate: "2024-01-05",
    estimatedCompletion: "2024-01-12",
    fee: "M120.00",
    paid: true,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "application",
    title: "Passport Application Updated",
    description: "Your application is now under review",
    time: "2 hours ago",
    status: "info"
  },
  {
    id: 2,
    type: "document",
    title: "Document Verified",
    description: "National ID documents verified successfully",
    time: "1 day ago",
    status: "success"
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Processed",
    description: "Driver's License renewal fee processed",
    time: "2 days ago",
    status: "success"
  }
]

const quickActions = [
  {
    title: "Apply for Services",
    description: "Browse government services",
    href: "/dashboard/services",
    icon: Plus,
    color: "bg-blue-500"
  },
  {
    title: "Check Applications",
    description: "View application status",
    href: "/dashboard/documents",
    icon: FileText,
    color: "bg-green-500"
  },
  {
    title: "Digital Wallet",
    description: "Access secure documents",
    href: "/wallet",
    icon: Eye,
    color: "bg-purple-500"
  }
]

function MobileDashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "identity_verified":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4" />
      case "under_review":
        return <Clock className="w-4 h-4" />
      case "identity_verified":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <MobileDashboardLayout userData={userData}>
      {/* Welcome Section */}
      <section className="py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Here's what's happening with your government services today.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          <Card className="dashboard-stat-card hover-lift">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <p className="text-lg md:text-2xl font-bold text-gray-900">
                  {applications.filter((app) => app.status !== "ready").length}
                </p>
                <p className="text-xs md:text-sm text-gray-600">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card hover-lift">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
                <p className="text-lg md:text-2xl font-bold text-gray-900">
                  {applications.filter((app) => app.status === "ready").length}
                </p>
                <p className="text-xs md:text-sm text-gray-600">Ready</p>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card hover-lift">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                </div>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{applications.length}</p>
                <p className="text-xs md:text-sm text-gray-600">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card hover-lift">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Bell className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                </div>
                <p className="text-lg md:text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs md:text-sm text-gray-600">Updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover-lift transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                        <p className="text-xs text-gray-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="space-y-6 md:space-y-8">
        {/* Applications Progress */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Applications</h2>
          </div>

          <div className="space-y-4">
            {applications.slice(0, 2).map((app) => (
              <Card key={app.id} className="hover-lift">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{app.service}</h3>
                      <p className="text-sm text-gray-600">Ref: {app.id}</p>
                    </div>
                    <Badge className={`${getStatusColor(app.status)} flex items-center`}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 text-xs">{app.currentStep}</span>
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs font-medium text-gray-900">{app.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#002F6C] to-[#007849] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${app.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Submitted:</span>
                      <p>{app.submittedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Est. Complete:</span>
                      <p>{app.estimatedCompletion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </MobileDashboardLayout>
  )
}

export default withAuth(MobileDashboardPage)