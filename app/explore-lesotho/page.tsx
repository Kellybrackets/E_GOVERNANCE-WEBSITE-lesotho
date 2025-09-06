"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Layers,
  Locate,
  Filter,
  Heart,
  GraduationCap,
  Building2,
  Home,
  Church,
  ShoppingBag,
  Palette,
  Briefcase,
  Bus,
  Wheat,
  Utensils,
  Hospital,
  Users,
  Globe,
  Info,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  RotateCcw,
  ZoomIn,
  Upload,
  Award,
  MessageCircle,
  History,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock locations data - comprehensive dataset
const locationsData = [
  {
    id: 1,
    name: "Maletsunyane Falls",
    type: "tourist",
    coordinates: { lat: -29.8333, lng: 28.0333 },
    district: "Semonkong",
    description: "One of the highest single-drop waterfalls in Southern Africa with breathtaking views.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    phone: "+266 2234 5678",
    hours: "8:00 AM - 6:00 PM",
    trivia: "The falls drop 192 meters, making them higher than Victoria Falls!",
    contact: "info@semonkong.co.ls",
    website: "www.semonkong-tourism.ls",
  },
  {
    id: 2,
    name: "Thaba Bosiu",
    type: "tourist",
    coordinates: { lat: -29.4167, lng: 27.7333 },
    district: "Maseru",
    description: "Historic mountain fortress of King Moshoeshoe I, birthplace of the Basotho nation.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    phone: "+266 2231 2345",
    hours: "9:00 AM - 5:00 PM",
    trivia: "The name means 'Mountain at Night' because it seemed to grow taller in darkness!",
    contact: "heritage@thabaBosiu.gov.ls",
    historicalSignificance: "Founded by King Moshoeshoe I in 1824 as his mountain fortress and the birthplace of the Basotho nation.",
  },
  {
    id: 3,
    name: "Morija Museum & Archives",
    type: "cultural",
    coordinates: { lat: -29.516, lng: 27.584 },
    district: "Maseru",
    description: "Comprehensive collection of Basotho history, culture, and missionary heritage.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    phone: "+266 2236 0308",
    hours: "9:00 AM - 4:00 PM",
    trivia: "Home to the first printing press in Lesotho, established in 1861!",
    contact: "info@morija.ls",
    exhibits: ["Historical documents", "Traditional crafts", "Missionary artifacts"],
    historicalSignificance: "Site of the first Christian mission in Lesotho, founded in 1833 by French missionaries.",
  },
  {
    id: 4,
    name: "Maliba Mountain Lodge Restaurant",
    type: "restaurant",
    coordinates: { lat: -28.7667, lng: 28.2333 },
    district: "Butha-Buthe",
    description: "Fine dining with mountain views and traditional Basotho cuisine.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    phone: "+266 2246 0123",
    hours: "7:00 AM - 10:00 PM",
    trivia: "Serves traditional 'papa' made from locally grown sorghum!",
    contact: "dining@maliba.co.ls",
  },
  {
    id: 5,
    name: "Queen Mamohato Memorial Hospital",
    type: "clinic",
    coordinates: { lat: -29.3167, lng: 27.4833 },
    district: "Maseru",
    description: "Main referral hospital providing comprehensive healthcare services.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    phone: "+266 2231 2501",
    hours: "24 hours",
    trivia: "Named after Queen Mamohato, mother of King Letsie III.",
    contact: "info@qmmh.gov.ls",
  },
  {
    id: 6,
    name: "National University of Lesotho",
    type: "school",
    coordinates: { lat: -29.4667, lng: 27.7333 },
    district: "Maseru",
    description: "Premier institution of higher learning in Lesotho.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    phone: "+266 2234 0601",
    hours: "8:00 AM - 5:00 PM",
    trivia: "Established in 1975, it's the oldest university in Lesotho!",
    contact: "info@nul.ls",
    website: "www.nul.ls",
  },
  {
    id: 7,
    name: "Ha Kome Cave Village",
    type: "village",
    coordinates: { lat: -29.5833, lng: 28.1667 },
    district: "Berea",
    description: "Traditional village built into sandstone caves, population ~200.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    phone: "+266 2245 0123",
    hours: "Daylight hours",
    trivia: "Families have lived in these caves for over 200 years!",
    contact: "chief@hakome.ls",
    population: 200,
    historicalSignificance: "Ancient cave dwellings showcasing traditional Basotho adaptation to mountain living.",
  },
  {
    id: 8,
    name: "Basotho Cultural Village",
    type: "cultural",
    coordinates: { lat: -29.42, lng: 27.74 },
    district: "Maseru",
    description: "Living museum showcasing traditional Basotho lifestyle and customs.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    phone: "+266 2231 5678",
    hours: "8:00 AM - 5:00 PM",
    trivia: "Visitors can learn traditional pottery, weaving, and cooking techniques!",
    contact: "culture@basothovillage.ls",
    exhibits: ["Traditional crafts", "Cultural performances", "Ancient pottery"],
  },
]

const filterTypes = [
  { id: "all", label: "All Places", icon: MapPin, color: "bg-gray-100 text-gray-700" },
  { id: "tourist", label: "Tourist Attractions", icon: Star, color: "bg-purple-100 text-purple-700" },
  { id: "cultural", label: "Cultural Sites", icon: Palette, color: "bg-teal-100 text-teal-700" },
  { id: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  { id: "clinic", label: "Healthcare", icon: Hospital, color: "bg-red-100 text-red-700" },
  { id: "school", label: "Education", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
  { id: "government", label: "Government", icon: Building2, color: "bg-green-100 text-green-700" },
  { id: "village", label: "Villages", icon: Home, color: "bg-yellow-100 text-yellow-700" },
  { id: "religious", label: "Religious Sites", icon: Church, color: "bg-indigo-100 text-indigo-700" },
  { id: "market", label: "Markets", icon: ShoppingBag, color: "bg-pink-100 text-pink-700" },
  { id: "job", label: "Employment", icon: Briefcase, color: "bg-cyan-100 text-cyan-700" },
  { id: "transport", label: "Transport", icon: Bus, color: "bg-violet-100 text-violet-700" },
  { id: "agriculture", label: "Agriculture", icon: Wheat, color: "bg-lime-100 text-lime-700" },
]

// Timeline data for Cultural Heritage
const timelineEvents = [
  {
    year: "1600s",
    title: "Pre-colonial Lesotho",
    description: "Early Basotho settlements in the Caledon Valley, with communities living in harmony with the land.",
    category: "ancient",
    image: "/placeholder.svg?height=300&width=400",
    audio: "Ancient Basotho communities developed sophisticated agricultural and pastoral systems...",
  },
  {
    year: "1822",
    title: "Birth of King Moshoeshoe I",
    description: "The founder of the Basotho nation was born in Menkhoaneng, establishing the foundation of modern Lesotho.",
    category: "royal",
    image: "/placeholder.svg?height=300&width=400",
    audio: "Moshoeshoe I was born during a time of great upheaval in southern Africa...",
  },
  {
    year: "1824",
    title: "Moshoeshoe I Unification",
    description: "King Moshoeshoe I established his mountain fortress at Thaba Bosiu, uniting various clans into the Basotho nation.",
    category: "unification",
    image: "/placeholder.svg?height=300&width=400",
    audio: "The great king chose Thaba Bosiu as his stronghold, a mountain that could be defended...",
  },
  {
    year: "1966",
    title: "Independence Day",
    description: "Lesotho gained independence from Britain on October 4, 1966, with King Moshoeshoe II as head of state.",
    category: "independence",
    image: "/placeholder.svg?height=300&width=400",
    audio: "October 4th, 1966 marked the birth of the modern Kingdom of Lesotho...",
  },
]

const artifacts = [
  {
    id: "mokorotlo",
    name: "Mokorotlo Hat",
    description: "The traditional conical hat made from grass, symbolizing Basotho identity and featured on the national flag.",
    category: "clothing",
    model: "/placeholder.svg?height=300&width=300",
    audio: "The Mokorotlo is more than just a hat - it represents the very essence of being Basotho...",
  },
  {
    id: "blanket",
    name: "Basotho Blanket",
    description: "Traditional blankets with unique patterns that tell stories and indicate social status within Basotho society.",
    category: "clothing",
    model: "/placeholder.svg?height=300&width=300",
    audio: "Each pattern on a Basotho blanket tells a story, passed down through generations...",
  },
]

const communityData = {
  topRated: [
    { name: "Maletsunyane Falls", rating: 4.8, votes: 1234, type: "tourist" },
    { name: "Thaba Bosiu", rating: 4.6, votes: 987, type: "tourist" },
    { name: "Morija Museum", rating: 4.6, votes: 654, type: "cultural" },
    { name: "Ha Kome Cave Village", rating: 4.5, votes: 432, type: "village" },
  ],
  events: [
    { title: "Morija Arts Festival", date: "2024-02-15", location: "Morija", type: "Cultural" },
    { title: "Mountain Marathon", date: "2024-02-20", location: "Semonkong", type: "Sports" },
    { title: "Cultural Heritage Day", date: "2024-02-25", location: "Thaba Bosiu", type: "Heritage" },
  ],
  opportunities: [
    { title: "Youth Environmental Program", type: "Volunteer", location: "Maseru", contact: "env@youth.ls" },
    { title: "Cultural Heritage Guide Training", type: "Employment", location: "Morija", contact: "guides@morija.ls" },
    { title: "Traditional Crafts Workshop", type: "Skills", location: "Basotho Cultural Village", contact: "crafts@culture.ls" },
  ],
  featuredContent: [
    { title: "The Story Behind Thaba Bosiu", type: "Historical Site", description: "Discover the legendary mountain fortress" },
    { title: "Traditional Mokorotlo Making", type: "Cultural Craft", description: "Learn about the iconic Basotho hat" },
    { title: "Ancient Cave Dwellings", type: "Archaeological Site", description: "Explore Ha Kome's living history" },
  ],
}

// Interactive Map Component
const InteractiveMap = ({
  locations,
  selectedLocation,
  onLocationSelect,
  mapStyle,
  userLocation,
}: {
  locations: typeof locationsData
  selectedLocation: (typeof locationsData)[0] | null
  onLocationSelect: (location: (typeof locationsData)[0]) => void
  mapStyle: string
  userLocation: { lat: number; lng: number } | null
}) => {
  const getFilterIcon = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.icon : MapPin
  }

  return (
    <div className="relative h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      <Image
        src="/placeholder.svg?height=600&width=800"
        alt="Interactive map of Lesotho"
        width={800}
        height={600}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium capitalize flex items-center">
            <Layers className="w-4 h-4 mr-1" />
            {mapStyle} View
          </p>
        </div>

        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-blue-200 rounded-full absolute -top-2 -left-2 animate-ping opacity-75"></div>
            </div>
          </div>
        )}

        {locations.slice(0, 8).map((location, index) => {
          const IconComponent = getFilterIcon(location.type)
          const isSelected = selectedLocation?.id === location.id

          return (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-all duration-200 ${
                isSelected ? "bg-red-500 ring-4 ring-red-200 scale-110" : "bg-[#002366] hover:bg-blue-700"
              }`}
              style={{
                top: `${15 + (index % 4) * 20}%`,
                left: `${15 + Math.floor(index / 4) * 20}%`,
              }}
              title={location.name}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          )
        })}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white bg-black bg-opacity-40 p-6 rounded-lg">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Explore Lesotho</h3>
            <p className="text-lg mb-2">Click on markers to discover places and culture</p>
            <Badge className="bg-white text-[#002366]">{locations.length} locations available</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExploreLesothoPage() {
  const [activeTab, setActiveTab] = useState("places")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof locationsData)[0] | null>(null)
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0])
  const [bookmarkedLocations, setBookmarkedLocations] = useState<number[]>([])
  const [mapStyle, setMapStyle] = useState("roadmap")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Load bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("bookmarkedLocations")
      if (saved) {
        setBookmarkedLocations(JSON.parse(saved))
      }
    }
  }, [])

  // Save bookmarks to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("bookmarkedLocations", JSON.stringify(bookmarkedLocations))
    }
  }, [bookmarkedLocations])

  const handleFilterToggle = (filterId: string) => {
    if (filterId === "all") {
      setSelectedFilters(["all"])
    } else {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter((f) => f !== "all")
        if (newFilters.includes(filterId)) {
          const updated = newFilters.filter((f) => f !== filterId)
          return updated.length === 0 ? ["all"] : updated
        } else {
          return [...newFilters, filterId]
        }
      })
    }
  }

  // Enhanced search that works across both places and cultural content
  const filteredLocations = locationsData.filter((location) => {
    const matchesFilter = selectedFilters.includes("all") || selectedFilters.includes(location.type)
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      location.name.toLowerCase().includes(searchLower) ||
      location.description.toLowerCase().includes(searchLower) ||
      location.district.toLowerCase().includes(searchLower) ||
      location.type.toLowerCase().includes(searchLower) ||
      (location.historicalSignificance && location.historicalSignificance.toLowerCase().includes(searchLower)) ||
      (location.exhibits && location.exhibits.some(exhibit => exhibit.toLowerCase().includes(searchLower)))
    return matchesFilter && matchesSearch
  })

  // Search also works for timeline events and artifacts
  const filteredTimelineEvents = timelineEvents.filter((event) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.year.includes(searchQuery)
    )
  })

  const filteredArtifacts = artifacts.filter((artifact) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      artifact.name.toLowerCase().includes(searchLower) ||
      artifact.description.toLowerCase().includes(searchLower) ||
      artifact.category.toLowerCase().includes(searchLower)
    )
  })

  const toggleBookmark = (locationId: number) => {
    setBookmarkedLocations((prev) =>
      prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId],
    )
  }

  const handleUseMyLocation = () => {
    setUserLocation({ lat: -29.3167, lng: 27.4833 })
    const nearbyLocation = locationsData.find((loc) => loc.district === "Maseru")
    if (nearbyLocation) setSelectedLocation(nearbyLocation)
  }

  const getFilterIcon = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.icon : MapPin
  }

  const getFilterColor = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.color : "bg-gray-100 text-gray-700"
  }

  const cycleMapStyle = () => {
    const styles = ["roadmap", "satellite", "dark"]
    const currentIndex = styles.indexOf(mapStyle)
    const nextIndex = (currentIndex + 1) % styles.length
    setMapStyle(styles[nextIndex])
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "royal": return "bg-purple-100 text-purple-700"
      case "ancient": return "bg-amber-100 text-amber-700"
      case "unification": return "bg-blue-100 text-blue-700"
      case "independence": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const nextTimelineEvent = () => {
    setSelectedTimelineEvent((prev) => (prev + 1) % filteredTimelineEvents.length)
  }

  const prevTimelineEvent = () => {
    setSelectedTimelineEvent((prev) => (prev - 1 + filteredTimelineEvents.length) % filteredTimelineEvents.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <div className="bg-gradient-to-br from-[#002F6C] via-[#003d7a] to-[#007849] text-white py-16">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <button className="flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Know Lesotho</h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-light leading-relaxed max-w-4xl mx-auto">
              Your complete guide to exploring the Kingdom's places, services, history, and culture
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Unified Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Search locations, historical events, artifacts, or culture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-300 focus:border-[#002366] rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => setActiveTab("places")}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "places"
                    ? "bg-[#002366] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#002366]"
                }`}
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Map Explorer
              </button>
              <button
                onClick={() => setActiveTab("heritage")}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "heritage"
                    ? "bg-[#002366] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#002366]"
                }`}
              >
                <History className="w-5 h-5 inline mr-2" />
                Cultural Heritage
              </button>
            </div>
          </div>
        </div>

        {/* Places & Services Tab */}
        {activeTab === "places" && (
          <>
            {/* Map Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleUseMyLocation}>
                    <Locate className="w-4 h-4 mr-2" />
                    My Location
                  </Button>
                  <Button variant="outline" onClick={cycleMapStyle}>
                    <Layers className="w-4 h-4 mr-2" />
                    {mapStyle === "roadmap" ? "Satellite" : mapStyle === "satellite" ? "Dark" : "Roadmap"}
                  </Button>
                  <Button variant="outline">
                    <Globe className="w-4 h-4 mr-2" />
                    Full Screen
                  </Button>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {filterTypes.map((filter) => {
                  const IconComponent = filter.icon
                  const isSelected = selectedFilters.includes(filter.id)
                  const count = filter.id === "all" ? locationsData.length : locationsData.filter((l) => l.type === filter.id).length

                  return (
                    <Button
                      key={filter.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterToggle(filter.id)}
                      className={`${isSelected ? "bg-[#002366] hover:bg-blue-800" : ""} transition-all`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {filter.label}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Map Area */}
              <div className="lg:col-span-3">
                <Card className="h-[600px]">
                  <CardContent className="p-0 h-full">
                    <InteractiveMap
                      locations={filteredLocations}
                      selectedLocation={selectedLocation}
                      onLocationSelect={setSelectedLocation}
                      mapStyle={mapStyle}
                      userLocation={userLocation}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Discover Sidebar */}
              <div className="space-y-6">
                {/* Selected Location */}
                {selectedLocation && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                          <p className="text-gray-600">{selectedLocation.district} District</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getFilterColor(selectedLocation.type)}>{selectedLocation.type}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(selectedLocation.id)}
                            className="p-1"
                          >
                            {bookmarkedLocations.includes(selectedLocation.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-[#002366]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={selectedLocation.image || "/placeholder.svg"}
                        alt={selectedLocation.name}
                        width={300}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />

                      <p className="text-gray-700 mb-4">{selectedLocation.description}</p>

                      {selectedLocation.historicalSignificance && (
                        <div className="bg-amber-50 p-3 rounded-lg mb-4">
                          <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                            <History className="w-4 h-4 mr-1" />
                            Historical Significance
                          </h4>
                          <p className="text-sm text-amber-800">{selectedLocation.historicalSignificance}</p>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{selectedLocation.rating}</span>
                          <span className="text-gray-600">rating</span>
                        </div>

                        {selectedLocation.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{selectedLocation.phone}</span>
                          </div>
                        )}

                        {selectedLocation.hours && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{selectedLocation.hours}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <h4 className="font-semibold text-blue-900 mb-1 flex items-center">
                          <Info className="w-4 h-4 mr-1" />
                          Did You Know?
                        </h4>
                        <p className="text-sm text-blue-800">{selectedLocation.trivia}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#002366] hover:bg-blue-800">
                          <Navigation className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                        {selectedLocation.phone && (
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Citizen Favorites */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Citizen Favorites</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityData.topRated.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm">{item.rating}</span>
                            <span className="text-xs text-gray-500">({item.votes} votes)</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <Heart className="w-4 h-4 text-red-500" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Search Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Search Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Locations Found:</span>
                        <span className="font-semibold">{filteredLocations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bookmarked:</span>
                        <span className="font-semibold">{bookmarkedLocations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Districts Covered:</span>
                        <span className="font-semibold">{new Set(filteredLocations.map((l) => l.district)).size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Cultural Heritage Tab */}
        {activeTab === "heritage" && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Heritage Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Timeline */}
              {(!searchQuery || filteredTimelineEvents.length > 0) && (
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#002366] flex items-center">
                      <History className="w-6 h-6 mr-2" />
                      Historical Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      <div className="relative h-64 lg:h-96">
                        <Image
                          src={filteredTimelineEvents[selectedTimelineEvent]?.image || "/placeholder.svg"}
                          alt={filteredTimelineEvents[selectedTimelineEvent]?.title || "Historical event"}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge className={getCategoryColor(filteredTimelineEvents[selectedTimelineEvent]?.category || "ancient")}>
                            {filteredTimelineEvents[selectedTimelineEvent]?.category || "historical"}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-[#002366]" />
                            <span className="text-2xl font-bold text-[#002366]">
                              {filteredTimelineEvents[selectedTimelineEvent]?.year || ""}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={prevTimelineEvent} disabled={filteredTimelineEvents.length === 0}>
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={nextTimelineEvent} disabled={filteredTimelineEvents.length === 0}>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-4">{filteredTimelineEvents[selectedTimelineEvent]?.title || ""}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          {filteredTimelineEvents[selectedTimelineEvent]?.description || ""}
                        </p>

                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm" onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
                            {isAudioPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                            {isAudioPlaying ? "Stop Audio" : "Play Audio"}
                          </Button>
                        </div>

                        <div className="flex justify-center mt-6 space-x-2">
                          {filteredTimelineEvents.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTimelineEvent(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                index === selectedTimelineEvent ? "bg-[#002366]" : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Artifacts */}
              {(!searchQuery || filteredArtifacts.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#002366] flex items-center">
                      <Palette className="w-6 h-6 mr-2" />
                      Traditional Artifacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredArtifacts.map((artifact) => (
                        <Card 
                          key={artifact.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedArtifact.id === artifact.id ? "ring-2 ring-[#002366]" : ""
                          }`}
                          onClick={() => setSelectedArtifact(artifact)}
                        >
                          <CardContent className="p-4">
                            <Image
                              src={artifact.model || "/placeholder.svg"}
                              alt={artifact.name}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-bold mb-2">{artifact.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{artifact.category}</p>
                            <p className="text-sm">{artifact.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Heritage Sidebar */}
            <div className="space-y-6">
              {/* Featured Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Featured Heritage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityData.featuredContent.map((content, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-medium text-sm">{content.title}</p>
                      <Badge variant="outline" className="text-xs">{content.type}</Badge>
                      <p className="text-xs text-gray-600">{content.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cultural Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cultural Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityData.events.map((event, index) => (
                    <div key={index} className="border-l-4 border-[#002366] pl-3">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Get Involved */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Get Involved</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityData.opportunities.map((opp, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-medium">{opp.title}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {opp.type}
                        </Badge>
                        <span className="text-sm text-gray-600">{opp.location}</span>
                      </div>
                      <p className="text-xs text-gray-500">{opp.contact}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}