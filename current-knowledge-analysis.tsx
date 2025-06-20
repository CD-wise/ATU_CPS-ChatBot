"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function KnowledgeBaseAnalysis() {
  const currentApproach = {
    type: "System Prompt Knowledge Base",
    description: "Static information embedded in the AI system prompt",
    advantages: [
      "Immediate implementation",
      "Full control over information",
      "No additional training costs",
      "Easy to update and modify",
      "Guaranteed accurate responses for included topics",
    ],
    limitations: [
      "Limited by prompt length (~128k tokens)",
      "Not actually 'trained' on department data",
      "Can't learn from new conversations",
      "May hallucinate beyond provided info",
      "Static - doesn't improve over time",
    ],
  }

  const actualTrainingOptions = [
    {
      name: "Fine-tuning",
      description: "Actually train the model on department-specific data",
      cost: "$$$",
      complexity: "High",
      timeToImplement: "Weeks",
      benefits: "Model learns department patterns, better responses",
      requirements: "Large dataset of Q&A pairs, technical expertise",
    },
    {
      name: "RAG (Retrieval Augmented Generation)",
      description: "Dynamic knowledge retrieval from database",
      cost: "$",
      complexity: "Medium",
      timeToImplement: "Days",
      benefits: "Real-time updates, unlimited knowledge base size",
      requirements: "Vector database, embedding system",
    },
    {
      name: "Hybrid Approach",
      description: "Combine static knowledge + dynamic retrieval",
      cost: "$$",
      complexity: "Medium-High",
      timeToImplement: "1-2 weeks",
      benefits: "Best of both worlds, scalable",
      requirements: "Database setup, careful architecture",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">ATU Chatbot Knowledge Base Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current System */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Current System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    {currentApproach.type}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">{currentApproach.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ Advantages</h4>
                  <ul className="text-sm space-y-1">
                    {currentApproach.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ Limitations</h4>
                  <ul className="text-sm space-y-1">
                    {currentApproach.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* What We Have vs Need */}
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Current Knowledge Coverage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">General University Info</span>
                    <Badge variant="default" className="bg-green-500">
                      Complete
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CS Programs Overview</span>
                    <Badge variant="default" className="bg-green-500">
                      Complete
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Admission Requirements</span>
                    <Badge variant="default" className="bg-green-500">
                      Complete
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Course Details</span>
                    <Badge variant="outline" className="bg-yellow-100">
                      Basic
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Events</span>
                    <Badge variant="outline" className="bg-red-100">
                      Missing
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Records</span>
                    <Badge variant="outline" className="bg-red-100">
                      Missing
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Real-time Schedules</span>
                    <Badge variant="outline" className="bg-red-100">
                      Missing
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Faculty Information</span>
                    <Badge variant="outline" className="bg-yellow-100">
                      Basic
                    </Badge>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Current Coverage:</strong> ~60% of typical student questions
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Missing dynamic/real-time information</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Training Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Knowledge Base Enhancement Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actualTrainingOptions.map((option, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{option.name}</CardTitle>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <Badge variant="outline">{option.cost}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexity:</span>
                    <Badge variant="outline">{option.complexity}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <Badge variant="outline">{option.timeToImplement}</Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-green-600 font-medium">Benefits:</p>
                    <p className="text-xs">{option.benefits}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-red-600 font-medium">Requirements:</p>
                    <p className="text-xs">{option.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Questions Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sample Questions Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">✅ Well Covered Questions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  "What programs are available in Computer Science?"
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  "What are the admission requirements for HND?"
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  "How much are the tuition fees?"
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  "What programming languages are taught?"
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  "What career opportunities are available?"
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-3">❌ Poorly Covered Questions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  "What's my current GPA?"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  "When is the next exam for Database Systems?"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  "Is Dr. Mensah available for consultation today?"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  "What's the current library book availability?"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  "Are there any current job postings for CS graduates?"
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
