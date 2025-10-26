"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Compass,
  Leaf,
  Sun,
  Wind,
  Droplets,
  Zap,
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  Info,
  TreePine,
  Recycle,
  Battery,
  Home,
  Star,
} from "lucide-react"

interface VastuEcoComplianceProps {
  onBack: () => void
}

export default function VastuEcoCompliance({ onBack }: VastuEcoComplianceProps) {
  const [selectedRoom, setSelectedRoom] = useState("entrance")
  const [houseOrientation, setHouseOrientation] = useState("north")
  const [ecoFeatures, setEcoFeatures] = useState<string[]>([])

  const vastuRules = {
    entrance: {
      ideal: "North, East, or Northeast",
      score: 85,
      recommendations: [
        "Main entrance should face North or East for positive energy flow",
        "Avoid South-facing entrances if possible",
        "Keep entrance well-lit and clutter-free",
        "Place a threshold (doorstep) at the entrance",
      ],
    },
    kitchen: {
      ideal: "Southeast corner",
      score: 92,
      recommendations: [
        "Kitchen should be in Southeast corner (Agni corner)",
        "Cook facing East for better health and prosperity",
        "Avoid kitchen in Northeast corner",
        "Keep kitchen clean and well-ventilated",
      ],
    },
    bedroom: {
      ideal: "Southwest corner",
      score: 78,
      recommendations: [
        "Master bedroom in Southwest corner for stability",
        "Sleep with head towards South or East",
        "Avoid mirrors facing the bed",
        "Keep bedroom clutter-free for peaceful sleep",
      ],
    },
    bathroom: {
      ideal: "Northwest or Southeast",
      score: 88,
      recommendations: [
        "Bathrooms in Northwest or Southeast corners",
        "Avoid bathrooms in Northeast corner",
        "Ensure proper ventilation and drainage",
        "Keep bathroom doors closed when not in use",
      ],
    },
    poojaroom: {
      ideal: "Northeast corner",
      score: 95,
      recommendations: [
        "Pooja room should be in Northeast corner (Ishaan corner)",
        "Face East or North while praying",
        "Keep the space clean and sacred",
        "Use natural materials like wood and marble",
      ],
    },
  }

  const ecoFeatures_list = [
    { id: "solar", name: "Solar Panels", impact: "Reduces electricity bills by 70-90%", icon: Sun },
    { id: "rainwater", name: "Rainwater Harvesting", impact: "Saves 30-50% water consumption", icon: Droplets },
    { id: "ventilation", name: "Natural Ventilation", impact: "Reduces AC usage by 40-60%", icon: Wind },
    { id: "insulation", name: "Thermal Insulation", impact: "Saves 20-30% on heating/cooling", icon: Shield },
    { id: "led", name: "LED Lighting", impact: "80% less energy than traditional bulbs", icon: Zap },
    { id: "garden", name: "Vertical Gardens", impact: "Improves air quality and reduces heat", icon: TreePine },
    { id: "recycling", name: "Waste Management", impact: "Reduces waste by 60-80%", icon: Recycle },
    { id: "battery", name: "Energy Storage", impact: "Store excess solar energy", icon: Battery },
  ]

  const toggleEcoFeature = (featureId: string) => {
    setEcoFeatures((prev) => (prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]))
  }

  const calculateEcoScore = () => {
    const baseScore = 40
    const featureScore = ecoFeatures.length * 7.5
    return Math.min(baseScore + featureScore, 100)
  }

  const calculateOverallVastuScore = () => {
    const scores = Object.values(vastuRules).map((rule) => rule.score)
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Vastu & Eco-Friendly Compliance</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-balance mb-2">Smart Vastu & Sustainability Analysis</h2>
          <p className="text-muted-foreground text-pretty">
            AI-powered recommendations for vastu compliance and eco-friendly construction
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Compliance Scores */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Compliance Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vastu Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vastu Compliance</span>
                  <Badge variant={calculateOverallVastuScore() >= 80 ? "default" : "secondary"}>
                    {calculateOverallVastuScore()}%
                  </Badge>
                </div>
                <Progress value={calculateOverallVastuScore()} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {calculateOverallVastuScore() >= 80 ? "Excellent compliance" : "Good with room for improvement"}
                </p>
              </div>

              {/* Eco Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Eco-Friendly Score</span>
                  <Badge variant={calculateEcoScore() >= 70 ? "default" : "secondary"}>
                    {Math.round(calculateEcoScore())}%
                  </Badge>
                </div>
                <Progress value={calculateEcoScore()} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {ecoFeatures.length} of {ecoFeatures_list.length} eco features selected
                </p>
              </div>

              {/* Green Certification */}
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800 dark:text-green-200">Green Certification</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {calculateEcoScore() >= 80
                    ? "Eligible for IGBC Gold Rating"
                    : calculateEcoScore() >= 60
                      ? "Eligible for IGBC Silver Rating"
                      : "Basic green compliance achieved"}
                </p>
              </div>

              {/* Cost Savings */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Estimated Annual Savings</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Electricity</span>
                    <span className="font-medium">₹{(ecoFeatures.length * 8000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Water</span>
                    <span className="font-medium">₹{(ecoFeatures.length * 3000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold border-t pt-1">
                    <span>Total Savings</span>
                    <span>₹{(ecoFeatures.length * 11000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Detailed Analysis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vastu" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vastu">Vastu Compliance</TabsTrigger>
                  <TabsTrigger value="eco">Eco-Friendly Features</TabsTrigger>
                </TabsList>

                <TabsContent value="vastu" className="space-y-6">
                  {/* House Orientation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium">House Orientation:</Label>
                      <Select value={houseOrientation} onValueChange={setHouseOrientation}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North Facing</SelectItem>
                          <SelectItem value="south">South Facing</SelectItem>
                          <SelectItem value="east">East Facing</SelectItem>
                          <SelectItem value="west">West Facing</SelectItem>
                          <SelectItem value="northeast">Northeast</SelectItem>
                          <SelectItem value="northwest">Northwest</SelectItem>
                          <SelectItem value="southeast">Southeast</SelectItem>
                          <SelectItem value="southwest">Southwest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Room Analysis */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Room-wise Vastu Analysis:</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(vastuRules).map(([room, data]) => (
                          <Card
                            key={room}
                            className={`cursor-pointer transition-colors ${
                              selectedRoom === room ? "border-primary" : "hover:border-muted-foreground/20"
                            }`}
                            onClick={() => setSelectedRoom(room)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium capitalize">{room.replace("room", " Room")}</h4>
                                <Badge variant={data.score >= 85 ? "default" : "secondary"}>{data.score}%</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Ideal: {data.ideal}</p>
                              <div className="flex items-center gap-1 mt-2">
                                {data.score >= 85 ? (
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                                )}
                                <span className="text-xs">{data.score >= 85 ? "Compliant" : "Needs attention"}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Selected Room Recommendations */}
                    {selectedRoom && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="capitalize">
                            {selectedRoom.replace("room", " Room")} Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {vastuRules[selectedRoom as keyof typeof vastuRules].recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{rec}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="eco" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Sustainable Features</h3>
                      <Badge variant="outline">{ecoFeatures.length} selected</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {ecoFeatures_list.map((feature) => {
                        const Icon = feature.icon
                        const isSelected = ecoFeatures.includes(feature.id)

                        return (
                          <Card
                            key={feature.id}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/20"
                            }`}
                            onClick={() => toggleEcoFeature(feature.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium">{feature.name}</h4>
                                    {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                                  </div>
                                  <p className="text-xs text-muted-foreground">{feature.impact}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {/* Environmental Impact */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TreePine className="h-5 w-5" />
                          Environmental Impact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {Math.round(ecoFeatures.length * 2.5)}T
                            </div>
                            <p className="text-xs text-muted-foreground">CO₂ Reduced Annually</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {Math.round(ecoFeatures.length * 15)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Energy Savings</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-amber-600">
                              {Math.round(ecoFeatures.length * 12)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Water Conservation</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="flex-1">
            <Star className="h-4 w-4 mr-2" />
            Apply Recommendations to Design
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            Generate Compliance Report
          </Button>
        </div>
      </main>
    </div>
  )
}

function Label({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  )
}
