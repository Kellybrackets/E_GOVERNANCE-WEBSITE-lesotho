"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Heart,
  Shield,
  FileText,
  Users,
  ArrowRight,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const entities = [
  {
    id: "health",
    name: "Ministry of Health",
    description: "Ensuring accessible, quality healthcare services for all citizens of Lesotho.",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    accentColor: "bg-red-600",
    serviceCount: 8,
    onlineServices: 6,
    contact: {
      phone: "+266 2231 1611",
      email: "info@health.gov.ls",
      address: "P.O. Box 514, Maseru 100"
    }
  },
  {
    id: "home-affairs",
    name: "Ministry of Home Affairs", 
    description: "Overseeing internal affairs, national security, and civic registration for the Kingdom of Lesotho.",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    accentColor: "bg-blue-600",
    serviceCount: 12,
    onlineServices: 9,
    contact: {
      phone: "+266 2232 3034",
      email: "info@homeaffairs.gov.ls", 
      address: "P.O. Box 174, Maseru 100"
    }
  },
  {
    id: "lra",
    name: "Lesotho Revenue Authority (LRA)",
    description: "Collecting government revenue efficiently and ensuring tax compliance across the Kingdom.",
    icon: FileText,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    accentColor: "bg-green-600",
    serviceCount: 10,
    onlineServices: 8,
    contact: {
      phone: "+266 2231 2001",
      email: "info@lra.org.ls",
      address: "Corner Kingsway & Pioneer Road, Maseru"
    }
  }
]

export default function MinistriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Ministries & Agencies</h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-light leading-relaxed max-w-4xl mx-auto">
              View all government services by their responsible ministry or agency
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Statistics Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#002F6C] rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#002F6C] mb-2">3</h3>
              <p className="text-gray-600">Government Entities</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#007849] rounded-xl mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#007849] mb-2">30</h3>
              <p className="text-gray-600">Total Services</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#002F6C] rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#002F6C] mb-2">23</h3>
              <p className="text-gray-600">Online Services</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Entities</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Access digital services from key government ministries and agencies. 
              Each entity offers a range of online services to serve citizens efficiently.
            </p>
          </div>

          {/* Ministry Cards */}
          <div className="space-y-8">
            {entities.map((entity) => {
              const IconComponent = entity.icon
              return (
                <Card key={entity.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-3 items-center">
                      {/* Content Section */}
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-start space-x-4 mb-6">
                          <div className={`w-14 h-14 ${entity.bgColor} rounded-xl flex items-center justify-center`}>
                            <IconComponent className={`w-7 h-7 ${entity.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{entity.name}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {entity.description}
                            </p>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-gray-100">
                              {entity.serviceCount} Services
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-700">
                              {entity.onlineServices} Online
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {entity.serviceCount - entity.onlineServices} In Development
                            </Badge>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{entity.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{entity.contact.email}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link href={`/ministries/${entity.id}`}>
                          <Button 
                            className={`${entity.accentColor} hover:opacity-90 text-white px-8 py-3 group`}
                            size="lg"
                          >
                            View Services
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>

                      {/* Visual Section */}
                      <div className="relative p-8">
                        <div className={`aspect-square ${entity.bgColor} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/20"></div>
                          <IconComponent className={`w-20 h-20 ${entity.color} relative z-10`} />
                          
                          {/* Service count badge */}
                          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                            <span className="text-sm font-semibold text-gray-700">
                              {entity.onlineServices} Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-gray-50 to-blue-50/30 border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Finding a Service?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  If you're unsure which ministry or agency handles the service you need, 
                  you can browse all available services or contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services">
                    <Button variant="outline" className="bg-white">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse All Services
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button className="bg-[#002F6C] hover:bg-blue-800">
                      <Users className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
