"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Award,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Camera,
  FileText,
  Briefcase,
} from "lucide-react"

interface WorkforceDirectoryProps {
  onBack: () => void
}

export default function WorkforceDirectory({ onBack }: WorkforceDirectoryProps) {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("contractors")
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)

  const categories = [
    { id: "contractors", name: "General Contractors", icon: "👷", count: 156 },
    { id: "architects", name: "Architects", icon: "📐", count: 89 },
    { id: "engineers", name: "Civil Engineers", icon: "🏗️", count: 67 },
    { id: "electricians", name: "Electricians", icon: "⚡", count: 234 },
    { id: "plumbers", name: "Plumbers", icon: "🔧", count: 178 },
    { id: "carpenters", name: "Carpenters", icon: "🪚", count: 145 },
    { id: "painters", name: "Painters", icon: "🎨", count: 198 },
    { id: "masons", name: "Masons", icon: "🧱", count: 167 },
    { id: "interior", name: "Interior Designers", icon: "🏠", count: 78 },
    { id: "laborers", name: "General Labor", icon: "👨‍🔧", count: 289 },
  ]

  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"]

  const professionals = {
    contractors: [
      {
        id: 1,
        name: "Rajesh Kumar Construction",
        type: "General Contractor",
        owner: "Rajesh Kumar",
        rating: 4.8,
        reviews: 247,
        experience: 12,
        location: "Andheri West, Mumbai",
        distance: "2.3 km",
        isVerified: true,
        isAvailable: true,
        hourlyRate: 800,
        projectRate: "₹45-65/sq ft",
        specialties: ["Residential", "Commercial", "Renovation"],
        completedProjects: 156,
        ongoingProjects: 8,
        languages: ["Hindi", "English", "Marathi"],
        certifications: ["CPWD Registered", "ISO 9001"],
        portfolio: [
          { type: "3 BHK Villa", location: "Bandra", cost: "₹28L", duration: "8 months" },
          { type: "Office Complex", location: "BKC", cost: "₹1.2Cr", duration: "14 months" },
        ],
        availability: "Available from next week",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
      },
      {
        id: 2,
        name: "Modern Builders & Associates",
        type: "Premium Contractor",
        owner: "Amit Sharma",
        rating: 4.9,
        reviews: 189,
        experience: 15,
        location: "Powai, Mumbai",
        distance: "4.1 km",
        isVerified: true,
        isAvailable: false,
        hourlyRate: 1200,
        projectRate: "₹65-85/sq ft",
        specialties: ["Luxury Homes", "Smart Buildings", "Green Construction"],
        completedProjects: 89,
        ongoingProjects: 12,
        languages: ["Hindi", "English"],
        certifications: ["IGBC Certified", "RERA Registered"],
        portfolio: [
          { type: "Luxury Villa", location: "Juhu", cost: "₹85L", duration: "12 months" },
          { type: "Smart Apartment", location: "Worli", cost: "₹45L", duration: "10 months" },
        ],
        availability: "Available from March 2024",
        phone: "+91 98765 43211",
        whatsapp: "+91 98765 43211",
      },
    ],
  }

  const getCurrentProfessionals = () => {
    return professionals[selectedCategory as keyof typeof professionals] || professionals.contractors
  }

  const filteredProfessionals = getCurrentProfessionals().filter((professional) => {
    if (searchQuery && !professional.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (experienceFilter !== "all") {
      if (experienceFilter === "junior" && professional.experience > 5) return false
      if (experienceFilter === "mid" && (professional.experience <= 5 || professional.experience > 10)) return false
      if (experienceFilter === "senior" && professional.experience <= 10) return false
    }
    if (ratingFilter !== "all") {
      if (ratingFilter === "4plus" && professional.rating < 4.0) return false
      if (ratingFilter === "45plus" && professional.rating < 4.5) return false
    }
    if (availabilityFilter !== "all") {
      if (availabilityFilter === "available" && !professional.isAvailable) return false
      if (availabilityFilter === "busy" && professional.isAvailable) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Workforce & Services Directory</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{filteredProfessionals.length} professionals found</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories & Filters */}
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Experience</SelectItem>
                      <SelectItem value="junior">Junior (0-5 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (5-10 years)</SelectItem>
                      <SelectItem value="senior">Senior (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4plus">4.0+ Stars</SelectItem>
                      <SelectItem value="45plus">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="available">Available Now</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize">{selectedCategory.replace("-", " & ")}</h2>
                <p className="text-muted-foreground">
                  Showing {filteredProfessionals.length} verified professionals in {selectedCity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Award className="h-4 w-4 mr-2" />
                  Top Rated
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Quick Hire
                </Button>
              </div>
            </div>

            {/* Professionals Grid */}
            <div className="grid gap-6">
              {filteredProfessionals.map((professional) => (
                <Card key={professional.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Professional Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{professional.name}</h3>
                              {professional.isVerified && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                            </div>
                            <p className="text-muted-foreground">{professional.type}</p>
                            <p className="text-sm text-muted-foreground">Owner: {professional.owner}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {professional.isAvailable ? (
                              <Badge variant="default" className="gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Busy
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{professional.rating}</span>
                            <span className="text-muted-foreground">({professional.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{professional.experience} years exp</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {professional.location} • {professional.distance}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {professional.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Completed Projects:</span>
                            <span className="font-medium ml-2">{professional.completedProjects}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ongoing:</span>
                            <span className="font-medium ml-2">{professional.ongoingProjects}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Availability */}
                      <div className="space-y-4">
                        <div>
                          <div className="text-lg font-bold text-primary flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {professional.hourlyRate}/hour
                          </div>
                          <div className="text-sm text-muted-foreground">Project: {professional.projectRate}</div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-1">Availability:</div>
                          <div className="text-sm text-muted-foreground">{professional.availability}</div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-1">Languages:</div>
                          <div className="text-sm text-muted-foreground">{professional.languages.join(", ")}</div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-1">Certifications:</div>
                          <div className="flex flex-wrap gap-1">
                            {professional.certifications.map((cert, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            disabled={!professional.isAvailable}
                            onClick={() => setSelectedProfessional(professional)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Now
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                try {
                                  // Attempt to start a phone call (mobile/softphone)
                                  window.location.href = "tel:+917306100556"
                                } catch (e) {
                                  // fallback: open tel link
                                  window.open("tel:+917306100556")
                                }
                                toast({ title: "Dialing", description: "Dialing +91 73061 00556 (dummy)" })
                              }}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Camera className="h-4 w-4 mr-2" />
                            View Portfolio
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Contractor Marketplace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  AI Contractor Marketplace
                </CardTitle>
                <CardDescription>Get matched with the perfect contractor for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">AI Match</div>
                    <div className="text-sm text-muted-foreground">Smart contractor matching based on your project</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">Verified</div>
                    <div className="text-sm text-muted-foreground">All contractors are background verified</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">Insured</div>
                    <div className="text-sm text-muted-foreground">Work covered by comprehensive insurance</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Get AI Contractor Recommendations
                </Button>
              </CardContent>
            </Card>

            {/* Bulk Hiring */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Workforce Hiring</CardTitle>
                <CardDescription>Hire multiple professionals for large projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-primary">Team Packages</div>
                    <div className="text-sm text-muted-foreground">Pre-assembled teams</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-primary">Volume Discounts</div>
                    <div className="text-sm text-muted-foreground">Save up to 15%</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-primary">Project Manager</div>
                    <div className="text-sm text-muted-foreground">Dedicated coordination</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-primary">Quality Assurance</div>
                    <div className="text-sm text-muted-foreground">Regular inspections</div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Explore Team Packages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Book {selectedProfessional.name}</CardTitle>
              <CardDescription>Schedule a consultation or project discussion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="consultation">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="consultation">Consultation</TabsTrigger>
                  <TabsTrigger value="project">Project Booking</TabsTrigger>
                </TabsList>

                <TabsContent value="consultation" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Project Details</Label>
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      placeholder="Describe your project requirements..."
                    />
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Consultation Fee:</span>
                      <span className="font-semibold">₹500 (Adjustable in project cost)</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="project" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Construction</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="repair">Repair Work</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1week">1 Week</SelectItem>
                          <SelectItem value="2weeks">2 Weeks</SelectItem>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6+ Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under50k">Under ₹50,000</SelectItem>
                        <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="1l-5l">₹1,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                        <SelectItem value="above10l">Above ₹10,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setSelectedProfessional(null)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Close modal
                    setSelectedProfessional(null)
                    // Show success toast
                    toast({
                      title: "Booked successfully",
                      description: `You have booked ${selectedProfessional.name}. The professional will contact you soon.`,
                    })
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
