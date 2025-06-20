"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, GraduationCap, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
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
  "What does COMPSSA mean?"
]

export default function ATUChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
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
      setShowMobileMenu(false)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Enhanced Header with Theme Toggle */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b-4 border-green-500 dark:border-green-400 sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 dark:bg-green-600 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">ATU-CPS ASSISTANT</h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Accra Technical University
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-gray-800 rounded-lg md:hidden border dark:border-gray-700">
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Quick Questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_QUESTIONS.slice(0, 4).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-2 text-xs bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 border-green-200 dark:border-gray-600"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-2 md:p-4">
        <Card className="h-[calc(100vh-140px)] md:h-[calc(100vh-200px)] flex flex-col shadow-lg border-2 border-green-100 dark:border-gray-700 dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-green-500 to-yellow-500 dark:from-green-600 dark:to-yellow-600 text-white rounded-t-lg p-3 md:p-6">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Bot className="h-4 w-4 md:h-5 md:w-5" />
              Computer Science Department Assistant
            </CardTitle>
            <p className="text-xs md:text-sm opacity-90">
              Ask me about programs, admissions, courses, and university services
            </p>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-4 md:py-8">
                    <div className="bg-green-100 dark:bg-green-900 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <Bot className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      Welcome to ATU-CPS ASSISTANT! 🎓
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 px-4">
                      I'm here to help with information about Computer Science, Cybersecurity, IT programs, and general
                      university services.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 md:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="bg-green-500 dark:bg-green-600 p-1.5 md:p-2 rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-lg text-sm md:text-base ${
                        message.role === "user"
                          ? "bg-yellow-500 dark:bg-yellow-600 text-white ml-auto"
                          : "bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 shadow-sm text-gray-900 dark:text-gray-100"
                      }`}
                    >
                     <div className="text-sm prose prose-sm max-w-none"><ReactMarkdown>{message.content}</ReactMarkdown></div>

                    </div>

                    {message.role === "user" && (
                      <div className="bg-yellow-500 dark:bg-yellow-600 p-1.5 md:p-2 rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 md:gap-3 justify-start">
                    <div className="bg-green-500 dark:bg-green-600 p-1.5 md:p-2 rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center">
                      <Bot className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 shadow-sm p-2 md:p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions - Desktop Only */}
              {showQuickQuestions && messages.length === 0 && (
                <div className="hidden md:block p-4 border-t border-green-100 dark:border-gray-700 bg-green-50 dark:bg-gray-800">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Questions:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-2 text-xs bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 border-green-200 dark:border-gray-600"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-2 md:p-4 border-t border-green-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about programs, admissions..."
                    className="flex-1 border-green-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 md:px-4"
                    size="sm"
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </form>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs"
                  >
                    Computer Science
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs"
                  >
                    Cybersecurity
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs"
                  >
                    Information Technology
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-2 md:mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Accra Technical University</p>
          <p className="mt-1 hidden md:block">For official information, visit www.atu.edu.gh</p>
        </div>
      </div>
    </div>
  )
}
