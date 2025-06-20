"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function SystemStatus() {
  const currentFeatures = [
    {
      name: "Chat Interface",
      status: "working",
      description: "Mobile-friendly chat UI with ATU branding",
      whatYouCanDo: "Students can ask questions and get responses",
    },
    {
      name: "AI Integration",
      status: "working",
      description: "OpenAI GPT-4o-mini integration via AI SDK",
      whatYouCanDo: "AI responds to questions using built-in knowledge",
    },
    {
      name: "Static Knowledge Base",
      status: "working",
      description: "Pre-programmed information about ATU CS department",
      whatYouCanDo: "Get answers about programs, admissions, fees, courses",
    },
    {
      name: "Quick Questions",
      status: "working",
      description: "Pre-loaded common questions for easy access",
      whatYouCanDo: "Click quick questions to get instant answers",
    },
    {
      name: "Mobile Responsive",
      status: "working",
      description: "Works perfectly on phones, tablets, and desktop",
      whatYouCanDo: "Use on any device, anywhere",
    },
    {
      name: "Real-time Streaming",
      status: "working",
      description: "AI responses stream in real-time",
      whatYouCanDo: "See responses as they're being generated",
    },
  ]

  const missingFeatures = [
    {
      name: "Database Integration",
      status: "missing",
      description: "No connection to university database",
      impact: "Can't access real-time student data, schedules, grades",
    },
    {
      name: "RAG System",
      status: "missing",
      description: "No dynamic knowledge retrieval",
      impact: "Limited to pre-programmed information only",
    },
    {
      name: "Admin Dashboard",
      status: "missing",
      description: "No interface to update knowledge base",
      impact: "Need developer to update information",
    },
    {
      name: "User Authentication",
      status: "missing",
      description: "No student login system",
      impact: "Can't provide personalized information",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "working":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
        return <Badge className="bg-green-500">Working</Badge>
      case "missing":
        return <Badge variant="destructive">Missing</Badge>
      default:
        return <Badge variant="outline">Partial</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">ATU Chatbot - Current System Status</CardTitle>
          <p className="text-gray-600">Here's what's working now and what you can do with it</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Working Features */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-600">✅ What's Working Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentFeatures.map((feature, index) => (
                  <div key={index} className="border-l-4 border-l-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(feature.status)}
                      <h4 className="font-semibold">{feature.name}</h4>
                      {getStatusBadge(feature.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                    <p className="text-sm text-green-700 font-medium">👉 {feature.whatYouCanDo}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Missing Features */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">❌ What's Missing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missingFeatures.map((feature, index) => (
                  <div key={index} className="border-l-4 border-l-red-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(feature.status)}
                      <h4 className="font-semibold">{feature.name}</h4>
                      {getStatusBadge(feature.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                    <p className="text-sm text-red-700 font-medium">⚠️ {feature.impact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Now */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">How Your System Works Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="bg-blue-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">Student Visits Website</h3>
                <p className="text-xs text-gray-600">Opens your chatbot in browser</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4 text-center">
                <div className="bg-green-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">Asks Question</h3>
                <p className="text-xs text-gray-600">Types question or clicks quick question</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="p-4 text-center">
                <div className="bg-yellow-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">AI Processes</h3>
                <p className="text-xs text-gray-600">OpenAI uses built-in knowledge to respond</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4 text-center">
                <div className="bg-purple-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">Gets Answer</h3>
                <p className="text-xs text-gray-600">Receives streaming response in real-time</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Sample Interactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">What Students Can Ask Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">✅ Questions That Work Well</h4>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"What programs are available in Computer Science?"</p>
                  <p className="text-xs text-gray-600 mt-1">Gets detailed info about HND, BTech, Diploma programs</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"What are the admission requirements?"</p>
                  <p className="text-xs text-gray-600 mt-1">Provides WASSCE/SSSCE requirements for each program</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"How much are the tuition fees?"</p>
                  <p className="text-xs text-gray-600 mt-1">Shows fee ranges for different programs</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"What programming languages are taught?"</p>
                  <p className="text-xs text-gray-600 mt-1">Lists Python, Java, C++, JavaScript, etc.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-3">❌ Questions That Don't Work</h4>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"What's my current GPA?"</p>
                  <p className="text-xs text-gray-600 mt-1">Can't access student records - no database connection</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"When is my next exam?"</p>
                  <p className="text-xs text-gray-600 mt-1">No access to real-time schedules or personal data</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"Is Dr. Mensah available today?"</p>
                  <p className="text-xs text-gray-600 mt-1">No real-time faculty schedule information</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">"What books are available in the library?"</p>
                  <p className="text-xs text-gray-600 mt-1">No library system integration</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
