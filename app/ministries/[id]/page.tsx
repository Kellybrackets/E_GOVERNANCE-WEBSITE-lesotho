"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Users,
  FileText,
  ArrowLeft,
  ChevronRight,
  Globe,
  Calendar,
  Star,
  CheckCircle,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for ministry/agency details
const entityDetails = {
  "health": {
    id: "health",
    name: "Ministry of Health",
    description: "Ensuring accessible, quality healthcare services for all citizens of Lesotho. The Ministry of Health is committed to promoting health and wellness throughout the Kingdom through comprehensive healthcare delivery, health education, and medical services.",
    minister: "Hon. Selibe Mochoboroane",
    location: "Maseru",
    address: "P.O. Box 514, Maseru 100",
    phone: "+266 2231 1611",
    email: "info@health.gov.ls",
    website: "www.health.gov.ls",
    established: "1966",
    type: "Ministry",
    icon: "heart",
    vision: "To provide accessible, equitable, and quality health services for all citizens of Lesotho.",
    mission: "To lead the health sector in providing comprehensive health services that promote health and wellness for all people in Lesotho.",
    services: [
      {
        name: "Medical License Application",
        description: "Apply for or renew medical practitioner licenses in Lesotho",
        fee: "M250.00",
        processingTime: "14-21 days",
        requirements: ["Medical Degree Certificate", "Internship Certificate", "Good Standing Certificate", "Application Form"],
        status: "Online",
        url: "/services/medical-license"
      },
      {
        name: "Health Facility Registration",
        description: "Register new healthcare facilities or renew existing registrations",
        fee: "M500.00",
        processingTime: "21-30 days",
        requirements: ["Facility Plans", "Equipment List", "Staff Qualifications", "Safety Certificates"],
        status: "Online",
        url: "/services/facility-registration"
      },
      {
        name: "Vaccination Certificates",
        description: "Obtain official vaccination certificates for travel or employment",
        fee: "M50.00",
        processingTime: "Same day",
        requirements: ["National ID", "Vaccination Record", "Passport Photos"],
        status: "Online",
        url: "/services/vaccination-certificate"
      },
      {
        name: "Health Insurance Registration",
        description: "Register for national health insurance coverage",
        fee: "Free",
        processingTime: "7-10 days",
        requirements: ["National ID", "Employment Certificate", "Income Statement"],
        status: "Online",
        url: "/services/health-insurance"
      },
      {
        name: "Medical Record Request",
        description: "Request copies of medical records from public health facilities",
        fee: "M25.00",
        processingTime: "3-5 days",
        requirements: ["National ID", "Hospital Registration Number", "Request Form"],
        status: "Online",
        url: "/services/medical-records"
      },
      {
        name: "Mental Health Services Registration",
        description: "Access mental health support and counseling services",
        fee: "Free",
        processingTime: "Immediate appointment scheduling",
        requirements: ["National ID", "Referral Letter (optional)"],
        status: "Online",
        url: "/services/mental-health"
      },
      {
        name: "Emergency Medical Alert Registration",
        description: "Register for emergency medical alert services",
        fee: "M100.00/year",
        processingTime: "Same day",
        requirements: ["National ID", "Medical History", "Emergency Contacts"],
        status: "In Development",
        url: "#"
      },
      {
        name: "Traditional Medicine Registration",
        description: "Register as a traditional medicine practitioner",
        fee: "M150.00",
        processingTime: "14-21 days",
        requirements: ["Training Certificate", "Community Endorsement", "National ID"],
        status: "In Development",
        url: "#"
      }
    ],
    stats: {
      employees: 2800,
      offices: 45,
      servicesOffered: 8,
      citizensServed: "2.1M+",
      satisfaction: "4.1/5",
    },
  },
  "home-affairs": {
    id: "home-affairs",
    name: "Ministry of Home Affairs",
    description: "Overseeing internal affairs, national security, and civic registration for the Kingdom of Lesotho. The Ministry ensures proper documentation of all citizens and residents while maintaining national security and promoting efficient government services.",
    minister: "Hon. Motlalentoa Letsosa",
    location: "Maseru",
    address: "P.O. Box 174, Maseru 100",
    phone: "+266 2232 3034",
    email: "info@homeaffairs.gov.ls",
    website: "www.homeaffairs.gov.ls",
    established: "1966",
    type: "Ministry",
    icon: "shield",
    vision: "To be a leading ministry in providing efficient, accessible and quality services to all citizens and residents of Lesotho.",
    mission: "To provide comprehensive home affairs services that promote national security, facilitate legal documentation, and support citizen welfare through efficient service delivery.",
    services: [
      {
        name: "Apply for a National ID Card",
        description: "Apply for, renew, or replace your Lesotho National ID card",
        fee: "M60.00",
        processingTime: "7-14 days",
        requirements: ["Birth Certificate", "Proof of Address", "Passport Photos", "Application Form"],
        status: "Online",
        url: "/services/national-id"
      },
      {
        name: "Apply for a Passport",
        description: "Submit an application for a new biometric passport",
        fee: "M350.00",
        processingTime: "14-21 days",
        requirements: ["National ID", "Birth Certificate", "Passport Photos", "Travel Itinerary"],
        status: "Online",
        url: "/services/passport"
      },
      {
        name: "Register a Birth",
        description: "Officially register the birth of a child",
        fee: "M25.00",
        processingTime: "3-5 days",
        requirements: ["Hospital Birth Record", "Parent IDs", "Marriage Certificate (if applicable)"],
        status: "Online",
        url: "/services/birth-certificate"
      },
      {
        name: "Marriage Certificate",
        description: "Register marriages and obtain official marriage certificates",
        fee: "M50.00",
        processingTime: "Same day",
        requirements: ["IDs of both parties", "Witnesses", "Marriage Officer"],
        status: "Online",
        url: "/services/marriage-certificate"
      },
      {
        name: "Death Certificate",
        description: "Register deaths and obtain official death certificates",
        fee: "M30.00",
        processingTime: "2-3 days",
        requirements: ["Hospital/Doctor Certificate", "National ID of deceased", "Next of kin ID"],
        status: "Online",
        url: "/services/death-certificate"
      },
      {
        name: "Immigration Permits",
        description: "Apply for various immigration permits and visas",
        fee: "M200.00 - M500.00",
        processingTime: "7-21 days",
        requirements: ["Passport", "Application Form", "Supporting Documents", "Fees"],
        status: "Online",
        url: "/services/immigration"
      },
      {
        name: "Citizenship Application",
        description: "Apply for Lesotho citizenship through naturalization",
        fee: "M1000.00",
        processingTime: "60-90 days",
        requirements: ["Residence Permit", "Language Test", "Good Character Certificate", "Application"],
        status: "Online",
        url: "/services/citizenship"
      },
      {
        name: "Name Change Certificate",
        description: "Apply for official name change documentation",
        fee: "M100.00",
        processingTime: "14-21 days",
        requirements: ["Current ID", "Affidavit", "Newspaper Publication", "Court Order"],
        status: "Online",
        url: "/services/name-change"
      },
      {
        name: "Refugee Registration",
        description: "Register as a refugee and apply for protection services",
        fee: "Free",
        processingTime: "14-30 days",
        requirements: ["Identity Documents", "Statement", "Interview"],
        status: "Online",
        url: "/services/refugee"
      },
      {
        name: "Document Authentication",
        description: "Authenticate documents for international use",
        fee: "M75.00 per document",
        processingTime: "5-7 days",
        requirements: ["Original Documents", "Application Form", "Fees"],
        status: "In Development",
        url: "#"
      },
      {
        name: "Police Clearance Certificate",
        description: "Obtain police clearance certificates for various purposes",
        fee: "M80.00",
        processingTime: "10-14 days",
        requirements: ["National ID", "Fingerprints", "Application Form"],
        status: "In Development",
        url: "#"
      },
      {
        name: "Border Pass Application",
        description: "Apply for border passes for frequent cross-border travel",
        fee: "M120.00",
        processingTime: "7-10 days",
        requirements: ["National ID", "Proof of Border Residence", "Photos"],
        status: "In Development",
        url: "#"
      }
    ],
    stats: {
      employees: 450,
      offices: 12,
      servicesOffered: 12,
      citizensServed: "125,000+",
      satisfaction: "4.2/5",
    },
  },
  "lra": {
    id: "lra",
    name: "Lesotho Revenue Authority (LRA)",
    description: "Collecting government revenue efficiently and ensuring tax compliance across the Kingdom. The LRA is responsible for administering taxes, customs duties, and other government revenues to fund public services and development programs.",
    director: "Mrs. Retšelisitsoe Matlanyane",
    location: "Maseru",
    address: "Corner Kingsway & Pioneer Road, Maseru",
    phone: "+266 2231 2001",
    email: "info@lra.org.ls",
    website: "www.lra.org.ls",
    established: "2003",
    type: "Agency",
    icon: "file-text",
    vision: "To be a world-class revenue administration that facilitates trade and ensures optimal revenue collection.",
    mission: "To collect government revenue efficiently and effectively while providing excellent customer service and ensuring compliance with tax laws.",
    services: [
      {
        name: "Tax Registration",
        description: "Register as a taxpayer and obtain Tax Identification Number (TIN)",
        fee: "Free",
        processingTime: "Same day",
        requirements: ["National ID", "Business Registration (if applicable)", "Application Form"],
        status: "Online",
        url: "/services/tax-registration"
      },
      {
        name: "VAT Registration",
        description: "Register for Value Added Tax (VAT) for businesses",
        fee: "Free",
        processingTime: "3-5 days",
        requirements: ["Business Registration", "TIN", "Bank Details", "Turnover Projections"],
        status: "Online",
        url: "/services/vat-registration"
      },
      {
        name: "Income Tax Return Filing",
        description: "File annual income tax returns online",
        fee: "Free (filing)",
        processingTime: "Immediate submission",
        requirements: ["TIN", "Income Statements", "Tax Calculation", "Supporting Documents"],
        status: "Online",
        url: "/services/income-tax"
      },
      {
        name: "Customs Clearance",
        description: "Clear imported goods through customs",
        fee: "Variable (based on goods)",
        processingTime: "1-3 days",
        requirements: ["Import Permit", "Invoice", "Bill of Lading", "Insurance Certificate"],
        status: "Online",
        url: "/services/customs"
      },
      {
        name: "Tax Refund Application",
        description: "Apply for tax refunds on overpaid taxes",
        fee: "Free",
        processingTime: "21-30 days",
        requirements: ["Tax Returns", "Proof of Overpayment", "Bank Details", "Application Form"],
        status: "Online",
        url: "/services/tax-refund"
      },
      {
        name: "Tax Compliance Certificate",
        description: "Obtain certificate showing tax compliance status",
        fee: "M50.00",
        processingTime: "3-5 days",
        requirements: ["TIN", "Up-to-date Tax Returns", "Payment History"],
        status: "Online",
        url: "/services/compliance-certificate"
      },
      {
        name: "Withholding Tax Registration",
        description: "Register for withholding tax on payments to non-residents",
        fee: "Free",
        processingTime: "Same day",
        requirements: ["Business Registration", "TIN", "Contract Details"],
        status: "Online",
        url: "/services/withholding-tax"
      },
      {
        name: "Tax Appeal Application",
        description: "Appeal tax assessments and penalties",
        fee: "M200.00",
        processingTime: "30-45 days",
        requirements: ["Notice of Assessment", "Grounds of Appeal", "Supporting Evidence"],
        status: "Online",
        url: "/services/tax-appeal"
      },
      {
        name: "Import/Export License",
        description: "Apply for licenses to import or export specific goods",
        fee: "M300.00 - M1000.00",
        processingTime: "7-14 days",
        requirements: ["Business Registration", "TIN", "Commodity Details", "Bank Guarantee"],
        status: "In Development",
        url: "#"
      },
      {
        name: "Transfer Pricing Documentation",
        description: "Submit transfer pricing documentation for related party transactions",
        fee: "Free",
        processingTime: "Immediate submission",
        requirements: ["Financial Statements", "Related Party Agreements", "Economic Analysis"],
        status: "In Development",
        url: "#"
      }
    ],
    stats: {
      employees: 320,
      offices: 8,
      servicesOffered: 10,
      citizensServed: "85,000+",
      satisfaction: "4.0/5",
    },
  },
}

export default function MinistryDetailPage() {
  const params = useParams()
  const entityId = params.id as string
  const entity = entityDetails[entityId as keyof typeof entityDetails]

  if (!entity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Entity Not Found</h1>
          <p className="text-gray-600 mb-4">The requested ministry or agency could not be found.</p>
          <Link href="/ministries">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ministries & Agencies
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get appropriate icon
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart className="w-8 h-8 text-white" />
      case 'shield': return <Shield className="w-8 h-8 text-white" />
      case 'file-text': return <FileText className="w-8 h-8 text-white" />
      default: return <Building2 className="w-8 h-8 text-white" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#002F6C] via-[#003d7a] to-[#007849] text-white py-16">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <Link href="/ministries">
              <button className="flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Ministries & Agencies
              </button>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-between">
            <div className="flex items-start space-x-6 mb-6 lg:mb-0">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                {getIconComponent(entity.icon)}
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{entity.name}</h1>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-2xl">{entity.description}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{entity.minister || entity.director}: {entity.minister ? entity.minister : entity.director}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Established: {entity.established}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Rating: {entity.stats.satisfaction}</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              {entity.type}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-[#002F6C] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#002F6C]">{entity.stats.employees}</p>
              <p className="text-sm text-gray-600">Employees</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Building2 className="w-8 h-8 text-[#007849] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#007849]">{entity.stats.offices}</p>
              <p className="text-sm text-gray-600">Offices</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{entity.stats.servicesOffered}</p>
              <p className="text-sm text-gray-600">Services</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{entity.stats.citizensServed}</p>
              <p className="text-sm text-gray-600">Citizens Served</p>
            </CardContent>
          </Card>
        </div>

        {/* Entity Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About {entity.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-600 leading-relaxed">{entity.vision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
                  <p className="text-gray-600 leading-relaxed">{entity.mission}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{entity.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{entity.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span>{entity.website}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span>{entity.address}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Digital Services</h2>
          <div className="grid gap-6">
            {entity.services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                    </div>
                    <Badge 
                      className={`ml-4 ${
                        service.status === 'Online' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Fee</h4>
                      <p className="text-lg font-bold text-[#007849]">{service.fee}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Processing Time</h4>
                      <p className="text-gray-700">{service.processingTime}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Requirements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.requirements.slice(0, 3).map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center space-x-2">
                            <ChevronRight className="w-3 h-3" />
                            <span>{req}</span>
                          </li>
                        ))}
                        {service.requirements.length > 3 && (
                          <li className="text-xs text-gray-500">+{service.requirements.length - 3} more requirements</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {service.status === 'Online' ? (
                      <Link href={service.url}>
                        <Button className="bg-[#002F6C] hover:bg-blue-800">
                          Start Service
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
                        Coming Soon
                      </Button>
                    )}
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
