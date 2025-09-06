"use client"

import React, { useState, useEffect } from "react"
import { X, AlertTriangle, ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BreakingNews {
  id: string
  title: string
  urgency: "urgent" | "important" | "normal"
  link: string
  publishedAt: string
  canDismiss: boolean
}

const mockBreakingNews: BreakingNews[] = [
  {
    id: "1",
    title: "URGENT: System maintenance scheduled for January 30, 2024 - Services may be temporarily unavailable",
    urgency: "urgent",
    link: "/news/system-maintenance-jan-30-2024",
    publishedAt: "2024-01-29T10:00:00Z",
    canDismiss: true
  },
  {
    id: "2", 
    title: "BREAKING: Law Society drags Parliament to Constitutional Court over controversial legislation",
    urgency: "important",
    link: "/news/law-society-parliament-court-case",
    publishedAt: "2024-01-29T14:30:00Z",
    canDismiss: true
  }
]

export default function BreakingNewsBanner() {
  const [dismissedNews, setDismissedNews] = useState<string[]>([])
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Load dismissed news from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('dismissedBreakingNews')
      if (dismissed) {
        setDismissedNews(JSON.parse(dismissed))
      }
    }
  }, [])

  // Filter out dismissed news
  const activeNews = mockBreakingNews.filter(news => !dismissedNews.includes(news.id))

  // Auto-rotate through news items
  useEffect(() => {
    if (activeNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % activeNews.length)
      }, 8000) // Change every 8 seconds

      return () => clearInterval(interval)
    }
  }, [activeNews.length])

  // Show banner after component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDismiss = (newsId: string) => {
    const updatedDismissed = [...dismissedNews, newsId]
    setDismissedNews(updatedDismissed)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('dismissedBreakingNews', JSON.stringify(updatedDismissed))
    }

    // If we dismissed the current news, move to next
    if (activeNews.length > 1) {
      setCurrentNewsIndex((prev) => prev % (activeNews.length - 1))
    }
  }

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return {
          background: "bg-gradient-to-r from-red-600 to-red-700",
          text: "text-white",
          badge: "bg-red-800/80 text-red-100"
        }
      case "important":
        return {
          background: "bg-gradient-to-r from-amber-600 to-orange-600", 
          text: "text-white",
          badge: "bg-amber-800/80 text-amber-100"
        }
      default:
        return {
          background: "bg-gradient-to-r from-[#002F6C] to-[#007849]",
          text: "text-white",
          badge: "bg-blue-800/80 text-blue-100"
        }
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    return date.toLocaleDateString()
  }

  // Don't render if no active news
  if (activeNews.length === 0) return null

  const currentNews = activeNews[currentNewsIndex]
  const styles = getUrgencyStyles(currentNews.urgency)

  return (
    <div className={`w-full ${styles.background} ${styles.text} relative overflow-hidden transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 breaking-news-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left Side - Breaking News Label */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles.badge} uppercase tracking-wide`}>
                  {currentNews.urgency === 'urgent' ? 'Breaking' : 'News'}
                </span>
              </div>
            </div>
            
            {/* Mobile Badge */}
            <div className="sm:hidden">
              <span className={`px-2 py-1 rounded-md text-xs font-bold ${styles.badge} uppercase`}>
                Breaking
              </span>
            </div>
          </div>

          {/* Center - News Content */}
          <div className="flex-1 mx-4 min-w-0">
            <div className="flex items-center space-x-3">
              <Link 
                href={currentNews.link}
                className="flex-1 min-w-0 group"
              >
                <p className="text-sm md:text-base font-medium group-hover:underline truncate">
                  {currentNews.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/80">
                    {formatTimeAgo(currentNews.publishedAt)}
                  </span>
                  {activeNews.length > 1 && (
                    <>
                      <span className="text-white/60">•</span>
                      <span className="text-xs text-white/80">
                        {currentNewsIndex + 1} of {activeNews.length}
                      </span>
                    </>
                  )}
                </div>
              </Link>

              {/* Read More Button - Desktop */}
              <div className="hidden md:block">
                <Link href={currentNews.link}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/20 hover:text-white bg-transparent"
                  >
                    <span className="text-xs">Read More</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Progress Indicators */}
            {activeNews.length > 1 && (
              <div className="hidden sm:flex items-center space-x-1">
                {activeNews.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    onClick={() => setCurrentNewsIndex(index)}
                    role="button"
                    tabIndex={0}
                  />
                ))}
              </div>
            )}

            {/* Dismiss Button */}
            {currentNews.canDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(currentNews.id)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
                aria-label="Dismiss breaking news"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Read More Button */}
        <div className="md:hidden mt-2 text-center">
          <Link href={currentNews.link}>
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/30 text-white hover:bg-white/20 hover:text-white bg-transparent text-xs"
            >
              Read Full Article
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-8000 ease-linear"
          style={{
            width: activeNews.length > 1 ? '100%' : '0%',
            animation: activeNews.length > 1 ? 'progress 8s linear infinite' : 'none'
          }}
        />
      </div>
    </div>
  )
}