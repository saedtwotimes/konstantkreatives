"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with Beta Badge */}
          <Link href="/" className="flex items-center">
            <div className="relative">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#2563EB]">KonstantKreatives</span>
                <span className="text-2xl font-bold text-black">.ai</span>
                <div className="ml-2 px-3 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full">BETA</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Simplified */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/edit"
              className="text-gray-700 hover:text-[#2563EB] transition-colors flex items-center font-medium"
            >
              Transform Photos
            </Link>

            <Link href="/pricing" className="text-gray-700 hover:text-[#2563EB] transition-colors font-medium">
              Pricing
            </Link>

            <a
              href="https://discord.gg/konstantkreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#2563EB] transition-colors flex items-center font-medium"
            >
              Community
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Desktop CTA Buttons - Simplified */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-[#2563EB] hover:bg-blue-50">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#2563EB] hover:bg-blue-700 text-white font-medium px-5">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6 bg-white border-t mt-3">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/edit"
              className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors flex items-center font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Transform Photos
            </Link>

            <Link
              href="/pricing"
              className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <a
              href="https://discord.gg/konstantkreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors flex items-center font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>

            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

