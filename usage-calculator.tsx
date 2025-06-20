"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function UsageCalculator() {
  const [studentsPerDay, setStudentsPerDay] = useState(100)
  const [questionsPerStudent, setQuestionsPerStudent] = useState(3)
  const [avgResponseLength, setAvgResponseLength] = useState(200)

  // Token calculations
  const avgQuestionTokens = 20 // Average student question
  const avgResponseTokens = Math.ceil(avgResponseLength * 1.3) // ~1.3 tokens per word
  const tokensPerConversation = (avgQuestionTokens + avgResponseTokens) * questionsPerStudent
  const dailyTokens = studentsPerDay * tokensPerConversation
  const monthlyTokens = dailyTokens * 30

  // Cost calculations
  const gpt4oCost = (monthlyTokens * 2.5) / 1000000 + (monthlyTokens * 10) / 1000000
  const gpt4oMiniCost = (monthlyTokens * 0.15) / 1000000 + (monthlyTokens * 0.6) / 1000000

  // Rate limit analysis
  const tier1Limit = 30000 // TPM for GPT-4o
  const peakMinuteUsage = (studentsPerDay / 8) * (tokensPerConversation / questionsPerStudent) // Assuming 8-hour peak period
  const rateLimitStatus = peakMinuteUsage > tier1Limit ? "Exceeds Limit" : "Within Limit"

  const examples = [
    {
      scenario: "Light Usage Day",
      students: 50,
      questions: 2,
      tokens: 3000,
      cost4o: "$0.04",
      cost4oMini: "$0.002",
    },
    {
      scenario: "Normal Day",
      students: 200,
      questions: 3,
      tokens: 15600,
      cost4o: "$0.19",
      cost4oMini: "$0.012",
    },
    {
      scenario: "Registration Period",
      students: 800,
      questions: 5,
      tokens: 83200,
      cost4o: "$1.04",
      cost4oMini: "$0.062",
    },
    {
      scenario: "Exam Period Peak",
      students: 1500,
      questions: 4,
      tokens: 124800,
      cost4o: "$1.56",
      cost4oMini: "$0.094",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">ATU Chatbot Usage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="students">Students per Day</Label>
              <Input
                id="students"
                type="number"
                value={studentsPerDay}
                onChange={(e) => setStudentsPerDay(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="questions">Questions per Student</Label>
              <Input
                id="questions"
                type="number"
                value={questionsPerStudent}
                onChange={(e) => setQuestionsPerStudent(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="response">Avg Response Length (words)</Label>
              <Input
                id="response"
                type="number"
                value={avgResponseLength}
                onChange={(e) => setAvgResponseLength(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg">Usage Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Tokens per conversation:</span>
                  <Badge variant="outline">{tokensPerConversation.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Daily tokens:</span>
                  <Badge variant="outline">{dailyTokens.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Monthly tokens:</span>
                  <Badge variant="outline">{monthlyTokens.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Peak minute usage:</span>
                  <Badge variant={rateLimitStatus === "Within Limit" ? "default" : "destructive"}>
                    {Math.round(peakMinuteUsage).toLocaleString()} TPM
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Rate limit status:</span>
                  <Badge variant={rateLimitStatus === "Within Limit" ? "default" : "destructive"}>
                    {rateLimitStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>GPT-4o:</span>
                  <Badge variant="outline" className="bg-red-100">
                    ${gpt4oCost.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>GPT-4o-mini:</span>
                  <Badge variant="outline" className="bg-green-100">
                    ${gpt4oMiniCost.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Savings with mini:</span>
                  <Badge variant="default" className="bg-green-500">
                    ${(gpt4oCost - gpt4oMiniCost).toFixed(2)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p>💡 GPT-4o-mini is ~13x cheaper!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Example Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Real-World Usage Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((example, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{example.scenario}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{example.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions each:</span>
                    <span>{example.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily tokens:</span>
                    <span>{example.tokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPT-4o cost:</span>
                    <span className="text-red-600">{example.cost4o}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPT-4o-mini cost:</span>
                    <span className="text-green-600">{example.cost4oMini}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Text Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">How Much Text Depletes Usage?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Short Answer (50 words)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs">
                <p className="mb-2">
                  "HND Computer Science requires WASSCE credits in English, Math, and Science. Applications open
                  March-July. Visit admissions office for details."
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Tokens:</span>
                    <span>~65</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost (4o-mini):</span>
                    <span>$0.00005</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Medium Answer (200 words)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs">
                <p className="mb-2">
                  "ATU offers multiple CS programs: HND (2-3 years), BTech (4 years), Diploma (2 years). Each covers
                  programming, databases, networks... [continues with detailed explanation]"
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Tokens:</span>
                    <span>~260</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost (4o-mini):</span>
                    <span>$0.0002</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Long Answer (500 words)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs">
                <p className="mb-2">
                  "Comprehensive guide covering all programs, admission requirements, course details, career
                  opportunities, facilities, fees, academic calendar... [full detailed response]"
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Tokens:</span>
                    <span>~650</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost (4o-mini):</span>
                    <span>$0.0005</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Key Insights:</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>1,000 short answers</strong> = ~65,000 tokens = $0.05 with GPT-4o-mini
              </li>
              <li>
                • <strong>1,000 medium answers</strong> = ~260,000 tokens = $0.20 with GPT-4o-mini
              </li>
              <li>
                • <strong>1,000 long answers</strong> = ~650,000 tokens = $0.49 with GPT-4o-mini
              </li>
              <li>
                • <strong>Free tier (200 TPM)</strong> = ~1 medium conversation per minute max
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
