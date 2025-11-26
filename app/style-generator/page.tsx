"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DesignPreferencesComponent } from "@/components/StyleGenerator/DesignPreferences"
import { DesignResults } from "@/components/StyleGenerator/DesignResults"

export default function StyleGeneratorPage() {
  const [showResults, setShowResults] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState<{
    style: string
    colorScheme: string
  } | null>(null)
  const router = useRouter()

  const handleGenerate = (style: string, colorScheme: string) => {
    setSelectedDesign({ style, colorScheme })
    setShowResults(true)
  }

  const handleBack = () => {
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4">
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>← Back to Dashboard</Button>
      </header>
      {!showResults ? (
        <DesignPreferencesComponent
          onGenerate={handleGenerate}
          initialStyle={selectedDesign?.style ?? undefined}
          initialColorScheme={selectedDesign?.colorScheme ?? undefined}
        />
      ) : (
        selectedDesign && (
          <DesignResults
            style={selectedDesign.style}
            colorScheme={selectedDesign.colorScheme}
            onBack={handleBack}
          />
        )
      )}
    </div>
  )
}
