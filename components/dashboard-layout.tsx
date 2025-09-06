"use client"

import { Button } from "@/components/ui/button"
import { 
  User, 
  Home, 
  Settings, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Wallet,
  Grid3X3
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userData?: {
    name: string
    id: string
    email: string
  }
}

const sidebarItems = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: Home,
    description: "Overview and quick actions"
  },
  { 
    name: "Services", 
    href: "/dashboard/services", 
    icon: Grid3X3,
    description: "Government services directory",
    highlight: true
  },
  { 
    name: "My Profile", 
    href: "/dashboard/profile", 
    icon: User,
    description: "Personal information"
  },
  { 
    name: "My Documents", 
    href: "/dashboard/documents", 
    icon: FileText,
    description: "Application history and documents"
  },
  { 
    name: "Digital Wallet", 
    href: "/wallet", 
    icon: Wallet,
    description: "Secure document storage"
  },
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings,
    description: "Account preferences"
  }
]

export default function DashboardLayout({ children, userData }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  // Mock user data if not provided
  const user = userData || {
    name: "Thabo M.",
    id: "1001023456",
    email: "thabo.m@email.com"
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:transform-none
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#002F6C]">Dashboard</h2>
              <p className="text-sm text-gray-600">Digital Services</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#002F6C] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">ID: {user.id}</p>
              <div className="flex items-center mt-1">
                <Shield className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#002F6C] to-[#007849] text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#002F6C]'
                  }
                  ${item.highlight ? 'ring-2 ring-[#007849]/20' : ''}
                `}
              >
                <Icon className={`
                  w-5 h-5 mr-3 transition-colors
                  ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#007849]'}
                `} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.highlight && !isActive && (
                      <span className="text-xs bg-[#007849] text-white px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <p className={`
                    text-xs mt-0.5 
                    ${isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-600'}
                  `}>
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:ml-72">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-[#002F6C]">Dashboard</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}