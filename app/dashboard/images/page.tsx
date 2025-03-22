"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/components/app-layout"

// Mock data
const images = [
  {
    id: 1,
    name: "product_shoe_white.jpg",
    date: "Nov 10, 2023",
    size: "2.4 MB",
    type: "PNG",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Shoe",
  },
  {
    id: 2,
    name: "product_bag_studio.jpg",
    date: "Nov 9, 2023",
    size: "1.8 MB",
    type: "JPG",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Bag",
  },
  {
    id: 3,
    name: "product_watch_dark.jpg",
    date: "Nov 8, 2023",
    size: "3.2 MB",
    type: "PNG",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Watch",
  },
  {
    id: 4,
    name: "product_headphones.jpg",
    date: "Nov 7, 2023",
    size: "2.1 MB",
    type: "JPG",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Headphones",
  },
]

export default function ImagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredImages = images.filter((image) => image.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Images</h1>
        <p className="text-gray-600">View and manage all your transformed product images.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/edit">Transform New Image</Link>
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
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
                  <div className="truncate mr-2">
                    <p className="font-medium truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">
                      {image.date} • {image.size}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {image.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No images found matching your search.</p>
          {searchQuery && (
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
              Clear search
            </Button>
          )}
        </div>
      )}
    </AppLayout>
  )
}

