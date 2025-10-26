"use client"
import { useRef } from "react"
import { useState, useEffect, Suspense, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Plane, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import InteractiveHomeModel from "./InteractiveHomeModel"
import {debounce} from "lodash"
import type { ChangeEvent } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Import the new, detailed 3D model component
import { DetailedHouseModel } from "@/components/DetailedHouseModel" // Adjust path as needed

interface DetailedHouseModelProps {
  wallColor: string
}

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-red-800 font-semibold">Something went wrong:</h2>
      <pre className="text-sm text-red-600">{error.message}</pre>
      <Button onClick={resetErrorBoundary} className="mt-4">Try again</Button>
    </div>
  )
}

function FloorPlan2D() {
  // ... (FloorPlan2D component remains unchanged)
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Floor */}
      <Plane args={[8, 6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>

      {/* Room divisions */}
      <Plane args={[0.1, 6]} position={[0, 0, 0.01]}>
        <meshStandardMaterial color="#333" />
      </Plane>
      <Plane args={[4, 0.1]} position={[2, 0, 0.01]}>
        <meshStandardMaterial color="#333" />
      </Plane>
      <Plane args={[4, 0.1]} position={[-2, 0, 0.01]}>
        <meshStandardMaterial color="#333" />
      </Plane>

      {/* Room labels */}
      <Text
        position={[2, 1.5, 0.02]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        Living Room
      </Text>
      <Text
        position={[-2, 1.5, 0.02]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        Kitchen
      </Text>
      <Text
        position={[2, -1.5, 0.02]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        Bedroom 1
      </Text>
      <Text
        position={[-2, -1.5, 0.02]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        Bedroom 2
      </Text>
    </group>
  )
}


interface AIHouseDesignerProps {
  onBack: () => void
}

export default function AIHouseDesigner({ onBack }: AIHouseDesignerProps) {
  const [designStep, setDesignStep] = useState("preferences")
  const [designStyle, setDesignStyle] = useState("")
  const [roomLayout, setRoomLayout] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDesign, setGeneratedDesign] = useState(false)
  const [currentView, setCurrentView] = useState("3d") // Default to 3D view
  const [isListening, setIsListening] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState("")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedColor, setSelectedColor] = useState("#F5F5DC") // Default wall color
  const [animationStep, setAnimationStep] = useState(0)
  const [elements, setElements] = useState<HouseElement[]>([
    { id: 1, type: "floor", position: [0, 0, 0], size: [10, 0.2, 10] },
    {id: 2, type: "room", position: [-2, 1.5, -2], size: [4, 3, 4] },
    {id: 3, type: "room", position: [2, 1.5, -2], size: [4, 3, 4]},
    ])
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HouseElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsGenerating(false)
            setGeneratedDesign(true)
            setDesignStep("customize")
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isGenerating])
  const addFloor=()=>{
    const highestY=elements.reduce((max,el)=>Math.max(max,el.position[1]+el.size[1]/2),0)
    const newFloor:HouseElement={
      id:Date.now(),
      type:"floor",
      position:[0,highestY+1,0],
      size:[10,0.2,10],
    }
    setElements([...elements,newFloor])
  }
  const addToHistory = (newElements: HouseElement[]) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newElements])
    setHistoryIndex(prev => prev + 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setElements(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setElements(history[historyIndex + 1])
    }
  }
  // ... (designStyles, colorSchemes, and event handlers remain the same)
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

  const handleGenerateDesign = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
  }

  const handleVoiceCommand = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setVoiceCommand("Change wall color to blue")
        setSelectedColor("#4A90E2") // Example voice command action
        setIsListening(false)
      }, 2000)
    }
  }

  const saveDesign = () => {
    const designData = {
      style: designStyle,
      layout: roomLayout,
      colors: colorScheme,
      elements,
      selectedColor,
    }
    localStorage.setItem('savedDesign', JSON.stringify(designData))
  }

  const loadDesign = () => {
    const saved = localStorage.getItem('savedDesign')
    if (saved) {
      const designData = JSON.parse(saved)
      setDesignStyle(designData.style)
      setRoomLayout(designData.layout)
      setColorScheme(designData.colors)
      setElements(designData.elements)
      setSelectedColor(designData.selectedColor)
    }
  }

  const debouncedSave = useCallback(
    debounce((data: any) => {
      localStorage.setItem('autoSave', JSON.stringify(data))
    }, 1000),
    []
  )

  useEffect(() => {
    debouncedSave({
      style: designStyle,
      layout: roomLayout,
      colors: colorScheme,
    })
  }, [designStyle, roomLayout, colorScheme, debouncedSave])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r') {
        // Reset view
      } else if (e.key === 'f') {
        // Toggle fullscreen
      } else if (e.key === 's' && e.ctrlKey) {
        e.preventDefault()
        saveDesign()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [saveDesign]) // Add saveDesign to dependencies
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* ... (Header remains unchanged) */}
      <header className="border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-primary/10">
                ← Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Palette className="h-6 w-6 text-primary animate-pulse" />
                  <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-spin" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI House Designer
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="animate-pulse">
                Step {designStep === "preferences" ? "1" : designStep === "generate" ? "2" : "3"} of 3
              </Badge>
              {generatedDesign && (
                <Badge variant="default" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Generated
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* ... (designStep 'preferences' and 'generate' sections remain unchanged) */}
        {designStep === "preferences" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Design Your Dream Home
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Tell us your preferences and our AI will create the perfect design for you
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full bg-primary animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Design Preferences
                  </CardTitle>
                  <CardDescription>Choose your preferred style and layout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Architectural Style</Label>
                    <div className="grid gap-4">
                      {designStyles.map((style, index) => (
                        <div
                          key={style.id}
                          className={`group relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                            designStyle === style.id
                              ? "border-primary bg-primary/10 shadow-lg scale-105"
                              : "border-border hover:border-primary/50 hover:shadow-md hover:scale-102"
                          }`}
                          onClick={() => setDesignStyle(style.id)}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          />
                          <div className="relative z-10 flex items-center gap-4">
                            <div className="text-3xl">{style.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg">{style.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{style.desc}</p>
                            </div>
                            {designStyle === style.id && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Room Layout Priority</Label>
                    <Select value={roomLayout} onValueChange={setRoomLayout}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select layout priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">🏠 Open Floor Plan</SelectItem>
                        <SelectItem value="traditional">🏛️ Traditional Separate Rooms</SelectItem>
                        <SelectItem value="flexible">🔄 Flexible Multi-use Spaces</SelectItem>
                        <SelectItem value="privacy">🔒 Privacy-focused Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Color Scheme</Label>
                    <div className="grid gap-4">
                      {colorSchemes.map((scheme) => (
                        <div
                          key={scheme.id}
                          className={`group p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            colorScheme === scheme.id
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                          onClick={() => setColorScheme(scheme.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg">{scheme.name}</span>
                            <div className="flex gap-2">
                              {scheme.colors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-200"
                                  style={{ backgroundColor: color, animationDelay: `${idx * 0.1}s` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Special Features
                  </CardTitle>
                  <CardDescription>Add special elements to your design</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800">
                      <Label className="text-base font-semibold text-green-800 dark:text-green-200 flex items-center gap-2 mb-4">
                        🕉️ Vastu Compliance
                      </Label>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" id="vastu" className="w-5 h-5 rounded border-border" />
                        <Label htmlFor="vastu" className="text-green-700 dark:text-green-300">
                          Follow Vastu Shastra principles for positive energy
                        </Label>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <Label className="text-base font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2 mb-4">
                        🌱 Eco-Friendly Features
                      </Label>
                      <div className="space-y-3">
                        {[{
                          id: "solar",
                          label: "☀️ Solar panels",
                          desc: "Renewable energy system"
                        },
                        {
                          id: "rainwater",
                          label: "💧 Rainwater harvesting",
                          desc: "Water conservation system"
                        },
                        {
                          id: "natural",
                          label: "🌬️ Natural ventilation",
                          desc: "Energy-efficient cooling"
                        }].map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                          >
                            <input type="checkbox" id={feature.id} className="w-5 h-5 rounded border-border" />
                            <div className="flex-1">
                              <Label htmlFor={feature.id} className="text-blue-700 dark:text-blue-300 font-medium">
                                {feature.label}
                              </Label>
                              <p className="text-sm text-blue-600 dark:text-blue-400">{feature.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setDesignStep("generate")}
                    disabled={!designStyle || !roomLayout || !colorScheme}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Generate AI Design
                    <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {designStep === "generate" && (
          <div className="max-w-3xl mx-auto text-center">
            <Card className="border-0 bg-gradient-to-br from-card via-card/80 to-muted/30 backdrop-blur-md shadow-2xl">
              <CardContent className="pt-12 pb-12">
                {!isGenerating && !generatedDesign && (
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Zap className="h-12 w-12 text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-primary/20 animate-ping" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Ready to Generate Your Design
                      </h3>
                      <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Our AI will create a personalized house design based on your preferences
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={handleGenerateDesign}
                      className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start AI Generation
                    </Button>
                  </div>
                )}

                {isGenerating && (
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto animate-spin">
                        <Building2 className="h-12 w-12 text-white" />
                      </div>
                      <div
                        className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-primary/20 border-t-primary animate-spin"
                        style={{ animationDuration: "2s" }}
                      />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        AI is Designing Your Home
                      </h3>
                      <div className="space-y-4">
                        <p className="text-lg text-muted-foreground">
                          {generationProgress < 30 && "Analyzing your preferences..."}
                          {generationProgress >= 30 && generationProgress < 60 && "Creating floor plans..."}
                          {generationProgress >= 60 && generationProgress < 90 && "Generating 3D models..."}
                          {generationProgress >= 90 && "Finalizing customization options..."}
                        </p>
                        <div className="space-y-2">
                          <Progress value={generationProgress} className="w-full h-3" />
                          <p className="text-sm text-muted-foreground">{generationProgress}% Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {designStep === "customize" && generatedDesign && (
          <div className="space-y-8">
            {/* ... (Header and voice command UI remain unchanged) */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Your AI-Generated Design
                </h2>
                <p className="text-lg text-muted-foreground">Customize and visualize your dream home</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleVoiceCommand}
                  className={`gap-2 ${isListening ? "bg-red-50 border-red-200 text-red-700" : ""}`}
                >
                  {isListening ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                  {isListening ? "Listening..." : "Voice Commands"}
                </Button>
                {voiceCommand && (
                  <Badge variant="secondary" className="animate-pulse">
                    {voiceCommand}
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
              <Card className="lg:col-span-3 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
                {/* ... (CardHeader remains unchanged) */}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      3D Visualization
                    </CardTitle>
                    <Tabs value={currentView} onValueChange={setCurrentView}>
                      <TabsList className="bg-muted/50">
                        <TabsTrigger value="2d" className="gap-2">
                          <Home className="h-4 w-4" />
                          Floor Plan
                        </TabsTrigger>
                        <TabsTrigger value="3d" className="gap-2">
                          <Building2 className="h-4 w-4" />
                          3D Model
                        </TabsTrigger>
                        <TabsTrigger value="ar" className="gap-2">
                          <Zap className="h-4 w-4" />
                          AR View
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 rounded-xl overflow-hidden shadow-inner">
                    <Suspense
                      fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <Building2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                            <p className="text-muted-foreground">Loading 3D Model...</p>
                          </div>
                        </div>
                      }
                    >
                      <Canvas camera={{ position: [10, 8, 10], fov: 50 }} shadows>
                        {/* --- KEY CHANGES HERE --- */}
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <directionalLight
                          position={[10, 10, 5]}
                          intensity={1.5}
                          castShadow
                          shadow-mapSize-width={2048}
                          shadow-mapSize-height={2048}
                        />

                        {currentView === "2d" && <FloorPlan2D />}
                        {currentView === "3d" && <DetailedHouseModel wallColor={selectedColor} />}
                        {currentView === "ar" && (
                          <group>
                            <DetailedHouseModel wallColor={selectedColor} />
                            <Text position={[0, 4, 0]} fontSize={0.5} color="#4A90E2" anchorX="center">
                              AR Mode - View on your device
                            </Text>
                          </group>
                        )}
                        {/* --- END OF KEY CHANGES --- */}

                        <OrbitControls
                          enablePan={true}
                          enableZoom={true}
                          enableRotate={true}
                          minDistance={5}
                          maxDistance={30}
                          makeDefault
                        />
                      </Canvas>
                    </Suspense>
                  </div>
                  {/* ... (Export/Share buttons remain unchanged) */}
                  <div className="flex items-center justify-center gap-4 mt-6">
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

              {/* ... (Customize Design Card and Stats Cards remain unchanged) */}
              <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Customize Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Wall Colors</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {["#F5F5DC", "#F5F5F5", "#E8E8E8", "#D3D3D3", "#4A90E2", "#FF6B35", "#8B4513", "#228B22"].map(
                        (color) => (
                          <div
                            key={color}
                            className={`w-12 h-12 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                              selectedColor === color ? "border-primary shadow-lg scale-110" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Flooring</Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select flooring" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marble">🏛️ Marble</SelectItem>
                        <SelectItem value="granite">💎 Granite</SelectItem>
                        <SelectItem value="tiles">🔲 Ceramic Tiles</SelectItem>
                        <SelectItem value="wood">🌳 Wooden Flooring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Quick Actions</Label>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <RotateCcw className="h-4 w-4" />
                        Reset View
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <Maximize className="h-4 w-4" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Apply Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  value: "95%",
                  label: "Vastu Compliance",
                  color: "text-green-600",
                  bg: "bg-green-50 dark:bg-green-950/20"
                },
                {
                  value: "A+",
                  label: "Energy Efficiency",
                  color: "text-blue-600",
                  bg: "bg-blue-50 dark:bg-blue-950/20"
                },
                {
                  value: "₹24L",
                  label: "Estimated Cost",
                  color: "text-purple-600",
                  bg: "bg-purple-50 dark:bg-purple-950/20"
                },
                {
                  value: "8 months",
                  label: "Construction Time",
                  color: "text-orange-600",
                  bg: "bg-orange-50 dark:bg-orange-950/20"
                }
              ].map((stat, index) => (
                <Card
                  key={index}
                  className={`text-center border-0 ${stat.bg} hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  <CardContent className="pt-6 pb-6">
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Add or update the interface
interface HouseElement {
  id: number
  type: "floor" | "room"
  position: [number, number, number]
  size: [number, number, number]
}