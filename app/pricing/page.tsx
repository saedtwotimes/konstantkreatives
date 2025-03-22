"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Helper Components
interface PricingFeatureProps {
  children: React.ReactNode
  included?: boolean
  light?: boolean
}

function PricingFeature({ children, included = false, light = false }: PricingFeatureProps) {
  return (
    <li className="flex items-start">
      {included ? (
        <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${light ? "text-blue-300" : "text-blue-600"}`} />
      ) : (
        <span className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300">—</span>
      )}
      <span className={included ? (light ? "text-white" : "text-gray-700") : "text-gray-400"}>{children}</span>
    </li>
  )
}

interface ComparisonRowProps {
  feature: string
  free: string
  basic: string
  pro: string
  enterprise: string
  tooltip?: string
}

function ComparisonRow({ feature, free, basic, pro, enterprise, tooltip }: ComparisonRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
        {feature}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </td>
      <td className="px-6 py-4 text-center text-sm text-gray-500">{free}</td>
      <td className="px-6 py-4 text-center text-sm text-gray-500">{basic}</td>
      <td className="px-6 py-4 text-center text-sm text-gray-500">{pro}</td>
      <td className="px-6 py-4 text-center text-sm text-gray-500">{enterprise}</td>
    </tr>
  )
}

interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}

export default function PricingPage() {
  // Update the billingCycle state and toggle function
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  // Calculate yearly prices (20% discount)
  const calculateYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.8)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Choose the Perfect Plan for Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              All plans include our core features. Upgrade anytime as your needs grow.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="bg-blue-50 rounded-full p-1 inline-flex items-center mb-3">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === "monthly" ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === "yearly" ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Yearly
              </button>
            </div>
            {billingCycle === "yearly" && (
              <div className="flex items-center text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save 20% with annual billing
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {/* Basic Tier */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Basic</h3>
                <p className="text-sm text-gray-500 mb-4">For individuals and small projects</p>
                <div className="mb-4">
                  {billingCycle === "monthly" ? (
                    <span className="text-4xl font-bold text-gray-900">$19</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">$15</span>
                      <span className="text-gray-500 ml-1">/mo</span>
                      <div className="text-sm text-gray-500 mt-1">Billed annually (${15 * 12})</div>
                    </div>
                  )}
                  {billingCycle === "monthly" && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <Link href="/signup">
                  <Button variant="outline" className="w-full mb-4">
                    Get Started
                  </Button>
                </Link>
                <ul className="space-y-3 text-sm">
                  <PricingFeature included>50 image transformations per month</PricingFeature>
                  <PricingFeature included>Standard backgrounds</PricingFeature>
                  <PricingFeature included>HD quality output</PricingFeature>
                  <PricingFeature included>Email support</PricingFeature>
                  <PricingFeature included>Basic batch processing (up to 10 images)</PricingFeature>
                  <PricingFeature>Custom backgrounds</PricingFeature>
                  <PricingFeature>API access</PricingFeature>
                </ul>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-xl border-2 border-blue-600 shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Pro</h3>
                <p className="text-sm text-gray-500 mb-4">For professionals and creators</p>
                <div className="mb-4">
                  {billingCycle === "monthly" ? (
                    <span className="text-4xl font-bold text-gray-900">$49</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">$39</span>
                      <span className="text-gray-500 ml-1">/mo</span>
                      <div className="text-sm text-gray-500 mt-1">Billed annually (${39 * 12})</div>
                    </div>
                  )}
                  {billingCycle === "monthly" && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <Link href="/signup">
                  <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
                <ul className="space-y-3 text-sm">
                  <PricingFeature included>250 image transformations per month</PricingFeature>
                  <PricingFeature included>All backgrounds + premium collection</PricingFeature>
                  <PricingFeature included>4K quality output</PricingFeature>
                  <PricingFeature included>Priority email support</PricingFeature>
                  <PricingFeature included>Advanced batch processing (up to 50 images)</PricingFeature>
                  <PricingFeature included>5 custom background uploads</PricingFeature>
                  <PricingFeature>API access</PricingFeature>
                </ul>
              </div>
            </div>

            {/* Business Tier */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Business</h3>
                <p className="text-sm text-gray-500 mb-4">For teams and growing businesses</p>
                <div className="mb-4">
                  {billingCycle === "monthly" ? (
                    <span className="text-4xl font-bold text-gray-900">$99</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">$79</span>
                      <span className="text-gray-500 ml-1">/mo</span>
                      <div className="text-sm text-gray-500 mt-1">Billed annually (${79 * 12})</div>
                    </div>
                  )}
                  {billingCycle === "monthly" && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <Link href="/signup">
                  <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
                <ul className="space-y-3 text-sm">
                  <PricingFeature included>1,000 image transformations per month</PricingFeature>
                  <PricingFeature included>All backgrounds + premium collection</PricingFeature>
                  <PricingFeature included>4K quality output</PricingFeature>
                  <PricingFeature included>Priority support with 24-hour response</PricingFeature>
                  <PricingFeature included>Advanced batch processing (unlimited)</PricingFeature>
                  <PricingFeature included>20 custom background uploads</PricingFeature>
                  <PricingFeature included>Basic API access</PricingFeature>
                </ul>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">Enterprise</h3>
                <p className="text-sm text-gray-300 mb-4">Custom solutions for large organizations</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                  <div className="text-sm text-gray-300 mt-1">Tailored to your needs</div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full mb-4 border-white text-white hover:bg-white/10">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <ul className="space-y-3 text-sm">
                  <PricingFeature included light>
                    Unlimited image transformations
                  </PricingFeature>
                  <PricingFeature included light>
                    All backgrounds + custom collections
                  </PricingFeature>
                  <PricingFeature included light>
                    Ultra HD quality output
                  </PricingFeature>
                  <PricingFeature included light>
                    Dedicated account manager
                  </PricingFeature>
                  <PricingFeature included light>
                    Unlimited batch processing
                  </PricingFeature>
                  <PricingFeature included light>
                    Unlimited custom background uploads
                  </PricingFeature>
                  <PricingFeature included light>
                    Full API access with SLA
                  </PricingFeature>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Compare Plans</h2>
              <p className="text-gray-600">Detailed feature comparison across all plans</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Basic</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Business</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <ComparisonRow
                    feature="Monthly transformations"
                    free="50"
                    basic="250"
                    pro="1,000"
                    enterprise="Unlimited"
                  />
                  <ComparisonRow
                    feature="Background options"
                    free="Standard"
                    basic="All + premium"
                    pro="All + premium"
                    enterprise="All + custom collections"
                  />
                  <ComparisonRow feature="Output quality" free="HD" basic="4K" pro="4K" enterprise="Ultra HD" />
                  <ComparisonRow
                    feature="Batch processing"
                    free="Up to 10 images"
                    basic="Up to 50 images"
                    pro="Unlimited"
                    enterprise="Unlimited"
                  />
                  <ComparisonRow
                    feature="Custom backgrounds"
                    free="—"
                    basic="5 uploads"
                    pro="20 uploads"
                    enterprise="Unlimited"
                  />
                  <ComparisonRow
                    feature="API access"
                    free="—"
                    basic="—"
                    pro="Basic access"
                    enterprise="Full access with SLA"
                  />
                  <ComparisonRow
                    feature="Support"
                    free="Email"
                    basic="Priority email"
                    pro="Priority with 24h response"
                    enterprise="Dedicated manager"
                  />
                  <ComparisonRow feature="White labeling" free="—" basic="—" pro="—" enterprise="✓" />
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-6xl mx-auto mt-20 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Trusted by Businesses Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-blue-600">A</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Alex Thompson</h3>
                    <p className="text-gray-500 text-sm">Marketing Director, TechGear</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "KonstantKreatives.ai has revolutionized our product photography workflow. What used to take days now
                  takes minutes."
                </p>
                <div className="flex mt-4">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-blue-600">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                    <p className="text-gray-500 text-sm">E-commerce Manager, StyleHub</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The Pro plan has been a game-changer for our online store. The quality of our product images has
                  improved dramatically."
                </p>
                <div className="flex mt-4">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

