"use client"

import type React from "react"

import { useState } from "react"
import { X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function WaitlistModal({ isOpen, onClose, onSubmit }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [platform, setPlatform] = useState("")
  const [category, setCategory] = useState("")
  const [challenges, setChallenges] = useState<string[]>([])
  const [otherChallenge, setOtherChallenge] = useState("")
  const [expectedRoi, setExpectedRoi] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Handle checkbox changes
  const handleChallengeChange = (value: string) => {
    setChallenges((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Platform validation
    if (!platform) {
      newErrors.platform = "Please select a platform"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success state
      setShowSuccess(true)

      // After a delay, close the modal and continue the workflow
      setTimeout(() => {
        onSubmit()
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {!showSuccess && !isSubmitting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}

        {showSuccess ? (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">You're on the waitlist!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining our exclusive beta program. We'll be in touch soon with your access details.
            </p>
            <div className="animate-pulse text-sm text-gray-500">Continuing to background selection...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Exclusive Beta Access</h2>
              <p className="text-gray-600">
                Join our waitlist to be among the first to experience AI-powered product image generation.
              </p>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Platform preference */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Platform Preference <span className="text-red-500">*</span>
              </Label>
              <RadioGroup value={platform} onValueChange={setPlatform}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amazon" id="amazon" disabled={isSubmitting} />
                    <Label htmlFor="amazon" className="font-normal">
                      Amazon FBA
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shopify" id="shopify" disabled={isSubmitting} />
                    <Label htmlFor="shopify" className="font-normal">
                      Shopify
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" disabled={isSubmitting} />
                    <Label htmlFor="both" className="font-normal">
                      Both
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-platform" disabled={isSubmitting} />
                    <Label htmlFor="other-platform" className="font-normal">
                      Other
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              {errors.platform && <p className="text-sm text-red-500">{errors.platform}</p>}
            </div>

            {/* Product categories */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Primary Product Category
              </Label>
              <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apparel">Apparel & Accessories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="home">Home & Kitchen</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photography challenges */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Current Product Photography Challenges</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-time"
                    checked={challenges.includes("time")}
                    onCheckedChange={() => handleChallengeChange("time")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-time" className="font-normal text-sm leading-tight">
                    Time-consuming editing
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-quality"
                    checked={challenges.includes("quality")}
                    onCheckedChange={() => handleChallengeChange("quality")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-quality" className="font-normal text-sm leading-tight">
                    Inconsistent image quality
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-requirements"
                    checked={challenges.includes("requirements")}
                    onCheckedChange={() => handleChallengeChange("requirements")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-requirements" className="font-normal text-sm leading-tight">
                    Meeting platform image requirements
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-cost"
                    checked={challenges.includes("cost")}
                    onCheckedChange={() => handleChallengeChange("cost")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-cost" className="font-normal text-sm leading-tight">
                    High cost of professional photography
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-control"
                    checked={challenges.includes("control")}
                    onCheckedChange={() => handleChallengeChange("control")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-control" className="font-normal text-sm leading-tight">
                    Lack of creative control
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="challenge-other"
                    checked={challenges.includes("other")}
                    onCheckedChange={() => handleChallengeChange("other")}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="challenge-other" className="font-normal text-sm leading-tight">
                    Other
                  </Label>
                </div>
              </div>

              {challenges.includes("other") && (
                <Input
                  placeholder="Please specify other challenges"
                  value={otherChallenge}
                  onChange={(e) => setOtherChallenge(e.target.value)}
                  className="mt-2"
                  disabled={isSubmitting}
                />
              )}
            </div>

            {/* Expected ROI */}
            <div className="space-y-2">
              <Label htmlFor="expected-roi" className="text-sm font-medium">
                What specific results are you hoping to achieve with KonstantKreatives.ai?
              </Label>
              <Textarea
                id="expected-roi"
                placeholder="E.g., Increase conversion rates, save time on editing, create more consistent product images..."
                value={expectedRoi}
                onChange={(e) => setExpectedRoi(e.target.value)}
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-3">
                🔒 Your information is secure. We'll never share your data with third parties.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

