import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from 'react'

interface ModernLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  currentPage: string
  showBackButton?: boolean
  backHref?: string
}

export default function ModernLayout({ 
  children, 
  title, 
  subtitle, 
  currentPage, 
  showBackButton = true,
  backHref = "/"
}: ModernLayoutProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'st'>('en')

  // Load saved language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('site-language') as 'en' | 'st' || 'en'
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'st' : 'en'
    setCurrentLanguage(newLanguage)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-language', newLanguage)
      // Here you would typically trigger a re-render of text content
      // For now, we'll just update the button text
    }
  }

  // Get language display text
  const getLanguageText = () => {
    return currentLanguage === 'en' ? 'English' : 'Sesotho'
  }


  return (
    <div className="min-h-screen bg-white">
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
                <h1 className="text-xl lg:text-2xl font-bold text-[#002F6C]">Government of Lesotho</h1>
                <p className="text-sm text-gray-600 font-medium">Digital Services Portal</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`font-medium transition-colors duration-200 ${
                currentPage === "home" 
                  ? "text-[#002F6C] border-b-2 border-[#002F6C] pb-1" 
                  : "text-gray-600 hover:text-[#002F6C]"
              }`}>
                Home
              </Link>
              <Link href="/civic-voice" className={`font-medium transition-colors duration-200 ${
                currentPage === "civic-voice" 
                  ? "text-[#002F6C] border-b-2 border-[#002F6C] pb-1" 
                  : "text-gray-600 hover:text-[#002F6C]"
              }`}>
                Civic Voice
              </Link>
              <Link href="/explore-lesotho" className={`font-medium transition-colors duration-200 ${
                currentPage === "explore-lesotho" 
                  ? "text-[#002F6C] border-b-2 border-[#002F6C] pb-1" 
                  : "text-gray-600 hover:text-[#002F6C]"
              }`}>
                Explore Lesotho
              </Link>
              <Link href="/help" className={`font-medium transition-colors duration-200 ${
                currentPage === "help" 
                  ? "text-[#002F6C] border-b-2 border-[#002F6C] pb-1" 
                  : "text-gray-600 hover:text-[#002F6C]"
              }`}>
                Help
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
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#007849] hover:bg-[#005a37] text-white font-semibold px-6 shadow-lg">
                  Register
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
        
        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          {/* Back Button */}
          {showBackButton && (
            <div className="mb-8">
              <Link href={backHref}>
                <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          )}

          <div className="text-center text-white animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      {children}

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
                  <h5 className="font-bold text-xl">Government of Lesotho</h5>
                  <p className="text-blue-200 text-sm">Digital Services Portal</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Official digital service platform for the Kingdom of Lesotho. 
                Secure, fast, and reliable government services at your fingertips.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="font-bold text-lg mb-6 text-white">Information</h6>
              <ul className="space-y-3">
                <li>
                  <Link href="/ministries" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Ministries & Agencies
                  </Link>
                </li>
                <li>
                  <Link href="/know-lesotho" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Know Lesotho
                  </Link>
                </li>
                <li>
                  <Link href="/civic-voice" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Civic Voice
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h6 className="font-bold text-lg mb-6 text-white">About</h6>
              <ul className="space-y-3">
                <li>
                  <Link href="/explore-lesotho" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Explore Lesotho
                  </Link>
                </li>
                <li>
                  <Link href="/civic-voice" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Civic Voice
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
              <h6 className="font-bold text-lg mb-6 text-white">Support</h6>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/help" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/help#contact" className="text-blue-100 hover:text-white transition-colors duration-200">
                    Contact Support
                  </Link>
                </li>
              </ul>
              
              <div className="space-y-2">
                <p className="text-blue-100 font-semibold">Contact Information</p>
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
                <p>&copy; 2024 Kingdom of Lesotho. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-blue-200 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}