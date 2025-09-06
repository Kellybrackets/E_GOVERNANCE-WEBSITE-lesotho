"use client"

import React from "react"
import { 
  User, 
  Home, 
  Wallet,
  Grid3X3,
  Bell
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { 
    name: "Home", 
    href: "/home", 
    icon: Home,
    label: "Home",
    activeColor: "#00247D"
  },
  { 
    name: "Services", 
    href: "/dashboard/services", 
    icon: Grid3X3,
    label: "Services",
    activeColor: "#009A49"
  },
  { 
    name: "Wallet", 
    href: "/wallet", 
    icon: Wallet,
    label: "Wallet",
    activeColor: "#00247D"
  },
  { 
    name: "Alerts", 
    href: "/alerts", 
    icon: Bell,
    label: "Alerts",
    activeColor: "#009A49"
  },
  { 
    name: "Profile", 
    href: "/dashboard/profile", 
    icon: User,
    label: "Profile",
    activeColor: "#00247D"
  }
]

export default function EnhancedBottomNavigation() {
  const pathname = usePathname()
  
  const navStyle = {
    position: 'fixed' as const,
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(0, 36, 125, 0.1)',
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'block'
  }

  const isActive = (itemHref: string) => {
    if (itemHref === '/home') {
      return pathname === '/home' || pathname === '/dashboard'
    }
    return pathname === itemHref || pathname.startsWith(itemHref + '/')
  }

  return (
    <nav 
      className="enhanced-bottom-nav md:hidden"
      style={navStyle}
    >
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 ${
                active 
                  ? 'nav-item-active transform-gpu' 
                  : 'text-gray-500 hover:text-[#00247D] hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 mb-1 transition-all duration-300 ${
                    active ? 'text-[#00247D] transform scale-110' : 'text-gray-400'
                  }`} 
                />
                {active && (
                  <div 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: item.activeColor }}
                  />
                )}
              </div>
              <span 
                className={`text-xs font-medium transition-all duration-300 ${
                  active ? 'text-[#00247D] font-semibold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}