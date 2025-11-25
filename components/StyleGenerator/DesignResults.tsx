import React, { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesignResultsProps {
  style: string
  colorScheme: string
  onBack: () => void
}

export const DesignResults = ({ style, colorScheme, onBack }: DesignResultsProps) => {
  // Deterministic mapping to zero-padded filenames under `public/style-designs/` root
  const imageMap: Record<string, Record<string, string>> = {
    "modern-minimalist": {
      "neutral-elegance": "001.jpg",
      "warm-earth": "004.png",
      "cool-blues": "003.jpg",
      "vibrant-accent": "002.png",
    },
    "traditional-indian": {
      "neutral-elegance": "005.jpg",
      "warm-earth": "006.jpg",
      "cool-blues": "007.jpg",
      "vibrant-accent": "008.jpg",
    },
    "luxury-contemporary": {
      "neutral-elegance": "009.jpg",
      "warm-earth": "010.png",
      "cool-blues": "011.png",
      "vibrant-accent": "012.png",
    },
    "eco-friendly": {
      "neutral-elegance": "013.png",
      "warm-earth": "014.png",
      "cool-blues": "015.png",
      "vibrant-accent": "016.png",
    },
  }

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fileName = imageMap[style]?.[colorScheme]

    const baseCandidates: string[] = []

    if (fileName) {
      const base = fileName.replace(/\.[^.]+$/, "")
      const n = parseInt(base, 10)

      // common variants for the supplied assets: 3-digit, 4-digit (some files are named 0010.png), plain number
      const pad3 = (num: number) => num.toString().padStart(3, "0")
      const pad4 = (num: number) => num.toString().padStart(4, "0")

      baseCandidates.push(`/style-designs/${pad3(n)}.png`)
      baseCandidates.push(`/style-designs/${pad3(n)}.jpg`)
      baseCandidates.push(`/style-designs/${pad4(n)}.png`)
      baseCandidates.push(`/style-designs/${pad4(n)}.jpg`)
      baseCandidates.push(`/style-designs/${n}.png`)
      baseCandidates.push(`/style-designs/${n}.jpg`)
    }

    // also try a style_colorScheme specific filename as a fallback
    const styleKeyPng = `/style-designs/${style}_${colorScheme}.png`
    const styleKeyJpg = `/style-designs/${style}_${colorScheme}.jpg`
    baseCandidates.push(styleKeyPng, styleKeyJpg)

    // last resort: try files at public root (non-/style-designs)
    for (const c of [...baseCandidates]) {
      const rootCandidate = c.replace(/^\/style-designs\//, "/")
      baseCandidates.push(rootCandidate)
    }

    const tryLoad = async () => {
      for (const candidate of baseCandidates) {
        if (cancelled) return
        // preload
        const img = new Image()
        const ok = await new Promise<boolean>((resolve) => {
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
          img.src = candidate
          // safety: resolve false after 2s if neither event fires
          setTimeout(() => resolve(false), 2000)
        })

        if (ok) {
          if (!cancelled) {
            setImageSrc(candidate)
            setIsLoading(false)
          }
          return
        }
      }

      // nothing found
      if (!cancelled) {
        setImageSrc(null)
        setIsLoading(false)
      }
    }

    tryLoad()

    return () => {
      cancelled = true
    }
  }, [style, colorScheme])

  const views = [{ title: "FRONT VIEW", position: "center" }]

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preferences
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-primary">Your AI Generated Design</h1>
          <p className="text-muted-foreground">
            {style.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} •{" "}
            {colorScheme.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </p>
        </div>

        <div className="w-full">
          <div className="w-full h-[calc(100vh-240px)] bg-muted/30 flex items-center justify-center rounded-lg border">
            {isLoading ? (
              <div className="text-muted-foreground">Loading design...</div>
            ) : imageSrc ? (
              <img src={imageSrc} alt={views[0].title} className="w-full h-full object-contain" />
            ) : (
              <div className="text-center space-y-2 text-muted-foreground">
                <p>No image available for this selection</p>
                <p className="text-sm">
                  {style.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} with{" "}
                  {colorScheme.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Button onClick={onBack} className="w-full h-14 text-lg font-semibold">
              Regenerate House
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
