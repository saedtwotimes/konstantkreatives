"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/components/app-layout"

// Mock data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
}

export default function AccountSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25

    // Contains number or special char
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25

    return strength
  }

  const passwordStrength = calculatePasswordStrength(newPassword)

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess(false)

    // Validation
    if (!currentPassword) {
      setPasswordError("Current password is required")
      return
    }

    if (!newPassword) {
      setPasswordError("New password is required")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordStrength < 50) {
      setPasswordError("Please choose a stronger password")
      return
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to cancel the subscription
    alert("Subscription cancellation request submitted")
    setShowCancelConfirm(false)
    setCancelReason("")
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account information, password, and subscription.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="cancel">Cancel Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Password change functionality would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Your current plan and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Billing information would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cancel Account Tab */}
        {/* <TabsContent value="cancel">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Cancel Account</CardTitle>
              <CardDescription>
                We're sorry to see you go. Please note that this action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Cancelling your account will immediately end your subscription and delete all your data after 30 days.
                </AlertDescription>
              </Alert>

              {!showCancelConfirm ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cancel-reason">Please tell us why you're leaving</Label>
                    <Textarea
                      id="cancel-reason"
                      placeholder="Your feedback helps us improve our service"
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setShowCancelConfirm(true)}
                    disabled={!cancelReason.trim()}
                  >
                    Request Cancellation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCancelSubmit} className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-medium text-red-800 mb-2">Are you absolutely sure?</h3>
                    <p className="text-sm text-red-700 mb-4">
                      This action cannot be undone. Your account will be cancelled immediately and all your data will be
                      scheduled for deletion.
                    </p>
                    <div className="flex gap-3">
                      <Button type="submit" variant="destructive">
                        Yes, Cancel My Account
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowCancelConfirm(false)}>
                        No, Keep My Account
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </AppLayout>
  )
}

