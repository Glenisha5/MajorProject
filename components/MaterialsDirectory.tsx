"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Truck,
  Leaf,
  TrendingUp,
  ShoppingCart,
  Phone,
  Navigation,
  AlertCircle,
  CheckCircle2,
  Bot,
  Sparkles,
  Brain,
  Zap,
  Target,
  DollarSign,
  Clock,
  Award,
  Users,
  BarChart3,
  Lightbulb,
  Shield,
} from "lucide-react"

interface MaterialsDirectoryProps {
  onBack: () => void
}

export default function MaterialsDirectory({ onBack }: MaterialsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("cement")
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [priceFilter, setPriceFilter] = useState("all")
  const [qualityFilter, setQualityFilter] = useState("all")
  const [ecoFilter, setEcoFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiInsights, setAiInsights] = useState<any>(null)

  useEffect(() => {
    generateAIRecommendations()
    analyzeMarketTrends()
  }, [selectedCategory, selectedCity, priceFilter, qualityFilter])

  const generateAIRecommendations = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      const recommendations = [
        {
          type: "cost-optimization",
          title: "Smart Cost Savings",
          description: `AI suggests switching to ${selectedCategory === "cement" ? "ACC Gold PPC" : "alternative brands"} to save ₹2,400 on your project`,
          savings: 2400,
          confidence: 94,
          icon: DollarSign,
        },
        {
          type: "quality-match",
          title: "Perfect Quality Match",
          description: "Based on your project requirements, premium grade materials will ensure 25+ year durability",
          impact: "25+ years",
          confidence: 89,
          icon: Award,
        },
        {
          type: "vendor-optimization",
          title: "Best Vendor Match",
          description: "AI found 3 verified vendors within 2km with 4.8+ ratings and bulk discounts",
          vendors: 3,
          confidence: 96,
          icon: Users,
        },
        {
          type: "timing",
          title: "Optimal Purchase Timing",
          description: "Prices expected to rise 8% next month. Best to purchase within 2 weeks",
          urgency: "high",
          confidence: 87,
          icon: Clock,
        },
      ]
      setAiRecommendations(recommendations)
      setIsAnalyzing(false)
    }, 1500)
  }

  const analyzeMarketTrends = () => {
    // Simulate AI market analysis
    setTimeout(() => {
      setAiInsights({
        priceDirection: "increasing",
        priceChange: 8,
        demandLevel: "high",
        seasonalFactor: "peak",
        competitiveIndex: 85,
        qualityScore: 92,
        availabilityScore: 78,
        recommendations: [
          "Current prices are 8% below annual average - good time to buy",
          "High demand in your area - consider bulk purchase for better rates",
          "3 new eco-friendly alternatives available with government subsidies",
        ],
      })
    }, 2000)
  }

  const categories = [
    { id: "cement", name: "Cement", icon: "🏗️", count: 45, aiScore: 94 },
    { id: "sand", name: "Sand & Aggregates", icon: "🏔️", count: 32, aiScore: 87 },
    { id: "bricks", name: "Bricks & Blocks", icon: "🧱", count: 28, aiScore: 91 },
    { id: "tiles", name: "Tiles & Flooring", icon: "🔲", count: 156, aiScore: 89 },
    { id: "paints", name: "Paints & Finishes", icon: "🎨", count: 89, aiScore: 92 },
    { id: "electrical", name: "Electrical", icon: "⚡", count: 234, aiScore: 88 },
    { id: "plumbing", name: "Plumbing", icon: "🚿", count: 167, aiScore: 85 },
    { id: "doors", name: "Doors & Windows", icon: "🚪", count: 78, aiScore: 90 },
    { id: "roofing", name: "Roofing", icon: "🏠", count: 43, aiScore: 86 },
    { id: "furniture", name: "Furniture", icon: "🪑", count: 198, aiScore: 83 },
  ]

  const cities = [
    { name: "Mumbai", multiplier: 1.4, aiDemand: "very-high", marketTrend: "rising" },
    { name: "Delhi", multiplier: 1.2, aiDemand: "high", marketTrend: "stable" },
    { name: "Bangalore", multiplier: 1.1, aiDemand: "high", marketTrend: "rising" },
    { name: "Chennai", multiplier: 1.0, aiDemand: "medium", marketTrend: "stable" },
    { name: "Hyderabad", multiplier: 0.9, aiDemand: "medium", marketTrend: "rising" },
    { name: "Pune", multiplier: 1.1, aiDemand: "high", marketTrend: "rising" },
    { name: "Kolkata", multiplier: 0.8, aiDemand: "low", marketTrend: "stable" },
    { name: "Ahmedabad", multiplier: 0.9, aiDemand: "medium", marketTrend: "stable" },
  ]

  const materials = {
    cement: [
      {
        id: 1,
        name: "UltraTech Cement OPC 53 Grade",
        brand: "UltraTech",
        basePrice: 420,
        unit: "50kg bag",
        rating: 4.8,
        reviews: 1247,
        isEcoFriendly: false,
        quality: "premium",
        vendor: "Shree Cement Suppliers",
        vendorRating: 4.6,
        distance: "2.3 km",
        inStock: true,
        features: ["High strength", "Quick setting", "Durable"],
        alternatives: ["ACC Gold", "Ambuja Plus"],
        aiScore: 94,
        aiRecommendation: "Best for high-rise construction",
        carbonFootprint: "high",
        deliveryTime: "Same day",
        bulkDiscount: 12,
      },
      {
        id: 2,
        name: "ACC Gold Cement PPC",
        brand: "ACC",
        basePrice: 380,
        unit: "50kg bag",
        rating: 4.6,
        reviews: 892,
        isEcoFriendly: true,
        quality: "standard",
        vendor: "Modern Building Materials",
        vendorRating: 4.4,
        distance: "1.8 km",
        inStock: true,
        features: ["Eco-friendly", "Good workability", "Cost-effective"],
        alternatives: ["UltraTech OPC", "Birla A1"],
        aiScore: 89,
        aiRecommendation: "Optimal cost-performance ratio",
        carbonFootprint: "low",
        deliveryTime: "Next day",
        bulkDiscount: 8,
      },
      {
        id: 3,
        name: "Ambuja Plus Cement",
        brand: "Ambuja",
        basePrice: 395,
        unit: "50kg bag",
        rating: 4.7,
        reviews: 1056,
        isEcoFriendly: true,
        quality: "premium",
        vendor: "City Construction Mart",
        vendorRating: 4.8,
        distance: "3.1 km",
        inStock: false,
        features: ["Weather resistant", "Low heat of hydration", "Sustainable"],
        alternatives: ["UltraTech OPC", "ACC Gold"],
        aiScore: 91,
        aiRecommendation: "Best for sustainable construction",
        carbonFootprint: "very-low",
        deliveryTime: "2-3 days",
        bulkDiscount: 10,
      },
    ],
  }

  const getCurrentMaterials = () => {
    return materials[selectedCategory as keyof typeof materials] || materials.cement
  }

  const getAdjustedPrice = (basePrice: number) => {
    const cityData = cities.find((c) => c.name === selectedCity)
    return Math.round(basePrice * (cityData?.multiplier || 1))
  }

  const filteredMaterials = getCurrentMaterials().filter((material) => {
    if (searchQuery && !material.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (priceFilter !== "all") {
      const price = getAdjustedPrice(material.basePrice)
      if (priceFilter === "low" && price > 300) return false
      if (priceFilter === "medium" && (price <= 300 || price > 500)) return false
      if (priceFilter === "high" && price <= 500) return false
    }
    if (qualityFilter !== "all" && material.quality !== qualityFilter) return false
    if (ecoFilter && !material.isEcoFriendly) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Materials Hub</h1>
                  <p className="text-xs text-muted-foreground">Intelligent recommendations powered by AI</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Brain className="h-3 w-3" />
                {filteredMaterials.length} AI-matched materials
              </Badge>
              {isAnalyzing && (
                <Badge variant="outline" className="gap-1 animate-pulse">
                  <Sparkles className="h-3 w-3" />
                  AI Analyzing...
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {aiInsights && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Market Intelligence
              </CardTitle>
              <CardDescription>
                Real-time analysis for {selectedCategory} in {selectedCity}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {aiInsights.priceDirection === "increasing" ? "↗" : "↘"} {aiInsights.priceChange}%
                  </div>
                  <div className="text-sm text-muted-foreground">Price Trend</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{aiInsights.competitiveIndex}</div>
                  <div className="text-sm text-muted-foreground">Market Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{aiInsights.qualityScore}</div>
                  <div className="text-sm text-muted-foreground">Quality Index</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{aiInsights.availabilityScore}</div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                </div>
              </div>
              <div className="space-y-2">
                {aiInsights.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories & Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI-Powered Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ask AI: 'Best cement for 3-story house'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs text-blue-700 dark:text-blue-300">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    AI suggests: UltraTech OPC 53 for multi-story construction
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Smart Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{city.name}</span>
                          <Badge
                            variant="outline"
                            className={`ml-2 text-xs ${
                              city.aiDemand === "very-high"
                                ? "text-red-600"
                                : city.aiDemand === "high"
                                  ? "text-orange-600"
                                  : city.aiDemand === "medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                            }`}
                          >
                            {city.aiDemand}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI-Ranked Categories</CardTitle>
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
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            category.aiScore >= 90
                              ? "text-green-600"
                              : category.aiScore >= 85
                                ? "text-blue-600"
                                : "text-orange-600"
                          }`}
                        >
                          AI: {category.aiScore}
                        </Badge>
                      </div>
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
                  <Label>Price Range</Label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Budget (₹0-300)</SelectItem>
                      <SelectItem value="medium">Standard (₹300-500)</SelectItem>
                      <SelectItem value="high">Premium (₹500+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quality Level</Label>
                  <Select value={qualityFilter} onValueChange={setQualityFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Quality</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="eco"
                    checked={ecoFilter}
                    onChange={(e) => setEcoFilter(e.target.checked)}
                    className="rounded border-border"
                  />
                  <Label htmlFor="eco" className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Eco-Friendly Only
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {aiRecommendations.length > 0 && (
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    AI Smart Recommendations
                  </CardTitle>
                  <CardDescription>Personalized insights for your construction project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiRecommendations.map((rec, idx) => (
                      <div key={idx} className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                            <rec.icon className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {rec.confidence}% confidence
                              </Badge>
                              {rec.savings && (
                                <Badge variant="secondary" className="text-xs text-green-600">
                                  Save ₹{rec.savings.toLocaleString()}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Header Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                  {selectedCategory.replace("-", " & ")}
                  <Badge variant="outline" className="gap-1">
                    <Target className="h-3 w-3" />
                    AI Optimized
                  </Badge>
                </h2>
                <p className="text-muted-foreground">
                  Showing {filteredMaterials.length} AI-matched materials in {selectedCity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  AI Price Trends
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Smart Map
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      {/* Material Info */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {material.name}
                              {material.aiScore >= 90 && (
                                <Badge variant="secondary" className="gap-1">
                                  <Zap className="h-3 w-3" />
                                  AI Top Pick
                                </Badge>
                              )}
                            </h3>
                            <p className="text-muted-foreground">{material.brand}</p>
                            {material.aiRecommendation && (
                              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                                <Bot className="h-3 w-3" />
                                {material.aiRecommendation}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {material.isEcoFriendly && (
                              <Badge variant="secondary" className="gap-1">
                                <Leaf className="h-3 w-3" />
                                Eco
                              </Badge>
                            )}
                            <Badge variant="outline" className="capitalize">
                              {material.quality}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                material.aiScore >= 90
                                  ? "text-green-600"
                                  : material.aiScore >= 85
                                    ? "text-blue-600"
                                    : "text-orange-600"
                              }`}
                            >
                              AI: {material.aiScore}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{material.rating}</span>
                            <span className="text-muted-foreground">({material.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {material.inStock ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className={material.inStock ? "text-green-600" : "text-red-600"}>
                              {material.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-muted-foreground">{material.deliveryTime}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {material.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              material.carbonFootprint === "very-low"
                                ? "text-green-600"
                                : material.carbonFootprint === "low"
                                  ? "text-blue-600"
                                  : material.carbonFootprint === "medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                          >
                            <Leaf className="h-3 w-3 mr-1" />
                            {material.carbonFootprint} carbon
                          </Badge>
                        </div>
                      </div>

                      {/* Pricing with AI insights */}
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            ₹{getAdjustedPrice(material.basePrice).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">per {material.unit}</div>
                          {selectedCity !== "Chennai" && (
                            <div className="text-xs text-muted-foreground">Base: ₹{material.basePrice} (Chennai)</div>
                          )}
                          {material.bulkDiscount && (
                            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <DollarSign className="h-3 w-3" />
                              {material.bulkDiscount}% bulk discount
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-medium">AI Price Analysis</div>
                          <Progress value={75} className="h-2" />
                          <div className="text-xs text-muted-foreground">25% below market average - Great deal!</div>
                        </div>

                        {material.alternatives.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-1">AI Alternatives:</div>
                            <div className="text-xs text-muted-foreground">{material.alternatives.join(", ")}</div>
                          </div>
                        )}
                      </div>

                      {/* Vendor & Actions */}
                      <div className="space-y-3">
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            {material.vendor}
                            <Shield className="h-3 w-3 text-green-600" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{material.vendorRating}</span>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{material.distance}</span>
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            AI Verified Vendor
                          </Badge>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" disabled={!material.inStock} className="w-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Smart Add to Cart
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Smart Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Budget Optimization</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Switch to ACC Gold PPC to save ₹40 per bag without compromising quality for your project type.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Eco-Friendly Option</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Consider Ambuja Plus for 15% lower carbon footprint and green building certification eligibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Purchase */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Purchase Benefits</CardTitle>
                <CardDescription>Save more with quantity discounts and community buying</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">5%</div>
                    <div className="text-sm text-muted-foreground">50+ bags</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">10%</div>
                    <div className="text-sm text-muted-foreground">100+ bags</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">15%</div>
                    <div className="text-sm text-muted-foreground">Community Buy</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Truck className="h-4 w-4 mr-2" />
                  Join Community Purchase
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
