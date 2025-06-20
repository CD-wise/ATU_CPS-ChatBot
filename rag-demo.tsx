"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Database, Bot } from "lucide-react"

export default function RAGDemo() {
  const [query, setQuery] = useState("What programming languages are taught in first year?")
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Simulated knowledge base
  const knowledgeBase = [
    {
      id: 1,
      content:
        "HND Computer Science Year 1 Semester 1: Introduction to Programming (Python) - 3 credits. Students learn basic programming concepts, variables, loops, functions, and object-oriented programming fundamentals using Python.",
      source: "HND CS Curriculum",
      similarity: 0.95,
    },
    {
      id: 2,
      content:
        "HND Computer Science Year 1 Semester 2: Object-Oriented Programming (Java) - 3 credits. Advanced programming concepts using Java, including classes, inheritance, polymorphism, and GUI development.",
      source: "HND CS Curriculum",
      similarity: 0.87,
    },
    {
      id: 3,
      content:
        "BTech Computer Science programming sequence: Year 1 - Python and Java fundamentals, Year 2 - C++ and JavaScript, Year 3 - Advanced languages like C#, PHP, and mobile development frameworks.",
      source: "BTech CS Curriculum",
      similarity: 0.82,
    },
    {
      id: 4,
      content:
        "Web Technologies course covers HTML, CSS, JavaScript, and modern frameworks. Students build responsive websites and learn frontend development principles.",
      source: "Course Catalog",
      similarity: 0.75,
    },
  ]

  const steps = [
    {
      title: "1. Student Query",
      description: "Student asks a question",
      icon: <Search className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "2. Query Embedding",
      description: "Convert question to vector representation",
      icon: <Database className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "3. Similarity Search",
      description: "Find most relevant knowledge chunks",
      icon: <Search className="h-5 w-5" />,
      color: "bg-yellow-500",
    },
    {
      title: "4. Context Retrieval",
      description: "Get top matching documents",
      icon: <Database className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      title: "5. AI Generation",
      description: "Generate response using retrieved context",
      icon: <Bot className="h-5 w-5" />,
      color: "bg-red-500",
    },
  ]

  const runRAGDemo = async () => {
    setIsRunning(true)
    for (let i = 0; i <= 4; i++) {
      setStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
    setIsRunning(false)
  }

  const finalResponse = `Based on the ATU Computer Science curriculum, here are the programming languages taught in first year:

**HND Computer Science Year 1:**
- **Semester 1:** Python - Introduction to Programming (3 credits)
  - Basic programming concepts, variables, loops, functions
  - Object-oriented programming fundamentals
  
- **Semester 2:** Java - Object-Oriented Programming (3 credits)  
  - Advanced OOP concepts, classes, inheritance
  - GUI development basics

**Additional Languages:**
- **Web Technologies:** HTML, CSS, JavaScript for web development
- **BTech students** also get exposure to C++ and mobile development frameworks

The curriculum is designed to give you a strong foundation starting with Python's beginner-friendly syntax, then advancing to Java's enterprise-level capabilities.`

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">RAG System Demo - ATU Chatbot</CardTitle>
          <p className="text-gray-600">See how Retrieval Augmented Generation works step by step</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Query Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Student Question:</label>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about ATU CS programs..."
                className="flex-1"
              />
              <Button onClick={runRAGDemo} disabled={isRunning} className="bg-green-500 hover:bg-green-600">
                {isRunning ? "Running..." : "Run RAG Demo"}
              </Button>
            </div>
          </div>

          {/* Steps Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((stepInfo, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 ${
                  step >= index ? "ring-2 ring-green-500 bg-green-50" : "bg-gray-50"
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`${stepInfo.color} p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center text-white`}
                  >
                    {stepInfo.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{stepInfo.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{stepInfo.description}</p>
                  {step >= index && (
                    <Badge variant="default" className="mt-2 bg-green-500">
                      Complete
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Step Details */}
          {step >= 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Step Details */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Current Step: {steps[step]?.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Student Query Received</h4>
                      <p className="text-sm bg-white p-2 rounded border">"{query}"</p>
                      <p className="text-xs text-gray-600 mt-2">
                        The system receives the student's question and prepares to find relevant information.
                      </p>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Query Embedding</h4>
                      <div className="bg-white p-2 rounded border text-xs font-mono">
                        [0.123, -0.456, 0.789, 0.234, -0.567, ...]
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        The question is converted into a mathematical vector that represents its semantic meaning.
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Similarity Search</h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Comparing query vector with knowledge base vectors...
                      </p>
                      <div className="space-y-1">
                        {knowledgeBase.map((item, index) => (
                          <div key={item.id} className="flex justify-between text-xs">
                            <span>Document {item.id}</span>
                            <Badge variant="outline">Similarity: {item.similarity}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Top Relevant Documents Retrieved</h4>
                      <div className="space-y-2">
                        {knowledgeBase.slice(0, 3).map((item) => (
                          <div key={item.id} className="bg-white p-2 rounded border">
                            <div className="flex justify-between items-start mb-1">
                              <Badge variant="outline" className="text-xs">
                                {item.source}
                              </Badge>
                              <Badge variant="default" className="text-xs bg-purple-500">
                                {item.similarity}
                              </Badge>
                            </div>
                            <p className="text-xs">{item.content.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">AI Response Generated</h4>
                      <div className="bg-white p-3 rounded border text-sm max-h-40 overflow-y-auto">
                        {finalResponse}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        The AI uses the retrieved context to generate an accurate, comprehensive response.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Knowledge Base Preview */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Knowledge Base (Simulated)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {knowledgeBase.map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 ${
                          step >= 2 && item.similarity > 0.8 ? "ring-2 ring-yellow-400 bg-yellow-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.source}
                          </Badge>
                          {step >= 2 && (
                            <Badge
                              variant={item.similarity > 0.8 ? "default" : "outline"}
                              className={`text-xs ${item.similarity > 0.8 ? "bg-yellow-500" : ""}`}
                            >
                              {item.similarity}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-700">{item.content}</p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technical Implementation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Current System (Static)</h4>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <pre className="text-xs overflow-x-auto">
                  {`// Static knowledge in system prompt
const prompt = \`
You are ATU-CPS ASSISTANT...
PROGRAMS:
- HND Computer Science (2-3 years)
- BTech Computer Science (4 years)
...\`

// Limited, can't update easily`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-blue-600">RAG System (Dynamic)</h4>
              <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <pre className="text-xs overflow-x-auto">
                  {`// Dynamic knowledge retrieval
const relevantDocs = await searchKnowledgeBase(query)

const context = relevantDocs.map(doc => doc.content).join('\\n')

const response = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: \`Context: \${context}
  Question: \${query}\`
})

// Unlimited, real-time updates`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
