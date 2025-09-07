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
  X,
  Share,
  Eye,
  Mountain,
  TreePine,
  Camera,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Districts of Lesotho with comprehensive information
const districtsData = [
  {
    id: "maseru",
    name: "Maseru",
    description: "Capital district and cultural heart of Lesotho",
    highlights: ["Thaba Bosiu", "Roma Valley", "Morija Museum", "Basotho Cultural Village"],
    specialties: ["Traditional crafts", "Historical sites", "Modern amenities", "Government services"],
    population: "431,998",
    bestTime: "Year-round",
    keyFacts: "Home to the capital city and most government institutions",
    coordinates: { lat: -29.3167, lng: 27.4833 },
  },
  {
    id: "berea",
    name: "Berea",
    description: "Agricultural heartland with ancient cave villages",
    highlights: ["Ha Kome Cave Village", "Teyateyaneng Crafts", "Agricultural Centers"],
    specialties: ["Cave dwellings", "Pottery", "Weaving", "Traditional farming"],
    population: "250,006",
    bestTime: "April to October",
    keyFacts: "Known for its ancient cave villages and traditional crafts",
    coordinates: { lat: -29.2333, lng: 27.9167 },
  },
  {
    id: "leribe",
    name: "Leribe",
    description: "Mountain kingdom gateway with spectacular passes",
    highlights: ["Hlotse", "Subeng River", "Mountain Passes", "Traditional Villages"],
    specialties: ["Mountain tourism", "Traditional blankets", "Horse trekking", "River activities"],
    population: "337,500",
    bestTime: "October to April",
    keyFacts: "Gateway to the mountain kingdom with stunning natural beauty",
    coordinates: { lat: -28.8833, lng: 28.0333 },
  },
  {
    id: "butha-buthe",
    name: "Butha-Buthe",
    description: "Northern frontier with Drakensberg beauty",
    highlights: ["Oxbow", "Afriski Mountain Resort", "Maliba Mountain Lodge", "Alpine Tourism"],
    specialties: ["Skiing", "Mountain lodges", "Adventure tourism", "Alpine activities"],
    population: "110,320",
    bestTime: "May to September (skiing), October to April (hiking)",
    keyFacts: "Home to Southern Africa's premier ski resort",
    coordinates: { lat: -28.7667, lng: 28.2333 },
  },
  {
    id: "mafeteng",
    name: "Mafeteng",
    description: "Agricultural center and traditional lifestyle",
    highlights: ["Van Rooyens Gate", "Agricultural Shows", "Traditional Markets"],
    specialties: ["Agriculture", "Traditional ceremonies", "Local markets", "Rural tourism"],
    population: "178,222",
    bestTime: "March to October",
    keyFacts: "Important agricultural district known for traditional farming",
    coordinates: { lat: -29.8167, lng: 27.2333 },
  },
  {
    id: "mohales-hoek",
    name: "Mohale's Hoek",
    description: "Southern charm with rich cultural heritage",
    highlights: ["Quthing Cultural Sites", "Traditional Villages", "Rock Art"],
    specialties: ["Rock art", "Traditional music", "Cultural festivals", "Archaeological sites"],
    population: "176,119",
    bestTime: "April to October",
    keyFacts: "Rich in archaeological sites and traditional culture",
    coordinates: { lat: -30.1500, lng: 27.4833 },
  },
  {
    id: "mokhotlong",
    name: "Mokhotlong",
    description: "Remote highlands and traditional Basotho life",
    highlights: ["Sani Pass", "Highland Villages", "Traditional Architecture", "Mountain Culture"],
    specialties: ["Highland tourism", "Traditional huts", "Pony trekking", "Remote villages"],
    population: "97,713",
    bestTime: "October to March",
    keyFacts: "Highest and most remote district, preserving ancient traditions",
    coordinates: { lat: -29.2833, lng: 29.0667 },
  },
  {
    id: "qacha-s-nek",
    name: "Qacha's Nek",
    description: "Southeastern mountains and natural wonders",
    highlights: ["Sehlabathebe National Park", "Rock Formations", "Wilderness Areas"],
    specialties: ["National park", "Hiking trails", "Wildlife", "Rock formations"],
    population: "69,749",
    bestTime: "September to April",
    keyFacts: "Home to Lesotho's only national park",
    coordinates: { lat: -30.1167, lng: 28.6833 },
  },
  {
    id: "quthing",
    name: "Quthing",
    description: "Dinosaur footprints and ancient history",
    highlights: ["Dinosaur Footprints", "Moyeni", "Historical Sites", "Fossil Discoveries"],
    specialties: ["Paleontology", "Dinosaur tracks", "Archaeological sites", "Ancient history"],
    population: "124,048",
    bestTime: "Year-round",
    keyFacts: "Famous for dinosaur footprints and prehistoric discoveries",
    coordinates: { lat: -30.4000, lng: 27.7000 },
  },
  {
    id: "thaba-tseka",
    name: "Thaba-Tseka",
    description: "Central highlands and traditional mountain culture",
    highlights: ["Katse Dam", "Highland Villages", "Mountain Peaks", "Traditional Lifestyle"],
    specialties: ["Dam tourism", "Mountain climbing", "Traditional lifestyle", "Highland culture"],
    population: "129,137",
    bestTime: "October to March",
    keyFacts: "Central highlands with Africa's highest major dam",
    coordinates: { lat: -29.5167, lng: 28.6167 },
  },
]

// Comprehensive Maseru District Data
const maseruDistrictData = {
  id: "maseru",
  name: "Maseru",
  fullTitle: "Maseru - Capital District and Cultural Heart of Lesotho",
  description: "The vibrant capital district where modern governance meets ancient tradition, offering world-class amenities alongside rich cultural heritage.",
  heroImages: [
    "/placeholder.svg?height=400&width=600&text=Maseru+Cityscape",
    "/placeholder.svg?height=400&width=600&text=Thaba+Bosiu+Mountain",
    "/placeholder.svg?height=400&width=600&text=Government+Buildings",
    "/placeholder.svg?height=400&width=600&text=Cultural+Village"
  ],
  keyFacts: [
    { icon: Users, label: "Population", value: "431,998", description: "Largest district in Lesotho" },
    { icon: MapPin, label: "Area", value: "4,279 km²", description: "14% of Lesotho's total area" },
    { icon: Globe, label: "Languages", value: "Sesotho, English", description: "Official languages" },
    { icon: Mountain, label: "Elevation", value: "1,400m - 3,482m", description: "Varied topography" }
  ],
  attractions: [
    {
      id: 1,
      name: "Thaba Bosiu",
      category: "Historical Site",
      image: "/placeholder.svg?height=200&width=300&text=Thaba+Bosiu",
      shortDescription: "Sacred mountain fortress of King Moshoeshoe I",
      fullDescription: "The 'Mountain at Night' is the birthplace of the Basotho nation, founded by King Moshoeshoe I in 1824. This flat-topped sandstone plateau served as an impregnable fortress and the spiritual center of the Basotho people.",
      highlights: ["Royal graves", "Stone fortifications", "Cultural performances", "Panoramic views"],
      visitInfo: {
        hours: "9:00 AM - 5:00 PM",
        entryFee: "M15 adults, M5 children",
        bestTime: "April to October",
        duration: "2-3 hours"
      },
      rating: 4.8,
      activities: ["Guided tours", "Cultural shows", "Photography", "Heritage walks"]
    },
    {
      id: 2,
      name: "Morija Museum & Archives",
      category: "Cultural Site",
      image: "/placeholder.svg?height=200&width=300&text=Morija+Museum",
      shortDescription: "Premier collection of Basotho heritage",
      fullDescription: "Established at the site of the first Christian mission in Lesotho, this museum houses the most comprehensive collection of Basotho history, culture, and missionary heritage.",
      highlights: ["Historical artifacts", "Traditional crafts", "Missionary heritage", "First printing press"],
      visitInfo: {
        hours: "9:00 AM - 4:00 PM",
        entryFee: "M20 adults, M10 children",
        bestTime: "Year-round",
        duration: "1-2 hours"
      },
      rating: 4.6,
      activities: ["Museum tours", "Archive research", "Cultural workshops", "Educational programs"]
    },
    {
      id: 3,
      name: "Roma Valley",
      category: "Natural Beauty",
      image: "/placeholder.svg?height=200&width=300&text=Roma+Valley",
      shortDescription: "Scenic valley with educational institutions",
      fullDescription: "A picturesque valley home to the National University of Lesotho and renowned for its natural beauty, academic atmosphere, and outdoor recreation opportunities.",
      highlights: ["University campus", "Valley views", "Rock formations", "Academic heritage"],
      visitInfo: {
        hours: "Daylight hours",
        entryFee: "Free",
        bestTime: "March to October",
        duration: "Half day"
      },
      rating: 4.4,
      activities: ["Campus tours", "Hiking", "Photography", "Bird watching"]
    },
    {
      id: 4,
      name: "Basotho Cultural Village",
      category: "Living Heritage",
      image: "/placeholder.svg?height=200&width=300&text=Cultural+Village",
      shortDescription: "Traditional Basotho lifestyle experience",
      fullDescription: "A living museum that showcases traditional Basotho architecture, customs, and daily life, offering visitors an authentic cultural immersion experience.",
      highlights: ["Traditional huts", "Cultural demonstrations", "Craft workshops", "Traditional food"],
      visitInfo: {
        hours: "8:00 AM - 5:00 PM",
        entryFee: "M25 adults, M12 children",
        bestTime: "Year-round",
        duration: "2-3 hours"
      },
      rating: 4.5,
      activities: ["Cultural tours", "Traditional dancing", "Craft making", "Storytelling"]
    }
  ],
  dining: [
    {
      name: "Panorama Restaurant",
      type: "Fine Dining",
      cuisine: "International & Local",
      priceRange: "M150 - M300",
      highlights: ["City views", "Local dishes", "Wine selection"]
    },
    {
      name: "Semonkong Restaurant",
      type: "Traditional",
      cuisine: "Basotho Traditional",
      priceRange: "M80 - M150",
      highlights: ["Papa & morogo", "Traditional beer", "Cultural ambiance"]
    },
    {
      name: "Roma Trading Post",
      type: "Casual Dining",
      cuisine: "Fusion",
      priceRange: "M60 - M120",
      highlights: ["Student favorite", "Local ingredients", "Casual atmosphere"]
    }
  ],
  culture: [
    {
      aspect: "Traditional Crafts",
      description: "Maseru is the center for traditional Basotho crafts including blanket weaving, pottery, and beadwork.",
      locations: ["Basotho Hat", "Cultural Village", "Local markets"]
    },
    {
      aspect: "Modern Arts",
      description: "Contemporary art scene with galleries, theaters, and cultural events.",
      locations: ["Alliance Française", "University venues", "Cultural centers"]
    },
    {
      aspect: "Royal Heritage",
      description: "Home to royal palaces and ceremonial sites of the Basotho monarchy.",
      locations: ["Royal Palace", "Thaba Bosiu", "Cultural sites"]
    }
  ],
  practicalInfo: {
    transport: [
      "Moshoeshoe I International Airport (18km)",
      "Regular bus services",
      "Taxi services available",
      "Car rental agencies"
    ],
    accommodation: [
      "Luxury: Maseru Sun, Avani Maseru",
      "Mid-range: City Lodge, Katze Lodge",
      "Budget: Backpacker lodges, Guesthouses"
    ],
    shopping: [
      "Maseru Mall - Modern shopping",
      "Pioneer Mall - Local and international brands",
      "Traditional markets - Crafts and local goods",
      "Basotho Hat - Traditional crafts"
    ],
    healthcare: [
      "Queen Mamohato Memorial Hospital",
      "Private medical centers",
      "Pharmacies throughout the city"
    ]
  },
  bestTimeToVisit: {
    peak: { months: ["April", "May", "September", "October"], description: "Perfect weather, clear skies" },
    good: { months: ["March", "November"], description: "Good weather, fewer crowds" },
    low: { months: ["June", "July", "August"], description: "Cold but clear, winter activities" },
    avoid: { months: ["December", "January", "February"], description: "Rainy season, some roads difficult" }
  },
  regionalSpecialties: [
    { name: "Traditional Crafts", icon: Palette, description: "Basotho blankets, pottery, beadwork" },
    { name: "Historical Sites", icon: Building2, description: "Royal heritage, cultural landmarks" },
    { name: "Modern Amenities", icon: Globe, description: "Shopping, dining, entertainment" },
    { name: "Government Services", icon: Users, description: "Administrative centers, embassies" }
  ]
}

// Enhanced locations data with district organization and tourism focus
const locationsData = [
  {
    id: 1,
    name: "Maletsunyane Falls",
    type: "tourist",
    coordinates: { lat: -29.8333, lng: 28.0333 },
    district: "Thaba-Tseka",
    description: "One of the highest single-drop waterfalls in Southern Africa with breathtaking views.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    phone: "+266 2234 5678",
    hours: "8:00 AM - 6:00 PM",
    trivia: "The falls drop 192 meters, making them higher than Victoria Falls!",
    contact: "info@semonkong.co.ls",
    website: "www.semonkong-tourism.ls",
    culturalSignificance: "Sacred waterfall traditionally used for rainmaking ceremonies",
    activities: ["Photography", "Abseiling", "Hiking", "Pony trekking"],
    amenities: ["Parking", "Restrooms", "Gift shop", "Guide services"],
    accessibility: "Moderate hiking required",
    bestTimeToVisit: "November to March (rainy season for maximum flow)",
    entryFee: "M20 for adults, M10 for children",
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
    culturalSignificance: "Sacred birthplace of the Basotho nation and spiritual center",
    activities: ["Historical tours", "Photography", "Cultural performances", "Heritage walks"],
    amenities: ["Visitor center", "Parking", "Restrooms", "Gift shop", "Museum"],
    accessibility: "Wheelchair accessible paths available",
    bestTimeToVisit: "April to October (cooler weather)",
    entryFee: "M15 for adults, M5 for children",
    audioGuide: "Available in English and Sesotho",
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

// Tourism-focused filter types
const filterTypes = [
  { id: "all", label: "All Places", icon: MapPin, color: "bg-gray-100 text-gray-700" },
  { id: "tourist", label: "Tourist Attractions", icon: Star, color: "bg-purple-100 text-purple-700" },
  { id: "cultural", label: "Cultural Sites", icon: Palette, color: "bg-teal-100 text-teal-700" },
  { id: "restaurant", label: "Dining", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  { id: "accommodation", label: "Accommodation", icon: Building2, color: "bg-blue-100 text-blue-700" },
  { id: "adventure", label: "Adventure Sports", icon: Award, color: "bg-green-100 text-green-700" },
  { id: "nature", label: "Nature & Wildlife", icon: MapPin, color: "bg-emerald-100 text-emerald-700" },
  { id: "village", label: "Traditional Villages", icon: Home, color: "bg-yellow-100 text-yellow-700" },
  { id: "religious", label: "Religious Sites", icon: Church, color: "bg-indigo-100 text-indigo-700" },
  { id: "market", label: "Markets & Shopping", icon: ShoppingBag, color: "bg-pink-100 text-pink-700" },
  { id: "transport", label: "Transportation", icon: Bus, color: "bg-violet-100 text-violet-700" },
  { id: "health", label: "Healthcare", icon: Hospital, color: "bg-red-100 text-red-700" },
]

// Interest-based tourism filters
const interestFilters = [
  { id: "adventure", label: "Adventure Tourism", icon: Award, description: "Hiking, skiing, mountain climbing" },
  { id: "cultural", label: "Cultural Tourism", icon: Palette, description: "History, traditions, heritage sites" },
  { id: "eco", label: "Eco-Tourism", icon: MapPin, description: "Nature, wildlife, conservation" },
  { id: "religious", label: "Religious Tourism", icon: Church, description: "Spiritual sites, pilgrimages" },
  { id: "family", label: "Family-Friendly", icon: Users, description: "Activities suitable for all ages" },
  { id: "photography", label: "Photography", icon: Star, description: "Scenic viewpoints, unique landscapes" },
]

// Activity-based filters
const activityFilters = [
  { id: "hiking", label: "Hiking & Trekking", icon: Award, description: "Mountain trails and nature walks" },
  { id: "pony", label: "Pony Trekking", icon: Award, description: "Traditional Basotho horse rides" },
  { id: "skiing", label: "Skiing", icon: Award, description: "Alpine skiing at Afriski Resort" },
  { id: "cultural-tours", label: "Cultural Tours", icon: Palette, description: "Heritage and cultural experiences" },
  { id: "photography", label: "Photography", icon: Star, description: "Scenic and cultural photography" },
  { id: "birdwatching", label: "Bird Watching", icon: MapPin, description: "Endemic and migratory species" },
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

// Comprehensive Events & Festivals Data
const eventsData = [
  {
    id: 1,
    name: "Morija Arts & Cultural Festival",
    date: "2024-09-28 to 2024-09-30",
    location: "Morija",
    district: "Maseru",
    type: "Cultural Festival",
    description: "Lesotho's premier arts festival celebrating music, literature, and traditional crafts.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Traditional music", "Literary competitions", "Craft exhibitions", "Cultural performances"],
    ticketPrice: "M50 - M200",
    duration: "3 days",
    expectedAttendees: "15,000+",
    activities: ["Live music", "Poetry readings", "Traditional dance", "Art exhibitions", "Food stalls"]
  },
  {
    id: 2,
    name: "Lesotho Sky Marathon",
    date: "2024-11-15",
    location: "Semonkong",
    district: "Maseru",
    type: "Sports Event",
    description: "High-altitude marathon through Lesotho's mountainous terrain with breathtaking views.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["21km and 42km races", "Mountain terrain", "International participants", "Prize money"],
    ticketPrice: "M150 - M300",
    duration: "1 day",
    expectedAttendees: "2,000+",
    activities: ["Marathon race", "Half marathon", "10K fun run", "Community celebration"]
  },
  {
    id: 3,
    name: "Thaba Bosiu Cultural Day",
    date: "2024-10-04",
    location: "Thaba Bosiu",
    district: "Maseru",
    type: "National Holiday",
    description: "Annual commemoration of King Moshoeshoe I and Basotho heritage at the historic mountain fortress.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Historical reenactments", "Traditional ceremonies", "Royal performances", "Heritage tours"],
    ticketPrice: "Free",
    duration: "1 day",
    expectedAttendees: "10,000+",
    activities: ["Cultural ceremonies", "Traditional music", "Heritage walks", "Royal exhibitions"]
  },
  {
    id: 4,
    name: "Afriski Mountain Festival",
    date: "2024-07-20 to 2024-07-22",
    location: "Afriski Mountain Resort",
    district: "Butha-Buthe",
    type: "Music & Adventure",
    description: "High-altitude music festival combining international acts with adventure sports in the mountains.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["International DJs", "Skiing competitions", "Mountain biking", "Alpine experiences"],
    ticketPrice: "M400 - M800",
    duration: "3 days",
    expectedAttendees: "5,000+",
    activities: ["Live concerts", "DJ sets", "Skiing", "Snowboarding", "Mountain activities"]
  },
  {
    id: 5,
    name: "Bushman Heritage Festival",
    date: "2024-08-12 to 2024-08-14",
    location: "Ha Baroana",
    district: "Qacha's Nek",
    type: "Heritage Festival",
    description: "Celebrating the ancient San/Bushman culture with rock art, traditional hunting, and storytelling.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Rock art tours", "Traditional hunting demos", "Storytelling", "Ancient crafts"],
    ticketPrice: "M80 - M150",
    duration: "3 days",
    expectedAttendees: "1,500+",
    activities: ["Rock art viewing", "Cultural workshops", "Traditional crafts", "Storytelling sessions"]
  },
  {
    id: 6,
    name: "Maletsunyane Canopy Tour Festival",
    date: "2024-12-01 to 2024-12-03",
    location: "Semonkong",
    district: "Thaba-Tseka",
    type: "Adventure Festival",
    description: "Adventure sports festival featuring the world's longest single-drop commercial abseil.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["192m abseil", "Zip-lining", "Rock climbing", "Pony trekking"],
    ticketPrice: "M200 - M500",
    duration: "3 days",
    expectedAttendees: "3,000+",
    activities: ["Abseiling", "Zip-lining", "Rock climbing", "Adventure races", "Photography workshops"]
  }
]

const communityData = {
  topRated: [
    { name: "Maletsunyane Falls", rating: 4.8, votes: 1234, type: "tourist" },
    { name: "Thaba Bosiu", rating: 4.6, votes: 987, type: "tourist" },
    { name: "Morija Museum", rating: 4.6, votes: 654, type: "cultural" },
    { name: "Ha Kome Cave Village", rating: 4.5, votes: 432, type: "village" },
  ],
  events: eventsData.slice(0, 3).map(event => ({
    title: event.name,
    date: event.date,
    location: event.location,
    type: event.type
  })),
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
  const [activeTab, setActiveTab] = useState("districts")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof locationsData)[0] | null>(null)
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0])
  const [bookmarkedLocations, setBookmarkedLocations] = useState<number[]>([])
  const [savedItinerary, setSavedItinerary] = useState<number[]>([])
  const [mapStyle, setMapStyle] = useState("roadmap")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showQA, setShowQA] = useState(false)
  const [qaQuestions, setQaQuestions] = useState<{[locationId: number]: {question: string; answer: string; author: string; date: string}[]}>({
    1: [
      {question: "Is the waterfall accessible by car?", answer: "You can drive close, but a 15-minute walk is required to reach the viewing point.", author: "Local Guide", date: "2024-01-15"},
      {question: "Are there guides available?", answer: "Yes, local guides are available at the visitor center for M50 per person.", author: "Tourism Office", date: "2024-01-10"}
    ],
    2: [
      {question: "What's the best time for cultural performances?", answer: "Cultural performances are held every Saturday at 2 PM during tourist season.", author: "Heritage Officer", date: "2024-01-12"}
    ]
  })
  
  // Modal state management
  const [showDistrictModal, setShowDistrictModal] = useState(false)
  const [selectedDistrictData, setSelectedDistrictData] = useState<typeof maseruDistrictData | null>(null)
  const [modalActiveTab, setModalActiveTab] = useState("overview")
  const [selectedAttraction, setSelectedAttraction] = useState<typeof maseruDistrictData.attractions[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInMyTrip, setIsInMyTrip] = useState(false)

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

  // Modal control functions
  const openDistrictModal = (districtId: string) => {
    if (districtId === "maseru") {
      setSelectedDistrictData(maseruDistrictData)
      setShowDistrictModal(true)
      setModalActiveTab("overview")
      setCurrentImageIndex(0)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }
  }

  const closeDistrictModal = () => {
    setShowDistrictModal(false)
    setSelectedDistrictData(null)
    setSelectedAttraction(null)
    setModalActiveTab("overview")
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  const handleAttractionClick = (attraction: typeof maseruDistrictData.attractions[0]) => {
    setSelectedAttraction(attraction)
  }

  const nextImage = () => {
    if (selectedDistrictData) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedDistrictData.heroImages.length)
    }
  }

  const prevImage = () => {
    if (selectedDistrictData) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedDistrictData.heroImages.length) % selectedDistrictData.heroImages.length)
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showDistrictModal) {
        if (event.key === 'Escape') {
          closeDistrictModal()
        } else if (event.key === 'ArrowLeft') {
          prevImage()
        } else if (event.key === 'ArrowRight') {
          nextImage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDistrictModal, selectedDistrictData])

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
            <div className="inline-flex p-1 bg-gray-100 rounded-full" role="tablist" aria-label="Explore Lesotho Navigation">
              <button
                onClick={() => setActiveTab("districts")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab("districts");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00247D]/50 focus:ring-offset-2 ${
                  activeTab === "districts"
                    ? "bg-[#00247D] text-white shadow-lg ring-2 ring-[#00247D]/20"
                    : "text-gray-600 hover:text-[#00247D] hover:bg-gray-50"
                }`}
                aria-pressed={activeTab === "districts"}
                role="tab"
                tabIndex={0}
                id="districts-tab"
              >
                <Globe className="w-5 h-5 inline mr-2" />
                Explore Districts
              </button>
              <button
                onClick={() => setActiveTab("places")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab("places");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00247D]/50 focus:ring-offset-2 ${
                  activeTab === "places"
                    ? "bg-[#00247D] text-white shadow-lg ring-2 ring-[#00247D]/20"
                    : "text-gray-600 hover:text-[#00247D] hover:bg-gray-50"
                }`}
                aria-pressed={activeTab === "places"}
                role="tab"
                tabIndex={0}
                id="places-tab"
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Map Explorer
              </button>
              <button
                onClick={() => setActiveTab("heritage")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab("heritage");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00247D]/50 focus:ring-offset-2 ${
                  activeTab === "heritage"
                    ? "bg-[#00247D] text-white shadow-lg ring-2 ring-[#00247D]/20"
                    : "text-gray-600 hover:text-[#00247D] hover:bg-gray-50"
                }`}
                aria-pressed={activeTab === "heritage"}
                role="tab"
                tabIndex={0}
                id="heritage-tab"
              >
                <History className="w-5 h-5 inline mr-2" />
                Cultural Heritage
              </button>
              <button
                onClick={() => setActiveTab("events")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab("events");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00247D]/50 focus:ring-offset-2 ${
                  activeTab === "events"
                    ? "bg-[#00247D] text-white shadow-lg ring-2 ring-[#00247D]/20"
                    : "text-gray-600 hover:text-[#00247D] hover:bg-gray-50"
                }`}
                aria-pressed={activeTab === "events"}
                role="tab"
                tabIndex={0}
                id="events-tab"
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                Events & Festivals
              </button>
            </div>
          </div>
        </div>

        {/* Districts Explorer Tab */}
        {activeTab === "districts" && (
          <div className="space-y-8" role="tabpanel" aria-labelledby="districts-tab">
            {/* District Selection Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#00247D] mb-4">Explore Lesotho by Districts</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the unique character, attractions, and cultural heritage of each of Lesotho's 10 districts. 
                Each district offers distinct experiences, from mountain adventures to cultural immersion.
              </p>
            </div>

            {/* Districts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districtsData.map((district) => (
                <Card 
                  key={district.id} 
                  className="hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 group-hover:from-white group-hover:to-blue-50/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    if (district.id === "maseru") {
                      openDistrictModal(district.id);
                    } else {
                      setSelectedDistrict(district.id);
                      setActiveTab("places");
                    }
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00247D] to-[#009A49] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-[#009A49] text-white">
                        {district.population} residents
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#00247D] transition-colors">
                      {district.name}
                    </CardTitle>
                    <p className="text-gray-600">{district.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Key Facts */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#00247D] mb-2 flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Key Facts
                      </h4>
                      <p className="text-sm text-gray-700">{district.keyFacts}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-[#009A49]" />
                        Must-See Attractions
                      </h4>
                      <div className="space-y-2">
                        {district.highlights.slice(0, 3).map((highlight, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <ChevronRight className="w-3 h-3 mr-2 text-[#009A49]" />
                            {highlight}
                          </div>
                        ))}
                        {district.highlights.length > 3 && (
                          <div className="text-xs text-gray-500 pl-5">
                            +{district.highlights.length - 3} more attractions
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Regional Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {district.specialties.slice(0, 4).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#009A49] text-[#009A49]">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Best Time to Visit */}
                    <div className="flex items-center justify-between text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Best Time to Visit:
                      </span>
                      <span className="font-medium text-[#009A49]">{district.bestTime}</span>
                    </div>

                    <Button 
                      className="w-full bg-[#009A49] hover:bg-[#007A39] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (district.id === "maseru") {
                          openDistrictModal(district.id);
                        } else {
                          setSelectedDistrict(district.id);
                          setActiveTab("places");
                        }
                      }}
                    >
                      Explore {district.name}
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tourism Statistics */}
            <div className="mt-12 bg-gradient-to-br from-[#00247D] to-[#009A49] rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Lesotho Tourism at a Glance</h3>
                <p className="text-blue-100">Discover the Kingdom in the Sky</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">10</div>
                  <div className="text-blue-100">Unique Districts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">30,355</div>
                  <div className="text-blue-100">Square Kilometers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3,482m</div>
                  <div className="text-blue-100">Highest Point</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2.1M</div>
                  <div className="text-blue-100">Population</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Places & Services Tab */}
        {activeTab === "places" && (
          <div role="tabpanel" aria-labelledby="places-tab">
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
          </div>
        )}

        {/* Cultural Heritage Tab */}
        {activeTab === "heritage" && (
          <div className="grid lg:grid-cols-4 gap-8" role="tabpanel" aria-labelledby="heritage-tab">
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

        {/* Events & Festivals Tab */}
        {activeTab === "events" && (
          <div className="space-y-8" role="tabpanel" aria-labelledby="events-tab">
            {/* Events Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#00247D] mb-4">Cultural Events & Festivals</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the vibrant cultural calendar of Lesotho with festivals, sports events, and cultural celebrations that showcase the rich heritage and modern spirit of the Kingdom.
              </p>
            </div>

            {/* Featured Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.map((event) => (
                <Card key={event.id} className="hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 group hover:from-white hover:to-blue-50/30 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={event.image}
                        alt={event.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[#009A49] text-white font-medium">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90 text-gray-800 border-white">
                          {event.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#00247D] transition-colors mb-2">
                      {event.name}
                    </CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Date
                        </span>
                        <span className="font-medium text-[#00247D]">{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          Location
                        </span>
                        <span className="font-medium">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          Expected
                        </span>
                        <span className="font-medium">{event.expectedAttendees}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Event Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {event.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#009A49] text-[#009A49]">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Ticket Price:</span>
                        <span className="font-bold text-[#009A49]">{event.ticketPrice}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#009A49] hover:bg-[#007A39] text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Info className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Annual Calendar Overview */}
            <div className="mt-16 bg-gradient-to-br from-[#00247D] to-[#009A49] rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Annual Events Calendar</h3>
                <p className="text-blue-100">Plan your visit around Lesotho's most exciting events</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Spring</div>
                  <div className="text-sm text-blue-100">Sep - Nov</div>
                  <div className="mt-2 text-xs">Morija Festival, Cultural Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Summer</div>
                  <div className="text-sm text-blue-100">Dec - Feb</div>
                  <div className="mt-2 text-xs">Adventure Sports, Mountain Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Autumn</div>
                  <div className="text-sm text-blue-100">Mar - May</div>
                  <div className="mt-2 text-xs">Heritage Celebrations, Harvest Festivals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Winter</div>
                  <div className="text-sm text-blue-100">Jun - Aug</div>
                  <div className="mt-2 text-xs">Skiing Season, Mountain Festivals</div>
                </div>
              </div>
            </div>

            {/* Event Types Filter */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Categories</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Cultural Festival", "Sports Event", "National Holiday", "Music & Adventure", "Heritage Festival", "Adventure Festival"].map((category, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 border-[#009A49] text-[#009A49] hover:bg-[#009A49] hover:text-white transition-colors cursor-pointer">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* District Modal (Maseru) */}
        {showDistrictModal && selectedDistrictData && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Semi-transparent Overlay */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ease-out"
              onClick={closeDistrictModal}
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div 
                className="relative w-full max-w-7xl h-[85vh] bg-white rounded-xl shadow-2xl transform transition-all duration-400 ease-out scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeDistrictModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Content */}
                <div className="h-full flex flex-col lg:flex-row">
                  {/* Left Column - Hero Images (70%) */}
                  <div className="lg:w-[70%] h-64 lg:h-full relative bg-gray-100 rounded-l-xl overflow-hidden">
                    {/* Image Carousel */}
                    <div className="relative h-full">
                      <Image
                        src={selectedDistrictData.heroImages[currentImageIndex]}
                        alt={`${selectedDistrictData.name} - View ${currentImageIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                      
                      {/* Image Navigation */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedDistrictData.heroImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Content (30%) */}
                  <div className="lg:w-[30%] flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedDistrictData.fullTitle}
                      </h1>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedDistrictData.description}
                      </p>
                    </div>

                    {/* Tabbed Navigation */}
                    <div className="border-b border-gray-200">
                      <div className="flex overflow-x-auto">
                        {["overview", "attractions", "dining", "culture", "practical"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setModalActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                              modalActiveTab === tab
                                ? "border-[#00247D] text-[#00247D] bg-blue-50/50"
                                : "border-transparent text-gray-600 hover:text-[#00247D] hover:border-gray-300"
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {/* Overview Tab */}
                      {modalActiveTab === "overview" && (
                        <div className="space-y-6">
                          {/* Key Facts Grid */}
                          <div>
                            <h3 className="font-bold text-gray-900 mb-4">Key Facts</h3>
                            <div className="grid grid-cols-1 gap-3">
                              {selectedDistrictData.keyFacts.map((fact, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <fact.icon className="w-5 h-5 text-[#00247D] mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <div className="font-semibold text-sm text-gray-900">{fact.label}</div>
                                    <div className="font-bold text-[#00247D]">{fact.value}</div>
                                    <div className="text-xs text-gray-600">{fact.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Regional Specialties */}
                          <div>
                            <h3 className="font-bold text-gray-900 mb-4">Regional Specialties</h3>
                            <div className="space-y-3">
                              {selectedDistrictData.regionalSpecialties.map((specialty, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                  <specialty.icon className="w-5 h-5 text-[#009A49] mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-semibold text-sm text-gray-900">{specialty.name}</div>
                                    <div className="text-xs text-gray-600">{specialty.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Best Time to Visit */}
                          <div>
                            <h3 className="font-bold text-gray-900 mb-4">Best Time to Visit</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                                <span className="text-sm font-medium text-green-800">Peak Season</span>
                                <span className="text-xs text-green-600">{selectedDistrictData.bestTimeToVisit.peak.months.join(", ")}</span>
                              </div>
                              <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                                <span className="text-sm font-medium text-blue-800">Good Season</span>
                                <span className="text-xs text-blue-600">{selectedDistrictData.bestTimeToVisit.good.months.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Attractions Tab */}
                      {modalActiveTab === "attractions" && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 mb-4">Must-See Attractions</h3>
                          <div className="space-y-4">
                            {selectedDistrictData.attractions.map((attraction) => (
                              <div 
                                key={attraction.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => handleAttractionClick(attraction)}
                              >
                                <div className="flex space-x-3">
                                  <Image
                                    src={attraction.image}
                                    alt={attraction.name}
                                    width={80}
                                    height={60}
                                    className="w-20 h-15 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 mb-1">{attraction.name}</h4>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Badge variant="outline" className="text-xs">{attraction.category}</Badge>
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3 text-yellow-500" />
                                        <span className="text-xs text-gray-600">{attraction.rating}</span>
                                      </div>
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2">{attraction.shortDescription}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dining Tab */}
                      {modalActiveTab === "dining" && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 mb-4">Dining Options</h3>
                          <div className="space-y-4">
                            {selectedDistrictData.dining.map((restaurant, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{restaurant.name}</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium">{restaurant.type}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Cuisine:</span>
                                    <span className="font-medium">{restaurant.cuisine}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Price Range:</span>
                                    <span className="font-medium">{restaurant.priceRange}</span>
                                  </div>
                                  <div className="mt-2">
                                    <div className="text-xs text-gray-600 mb-1">Highlights:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {restaurant.highlights.map((highlight, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">{highlight}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Culture Tab */}
                      {modalActiveTab === "culture" && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 mb-4">Cultural Heritage</h3>
                          <div className="space-y-4">
                            {selectedDistrictData.culture.map((item, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{item.aspect}</h4>
                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                <div>
                                  <div className="text-xs text-gray-600 mb-1">Key Locations:</div>
                                  <div className="flex flex-wrap gap-1">
                                    {item.locations.map((location, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">{location}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Practical Info Tab */}
                      {modalActiveTab === "practical" && (
                        <div className="space-y-6">
                          <h3 className="font-bold text-gray-900 mb-4">Practical Information</h3>
                          
                          {Object.entries(selectedDistrictData.practicalInfo).map(([category, items]) => (
                            <div key={category}>
                              <h4 className="font-semibold text-gray-900 mb-3 capitalize">{category}</h4>
                              <div className="space-y-2">
                                {items.map((item, index) => (
                                  <div key={index} className="flex items-start space-x-2 text-sm">
                                    <ChevronRight className="w-3 h-3 text-[#009A49] mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-br-xl">
                      <div className="flex gap-3">
                        <Button
                          onClick={() => setIsInMyTrip(!isInMyTrip)}
                          className={`flex-1 ${isInMyTrip ? 'bg-red-500 hover:bg-red-600' : 'bg-[#009A49] hover:bg-[#007A39]'} text-white`}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isInMyTrip ? 'fill-current' : ''}`} />
                          {isInMyTrip ? 'Remove from Trip' : 'Save to My Trip'}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => {
                          closeDistrictModal();
                          setActiveTab("places");
                        }}>
                          <MapPin className="w-4 h-4 mr-2" />
                          Show on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attraction Detail Overlay */}
                {selectedAttraction && (
                  <div className="absolute inset-0 bg-white z-10 rounded-xl overflow-hidden">
                    <div className="h-full flex flex-col">
                      {/* Attraction Header */}
                      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedAttraction.name}</h2>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-[#009A49] text-white">{selectedAttraction.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">{selectedAttraction.rating}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedAttraction(null)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Attraction Content */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                          <Image
                            src={selectedAttraction.image}
                            alt={selectedAttraction.name}
                            width={600}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          
                          <p className="text-gray-700 leading-relaxed">{selectedAttraction.fullDescription}</p>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedAttraction.highlights.map((highlight, index) => (
                                <Badge key={index} variant="outline" className="border-[#009A49] text-[#009A49]">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Visit Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span>{selectedAttraction.visitInfo.hours}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CreditCard className="w-4 h-4 text-gray-500" />
                                  <span>{selectedAttraction.visitInfo.entryFee}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span>Best: {selectedAttraction.visitInfo.bestTime}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span>Duration: {selectedAttraction.visitInfo.duration}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                              <div className="space-y-1">
                                {selectedAttraction.activities.map((activity, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                    <ChevronRight className="w-3 h-3 text-[#009A49]" />
                                    <span>{activity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}