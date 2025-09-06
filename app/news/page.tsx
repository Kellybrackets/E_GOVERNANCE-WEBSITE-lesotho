"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Newspaper, TrendingUp } from "lucide-react"
import Link from "next/link"
import NewsGrid from "@/components/news-grid"
import BreakingNewsBanner from "@/components/breaking-news-banner"

export default function NewsArchivePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breaking News Banner */}
      <BreakingNewsBanner />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-[#002F6C] hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-2xl flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lesotho News & Updates
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest news, government announcements, and important updates from across the Kingdom of Lesotho
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <NewsGrid showFilters={true} />
      </div>
    </div>
  )
}