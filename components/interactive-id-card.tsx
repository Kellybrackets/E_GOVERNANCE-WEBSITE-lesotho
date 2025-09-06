"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  RotateCcw, 
  Share2, 
  ShieldCheck, 
  FileText,
  Eye,
  EyeOff,
  ArrowRight,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface User {
  firstName: string
  lastName: string
  idNumber: string
  dateOfBirth: string
  gender: string
  citizenship: string
  photo?: string
}

interface InteractiveIDCardProps {
  user?: User
  className?: string
}

export default function InteractiveIDCard({ user, className = "" }: InteractiveIDCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showDetails, setShowDetails] = useState(true)
  const [tiltStyle, setTiltStyle] = useState({})
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Default user data
  const defaultUser: User = {
    firstName: "Thabo",
    lastName: "Mofokeng",
    idNumber: "28051012345",
    dateOfBirth: "10 May 1985",
    gender: "M",
    citizenship: "Lesotho"
  }
  
  const currentUser = user || defaultUser

  // 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = -(mouseY / rect.height) * 30
    const rotateY = (mouseX / rect.width) * 30
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s ease-out'
    })
  }

  // Touch/Swipe handling for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y
    
    // Horizontal swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      setIsFlipped(!isFlipped)
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleAuthorize = () => {
    // Implement authorization logic
    console.log('Authorize action triggered')
  }

  const handleShare = () => {
    // Implement share logic
    console.log('Share action triggered')
  }

  const handleSign = () => {
    // Implement sign logic
    console.log('Sign action triggered')
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Privacy Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#00247D]">Digital Identity</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="border-[#00247D] text-[#00247D] hover:bg-[#00247D] hover:text-white"
        >
          {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>

      {/* Card Container */}
      <div className="relative perspective-1000">
        <div
          ref={cardRef}
          className={`card-container relative w-full h-64 preserve-3d cursor-pointer ${
            isFlipped ? 'flipped' : ''
          }`}
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Front Side */}
          <div className="card-face card-front absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#00247D] via-[#0066CC] to-[#009A49]">
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#00247D] font-bold text-sm">L</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">REPUBLIC OF LESOTHO</p>
                  <p className="text-white/80 text-xs">Digital Identity Card</p>
                </div>
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-[#00247D] via-white to-[#009A49] rounded-sm"></div>
            </div>

            {/* Card Content */}
            <div className="flex p-4 space-x-4">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 bg-white/20 rounded-lg flex items-center justify-center border-2 border-white/30">
                  {currentUser.photo ? (
                    <Image
                      src={currentUser.photo}
                      alt="Profile"
                      width={80}
                      height={96}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-white/60 text-xs text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-white/20 rounded-full"></div>
                      PHOTO
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-white/80 text-xs">SURNAME</p>
                  <p className="text-white font-bold text-sm">
                    {showDetails ? currentUser.lastName : '••••••••'}
                  </p>
                </div>
                <div>
                  <p className="text-white/80 text-xs">GIVEN NAMES</p>
                  <p className="text-white font-bold text-sm">
                    {showDetails ? currentUser.firstName : '••••••••'}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <p className="text-white/80 text-xs">GENDER</p>
                    <p className="text-white font-bold text-sm">{currentUser.gender}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">ID NUMBER</p>
                    <p className="text-white font-bold text-sm">
                      {showDetails ? currentUser.idNumber : '•••••••••••'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/80 text-xs">DATE OF BIRTH</p>
                  <p className="text-white font-bold text-sm">
                    {showDetails ? currentUser.dateOfBirth : '•• ••• ••••'}
                  </p>
                </div>
                <div>
                  <p className="text-white/80 text-xs">CITIZENSHIP</p>
                  <p className="text-white font-bold text-sm">{currentUser.citizenship}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="card-face card-back absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#009A49] via-[#00CC66] to-[#00247D] rotate-y-180">
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Verified Identity</h3>
              <p className="text-white/80 text-sm mb-4">
                This digital identity card is officially verified by the Government of Lesotho
              </p>
              <div className="space-y-2 text-white/70 text-xs">
                <p>• Biometrically secured</p>
                <p>• Blockchain verified</p>
                <p>• Government authorized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Indicator */}
        {!isFlipped && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-[#00247D] bg-blue-50 px-3 py-2 rounded-full animate-pulse">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Swipe for back</span>
              <ArrowRight className="w-4 h-4 animate-bounce-x" />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2 mt-6">
        <Button
          onClick={handleAuthorize}
          className="bg-[#009A49] hover:bg-[#007A39] text-white px-6 py-2 rounded-xl font-semibold shadow-lg"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Authorize
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-[#00247D] text-[#00247D] hover:bg-[#00247D] hover:text-white px-6 py-2 rounded-xl font-semibold"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          onClick={handleSign}
          variant="outline"
          className="border-[#009A49] text-[#009A49] hover:bg-[#009A49] hover:text-white px-6 py-2 rounded-xl font-semibold"
        >
          <FileText className="w-4 h-4 mr-2" />
          Sign
        </Button>
      </div>

      {/* Flip Button */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleFlip}
          variant="ghost"
          className="text-[#00247D] hover:bg-blue-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {isFlipped ? 'View Front' : 'View Back'}
        </Button>
      </div>
    </div>
  )
}