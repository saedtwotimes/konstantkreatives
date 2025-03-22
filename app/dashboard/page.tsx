"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, CreditCard, Download, ChevronRight, ImageIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/components/app-layout"

// Mock data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  plan: "Pro",
  billingCycle: "Monthly",
  nextRenewal: "November 15, 2023",
  imagesUsed: 127,
  imagesLimit: 250,
  creditsRemaining: 35,
  creditsTotal: 50,
}

const recentImages = [
  {
    id: 1,
    name: "product_shoe_white.jpg",
    date: "Nov 10, 2023",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Shoe",
  },
  {
    id: 2,
    name: "product_bag_studio.jpg",
    date: "Nov 9, 2023",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Bag",
  },
  {
    id: 3,
    name: "product_watch_dark.jpg",
    date: "Nov 8, 2023",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Watch",
  },
  {
    id: 4,
    name: "product_headphones.jpg",
    date: "Nov 7, 2023",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Headphones",
  },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userData.name}. Here's an overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Account Status Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Account Status</CardTitle>
            <CardDescription>Your current plan and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Plan</span>
                <Badge className="bg-blue-600">{userData.plan}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Billing Cycle</span>
                <span className="text-sm font-medium">{userData.billingCycle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Next Renewal</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-sm font-medium">{userData.nextRenewal}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/settings">
                Manage Subscription
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Usage Metrics Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Usage Metrics</CardTitle>
            <CardDescription>Your current usage for this billing cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Images Used</span>
                  <span className="text-sm font-medium">
                    {userData.imagesUsed} / {userData.imagesLimit}
                  </span>
                </div>
                <Progress value={(userData.imagesUsed / userData.imagesLimit) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Credits Remaining</span>
                  <span className="text-sm font-medium">
                    {userData.creditsRemaining} / {userData.creditsTotal}
                  </span>
                </div>
                <Progress value={(userData.creditsRemaining / userData.creditsTotal) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Buy More Credits
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/edit">
                <ImageIcon className="h-4 w-4 mr-2" />
                Transform New Image
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/dashboard/images">
                <Download className="h-4 w-4 mr-2" />
                View All Images
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Images Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Images</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/images">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recentImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="aspect-square relative bg-gray-100">
                <Image src={image.thumbnail || "/placeholder.svg"} alt={image.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate">{image.name}</span>
                  <span className="text-xs text-gray-500">{image.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

