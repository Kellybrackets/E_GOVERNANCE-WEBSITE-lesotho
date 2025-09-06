"use client"

import React, { useState } from "react"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Printer, 
  Download,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye,
  Tag,
  ArrowRight,
  MessageCircle,
  Heart,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

// Mock data - in real app this would come from API/database
const mockArticles = [
  {
    id: "1",
    title: "Law Society drags Parliament to Constitutional Court over controversial legislation",
    content: `<p>The Law Society of Lesotho has filed a constitutional challenge against Parliament regarding recent legislative changes that affect judicial independence and the rule of law in the country.</p>

    <h2>Background of the Dispute</h2>
    <p>The controversy stems from amendments to the Judicial Service Act that were passed without proper consultation with key stakeholders in the legal community. The Law Society argues that these changes undermine the independence of the judiciary and violate constitutional principles.</p>

    <h2>Key Legal Arguments</h2>
    <p>In their court filing, the Law Society presents several compelling arguments:</p>
    <ul>
      <li>The amendments were passed without following proper parliamentary procedures</li>
      <li>Insufficient public consultation was conducted before the legislation was enacted</li>
      <li>The changes violate separation of powers principles enshrined in the Constitution</li>
      <li>The amendments could compromise judicial independence</li>
    </ul>

    <h2>Parliamentary Response</h2>
    <p>Parliament has yet to officially respond to the legal challenge, though sources indicate that government legal advisors are preparing a comprehensive defense of the legislation.</p>

    <blockquote>
      "We remain committed to upholding the rule of law and will defend our legislative processes in court," said a parliamentary spokesperson who requested anonymity.
    </blockquote>

    <h2>Implications for Lesotho's Legal System</h2>
    <p>This case could have significant implications for how legislation is passed in Lesotho and the balance of power between different branches of government. Legal experts are closely watching the proceedings.</p>

    <p>The Constitutional Court is expected to hear arguments in the coming weeks, with a decision anticipated before the end of the current judicial term.</p>`,
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-29T14:30:00Z",
    updatedAt: "2024-01-29T16:15:00Z",
    author: {
      name: "Thabo Mofolo",
      bio: "Senior Legal Correspondent with over 10 years covering constitutional matters",
      avatar: "/placeholder-user.jpg"
    },
    category: "Legal",
    tags: ["Constitutional Court", "Law Society", "Parliament", "Legislation", "Judicial Independence"],
    readTime: "5 min",
    views: 2547,
    likes: 89,
    comments: 23,
    featured: true
  },
  {
    id: "2", 
    title: "Bantu MMC launches M50 million micro-loan fund for small businesses",
    content: `<p>Bantu Microfinance and Credit Cooperative (MMC) has announced the launch of a comprehensive M50 million micro-loan fund specifically designed to support small and medium enterprises (SMEs) across Lesotho.</p>

    <h2>Fund Details and Eligibility</h2>
    <p>The new micro-loan facility offers flexible lending options for businesses with the following features:</p>
    <ul>
      <li>Loan amounts ranging from M5,000 to M500,000</li>
      <li>Competitive interest rates starting at 12% per annum</li>
      <li>Flexible repayment terms up to 36 months</li>
      <li>Minimal collateral requirements for qualified applicants</li>
    </ul>

    <h2>Application Process</h2>
    <p>Eligible businesses can apply through multiple channels including online applications, branch visits, and mobile banking platforms. The streamlined process is designed to provide quick approvals within 72 hours for most applications.</p>

    <h2>Economic Impact</h2>
    <p>This initiative is expected to significantly boost economic activity in rural and urban areas, creating employment opportunities and supporting local economic development.</p>`,
    featuredImage: "/placeholder.jpg",
    publishedAt: "2024-01-28T09:15:00Z",
    updatedAt: "2024-01-28T11:30:00Z",
    author: {
      name: "Palesa Ramokoatsi",
      bio: "Business and Economics Reporter specializing in microfinance and SME development",
      avatar: "/placeholder-user.jpg"
    },
    category: "Economy",
    tags: ["Microfinance", "Small Business", "Loans", "Economic Development", "SME"],
    readTime: "4 min",
    views: 1823,
    likes: 67,
    comments: 12,
    featured: true
  }
]

const relatedArticles = [
  {
    id: "3",
    title: "Manufacturers cry foul over surge in brick imports from South Africa",
    category: "Economy",
    publishedAt: "2024-01-27T11:45:00Z",
    featuredImage: "/placeholder.jpg"
  },
  {
    id: "4", 
    title: "Sehlabathebe hydroelectric power project set to resume operations",
    category: "Energy",
    publishedAt: "2024-01-26T16:20:00Z",
    featuredImage: "/placeholder.jpg"
  },
  {
    id: "5",
    title: "Digital ID system maintenance scheduled for weekend",
    category: "Government",
    publishedAt: "2024-01-25T13:00:00Z", 
    featuredImage: "/placeholder.jpg"
  }
]

export default function NewsArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string
  
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Find the article by ID
  const article = mockArticles.find(a => a.id === articleId)

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Legal": "bg-red-100 text-red-700 border-red-200",
      "Economy": "bg-green-100 text-green-700 border-green-200", 
      "Energy": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Government": "bg-blue-100 text-blue-700 border-blue-200",
      "Technology": "bg-purple-100 text-purple-700 border-purple-200",
      "Sports": "bg-orange-100 text-orange-700 border-orange-200"
    }
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = article.title
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy URL:', err)
        }
        break
    }
    setShowShareMenu(false)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center text-[#002F6C] hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="relative"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute right-4 top-16 bg-white border rounded-lg shadow-lg p-4 z-50">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="w-full justify-start text-blue-400 hover:bg-blue-50"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="w-full justify-start text-blue-700 hover:bg-blue-50"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="w-full justify-start"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          {/* Category and Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Badge className={`border ${getCategoryColor(article.category)}`}>
                {article.category}
              </Badge>
              {article.featured && (
                <Badge className="bg-[#007849] text-white">Featured</Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(article.publishedAt)}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex items-center justify-between py-4 border-y border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{article.author.name}</p>
                  <p className="text-sm text-gray-600">{article.author.bio}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Footer */}
            <div className="border-t pt-6 mb-8">
              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? article.likes + 1 : article.likes}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {article.comments} Comments
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  {article.updatedAt !== article.publishedAt && (
                    <span>Updated: {formatDate(article.updatedAt)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">About {article.author.name}</h4>
                    <p className="text-gray-600">{article.author.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Reading Progress */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-[#002F6C]" />
                    <span className="font-medium text-sm">Reading Progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#002F6C] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">75% complete</p>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        href={`/news/${related.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={related.featuredImage}
                              alt={related.title}
                              width={64}
                              height={64}
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-gray-900 group-hover:text-[#002F6C] line-clamp-2 mb-1">
                              {related.title}
                            </h5>
                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs ${getCategoryColor(related.category)}`}>
                                {related.category}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(related.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <Link href="/news" className="block mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View All News
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get the latest news from Lesotho government services
                  </p>
                  <Button size="sm" className="w-full bg-[#007849] hover:bg-[#005a37]">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}