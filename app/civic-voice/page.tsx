"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, FileText, Vote, AlertTriangle, Users, ArrowRight, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ModernLayout from "@/components/modern-layout"

const civicFeatures = [
  {
    icon: MessageCircle,
    title: "Real-Time Support Chat",
    description: "Connect directly with government agents for immediate assistance with your queries and concerns.",
    href: "/civic-voice/chat",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50/80",
    stats: "24/7 Available",
    featured: true,
    image: "/images/stock/cultural/AdobeStock_162645844_Preview.jpeg",
  },
  {
    icon: FileText,
    title: "Report a Problem",
    description: "Submit service issues and track their resolution. Help improve government services for everyone.",
    href: "/civic-voice/report",
    color: "text-[#007849]",
    bgColor: "bg-green-50/80",
    stats: "1,234 Reports Resolved",
    featured: true,
    image: "/images/stock/cultural/AdobeStock_226715477_Preview.jpeg",
  },
  {
    icon: Vote,
    title: "Participate in Governance",
    description: "Voice your opinion on policies, participate in surveys, and engage in democratic processes.",
    href: "/civic-voice/participate",
    color: "text-[#002F6C]",
    bgColor: "bg-blue-50/80",
    stats: "15 Active Surveys",
    featured: false,
    image: "/images/stock/cultural/AdobeStock_333787378_Preview.jpeg",
  },
  {
    icon: AlertTriangle,
    title: "Community Alerts",
    description: "Stay informed about local issues and share important community updates with your neighbors.",
    href: "/civic-voice/local-alerts",
    color: "text-[#007849]",
    bgColor: "bg-green-50/80",
    stats: "23 Active Alerts",
    featured: false,
    image: "/images/stock/cultural/AdobeStock_415582243_Preview.jpeg",
  },
]

const recentActivity = [
  {
    type: "chat",
    title: "New chat session started",
    description: "Agent Palesa is helping with passport renewal",
    time: "2 minutes ago",
    status: "active",
  },
  {
    type: "report",
    title: "Water shortage reported in Maseru",
    description: "Issue #CV-2024-001 has been escalated to Water Authority",
    time: "1 hour ago",
    status: "in-progress",
  },
  {
    type: "survey",
    title: "Digital Services Survey",
    description: "87% completion rate - closes in 3 days",
    time: "2 hours ago",
    status: "active",
  },
  {
    type: "alert",
    title: "Road closure in Berea",
    description: "Main Street blocked due to construction",
    time: "4 hours ago",
    status: "verified",
  },
]

export default function CivicVoicePage() {
  return (
    <ModernLayout
      title="Civic Voice"
      subtitle="Your platform to engage with government and strengthen your community"
      currentPage="civic-voice"
    >

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className={`w-8 h-8 text-[#002F6C]`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">12,847</h3>
                <p className="text-gray-600 font-medium">Active Citizens</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className={`w-8 h-8 text-[#007849]`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">2,847</h3>
                <p className="text-gray-600 font-medium">Issues Resolved</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className={`w-8 h-8 text-[#002F6C]`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">89%</h3>
                <p className="text-gray-600 font-medium">Satisfaction Rate</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Join thousands of citizens actively <span className="font-bold text-[#002F6C]">shaping the future</span> of 
              <span className="font-bold text-[#007849]"> Lesotho</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002F6C] mb-6">How Can We Help You Today?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect, report, participate, and stay informed - all in one place
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {civicFeatures.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <Card className="h-full hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden group-hover:from-white group-hover:to-blue-50/30 transition-all duration-300">
                  {/* Feature Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={`${feature.title} illustration`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {feature.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-[#007849] text-white font-semibold px-3 py-1">
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Floating Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`w-12 h-12 ${feature.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{feature.stats}</span>
                      <ArrowRight className="w-5 h-5 text-[#007849] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002F6C] mb-6">Recent Community Activity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what's happening in your community and how citizens are making a difference
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <Card key={index} className="hover-lift card-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-2xl flex items-center justify-center shadow-lg">
                          {activity.type === "chat" && <MessageCircle className="w-6 h-6 text-white" />}
                          {activity.type === "report" && <FileText className="w-6 h-6 text-white" />}
                          {activity.type === "survey" && <Vote className="w-6 h-6 text-white" />}
                          {activity.type === "alert" && <AlertTriangle className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">{activity.title}</h4>
                          <p className="text-gray-600 leading-relaxed mb-4">{activity.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{activity.time}</span>
                            <Badge
                              className={`${
                                activity.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : activity.status === "in-progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <div className="space-y-6">
                <Card className="text-center p-6 bg-gradient-to-br from-[#002F6C] to-[#007849] text-white">
                  <div className="text-4xl font-bold mb-2">2,847</div>
                  <p className="text-blue-100">Issues Resolved This Year</p>
                </Card>
                <Card className="text-center p-6 bg-white card-shadow">
                  <div className="text-4xl font-bold text-[#007849] mb-2">15,234</div>
                  <p className="text-gray-600">Citizens Engaged</p>
                </Card>
                <Card className="text-center p-6 bg-white card-shadow">
                  <div className="text-4xl font-bold text-[#002F6C] mb-2">89%</div>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </Card>
                <Card className="text-center p-6 bg-white card-shadow">
                  <div className="text-4xl font-bold text-[#007849] mb-2">24/7</div>
                  <p className="text-gray-600">Support Available</p>
                </Card>
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
              Ready to Make a Difference?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 font-light leading-relaxed">
              Join thousands of citizens who are actively shaping the future of Lesotho through engagement and participation
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/civic-voice/chat">
                <Button 
                  size="lg" 
                  className="bg-white text-[#002F6C] hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  Start Chatting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/civic-voice/report">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#002F6C] px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-200 hover:scale-105"
                >
                  Report an Issue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </ModernLayout>
  )
}
