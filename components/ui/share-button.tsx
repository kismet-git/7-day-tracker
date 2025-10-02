"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Check, Twitter, Linkedin, Facebook, Link } from "lucide-react"
import { shareUtils } from "@/lib/share-utils"
import { analytics } from "@/lib/analytics"

interface ShareButtonProps {
  completedDays: number
  className?: string
}

export function ShareButton({ completedDays, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== "undefined" ? window.location.origin : ""

  const handleShare = async (platform: string) => {
    analytics.track("share_clicked", { platform, completedDays })

    switch (platform) {
      case "twitter":
        shareUtils.shareOnTwitter(completedDays, url)
        break
      case "linkedin":
        shareUtils.shareOnLinkedIn(url)
        break
      case "facebook":
        shareUtils.shareOnFacebook(url)
        break
      case "copy":
        const success = await shareUtils.copyLink(url)
        if (success) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
        break
      case "native":
        await shareUtils.nativeShare(completedDays, url)
        break
    }
  }

  // Check if native share is available
  const hasNativeShare = typeof navigator !== "undefined" && navigator.share

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Progress
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasNativeShare && (
          <DropdownMenuItem onClick={() => handleShare("native")}>
            <Share2 className="w-4 h-4 mr-2" />
            Share...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <Linkedin className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")}>
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Link className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
