"use client"

import React, { useState } from "react"
import { 
  Wallet, 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  TrendingUp,
  Check,
  Shield,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EWalletPromotionProps {
  currentBalance?: number
  className?: string
}

export default function EWalletPromotion({ currentBalance, className = "" }: EWalletPromotionProps) {
  const [isOptedIn, setIsOptedIn] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  const handleOptIn = async () => {
    // Simulate API call
    setIsOptedIn(true)
    // In real implementation, this would make an API call to opt the user into the wallet
    console.log('User opted into eWallet')
  }

  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security with biometric authentication"
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Pay bills, transfer money, and shop online instantly"
    },
    {
      icon: CreditCard,
      title: "Digital Cards",
      description: "Virtual cards for safe online transactions"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
      <Card className="ewallet-promotion overflow-hidden border-0 shadow-xl">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00247D] to-[#009A49] rounded-2xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00247D]">eCitizen Wallet</h3>
                <p className="text-[#009A49] text-sm font-medium">Digital Financial Freedom</p>
              </div>
            </div>
            
            {currentBalance && showBalance && (
              <div className="text-right">
                <p className="text-gray-600 text-xs">Current Balance</p>
                <p className="text-2xl font-bold text-[#00247D]">M{currentBalance.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Main Promotion Content */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Unlock Seamless Transactions with eCitizen Wallet
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Experience the future of digital payments in Lesotho. Pay for government services, 
              transfer money to friends and family, and manage all your transactions securely in one place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#009A49]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-[#009A49]" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">{feature.title}</h5>
                    <p className="text-gray-600 text-xs mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-[#00247D]/5 to-[#009A49]/5 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[#009A49]" />
              <h5 className="font-semibold text-gray-900">Why Choose eCitizen Wallet?</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "No monthly fees or hidden charges",
                "24/7 customer support in Sesotho & English",
                "Instant government service payments",
                "Cashback on selected transactions",
                "Multi-currency support (LSL, ZAR, USD)",
                "Offline transaction capability"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#009A49] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            {!isOptedIn ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Smartphone className="w-4 h-4" />
                  <span>Available on iOS and Android</span>
                </div>
                
                <Button
                  onClick={handleOptIn}
                  className="modern-button bg-gradient-to-r from-[#00247D] to-[#009A49] hover:from-[#001F5C] hover:to-[#007A39] text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Opt In Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <div className="w-full flex items-center justify-center space-x-2 text-[#009A49] bg-green-50 rounded-xl p-4">
                <Check className="w-5 h-5" />
                <span className="font-medium">Successfully opted in! Check your wallet dashboard.</span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#00247D]">500K+</p>
                <p className="text-xs text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#009A49]">M2.5B</p>
                <p className="text-xs text-gray-600">Total Transactions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#00247D]">99.9%</p>
                <p className="text-xs text-gray-600">Uptime</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}