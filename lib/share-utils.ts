// Social sharing utilities with security improvements
import { safeWindowOpen } from "@/lib/security"

export const shareUtils = {
  // Generate share text based on progress
  getShareText: (completedDays: number): string => {
    const safeCompletedDays = Math.max(0, Math.min(7, Number(completedDays) || 0))

    if (safeCompletedDays === 7) {
      return `🎉 I just completed the 7-Day ChatGPT Challenge! Built my AI confidence from zero to hero. Join me! #AIChallenge #ChatGPT`
    }
    return `💪 Day ${safeCompletedDays}/7 complete in my ChatGPT Challenge! Building my AI skills one day at a time. #AIChallenge #ChatGPT`
  },

  // Share on Twitter/X
  shareOnTwitter: (completedDays: number, url: string) => {
    const text = shareUtils.getShareText(completedDays)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    safeWindowOpen(twitterUrl, "_blank")
  },

  // Share on LinkedIn
  shareOnLinkedIn: (url: string) => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    safeWindowOpen(linkedInUrl, "_blank")
  },

  // Share on Facebook
  shareOnFacebook: (url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    safeWindowOpen(facebookUrl, "_blank")
  },

  // Copy link to clipboard with security
  copyLink: async (url: string): Promise<boolean> => {
    try {
      // Validate URL before copying
      if (!url || typeof url !== "string") {
        console.error("Invalid URL for copying")
        return false
      }

      await navigator.clipboard.writeText(url)
      return true
    } catch (err) {
      console.error("Failed to copy:", err)
      return false
    }
  },

  // Native share API (mobile) with validation
  nativeShare: async (completedDays: number, url: string): Promise<boolean> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "7-Day ChatGPT Challenge",
          text: shareUtils.getShareText(completedDays),
          url: url,
        })
        return true
      } catch (err) {
        // User cancelled share or error occurred
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Share failed:", err)
        }
        return false
      }
    }
    return false
  },
}
