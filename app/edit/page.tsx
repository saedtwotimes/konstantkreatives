"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Upload, Check, X, ArrowRight, ArrowLeft, ImagePlus, Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/components/app-layout"
import WaitlistModal from "@/components/waitlist-modal"

type Step = "upload" | "waitlist" | "select" | "result"

export default function EditPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImages, setProcessedImages] = useState<{ [key: string]: string }>({})
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Background options
  const backgrounds = [
    {
      id: "white",
      name: "Clean White",
      thumbnail: "/placeholder.svg?height=200&width=200&text=White",
      fullImage: "/placeholder.svg?height=800&width=800&text=White",
    },
    {
      id: "gradient",
      name: "Blue Gradient",
      thumbnail: "/placeholder.svg?height=200&width=200&text=Gradient",
      fullImage: "/placeholder.svg?height=800&width=800&text=Gradient",
    },
    {
      id: "studio",
      name: "Studio Light",
      thumbnail: "/placeholder.svg?height=200&width=200&text=Studio",
      fullImage: "/placeholder.svg?height=800&width=800&text=Studio",
    },
    {
      id: "outdoor",
      name: "Outdoor",
      thumbnail: "/placeholder.svg?height=200&width=200&text=Outdoor",
      fullImage: "/placeholder.svg?height=800&width=800&text=Outdoor",
    },
  ]

  // Check if user has completed waitlist
  useEffect(() => {
    if (currentStep === "upload" && uploadedImage && uploadProgress === 100) {
      // Show waitlist modal after a short delay
      const timer = setTimeout(() => {
        setShowWaitlistModal(true)
        setCurrentStep("waitlist")
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [uploadedImage, uploadProgress, currentStep])

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  // Process the uploaded file
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      setError("Please upload an image file (JPEG, PNG, or WebP)")
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit. Please upload a smaller image.")
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)
        clearInterval(interval)
        setUploadProgress(100)
      }
    }
    reader.onerror = () => {
      clearInterval(interval)
      setError("Error reading file. Please try again.")
    }
    reader.readAsDataURL(file)
  }

  // Handle waitlist completion
  const handleWaitlistComplete = () => {
    setShowWaitlistModal(false)
    setCurrentStep("select")
  }

  // Toggle background selection
  const toggleBackgroundSelection = (backgroundId: string) => {
    setSelectedBackgrounds((prev) => {
      if (prev.includes(backgroundId)) {
        return prev.filter((id) => id !== backgroundId)
      } else {
        // Limit to 4 selections
        if (prev.length < 4) {
          return [...prev, backgroundId]
        }
        return prev
      }
    })
  }

  // Process the images with selected backgrounds
  const processImages = () => {
    if (selectedBackgrounds.length === 0) {
      setError("Please select at least one background")
      return
    }

    setError(null)
    setIsProcessing(true)
    setProcessedImages({})

    // Simulate processing time with realistic progress
    let processed = 0
    const totalToProcess = selectedBackgrounds.length

    selectedBackgrounds.forEach((backgroundId) => {
      const background = backgrounds.find((bg) => bg.id === backgroundId)

      // Simulate API call with varying delays to feel more realistic
      setTimeout(
        () => {
          if (background) {
            setProcessedImages((prev) => ({
              ...prev,
              [backgroundId]: background.fullImage,
            }))

            processed++
            if (processed === totalToProcess) {
              setIsProcessing(false)
              setCurrentStep("result")
            }
          }
        },
        1000 + Math.random() * 2000, // Random delay between 1-3 seconds
      )
    })
  }

  // Reset the process
  const resetProcess = () => {
    setUploadedImage(null)
    setSelectedBackgrounds([])
    setProcessedImages({})
    setCurrentStep("upload")
    setUploadProgress(0)
    setError(null)
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Download a processed image
  const downloadImage = (backgroundId: string) => {
    const background = backgrounds.find((bg) => bg.id === backgroundId)
    if (background && processedImages[backgroundId]) {
      // In a real app, this would download the actual processed image
      const link = document.createElement("a")
      link.href = processedImages[backgroundId]
      link.download = `product-${background.name.toLowerCase().replace(/\s+/g, "-")}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transform Photos</h1>
        <p className="text-gray-600">
          Transform your product photos with professional backgrounds in seconds. Our AI-powered tool removes
          backgrounds automatically and places your product on your chosen setting for stunning results.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{
                width:
                  currentStep === "upload" || currentStep === "waitlist"
                    ? "33%"
                    : currentStep === "select"
                      ? "66%"
                      : "100%",
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  currentStep === "upload" || currentStep === "waitlist"
                    ? "bg-blue-600 text-white"
                    : currentStep === "select" || currentStep === "result"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                }`}
              >
                {currentStep === "select" || currentStep === "result" ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span
                className={`text-sm ${currentStep === "upload" || currentStep === "waitlist" ? "text-blue-600 font-medium" : "text-gray-500"}`}
              >
                Upload Photo
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  currentStep === "select"
                    ? "bg-blue-600 text-white"
                    : currentStep === "result"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                }`}
              >
                {currentStep === "result" ? <Check className="w-5 h-5" /> : "2"}
              </div>
              <span className={`text-sm ${currentStep === "select" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                Select Backgrounds
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  currentStep === "result" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className={`text-sm ${currentStep === "result" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                View Results
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto mb-6">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Upload Step */}
        {currentStep === "upload" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Upload Your Product Photo</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start by uploading the product image you want to enhance with new backgrounds.
              </p>
            </div>

            <div
              className={`max-w-xl mx-auto border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-300 hover:border-blue-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(false)
              }}
              onDrop={handleDrop}
              onClick={uploadedImage ? undefined : triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                aria-label="Upload product image"
              />

              {uploadedImage ? (
                <div className="space-y-6">
                  <div className="relative w-full max-w-xs mx-auto aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-md">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded product"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="w-full h-2" />
                    <p className="text-sm text-gray-500">
                      {uploadProgress < 100 ? "Uploading..." : "Upload complete!"}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        resetProcess()
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-10 px-4">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <Upload className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Drag and drop your image here</h3>
                  <p className="text-gray-500 mb-6">or click to browse files</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  <div className="mt-6 text-xs text-gray-400 space-y-1">
                    <p>Supported formats: JPG, PNG, WebP</p>
                    <p>Maximum file size: 10MB</p>
                    <p>Recommended resolution: 2000×2000 pixels or higher</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Waitlist Modal */}
        <WaitlistModal
          isOpen={showWaitlistModal}
          onClose={() => {
            setShowWaitlistModal(false)
            setCurrentStep("select")
          }}
          onSubmit={handleWaitlistComplete}
        />

        {/* Select Backgrounds Step */}
        {currentStep === "select" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Select Backgrounds</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose up to 4 backgrounds to see your product with different styles.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Preview of uploaded image */}
              <div className="lg:w-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Your Product</h3>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 mb-4">
                      {uploadedImage ? (
                        <Image
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Your product"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          No image uploaded
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("upload")}
                        className="transition-all duration-300"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={processImages}
                        disabled={selectedBackgrounds.length === 0}
                        className={`transition-all duration-300 ${
                          selectedBackgrounds.length > 0 ? "bg-blue-600 hover:bg-blue-700" : ""
                        }`}
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t border-gray-200 px-6 py-3">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Selected: {selectedBackgrounds.length}/4
                        </span>
                        {selectedBackgrounds.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBackgrounds([])}
                            className="h-8 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear all
                          </Button>
                        )}
                      </div>
                      <Progress value={selectedBackgrounds.length * 25} className="h-1.5" />
                    </div>
                  </CardFooter>
                </Card>

                {/* Selected backgrounds preview */}
                {selectedBackgrounds.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected backgrounds:</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedBackgrounds.map((id) => {
                        const bg = backgrounds.find((b) => b.id === id)
                        return (
                          <div key={id} className="relative group">
                            <div className="aspect-square rounded-md overflow-hidden border border-blue-300 shadow-sm">
                              <Image
                                src={bg?.thumbnail || ""}
                                alt={bg?.name || ""}
                                width={60}
                                height={60}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <button
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => toggleBackgroundSelection(id)}
                              aria-label={`Remove ${bg?.name} background`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Background selection grid */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {backgrounds.map((background) => (
                    <div
                      key={background.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedBackgrounds.includes(background.id)
                          ? "border-blue-600 shadow-md scale-[1.02]"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                      onClick={() => toggleBackgroundSelection(background.id)}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={background.thumbnail || "/placeholder.svg"}
                          alt={background.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {selectedBackgrounds.includes(background.id) && (
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                        {background.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === "result" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Enhanced Photos</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here are your product photos with the selected backgrounds.
              </p>
            </div>

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">
                      {Object.keys(processedImages).length}/{selectedBackgrounds.length}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Processing your images...</h3>
                <p className="text-gray-500 mb-8">This may take a few moments</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                  {selectedBackgrounds.map((backgroundId) => {
                    const isProcessed = !!processedImages[backgroundId]
                    const background = backgrounds.find((bg) => bg.id === backgroundId)

                    return (
                      <div key={backgroundId} className="relative">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          {isProcessed ? (
                            <Image
                              src={processedImages[backgroundId] || "/placeholder.svg"}
                              alt={`Processed with ${background?.name}`}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 truncate">{background?.name}</span>
                          {isProcessed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Done
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-pulse">
                              Processing
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep("select")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Selection
                    </Button>
                    <Button onClick={resetProcess}>Start New Edit</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedBackgrounds.map((backgroundId) => {
                    const background = backgrounds.find((bg) => bg.id === backgroundId)
                    return (
                      <Card key={backgroundId} className="overflow-hidden group">
                        <div className="relative aspect-square">
                          <Image
                            src={processedImages[backgroundId] || "/placeholder.svg"}
                            alt={`Product with ${background?.name} background`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              onClick={() => downloadImage(backgroundId)}
                              size="icon"
                              className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md"
                              aria-label="Download image"
                            >
                              <Download className="h-5 w-5 text-blue-600" />
                            </Button>
                          </div>
                        </div>
                        <CardFooter className="p-3 bg-gray-50 border-t flex justify-between items-center">
                          <span className="font-medium text-gray-700">{background?.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadImage(backgroundId)}
                            className="h-8 gap-1"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-xs">Download</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

