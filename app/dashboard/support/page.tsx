"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, Mail, FileText, ExternalLink, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AppLayout from "@/components/app-layout"

// Mock data
const faqItems = [
  {
    question: "How do I transform my first image?",
    answer:
      "Upload your product image on the Transform page, select your desired backgrounds, and our AI will automatically remove the background and place your product on the new backgrounds.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support JPEG, PNG, and WebP formats. For best results, use high-resolution images with clear product visibility.",
  },
]

export default function SupportPage() {
  const [supportMessage, setSupportMessage] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [supportSubject, setSupportSubject] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSupportMessage("")
      setSupportSubject("")
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions or contact our support team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Available Monday to Friday, 9am - 5pm EST.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Chat</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Email Support
            </CardTitle>
            <CardDescription>Send us an email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">We typically respond within 24 hours.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="mailto:support@konstantkreatives.ai">Email Us</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Documentation
            </CardTitle>
            <CardDescription>Browse our knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Detailed guides and tutorials for all features.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              View Docs
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="support-email">Your Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-subject">Subject</Label>
                  <Input
                    id="support-subject"
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea
                    id="support-message"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

