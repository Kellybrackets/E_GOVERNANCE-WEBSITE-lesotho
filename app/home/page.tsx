"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Bell, 
  Users, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  Clock,
  Heart,
  Shield,
  GraduationCap,
  CreditCard,
  MapPin,
  Building,
  Calendar,
  Star
} from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"
import LesothoLoading from "@/components/lesotho-loading"
import InteractiveIDCard from "@/components/interactive-id-card"
import EWalletPromotion from "@/components/ewallet-promotion"
import SearchServices from "@/components/search-services"
import EnhancedBottomNavigation from "@/components/bottom-navigation"
import { withAuth } from "@/lib/auth"

// Mock user data - in real app this would come from authentication
const mockUser = {
  firstName: "Thabo",
  lastName: "Mofokeng",
  idNumber: "28051012345",
  dateOfBirth: "10 May 1985",
  gender: "M",
  citizenship: "Lesotho"
}

const quickStats = [
  {
    icon: FileText,
    title: "Active Applications",
    value: "3",
    subtitle: "In Progress",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50"
  },
  {
    icon: CheckCircle,
    title: "Completed Services",
    value: "12",
    subtitle: "This Year",
    color: "text-[#007849]",
    bgColor: "bg-green-50"
  },
  {
    icon: Clock,
    title: "Pending Reviews",
    value: "1",
    subtitle: "Needs Action",
    color: "text-[#f59e0b]",
    bgColor: "bg-yellow-50"
  }
]

const recentServices = [
  {
    icon: FileText,
    title: "Passport Renewal",
    status: "Approved",
    date: "2024-01-20",
    statusColor: "bg-green-100 text-green-700"
  },
  {
    icon: CreditCard,
    title: "Tax Certificate",
    status: "Processing",
    date: "2024-01-18",
    statusColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: MapPin,
    title: "Land Title Search",
    status: "Ready for Collection",
    date: "2024-01-15",
    statusColor: "bg-purple-100 text-purple-700"
  }
]

const recommendations = [
  {
    icon: Heart,
    title: "Health Insurance Registration",
    description: "Register for national health insurance benefits",
    urgency: "Recommended",
    color: "bg-red-50 text-red-700"
  },
  {
    icon: GraduationCap,
    title: "Education Transcript Request",
    description: "Get certified copies of your academic records",
    urgency: "Popular",
    color: "bg-indigo-50 text-indigo-700"
  },
  {
    icon: Building,
    title: "Business Tax Returns",
    description: "File your annual business tax returns",
    urgency: "Due Soon",
    color: "bg-orange-50 text-orange-700"
  }
]

function AuthenticatedHomePage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'st'>('en')
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation(currentLanguage)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('site-language') as 'en' | 'st' || 'en'
      setCurrentLanguage(savedLanguage)
    }

    // Show loading animation
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(loadingTimer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 z-50 flex items-center justify-center">
        <div className="text-center">
          <LesothoLoading size={150} showText={true} />
          <div className="mt-8 animate-pulse">
            <p className="text-[#002F6C] text-lg font-medium mb-2">
              Welcome back, {mockUser.firstName}
            </p>
            <p className="text-gray-600 text-sm">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 page-content-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg lg:text-xl">L</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-[#002F6C]">Welcome back, {mockUser.firstName}</h1>
                <p className="text-sm text-gray-600 font-medium">Your Digital Government Hub</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </Button>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white">
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#002F6C] to-[#007849] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 hero-pattern opacity-20"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Good morning, {mockUser.firstName}!</h2>
                  <p className="text-blue-100 text-lg">Ready to manage your government services today?</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Today</p>
                  <p className="text-xl font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-white" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-blue-100 text-sm">{stat.title}</p>
                    <p className="text-blue-200 text-xs">{stat.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Interactive ID Card */}
            <section>
              <InteractiveIDCard user={mockUser} className="w-full" />
            </section>

            {/* eWallet Promotion */}
            <section>
              <EWalletPromotion currentBalance={12540} className="w-full" />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Enhanced Search */}
            <section>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#002F6C] flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Quick Service Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchServices className="w-full" />
                </CardContent>
              </Card>
            </section>

            {/* Recent Services */}
            <section>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#002F6C] flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                    <Link href="/dashboard/services">
                      <Button variant="ghost" size="sm" className="text-[#007849]">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <service.icon className="w-5 h-5 text-[#002F6C]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{service.title}</p>
                            <p className="text-sm text-gray-600">{service.date}</p>
                          </div>
                        </div>
                        <Badge className={service.statusColor}>
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recommendations */}
            <section>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#002F6C] flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 ${rec.color} rounded-xl flex items-center justify-center`}>
                            <rec.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                              <Badge variant="outline" className={rec.color}>
                                {rec.urgency}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                            <Button size="sm" className="bg-[#007849] hover:bg-[#005a37] text-white">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50/30">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#002F6C] mb-2">Need Something Specific?</h3>
                <p className="text-gray-600">Access popular government services with one click</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/services/national-id" className="group">
                  <div className="bg-white rounded-xl p-4 text-center hover-lift card-shadow group-hover:bg-blue-50 transition-all">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-[#002F6C]" />
                    <p className="font-semibold text-sm">National ID</p>
                  </div>
                </Link>
                <Link href="/services/passport" className="group">
                  <div className="bg-white rounded-xl p-4 text-center hover-lift card-shadow group-hover:bg-green-50 transition-all">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-[#007849]" />
                    <p className="font-semibold text-sm">Passport</p>
                  </div>
                </Link>
                <Link href="/services/tax-filing" className="group">
                  <div className="bg-white rounded-xl p-4 text-center hover-lift card-shadow group-hover:bg-blue-50 transition-all">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#002F6C]" />
                    <p className="font-semibold text-sm">Tax Services</p>
                  </div>
                </Link>
                <Link href="/services/land-title" className="group">
                  <div className="bg-white rounded-xl p-4 text-center hover-lift card-shadow group-hover:bg-green-50 transition-all">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-[#007849]" />
                    <p className="font-semibold text-sm">Land Registration</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Bottom Navigation */}
      <EnhancedBottomNavigation />
    </div>
  )
}

export default withAuth(AuthenticatedHomePage)