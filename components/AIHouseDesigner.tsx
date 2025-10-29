"use client"

import { useState, useEffect } from "react"
// We do NOT need react-three-fiber for this
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Palette,
  Building2,
  Home,
  Zap,
  Sparkles,
  Eye,
  Mic,
  MicOff,
  Download,
  Share2,
  Save,
  RotateCcw,
  Maximize,
  Play,
} from "lucide-react"

// --- (1) HIGH-QUALITY PLACEHOLDER IMAGES ---
// These are web links to professional drawings to simulate the AI output
const aiGeneratedImages = {
  floorPlan: "https://storage.planner5d.com/s/02b20272a6c8130541a7d678786a51d4_1.jpg?v=1680537025",
  topView: "https_images_familyhomeplans_com/plans/78518/78518-b600.jpg",
  frontElevation: "https_images_familyhomeplans_com/plans/78518/78518-a600.jpg",
  backElevation: "https_images_familyhomeplans_com/plans/78518/78518-a600.jpg", // Using front again as placeholder
}
// -------------------------------------------

interface AIHouseDesignerProps {
  onBack: () => void
}

// Define the shape of our generated images state
interface GeneratedImages {
  floorPlan: string
  topView: string
  frontElevation: string
  backElevation: string
}

export default function AIHouseDesigner({ onBack }: AIHouseDesignerProps) {
  const [designStep, setDesignStep] = useState("preferences")
  const [designStyle, setDesignStyle] = useState("")
  const [roomLayout, setRoomLayout] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDesign, setGeneratedDesign] = useState(false)
  
  // This state will hold the paths to our generated images
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages | null>(null)

  const [isListening, setIsListening] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState("")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedColor, setSelectedColor] = useState("#FFFFFF")

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 100) // This will take 5 seconds
      return () => clearInterval(interval)
    }
  }, [isGenerating])

  const designStyles = [
     {
       id: "modern",
       name: "Modern Minimalist",
       desc: "Clean lines, open spaces, neutral colors",
       gradient: "from-slate-100 to-slate-300",
       icon: "🏢",
     },
     {
       id: "traditional",
       name: "Traditional Indian",
       desc: "Classic architecture, warm colors, cultural elements",
       gradient: "from-orange-100 to-red-200",
       icon: "🏛️",
     },
     {
       id: "luxury",
       name: "Luxury Contemporary",
       desc: "Premium finishes, sophisticated design, high-end materials",
       gradient: "from-purple-100 to-pink-200",
       icon: "💎",
     },
     {
       id: "eco",
       name: "Eco-Friendly",
       desc: "Sustainable materials, green technology, natural lighting",
       gradient: "from-green-100 to-emerald-200",
       icon: "🌿",
     },
  ]

  const colorSchemes = [
     { id: "neutral", name: "Neutral Elegance", colors: ["#F5F5F5", "#E8E8E8", "#D3D3D3", "#A8A8A8"] },
     { id: "warm", name: "Warm Earth", colors: ["#F4E4BC", "#E6B17A", "#D2691E", "#8B4513"] },
     { id: "cool", name: "Cool Blues", colors: ["#E6F3FF", "#B3D9FF", "#4A90E2", "#2E5C8A"] },
     { id: "vibrant", name: "Vibrant Accent", colors: ["#FFFFFF", "#F0F0F0", "#FF6B35", "#004E89"] },
  ]

  // --- (2) MODIFIED handleGenerateDesign ---
  const handleGenerateDesign = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate the 5-second generation time
    setTimeout(() => {
      // After the "generation" is complete, set the image paths
      setGeneratedImages(aiGeneratedImages)
      
      // Update state to move to the next step
      setIsGenerating(false)
      setGeneratedDesign(true)
      setDesignStep("customize")

    }, 5100) // Set to slightly longer than the progress bar
  }

  const handleVoiceCommand = () => {
     setIsListening(!isListening)
     if (!isListening) {
       setTimeout(() => {
         setVoiceCommand("Change wall color to blue")
         setIsListening(false)
       }, 2000)
     }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced Header - no changes */}
      <header className="border-b bg-card/80 backdrop-blur-md">
       {/* ... (Your header JSX - no changes) ... */}
      </header>

      <div className="container mx-auto px-4 py-8">
        {designStep === "preferences" && (
          <div className="max-w-6xl mx-auto">
            {/* ... (Your preferences JSX - no changes) ... */}
          </div>
        )}

        {designStep === "generate" && (
          <div className="max-w-3xl mx-auto text-center">
            {/* ... (Your generation loading JSX - no changes) ... */}
          </div>
        )}

        {/* --- (3) MODIFIED "customize" STEP --- */}
        {designStep === "customize" && generatedDesign && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              {/* ... (Your customize header JSX - no changes) ... */}
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* This is the main card, now showing 2D images */}
              <Card className="lg:col-span-3 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Your AI-Generated Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImages ? (
                    <div className="space-y-6">
                      {/* 2x2 Grid for the images */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold text-center text-lg">Floor Plan</h3>
                          <img
                            src={generatedImages.floorPlan}
                            alt="Generated Floor Plan"
                            className="rounded-xl shadow-lg border-2 border-border w-full h-auto aspect-video object-cover bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-center text-lg">Top View</h3>
                          <img
                            src={generatedImages.topView}
                            alt="Generated Top View"
                            className="rounded-xl shadow-lg border-2 border-border w-full h-auto aspect-video object-cover bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-center text-lg">Front Elevation</h3>
                          <img
                            src={generatedImages.frontElevation}
                            alt="Generated Front Elevation"
                            className="rounded-xl shadow-lg border-2 border-border w-full h-auto aspect-video object-cover bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-center text-lg">Back Elevation</h3>
                          <img
                            src={generatedImages.backElevation}
                            alt="Generated Back Elevation"
                            className="rounded-xl shadow-lg border-2 border-border w-full h-auto aspect-video object-cover bg-white"
                          />
                        </div>

                      </div>
                    </div>
                  ) : (
                    // Fallback in case images are somehow not loaded
                    <div className="w-full aspect-video flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Building2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                        <p className="text-muted-foreground">Loading Design...</p>
                      </div>
                    </div>
                  )}

                  {/* Your action buttons at the bottom */}
                  <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t">
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 bg-transparent">
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-secondary/10 bg-transparent">
                      <Share2 className="h-4 w-4" />
                      Share Design
                    </Button>
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary">
                      <Save className="h-4 w-4" />
                      Save & Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* The "Customize Design" sidebar card - no changes */}
              <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
                {/* ... (Your customize sidebar JSX - no changes) ... */}
              </Card>
            </div>

            {/* The stats cards at the bottom - no changes */}
            <div className="grid md:grid-cols-4 gap-6">
              {/* ... (Your stats cards JSX - no changes) ... */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}