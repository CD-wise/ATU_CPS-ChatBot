"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, GraduationCap } from "lucide-react"
import ReactMarkdown from 'react-markdown'

const QUICK_QUESTIONS = [
  "What programs are available in Computer Science?",
  "How do I apply for admission?",
  "What are the tuition fees?",
  "Tell me about cybersecurity courses",
  "What career opportunities are available?",
  "How long is the HND program?",
  "What programming languages are taught?",
  "Is accommodation available on campus?",
]

export default function ATUChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickQuestion = (question: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { elements: { prompt: { value: question } } },
    } as any

    handleInputChange({ target: { value: question } } as any)
    setTimeout(() => {
      handleSubmit(syntheticEvent)
      setShowQuickQuestions(false)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-4 border-green-500">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-full">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ATU Assistant</h1>
              <p className="text-sm text-gray-600">Accra Technical University</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Card className="h-[calc(100vh-200px)] flex flex-col shadow-lg border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Computer Science Department Assistant
            </CardTitle>
            <p className="text-sm opacity-90">Ask me about programs, admissions, courses, and university services</p>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Bot className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to ATU Assistant! 🎓</h3>
                    <p className="text-gray-600 mb-4">
                      I'm here to help with information about Computer Science, Cybersecurity, IT programs, and general
                      university services.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="bg-green-500 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-yellow-500 text-white ml-auto"
                          : "bg-white border border-green-100 shadow-sm"
                      }`}
                    >
                      <div className="text-sm prose prose-sm max-w-none"><ReactMarkdown>{message.content}</ReactMarkdown></div>
                    </div>

                    {message.role === "user" && (
                      <div className="bg-yellow-500 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="bg-green-500 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-green-100 shadow-sm p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {showQuickQuestions && messages.length === 0 && (
                <div className="p-4 border-t border-green-100 bg-green-50">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-2 text-xs bg-white hover:bg-green-50 border-green-200"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-green-100 bg-white">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about programs, admissions, courses..."
                    className="flex-1 border-green-200 focus:border-green-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Computer Science
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Cybersecurity
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Information Technology
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>© 2024 Accra Technical University - Computer Science Department</p>
          <p className="mt-1">For official information, visit www.atu.edu.gh</p>
        </div>
      </div>
    </div>
  )
}
