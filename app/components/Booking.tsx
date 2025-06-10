"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, User, Phone, Mail } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    barber: "",
    date: undefined as Date | undefined,
    time: "",
    notes: "",
  })

  const services = [
    { value: "essential", label: "Essential - $65" },
    { value: "premium", label: "Premium - $95" },
    { value: "complete", label: "The Complete - $140" },
    { value: "cut", label: "Signature Cut Only - $45" },
    { value: "shave", label: "Traditional Shave - $40" },
    { value: "beard", label: "Beard Sculpting - $35" },
  ]

  const barbers = [
    { value: "alexander", label: "Alexander Chen" },
    { value: "marcus", label: "Marcus Thompson" },
    { value: "any", label: "Any Available Barber" },
  ]

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    alert("Booking request submitted successfully! We'll contact you within 2 hours to confirm your appointment.")
  }

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="booking" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">RESERVATION</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">BOOK YOUR EXPERIENCE</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Reserve your appointment online and step into a world of precision craftsmanship and refined service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-light tracking-wide">Schedule Your Visit</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-light">
                Complete the form below and we'll confirm your appointment within 2 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 text-sm tracking-wide font-light mb-3">
                        <User className="h-4 w-4" />
                        FULL NAME
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm tracking-wide font-light mb-3">
                        <Mail className="h-4 w-4" />
                        EMAIL ADDRESS
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 text-sm tracking-wide font-light mb-3">
                        <Phone className="h-4 w-4" />
                        PHONE NUMBER
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3"
                        required
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm tracking-wide font-light mb-3 block">SERVICE</Label>
                      <Select onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm tracking-wide font-light mb-3 block">PREFERRED BARBER</Label>
                      <Select onValueChange={(value) => handleInputChange("barber", value)}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3">
                          <SelectValue placeholder="Select a barber" />
                        </SelectTrigger>
                        <SelectContent>
                          {barbers.map((barber) => (
                            <SelectItem key={barber.value} value={barber.value}>
                              {barber.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2 text-sm tracking-wide font-light mb-3">
                          <CalendarIcon className="h-4 w-4" />
                          DATE
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal py-3 border-gray-300 dark:border-gray-700 bg-white dark:bg-black",
                                !formData.date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.date}
                              onSelect={(date) => handleInputChange("date", date)}
                              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 text-sm tracking-wide font-light mb-3">
                          <Clock className="h-4 w-4" />
                          TIME
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black py-3">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm tracking-wide font-light mb-3 block">
                    ADDITIONAL NOTES (OPTIONAL)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any special requests or preferences..."
                    rows={4}
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-4 text-sm tracking-[0.2em] font-light"
                >
                  CONFIRM BOOKING
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
