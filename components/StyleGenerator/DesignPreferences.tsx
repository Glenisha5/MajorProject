import React, { useState } from "react"
import { Home, Leaf, Sparkles, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorScheme {
  id: string
  name: string
  colors: string[]
}

interface ArchitecturalStyle {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

interface DesignPreferencesProps {
  onGenerate: (style: string, colorScheme: string) => void
  initialStyle?: string
  initialColorScheme?: string
}

const architecturalStyles: ArchitecturalStyle[] = [
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean lines, open spaces, neutral colors",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: "traditional-indian",
    name: "Traditional Indian",
    description: "Classic architecture, warm colors, cultural elements",
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: "luxury-contemporary",
    name: "Luxury Contemporary",
    description: "Premium finishes, sophisticated design, high-end materials",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: "eco-friendly",
    name: "Eco-Friendly",
    description: "Sustainable materials, green technology, natural lighting",
    icon: <Leaf className="w-5 h-5" />,
  },
]

const colorSchemes: ColorScheme[] = [
  {
    id: "neutral-elegance",
    name: "Neutral Elegance",
    colors: ["#E5E5E5", "#C8C8C8", "#A8A8A8", "#8B8B8B"],
  },
  {
    id: "warm-earth",
    name: "Warm Earth",
    colors: ["#E8D5C4", "#D4A574", "#C87533", "#8B4513"],
  },
  {
    id: "cool-blues",
    name: "Cool Blues",
    colors: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1976D2"],
  },
  {
    id: "vibrant-accent",
    name: "Vibrant Accent",
    colors: ["#FFF9C4", "#FFEB3B", "#FF6F00", "#1976D2"],
  },
]

export const DesignPreferencesComponent = ({
  onGenerate,
  initialStyle,
  initialColorScheme,
}: DesignPreferencesProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle ?? "modern-minimalist")
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>(
    initialColorScheme ?? "neutral-elegance"
  )

  const handleGenerate = () => {
    onGenerate(selectedStyle, selectedColorScheme)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Design Your Dream Home</h1>
        <p className="text-muted-foreground">
          Tell us your preferences and our AI will create the perfect design for you
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-lg border border-border p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Building2 className="w-5 h-5 text-primary" />
            <span>Design Preferences</span>
          </div>
          <p className="text-sm text-muted-foreground">Choose your preferred style and layout</p>

          <div className="space-y-4">
            <h3 className="font-medium">Architectural Style</h3>
            <div className="grid gap-3">
              {architecturalStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left",
                    selectedStyle === style.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="mt-0.5 text-primary">{style.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{style.name}</h4>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium">Color Scheme</h3>
            <div className="grid gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedColorScheme(scheme.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border-2 transition-all text-left",
                    selectedColorScheme === scheme.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{scheme.name}</span>
                  <div className="flex gap-2">
                    {scheme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[hsl(175,60%,45%)] to-primary hover:opacity-90 transition-opacity"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Generate AI Design
      </Button>
    </div>
  )
}

export { architecturalStyles, colorSchemes }
