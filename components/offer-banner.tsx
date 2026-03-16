"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function OfferBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  const activeOffer = siteConfig.offers.find(offer => offer.active)

  useEffect(() => {
    // Show banner after a short delay for better UX
    if (activeOffer) {
      const timer = setTimeout(() => {
        // Check if user has dismissed this offer before
        const dismissedOffer = localStorage.getItem('dismissedOffer')
        if (dismissedOffer !== activeOffer.id) {
          setIsVisible(true)
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [activeOffer])

  const handleDismiss = () => {
    setIsVisible(false)
    if (activeOffer) {
      localStorage.setItem('dismissedOffer', activeOffer.id)
    }
  }

  const handleCopyCode = async () => {
    if (activeOffer) {
      await navigator.clipboard.writeText(activeOffer.code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  if (!activeOffer || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-right-full duration-500">
      <div className="bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Dismiss offer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">{activeOffer.badge}</span>
          </div>

          {/* Offer Details */}
          <h3 className="text-lg font-bold mb-1">{activeOffer.discount}</h3>
          <p className="text-sm opacity-90 mb-3">{activeOffer.description}</p>

          {/* Code Copy */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-black/10 rounded-lg px-3 py-2 text-sm font-mono">
              {activeOffer.code}
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-secondary-foreground border-0"
              onClick={handleCopyCode}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
