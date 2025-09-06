"use client"

import React, { useEffect, useState } from 'react'

interface LesothoLoadingProps {
  size?: number
  showText?: boolean
  className?: string
}

export default function LesothoLoading({ 
  size = 120, 
  showText = true, 
  className = "" 
}: LesothoLoadingProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      {/* Main Animation Container */}
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Background Ripple Effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="lesotho-ripple lesotho-ripple-1"></div>
          <div className="lesotho-ripple lesotho-ripple-2"></div>
          <div className="lesotho-ripple lesotho-ripple-3"></div>
        </div>

        {/* Central Basotho Hat (Mokorotlo) - Khotso (Peace) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <svg
            width={size * 0.4}
            height={size * 0.4}
            viewBox="0 0 100 100"
            className="lesotho-hat animate-pulse-soft"
          >
            {/* Basotho Hat Silhouette */}
            <path
              d="M50 15 
                 C35 15, 25 25, 25 40
                 C25 45, 27 50, 30 53
                 L35 60 L40 65 L50 70 L60 65 L65 60 L70 53
                 C73 50, 75 45, 75 40
                 C75 25, 65 15, 50 15 Z
                 M45 25 L55 25 L52 35 L48 35 Z"
              fill="url(#hatGradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              className="lesotho-hat-path"
            />
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#002F6C" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#007849" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#002F6C" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#002F6C" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#007849" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#007849" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Raindrops - Pula (Rain) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="lesotho-raindrop"
              style={{
                left: `${20 + (i * 8)}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + (i % 3) * 0.3}s`
              }}
            >
              <svg width="4" height="12" viewBox="0 0 4 12">
                <path
                  d="M2 0 L2 8 C3 8, 4 9, 4 10 C4 11, 3 12, 2 12 C1 12, 0 11, 0 10 C0 9, 1 8, 2 8 Z"
                  fill="url(#raindropGradient)"
                  opacity="0.7"
                />
                <defs>
                  <linearGradient id="raindropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007849" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#002F6C" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}
        </div>

        {/* Prosperity Symbols - Nala */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="lesotho-prosperity-symbol"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-${size * 0.3}px)`,
                animationDelay: `${2 + i * 0.1}s`
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6 Z"
                  fill="#007849"
                  opacity="0.6"
                  className="lesotho-star-glow"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Mountain Silhouette - Subtle Background */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center opacity-20">
          <svg width={size} height={size * 0.3} viewBox="0 0 120 36">
            <path
              d="M0 36 L20 20 L35 25 L50 10 L65 18 L80 8 L95 15 L120 5 L120 36 Z"
              fill="url(#mountainGradient)"
              className="lesotho-mountains"
            />
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#002F6C" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#007849" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Cultural Text */}
      {showText && (
        <div className="text-center space-y-2">
          <div className="lesotho-motto-text">
            <span 
              className="lesotho-motto-word lesotho-motto-khotso"
              style={{ animationDelay: '0s' }}
            >
              Khotso
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span 
              className="lesotho-motto-word lesotho-motto-pula"
              style={{ animationDelay: '1s' }}
            >
              Pula
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span 
              className="lesotho-motto-word lesotho-motto-nala"
              style={{ animationDelay: '2s' }}
            >
              Nala
            </span>
          </div>
          <p className="text-sm text-gray-500 font-light lesotho-subtitle">
            Peace • Rain • Prosperity
          </p>
        </div>
      )}
    </div>
  )
}