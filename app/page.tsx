"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import confetti from "canvas-confetti"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Step = "upload" | "background-select" | "result"

interface GalleryImage {
  before: string
  after: string
  alt: string
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [showShareButtons, setShowShareButtons] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showAfter, setShowAfter] = useState(false)
  const [selectedStep, setSelectedStep] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isGalleryAutoSwitching, setIsGalleryAutoSwitching] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const ROTATION_INTERVAL = 5000 // 5 seconds per step
  const GALLERY_SWITCH_INTERVAL = 3000 // 3 seconds per gallery switch

  // Log render for debugging
  useEffect(() => {
    console.log("Home page rendered")
  }, [])

  const goToNextStep = useCallback(() => {
    setSelectedStep((prev) => (prev + 1) % steps.length)
  }, [])

  // Handle auto-rotation
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(goToNextStep, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [isAutoRotating, goToNextStep])

  // Pause rotation on user interaction
  const handleStepClick = (index: number) => {
    setSelectedStep(index)
    setIsAutoRotating(false)
  }

  // Resume rotation after user inactivity
  useEffect(() => {
    if (!isAutoRotating) {
      const timeout = setTimeout(() => {
        setIsAutoRotating(true)
      }, ROTATION_INTERVAL * 2) // Wait longer before resuming

      return () => clearTimeout(timeout)
    }
  }, [isAutoRotating])

  // Handle gallery auto-switching
  useEffect(() => {
    if (!isGalleryAutoSwitching) return

    const interval = setInterval(() => {
      setShowAfter((prev) => !prev)
    }, GALLERY_SWITCH_INTERVAL)

    return () => clearInterval(interval)
  }, [isGalleryAutoSwitching])

  // Pause gallery switching on user interaction
  const handleGalleryToggle = (show: boolean) => {
    setShowAfter(show)
    setIsGalleryAutoSwitching(false)

    // Resume auto-switching after 5 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsGalleryAutoSwitching(true)
    }, ROTATION_INTERVAL)

    return () => clearTimeout(timeout)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear messages when user starts typing again
    setMessage("")
    setShowSuccess(false)
    setShowError(false)
    setShowShareButtons(false)
  }

  const handleSubmitEmail = async () => {
    // Prevent multiple submissions
    if (isLoading) return

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.")
      setShowShareButtons(false)
      setShowError(true)
      setShowSuccess(false)
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful response
      setShowSuccess(true)
      setShowError(false)
      setMessage("🎉 Welcome to the KonstantKreatives.ai waitlist! You're in!")
      setShowShareButtons(true)

      // Trigger confetti celebration
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    } catch (error) {
      console.error("Error:", error)
      setShowError(true)
      setShowSuccess(false)
      setMessage("Failed to connect to the server. Please try again later.")
      setShowShareButtons(false)
    } finally {
      setIsLoading(false)
    }
  }

  const shareText = encodeURIComponent(
    "🚀 Just joined the waitlist for @KonstantKreatives.ai - can't wait to create stunning product photos with AI! Join me:",
  )
  const shareUrl = encodeURIComponent("https://konstantkreatives.ai")

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-blue-50/50 to-blue-100/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-b from-white to-blue-50/30 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Main heading */}
              <div className="relative mb-6 md:mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tight text-gray-900">
                  <span className="inline-block animate-fade-in-up [animation-delay:200ms]">Transform Your</span>
                  <span className="block mt-1 md:mt-2 relative animate-fade-in-up [animation-delay:400ms]">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                      Product Photos Instantly
                    </span>
                  </span>
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm"></div>
              </div>

              {/* Enhanced value proposition */}
              <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up [animation-delay:600ms]">
                <span className="block text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  High-Converting Product Images in Seconds
                </span>
                <span className="block text-gray-600">
                  Skip the expensive photo studio. Create stunning product photos with AI that capture attention and
                  drive sales.
                </span>
              </p>

              {/* CTA Button */}
              <div className="mb-12 animate-fade-in-up [animation-delay:800ms]">
                <Link href="/edit">
                  <Button className="bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    Transform Your Photos Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Split View Product Transformation */}
              <div className="w-full max-w-3xl mx-auto relative group transition-all duration-300 hover:scale-[1.02] mb-10 md:mb-16">
                {/* Main preview container with enhanced shadows */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    {/* Before Side */}
                    <div className="absolute inset-0 w-1/2 left-0 h-full">
                      <Image
                        src="/placeholder.svg?height=720&width=640"
                        alt="Before transformation"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        priority
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1.5 bg-white/80 rounded-full text-sm font-medium text-gray-900 backdrop-blur-sm border border-gray-200/50">
                          Before
                        </span>
                      </div>
                    </div>

                    {/* After Side */}
                    <div className="absolute inset-0 w-1/2 left-1/2 h-full">
                      <Image
                        src="/placeholder.svg?height=720&width=640"
                        alt="After transformation"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        priority
                      />
                      <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1.5 bg-white/80 rounded-full text-sm font-medium text-gray-900 backdrop-blur-sm border border-gray-200/50">
                          After
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA section */}
              <div className="w-full max-w-xl mx-auto relative animate-fade-in-up [animation-delay:800ms]">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/50 via-blue-200/30 to-blue-100/50 rounded-2xl blur"></div>
                <div className="relative flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl border border-gray-200/50 shadow-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your work email"
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                  <button
                    onClick={handleSubmitEmail}
                    disabled={isLoading}
                    className={`group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500/40 flex items-center gap-2 whitespace-nowrap ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
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
                        Processing...
                      </>
                    ) : (
                      <>
                        Secure Your Beta Spot
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-3 text-center">
                  🔒 No credit card required • Limited beta spots available
                </p>
              </div>

              {/* Success/Error Messages */}
              {message && (
                <div className="mt-8 flex flex-col items-center animate-fade-in">
                  <div
                    className={`px-6 py-3 rounded-xl backdrop-blur-sm inline-block mb-4 ${
                      showSuccess
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {showSuccess ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {message}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See the Magic in Action</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Real transformations from our users. Toggle to see the difference.
              </p>

              {/* Toggle Switch */}
              <div className="inline-flex items-center bg-gray-100 rounded-full p-1 relative mb-12">
                <button
                  onClick={() => handleGalleryToggle(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    !showAfter ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => handleGalleryToggle(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    showAfter ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  After
                </button>
                {isGalleryAutoSwitching && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 animate-progress"
                      style={{ animationDuration: `${GALLERY_SWITCH_INTERVAL}ms` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        showAfter
                          ? `/placeholder.svg?height=400&width=400&text=After+${index + 1}`
                          : `/placeholder.svg?height=400&width=400&text=Before+${index + 1}`
                      }
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 mb-6">
                  Create stunning photos in <span className="text-blue-600">3 simple steps</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Never manually edit product photos or remove backgrounds by hand ever again.
                </p>
              </div>

              {/* Mobile Tabs */}
              <div className="flex md:hidden mb-6">
                <div className="grid grid-cols-3 w-full gap-1">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className={`py-3 px-4 text-sm rounded-lg text-center transition-all duration-300 relative ${
                        selectedStep === index
                          ? "bg-white shadow-lg font-semibold text-blue-600"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      STEP {index + 1}
                      {selectedStep === index && isAutoRotating && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-100">
                          <div
                            className="h-full bg-blue-600 animate-progress"
                            style={{ animationDuration: `${ROTATION_INTERVAL}ms` }}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Content */}
              <div className="md:hidden">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-blue-600 text-sm font-medium mb-2">STEP {selectedStep + 1}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{steps[selectedStep].title}</h3>
                  <p className="text-gray-600 text-base mb-6">{steps[selectedStep].description}</p>
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=600&width=800&text=${steps[selectedStep].title}`}
                      alt={steps[selectedStep].alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-2 gap-8">
                {/* Steps List */}
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer p-5 rounded-xl transition-all duration-300 ${
                        selectedStep === index
                          ? "bg-white shadow-md border-l-4 border-blue-600"
                          : "hover:bg-white hover:shadow-sm"
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-blue-600 text-sm font-medium">STEP {index + 1}</div>
                        {selectedStep === index && isAutoRotating && (
                          <div className="h-0.5 w-12 bg-blue-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 animate-progress"
                              style={{ animationDuration: `${ROTATION_INTERVAL}ms` }}
                            />
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-base mb-4">{step.description}</p>
                    </div>
                  ))}
                </div>

                {/* Image Display */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={`/placeholder.svg?height=600&width=800&text=${steps[selectedStep].title}`}
                    alt={steps[selectedStep].alt}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-20">
                <span className="px-4 py-2 bg-blue-500/10 rounded-full text-sm font-medium text-blue-600 mb-4 inline-block">
                  Limited Beta Access
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Join the Future of
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent leading-tight">
                    Product Photography
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Be among the first to experience the next generation of AI-powered product photography and gain a
                  competitive edge
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/50 hover:border-blue-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">{benefitIcons[index]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl shadow-2xl p-12">
                  <div className="text-center mb-10">
                    <span className="inline-block animate-bounce mb-4 text-4xl">🚀</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Exclusive Beta Access</h3>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                      Join our limited beta program and get priority access, exclusive pricing, and direct support from
                      our team
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your work email"
                        className="flex-1 px-6 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={handleSubmitEmail}
                          disabled={isLoading}
                          className={`px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 whitespace-nowrap flex-shrink-0 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 ${
                            isLoading ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
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
                              Processing...
                            </>
                          ) : (
                            "Join the Waitlist"
                          )}
                        </button>
                      </div>
                    </div>
                    {message && (
                      <div className="mt-6 text-white bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm inline-block animate-fade-in">
                        {message}
                      </div>
                    )}
                    {showShareButtons && (
                      <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in-up">
                        <p className="text-blue-100 text-sm">Help us spread the word! 🙌</p>
                        <div className="flex gap-3">
                          <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/90 hover:bg-[#1DA1F2] rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                            Share on Twitter
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/90 hover:bg-[#0A66C2] rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h 4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />
                            </svg>
                            Share on LinkedIn
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 mb-6">
              Got questions? Contact us at{" "}
              <a href="mailto:support@konstantkreatives.ai" className="text-blue-600 hover:underline">
                support@konstantkreatives.ai
              </a>
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © {new Date().getFullYear()} KonstantKreatives.ai. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

const steps = [
  {
    title: "Upload Your Photo",
    description: "Simply drag and drop your product photo. Any background, any lighting - we handle it all.",
    image: "/placeholder.svg?height=600&width=800&text=Upload+Photo",
    alt: "Upload product photo",
  },
  {
    title: "Choose Your Style",
    description: "Select from our curated collection of professional backgrounds and styles.",
    image: "/placeholder.svg?height=600&width=800&text=Choose+Style",
    alt: "Select background style",
  },
  {
    title: "Get Perfect Results",
    description: "Download your professionally enhanced product photos in seconds.",
    image: "/placeholder.svg?height=600&width=800&text=Perfect+Results",
    alt: "Download results",
  },
]

const benefits = [
  {
    title: "Gain a Competitive Edge",
    description:
      "Transform your product listings with professional-quality images that outperform the competition and drive higher conversion rates.",
  },
  {
    title: "Save Time & Money",
    description:
      "Eliminate expensive photo shoots and complex editing. Create stunning product images in seconds, not days.",
  },
  {
    title: "Priority Beta Access",
    description:
      "Join our exclusive beta program to get early access, personalized support, and help shape the future of AI product photography.",
  },
]

const benefitIcons = ["💰", "✨", "🎯"]

const socialLinks = [
  {
    href: "https://twitter.com/pixly",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/pixly",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h 4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />
      </svg>
    ),
  },
]

const galleryImages: GalleryImage[] = [
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
  {
    before: "",
    after: "",
    alt: "Shoe product transformation",
  },
]

