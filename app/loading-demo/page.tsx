"use client"

import { useState } from "react"
import LesothoLoading from "@/components/lesotho-loading"
import LesothoSpinner from "@/components/lesotho-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Eye, Settings } from "lucide-react"
import Link from "next/link"

export default function LoadingDemo() {
  const [size, setSize] = useState(120)
  const [showText, setShowText] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#002F6C]">
                Lesotho Loading Animation
              </h1>
              <p className="text-gray-600 mt-1">
                Cultural loading animation embodying "Khotso, Pula, Nala"
              </p>
            </div>
          </div>
        </div>

        {/* Main Demo Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Animation Preview */}
          <div className="space-y-6">
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-[#002F6C]">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`
                  flex items-center justify-center py-16 rounded-lg transition-colors duration-300
                  ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
                `}>
                  <LesothoLoading 
                    size={size}
                    showText={showText}
                    className={darkMode ? 'lesotho-loading-dark' : ''}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Animation Breakdown */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="text-[#007849]">
                  Animation Symbolism
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#002F6C] mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-[#002F6C]">Khotso (Peace)</h4>
                      <p className="text-sm text-gray-600">
                        Central Basotho hat (Mokorotlo) with expanding ripples representing unity and calm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#007849] mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-[#007849]">Pula (Rain)</h4>
                      <p className="text-sm text-gray-600">
                        Animated raindrops falling gracefully, symbolizing life-giving water
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#002F6C] mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-[#002F6C]">Nala (Prosperity)</h4>
                      <p className="text-sm text-gray-600">
                        Twinkling stars representing flourishing life and abundance
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-[#007849]">
                  <Settings className="w-5 h-5 mr-2" />
                  Customization Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Size Control */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Animation Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Show Text Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Cultural Text</span>
                  <button
                    onClick={() => setShowText(!showText)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                      ${showText ? 'bg-[#007849]' : 'bg-gray-200'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                        ${showText ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Background</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                      ${darkMode ? 'bg-[#002F6C]' : 'bg-gray-200'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                        ${darkMode ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Guide */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="text-[#002F6C]">
                  Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-gray-800">
{`import LesothoLoading from '@/components/lesotho-loading'

// Basic usage
<LesothoLoading />

// Customized
<LesothoLoading 
  size={150}
  showText={true}
  className="my-custom-styles"
/>`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Spinner Variants:</h4>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <LesothoSpinner size="sm" />
                      <span className="text-sm">Small</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LesothoSpinner size="md" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LesothoSpinner size="lg" />
                      <span className="text-sm">Large</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Fully responsive and scalable</li>
                    <li>• Optimized SVG animations</li>
                    <li>• Respects reduced motion preferences</li>
                    <li>• Dark/light theme compatible</li>
                    <li>• Cultural authenticity</li>
                    <li>• Multiple size variants</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="text-[#007849]">
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Animation Duration:</span>
                    <br />
                    <span className="text-gray-600">4s loop</span>
                  </div>
                  <div>
                    <span className="font-semibold">File Size:</span>
                    <br />
                    <span className="text-gray-600">~3KB CSS</span>
                  </div>
                  <div>
                    <span className="font-semibold">Performance:</span>
                    <br />
                    <span className="text-gray-600">GPU optimized</span>
                  </div>
                  <div>
                    <span className="font-semibold">Browser Support:</span>
                    <br />
                    <span className="text-gray-600">Modern browsers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Color Palette Reference */}
        <Card className={`mt-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className="text-[#002F6C]">
              Lesotho Flag Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-full h-16 bg-[#002F6C] rounded-lg mb-2"></div>
                <div className="text-sm">
                  <div className="font-semibold">Deep Blue</div>
                  <div className="text-gray-500">#002F6C</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-[#007849] rounded-lg mb-2"></div>
                <div className="text-sm">
                  <div className="font-semibold">Green</div>
                  <div className="text-gray-500">#007849</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-white border-2 border-gray-200 rounded-lg mb-2"></div>
                <div className="text-sm">
                  <div className="font-semibold">White</div>
                  <div className="text-gray-500">#FFFFFF</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-[#F4F6F8] rounded-lg mb-2"></div>
                <div className="text-sm">
                  <div className="font-semibold">Light Grey</div>
                  <div className="text-gray-500">#F4F6F8</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}