"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, CreditCard, MapPin, Heart, GraduationCap, Shield, Truck, Bell, ArrowRight, Users, Globe, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"
import LesothoLoading from "@/components/lesotho-loading"

const featuredServices = [
  {
    icon: FileText,
    title: "National ID",
    subtitle: "Apply or renew your identity document",
    href: "/services/national-id",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50/80",
    popular: true,
  },
  {
    icon: FileText,
    title: "Passport Services",
    subtitle: "Travel document applications & renewals",
    href: "/services/passport",
    color: "text-[#007849]",
    bgColor: "bg-green-50/80",
    popular: true,
  },
  {
    icon: CreditCard,
    title: "Tax Services",
    subtitle: "File returns & pay taxes online",
    href: "/services/tax-filing",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50/80",
    popular: false,
  },
  {
    icon: MapPin,
    title: "Land Registration",
    subtitle: "Property titles & registrations",
    href: "/services/land-title",
    color: "text-[#007849]",
    bgColor: "bg-green-50/80",
    popular: true,
  },
  {
    icon: Shield,
    title: "Business Licensing",
    subtitle: "Register and license your business",
    href: "/services/business-license",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50/80",
    popular: false,
  },
  {
    icon: GraduationCap,
    title: "Education Certificates",
    subtitle: "Academic credentials & verification",
    href: "/services/education",
    color: "text-[#007849]",
    bgColor: "bg-green-50/80",
    popular: false,
  },
]

const statistics = [
  {
    icon: Users,
    value: "2.3M+",
    label: "Registered Citizens",
    color: "text-[#002F6C]",
  },
  {
    icon: Globe,
    value: "150+",
    label: "Online Services",
    color: "text-[#007849]",
  },
  {
    icon: CheckCircle,
    value: "98%",
    label: "User Satisfaction",
    color: "text-[#002F6C]",
  },
  {
    icon: TrendingUp,
    value: "24/7",
    label: "Service Availability",
    color: "text-[#007849]",
  },
]

const popularLinks = [
  { name: "National ID Application", href: "/services/national-id" },
  { name: "Passport Renewal", href: "/services/passport" },
  { name: "Birth Certificate", href: "/services/birth-certificate" },
  { name: "Marriage Certificate", href: "/services/marriage-certificate" },
  { name: "Tax Filing", href: "/services/tax-filing" },
  { name: "Business Registration", href: "/services/business-license" },
]

const ministries = [
  {
    name: "Ministry of Health",
    icon: Heart,
    description: "Healthcare services and medical records",
    href: "/ministries/health",
    color: "bg-red-50 border-red-200",
  },
  {
    name: "Ministry of Home Affairs",
    icon: Shield,
    description: "Identity documents and civil registration",
    href: "/ministries/home-affairs",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Lesotho Revenue Authority",
    icon: CreditCard,
    description: "Tax services and customs",
    href: "/ministries/lra",
    color: "bg-green-50 border-green-200",
  },
  {
    name: "Land Administration Authority",
    icon: MapPin,
    description: "Land registration and property services",
    href: "/ministries/laa",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    name: "Ministry of Transport",
    icon: Truck,
    description: "Vehicle registration and licensing",
    href: "/ministries/transport",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "Ministry of Education",
    icon: GraduationCap,
    description: "Educational services and certification",
    href: "/ministries/education",
    color: "bg-indigo-50 border-indigo-200",
  },
]

const news = [
  {
    title: "New Digital ID Cards Now Available",
    date: "2024-01-20",
    type: "announcement",
    urgent: false,
  },
  {
    title: "System Maintenance - January 25, 2024",
    date: "2024-01-22",
    type: "alert",
    urgent: true,
  },
  {
    title: "Mobile Money Integration Goes Live",
    date: "2024-01-18",
    type: "news",
    urgent: false,
  },
  {
    title: "Tax Filing Deadline Extended to March 31",
    date: "2024-01-15",
    type: "announcement",
    urgent: false,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'st'>('en')
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation(currentLanguage)

  // Load saved language from localStorage and handle initial loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('site-language') as 'en' | 'st' || 'en'
      setCurrentLanguage(savedLanguage)
    }

    // Show beautiful loading animation every time the page loads
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(loadingTimer)
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'st' : 'en'
    setCurrentLanguage(newLanguage)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-language', newLanguage)
    }
  }

  // Get language display text
  const getLanguageText = () => {
    return currentLanguage === 'en' ? t('English') : t('Sesotho')
  }

  // Show loading screen on initial page load
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 z-50 flex items-center justify-center">
        <div className="text-center">
          <LesothoLoading size={150} showText={true} />
          <div className="mt-8 animate-pulse">
            <p className="text-[#002F6C] text-lg font-medium mb-2">
              {t('Government of Lesotho')}
            </p>
            <p className="text-gray-600 text-sm">
              {t('Digital Services Portal')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white page-content-fade-in">
      {/* Modern Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg lg:text-xl">L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-[#002F6C]">{t('Government of Lesotho')}</h1>
                <p className="text-sm text-gray-600 font-medium">{t('Digital Services Portal')}</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#002F6C] font-semibold border-b-2 border-[#002F6C] pb-1 transition-colors">
                {t('Home')}
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-[#002F6C] font-medium transition-colors duration-200">
                {t('Services')}
              </Link>
              <Link href="/civic-voice" className="text-gray-600 hover:text-[#002F6C] font-medium transition-colors duration-200">
                {t('Civic Voice')}
              </Link>
              <Link href="/explore-lesotho" className="text-gray-600 hover:text-[#002F6C] font-medium transition-colors duration-200">
                {t('Explore Lesotho')}
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-[#002F6C] font-medium transition-colors duration-200">
                {t('Help')}
              </Link>
            </div>

            {/* Language Selector and Auth Buttons */}
            <div className="flex items-center space-x-3">
              {/* Language Selector Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="language-switcher border-[#002F6C]/20 text-[#002F6C] hover:bg-[#002F6C]/10"
                aria-label={`Switch to ${currentLanguage === 'en' ? 'Sesotho' : 'English'}`}
              >
                <Globe className="w-4 h-4 mr-2" />
                <span className="font-medium">{getLanguageText()}</span>
              </Button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200"></div>

              {/* Auth Buttons */}
              <Link href="/login">
                <Button variant="ghost" className="text-[#002F6C] hover:bg-blue-50 font-medium">
                  {t('Sign In')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#007849] hover:bg-[#005a37] text-white font-semibold px-6 shadow-lg">
                  {t('Register')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002F6C] via-[#003d7a] to-[#007849] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        
        {/* Mountain Silhouette Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="text-center text-white animate-fade-in-up">
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('Government of Lesotho')}
              <span className="block text-2xl lg:text-4xl font-normal mt-2 text-blue-100">
                {t('services simplified — All your records unified')}
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              {t('Access all government services from one secure, digital platform. Fast, reliable, and available 24/7 for all citizens of Lesotho.')}
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-16 animate-scale-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-2">
                  <div className="flex items-center">
                    <Search className="absolute left-6 text-gray-400 w-6 h-6 z-10" />
                    <Input
                      type="text"
                      placeholder={t('Search for services, documents, or information…')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-4 py-4 text-lg border-0 focus:ring-0 bg-transparent placeholder:text-gray-500 text-gray-900 rounded-xl"
                    />
                    <Button className="bg-[#007849] hover:bg-[#005a37] text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105">
                      {t('Search')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-right">
              <Link href="/services/national-id">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105">
                  {t('Apply for National ID')}
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#002F6C] px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  {t('Browse All Services')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 font-medium">
              {t('Over')} <span className="font-bold text-[#002F6C]">150 {t('government services')}</span> {t('from')} 
              <span className="font-bold text-[#007849]"> 25+ {t('ministries and agencies')}</span> {t('now available online')}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002F6C] mb-6">{t('Featured Services')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Quick access to our most popular government services. Fast, secure, and available 24/7.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Link key={index} href={service.href} className="group">
                <Card className="h-full hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden group-hover:from-white group-hover:to-blue-50/30 transition-all duration-300">
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-[#007849] text-white font-semibold px-3 py-1">
                        {t('Popular')}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center relative">
                    <div className={`w-20 h-20 rounded-2xl ${service.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-10 h-10 ${service.color}`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{t(service.title)}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{t(service.subtitle)}</p>
                    <Button 
                      size="lg" 
                      className="w-full bg-[#007849] hover:bg-[#005a37] text-white font-semibold py-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200"
                    >
                      {t('Apply Now')}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Links */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002F6C] mb-4">{t('Popular Services')}</h2>
            <p className="text-lg text-gray-600">{t('Quick access to frequently requested services')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularLinks.map((link, index) => (
              <Link key={index} href={link.href} className="group">
                <div className="bg-white rounded-xl p-4 text-center hover-lift card-shadow border border-gray-100 group-hover:border-[#007849]/20 transition-all duration-200">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#002F6C] transition-colors">
                    {t(link.name)}
                  </h4>
                  <ArrowRight className="w-4 h-4 mx-auto mt-2 text-gray-400 group-hover:text-[#007849] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries & Agencies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002F6C] mb-6">{t('Ministries & Agencies')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Explore services offered by different government ministries and agencies')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <Link key={index} href={ministry.href} className="group">
                <Card className="h-full hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 group-hover:from-white group-hover:to-blue-50/30 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <ministry.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-[#002F6C] transition-colors">
                        {t(ministry.name)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed">{t(ministry.description)}</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#007849]/20 text-[#007849] hover:bg-[#007849] hover:text-white font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                      {t('View Services')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Lesotho Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002F6C] mb-6">{t('Explore Lesotho')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Discover the Kingdom through interactive maps, rich cultural heritage, and historical landmarks - all in one seamless experience')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 card-shadow hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('Know Lesotho')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('Your complete guide to exploring places, services, history, and culture - unified in one powerful platform.')}
                    </p>
                    <Link href="/explore-lesotho" className="inline-flex items-center text-[#007849] font-semibold mt-3 hover:underline">
                      {t('Start Exploring')} <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gradient-to-br from-[#007849]/10 to-[#007849]/20 rounded-xl p-4">
                  <div className="w-8 h-8 bg-[#007849] rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#007849]">{t('Map Explorer')}</h4>
                  <p className="text-xs text-gray-600 mt-1">{t('Interactive locations')}</p>
                </div>
                <div className="bg-gradient-to-br from-[#002F6C]/10 to-[#002F6C]/20 rounded-xl p-4">
                  <div className="w-8 h-8 bg-[#002F6C] rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#002F6C]">{t('Cultural Heritage')}</h4>
                  <p className="text-xs text-gray-600 mt-1">{t('History & artifacts')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('Latest Updates')}</h3>
                <div className="space-y-4">
                  {news.slice(0, 3).map((item, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-blue-100">{item.date}</p>
                        </div>
                        {item.urgent && (
                          <Badge className="bg-red-500 text-white text-xs">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  {t('View All Updates')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#002F6C] to-[#007849] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('Ready to Get Started?')}
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 font-light leading-relaxed">
              {t('Join over 2.3 million citizens using our digital platform. Fast, secure, and available 24/7.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-[#002F6C] hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  {t('Create Account')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#002F6C] px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-200 hover:scale-105"
                >
                  {t('Browse Services')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002F6C] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-[#002F6C] font-bold text-xl">L</span>
                </div>
                <div>
                  <h5 className="font-bold text-xl">{t('Government of Lesotho')}</h5>
                  <p className="text-blue-200 text-sm">{t('Digital Services Portal')}</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                {t('Official digital service platform for the Kingdom of Lesotho. Secure, fast, and reliable government services at your fingertips.')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="font-bold text-lg mb-6 text-white">{t('Services')}</h6>
              <ul className="space-y-3">
                <li>
                  <Link href="/services" className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center">
                    {t('All Services')} <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/services/national-id" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('National ID')}
                  </Link>
                </li>
                <li>
                  <Link href="/services/passport" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Passport Services')}
                  </Link>
                </li>
                <li>
                  <Link href="/services/tax-filing" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Tax Filing')}
                  </Link>
                </li>
                <li>
                  <Link href="/ministries" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Ministries & Agencies')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h6 className="font-bold text-lg mb-6 text-white">{t('About')}</h6>
              <ul className="space-y-3">
                <li>
                  <Link href="/explore-lesotho" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Explore Lesotho')}
                  </Link>
                </li>
                <li>
                  <Link href="/civic-voice" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Civic Voice')}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h6 className="font-bold text-lg mb-6 text-white">{t('Support')}</h6>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/help" className="text-blue-100 hover:text-white transition-colors duration-200">
                    {t('Help')}
                  </Link>
                </li>
                <li>
                  <Link href="/help#faq" className="text-blue-100 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help#contact" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Contact Support
                  </Link>
                </li>
              </ul>
              
              <div className="space-y-2">
                <p className="text-blue-100 font-semibold">{t('Contact Information')}</p>
                <p className="text-blue-200 text-sm">+266 2231 2345</p>
                <p className="text-blue-200 text-sm">support@gov.ls</p>
                <p className="text-blue-200 text-sm">Maseru, Lesotho</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-blue-700/30 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-blue-200 text-sm">
                <p>&copy; 2024 Kingdom of Lesotho. {t('All rights reserved')}.</p>
              </div>
              <div className="flex space-x-6 text-blue-200 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t('Privacy Policy')}
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t('Terms of Service')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}