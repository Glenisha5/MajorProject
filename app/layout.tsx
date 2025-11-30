import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AIConstructionChatbot from "@/components/AIConstructionChatbot"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import CartButton from "@/components/CartButton"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "EasyConstruct"
}

const geistSans = GeistSans.variable
const geistMono = GeistMono.variable

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans} ${geistMono} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            {children}
            <AIConstructionChatbot />
            <Toaster />
            <CartButton />
            <Footer />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
