"use client"

import React, { useState, useRef } from "react"
import { 
  Search, 
  Mic, 
  Camera,
  Filter,
  Clock,
  TrendingUp,
  FileText,
  CreditCard,
  MapPin,
  GraduationCap,
  Building,
  Heart
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SearchServicesProps {
  className?: string
}

export default function SearchServices({ className = "" }: SearchServicesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickServices = [
    {
      icon: FileText,
      title: "National ID",
      description: "Apply or renew identity document",
      category: "Identity",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: CreditCard,
      title: "Tax Filing",
      description: "File returns & pay taxes",
      category: "Finance",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: MapPin,
      title: "Land Registration",
      description: "Property titles & registrations",
      category: "Property",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: GraduationCap,
      title: "Education Certificates",
      description: "Academic credentials",
      category: "Education",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      icon: Building,
      title: "Business License",
      description: "Register your business",
      category: "Business",
      color: "bg-orange-100 text-orange-700"
    },
    {
      icon: Heart,
      title: "Health Services",
      description: "Medical records & appointments",
      category: "Healthcare",
      color: "bg-red-100 text-red-700"
    }
  ]

  const popularSearches = [
    "National ID application",
    "Tax certificate",
    "Birth certificate",
    "Passport renewal",
    "Business registration",
    "Land title search"
  ]

  const recentSearches = [
    "How to apply for passport",
    "Check application status",
    "Tax filing deadline"
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
      setShowSuggestions(false)
    }
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Implement voice search functionality
    setTimeout(() => {
      setIsListening(false)
    }, 3000)
  }

  const handleCameraSearch = () => {
    // Implement camera search functionality
    console.log('Camera search triggered')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    handleSearch()
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="search-bar rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-[#00247D] flex-shrink-0" />
            
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for services, documents, or information..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-500 focus:ring-0"
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceSearch}
                className={`p-2 hover:bg-gray-100 ${isListening ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCameraSearch}
                className="p-2 hover:bg-gray-100 text-gray-600"
              >
                <Camera className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 text-gray-600"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl z-50 border-0">
            <CardContent className="p-4">
              {searchQuery && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular Searches
                  </h4>
                  <div className="space-y-2">
                    {popularSearches
                      .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 3)
                      .map((item, index) => (
                        <button
                          key={index}
                          onClick={() => selectSuggestion(item)}
                          className="w-full text-left text-sm text-gray-600 hover:text-[#00247D] hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          {item}
                        </button>
                      ))
                    }
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h4>
                <div className="space-y-2">
                  {recentSearches.slice(0, 3).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(item)}
                      className="w-full text-left text-sm text-gray-500 hover:text-[#00247D] hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#00247D]">Quick Access</h3>
          <Button variant="ghost" size="sm" className="text-[#009A49] hover:text-[#007A39]">
            View All Services
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Card 
                key={index} 
                className="hover-lift cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{service.title}</h4>
                  <p className="text-gray-600 text-xs">{service.description}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}