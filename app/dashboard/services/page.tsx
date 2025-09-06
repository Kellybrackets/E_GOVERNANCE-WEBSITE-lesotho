"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  FileText,
  Car,
  Building,
  Users,
  MapPin,
  CreditCard,
  UserCheck,
  Vote,
  Clock,
  CheckCircle,
  Heart,
  GraduationCap,
  Shield,
  ArrowRight,
  Filter,
  Grid3X3,
  User,
  Star,
} from "lucide-react"
import Link from "next/link"
import MobileDashboardLayout from "@/components/mobile-dashboard-layout"
import { withAuth, checkAuth } from "@/lib/auth"

const services = [
  {
    id: "national-id",
    icon: UserCheck,
    title: "National ID Application",
    description: "Apply for or renew your national identity document",
    category: "identity",
    tag: "ID",
    fee: "M50",
    duration: "5-7 days",
    requirements: ["Birth Certificate", "Proof of Address", "Passport Photo"],
    status: "available",
    featured: true,
  },
  {
    id: "passport",
    icon: FileText,
    title: "Passport Application",
    description: "Apply for new passport or renewal",
    category: "identity",
    tag: "ID",
    fee: "M350",
    duration: "10-14 days",
    requirements: ["National ID", "Birth Certificate", "Passport Photos"],
    status: "available",
    featured: true,
  },
  {
    id: "drivers-license",
    icon: Car,
    title: "Driver's License",
    description: "Apply for or renew your driving license",
    category: "transport",
    tag: "Transport",
    fee: "M120",
    duration: "3-5 days",
    requirements: ["National ID", "Medical Certificate", "Driving Test"],
    status: "available",
  },
  {
    id: "vehicle-registration",
    icon: Car,
    title: "Vehicle Registration",
    description: "Register your vehicle or transfer ownership",
    category: "transport",
    tag: "Transport",
    fee: "M200",
    duration: "1-2 days",
    requirements: ["Proof of Purchase", "Insurance", "Roadworthy Certificate"],
    status: "available",
  },
  {
    id: "birth-certificate",
    icon: Users,
    title: "Birth Certificate",
    description: "Apply for birth certificate or certified copy",
    category: "civil",
    tag: "Civil",
    fee: "M25",
    duration: "2-3 days",
    requirements: ["Hospital Birth Record", "Parent IDs"],
    status: "available",
  },
  {
    id: "marriage-certificate",
    icon: Users,
    title: "Marriage Certificate",
    description: "Register marriage or get certified copy",
    category: "civil",
    tag: "Civil",
    fee: "M75",
    duration: "1-2 days",
    requirements: ["Marriage License", "Witness IDs", "Couple IDs"],
    status: "available",
  },
  {
    id: "business-registration",
    icon: Building,
    title: "Business Registration",
    description: "Register your business or company",
    category: "business",
    tag: "Business",
    fee: "M150",
    duration: "5-7 days",
    requirements: ["Business Plan", "Owner ID", "Proof of Address"],
    status: "available",
  },
  {
    id: "land-title",
    icon: MapPin,
    title: "Land Title Search",
    description: "Search and apply for land title documents",
    category: "land",
    tag: "Land",
    fee: "M100",
    duration: "7-10 days",
    requirements: ["Plot Number", "Survey Report", "Applicant ID"],
    status: "available",
  },
  {
    id: "voter-registration",
    icon: Vote,
    title: "Voter Registration",
    description: "Register to vote in elections",
    category: "civic",
    tag: "Civic",
    fee: "Free",
    duration: "1 day",
    requirements: ["National ID", "Proof of Address"],
    status: "available",
  },
  {
    id: "tax-filing",
    icon: CreditCard,
    title: "Tax Filing",
    description: "File your annual tax returns",
    category: "tax",
    tag: "Tax",
    fee: "Free",
    duration: "Immediate",
    requirements: ["Income Statements", "National ID", "Bank Details"],
    status: "available",
  },
  {
    id: "health-certificate",
    icon: Heart,
    title: "Health Certificate",
    description: "Medical fitness certificates",
    category: "health",
    tag: "Health",
    fee: "M80",
    duration: "2-3 days",
    requirements: ["Medical Examination", "National ID"],
    status: "available",
  },
  {
    id: "education-certificate",
    icon: GraduationCap,
    title: "Education Certificate",
    description: "Academic transcripts and certificates",
    category: "education",
    tag: "Education",
    fee: "M40",
    duration: "3-5 days",
    requirements: ["Student ID", "Academic Records"],
    status: "available",
  },
  {
    id: "security-clearance",
    icon: Shield,
    title: "Security Clearance",
    description: "Police clearance certificates",
    category: "security",
    tag: "Security",
    fee: "M60",
    duration: "7-10 days",
    requirements: ["National ID", "Fingerprints", "Application Form"],
    status: "available",
  },
]

const categories = [
  { id: "all", label: "All Services", count: services.length },
  { id: "identity", label: "Identity", count: services.filter((s) => s.category === "identity").length },
  { id: "health", label: "Health", count: services.filter((s) => s.category === "health").length },
  { id: "education", label: "Education", count: services.filter((s) => s.category === "education").length },
  { id: "land", label: "Land", count: services.filter((s) => s.category === "land").length },
  { id: "business", label: "Business", count: services.filter((s) => s.category === "business").length },
  { id: "security", label: "Security", count: services.filter((s) => s.category === "security").length },
  { id: "transport", label: "Transport", count: services.filter((s) => s.category === "transport").length },
  { id: "civil", label: "Civil", count: services.filter((s) => s.category === "civil").length },
  { id: "civic", label: "Civic", count: services.filter((s) => s.category === "civic").length },
  { id: "tax", label: "Tax", count: services.filter((s) => s.category === "tax").length },
]

// Mock user data
const userData = {
  name: "Thabo M.",
  id: "1001023456",
  email: "thabo.m@email.com",
}

function DashboardServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Keyboard navigation for filter buttons
  const handleKeyDown = (event: React.KeyboardEvent, categoryId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setSelectedCategory(categoryId)
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tag.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredServices = services.filter(service => service.featured)

  return (
    <MobileDashboardLayout userData={userData}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#002F6C] to-[#007849] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Grid3X3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">Government Services</h1>
                <p className="text-xl text-blue-100">Welcome, {userData.name} - Access all your services here</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
              <User className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-medium">Verified Account</p>
                <p className="text-blue-200">ID: {userData.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Featured Services */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-6 h-6 text-[#007849]" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Services</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#002F6C] transition-colors">
                          {service.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                        <Badge variant="outline" className="mt-2 border-[#007849]/20 text-[#007849]">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="flex items-center text-gray-600">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Fee:
                      </span>
                      <span className="font-bold text-[#002F6C]">{service.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Duration:
                      </span>
                      <span className="font-bold text-[#007849]">{service.duration}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => checkAuth(() => window.location.href = `/services/${service.id}`, `/services/${service.id}`)}
                    className="w-full bg-[#007849] hover:bg-[#005a37] text-white font-semibold py-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#002F6C] mb-4">Find Your Service</h2>
            <p className="text-lg text-gray-600">Search through {services.length} available government services</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <div className="flex items-center">
                  <Search className="absolute left-6 text-gray-400 w-6 h-6 z-10" />
                  <Input
                    type="text"
                    placeholder="Search services by name, category, or tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-4 py-4 text-lg border-0 focus:ring-0 bg-transparent placeholder:text-gray-500 text-gray-900 rounded-xl"
                  />
                  <Button className="bg-[#007849] hover:bg-[#005a37] text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Category Filter Buttons */}
            <div className="w-full">
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    onKeyDown={(e) => handleKeyDown(e, category.id)}
                    className={`
                      service-filter-button group relative flex items-center space-x-2 md:space-x-3 px-3 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm
                      transition-all duration-300 transform hover:scale-105 focus:outline-none
                      focus:ring-4 focus:ring-[#007849]/20 focus:ring-offset-2
                      ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-[#002F6C] to-[#007849] text-white shadow-xl active'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#007849] hover:text-[#007849] shadow-md hover:shadow-xl'
                      }
                      animate-fade-in-up
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-pressed={selectedCategory === category.id}
                    aria-label={`Filter services by ${category.label} category. ${category.count} services available.`}
                    tabIndex={0}
                  >
                    {/* Active indicator */}
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-white/10 rounded-xl" />
                    )}
                    
                    <div className={`
                      relative z-10 w-2 h-2 rounded-full transition-all duration-200
                      ${
                        selectedCategory === category.id
                          ? 'bg-white shadow-lg'
                          : 'bg-gray-400 group-hover:bg-[#007849]'
                      }
                    `} />
                    
                    <span className="relative z-10 font-medium tracking-wide">{category.label}</span>
                    
                    <span 
                      className={`
                        filter-count-badge relative z-10 px-2.5 py-1 rounded-full text-xs font-bold
                        transition-all duration-200 min-w-[24px] text-center
                        ${
                          selectedCategory === category.id
                            ? 'bg-white/20 text-white ring-2 ring-white/30'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-[#007849]/15 group-hover:text-[#007849] group-hover:ring-2 group-hover:ring-[#007849]/20'
                        }
                      `}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Results summary */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm transition-all duration-300">
                  {selectedCategory === "all" 
                    ? `Showing all ${filteredServices.length} government services`
                    : `Showing ${filteredServices.length} ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} services`
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Results */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#002F6C]">Available Services</h3>
              <p className="text-gray-600">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-[#002F6C] transition-colors leading-tight">
                          {service.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2 border-[#007849]/20 text-[#007849]">
                          {service.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="flex items-center text-gray-600">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Fee:
                      </span>
                      <span className="font-bold text-[#002F6C]">{service.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Duration:
                      </span>
                      <span className="font-bold text-[#007849]">{service.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {service.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                      {service.requirements.length > 3 && (
                        <li className="text-xs text-gray-500 pl-6">
                          +{service.requirements.length - 3} more requirement{service.requirements.length - 3 !== 1 ? 's' : ''}
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => checkAuth(() => window.location.href = `/services/${service.id}`, `/services/${service.id}`)}
                    className="w-full bg-[#007849] hover:bg-[#005a37] text-white font-semibold py-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter options.</p>
            </div>
          )}
        </section>
      </div>
    </MobileDashboardLayout>
  )
}

export default withAuth(DashboardServicesPage)