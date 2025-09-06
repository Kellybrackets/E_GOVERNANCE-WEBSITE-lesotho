"use client"

import React, { useState } from "react"
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  Search, 
  Filter,
  TrendingUp,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  publishedAt: string
  author: string
  category: string
  tags: string[]
  readTime: string
  views: number
  featured: boolean
  urgent: boolean
}

interface NewsGridProps {
  className?: string
  showFilters?: boolean
  maxItems?: number
  featured?: boolean
}

const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Law Society drags Parliament to Constitutional Court over controversial legislation",
    excerpt: "The Law Society of Lesotho has filed a constitutional challenge against Parliament regarding recent legislative changes that affect judicial independence.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-29T14:30:00Z",
    author: "Thabo Mofolo",
    category: "Legal",
    tags: ["Constitutional Court", "Law Society", "Parliament", "Legislation"],
    readTime: "5 min",
    views: 2547,
    featured: true,
    urgent: false
  },
  {
    id: "2", 
    title: "Bantu MMC launches M50 million micro-loan fund for small businesses",
    excerpt: "Bantu Microfinance and Credit Cooperative has announced a new micro-loan initiative to support small and medium enterprises across Lesotho.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-28T09:15:00Z",
    author: "Palesa Ramokoatsi",
    category: "Economy",
    tags: ["Microfinance", "Small Business", "Loans", "Economic Development"],
    readTime: "4 min",
    views: 1823,
    featured: true,
    urgent: false
  },
  {
    id: "3",
    title: "Manufacturers cry foul over surge in brick imports from South Africa",
    excerpt: "Local brick manufacturers are calling for government intervention as cheap imports threaten domestic production and employment.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg", 
    publishedAt: "2024-01-27T11:45:00Z",
    author: "Motlatsi Thabane",
    category: "Economy",
    tags: ["Manufacturing", "Trade", "Imports", "Construction"],
    readTime: "6 min",
    views: 1456,
    featured: false,
    urgent: false
  },
  {
    id: "4",
    title: "Sehlabathebe hydroelectric power project set to resume operations",
    excerpt: "The long-stalled Sehlabathebe power project is expected to resume construction following resolution of funding disputes.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-26T16:20:00Z", 
    author: "Lineo Moletsane",
    category: "Energy",
    tags: ["Hydroelectric", "Energy", "Infrastructure", "Development"],
    readTime: "7 min",
    views: 3102,
    featured: true,
    urgent: false
  },
  {
    id: "5",
    title: "Digital ID system maintenance scheduled for weekend",
    excerpt: "Citizens are advised that digital identity services will be temporarily unavailable during scheduled system upgrades.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-25T13:00:00Z",
    author: "System Administrator",
    category: "Government", 
    tags: ["Digital ID", "Maintenance", "System Update", "eGovernment"],
    readTime: "2 min",
    views: 892,
    featured: false,
    urgent: true
  },
  {
    id: "6",
    title: "New mobile money integration goes live for government payments",
    excerpt: "Citizens can now pay for government services using popular mobile money platforms, making transactions more convenient.",
    content: "Full article content would go here...",
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-24T10:30:00Z",
    author: "Rethabile Mokone",
    category: "Technology",
    tags: ["Mobile Money", "eGovernment", "Digital Payments", "Innovation"],
    readTime: "4 min",
    views: 2156,
    featured: true,
    urgent: false
  }
]

const categories = ["All", "Government", "Legal", "Economy", "Energy", "Technology", "Sports"]

export default function NewsGrid({ className = "", showFilters = true, maxItems, featured = false }: NewsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Legal": "bg-red-100 text-red-700 border-red-200",
      "Economy": "bg-green-100 text-green-700 border-green-200", 
      "Energy": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Government": "bg-blue-100 text-blue-700 border-blue-200",
      "Technology": "bg-purple-100 text-purple-700 border-purple-200",
      "Sports": "bg-orange-100 text-orange-700 border-orange-200"
    }
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just published"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return formatDate(dateString)
  }

  // Filter and sort articles
  let filteredArticles = mockNewsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    const matchesFeatured = !featured || article.featured
    
    return matchesSearch && matchesCategory && matchesFeatured
  })

  // Sort articles
  filteredArticles = filteredArticles.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case "oldest":
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      case "popular":
        return b.views - a.views
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      default:
        return 0
    }
  })

  // Limit items if specified
  if (maxItems && filteredArticles.length > maxItems) {
    filteredArticles = filteredArticles.slice(0, maxItems)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-[#002F6C]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#002F6C]/20 focus:border-[#002F6C]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured</option>
              </select>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-[#002F6C] text-white hover:bg-[#001F4C]"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </span>
            {selectedCategory !== "All" && (
              <span>in {selectedCategory}</span>
            )}
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article, index) => (
          <Link key={article.id} href={`/news/${article.id}`} className="group">
            <Card className="h-full hover-lift card-shadow border-0 bg-white overflow-hidden group-hover:shadow-xl transition-all duration-300">
              {/* Featured Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {article.featured && (
                    <Badge className="bg-[#007849] text-white text-xs">
                      Featured
                    </Badge>
                  )}
                  {article.urgent && (
                    <Badge className="bg-red-600 text-white text-xs animate-pulse">
                      Urgent
                    </Badge>
                  )}
                </div>

                {/* Category */}
                <div className="absolute top-3 right-3">
                  <Badge className={`text-xs border ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </Badge>
                </div>

                {/* Read Time */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#002F6C] transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="space-y-3">
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </div>
                  </div>

                  {/* Stats and Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      {index < 3 && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-[#007849] text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <div key={tag} className="inline-flex items-center">
                        <Tag className="w-2 h-2 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-500">{tag}</span>
                      </div>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{article.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or category filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}