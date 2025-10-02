// Social sharing utilities
export const shareUtils = {
  // Generate share text based on progress
  getShareText: (completedDays: number): string => {
    if (completedDays === 7) {
      return `🎉 I just completed the 7-Day ChatGPT Challenge! Built my AI confidence from zero to hero. Join me! #AIChallenge #ChatGPT`
    }
    return `💪 Day ${completedDays}/7 complete in my ChatGPT Challenge! Building my AI skills one day at a time. #AIChallenge #ChatGPT`
  },

  // Share on Twitter/X
  shareOnTwitter: (completedDays: number, url: string) => {
    const text = shareUtils.getShareText(completedDays)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  },

  // Share on LinkedIn
  shareOnLinkedIn: (url: string) => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, "_blank", "width=550,height=420")
  },

  // Share on Facebook
  shareOnFacebook: (url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, "_blank", "width=550,height=420")
  },

  // Copy link to clipboard
  copyLink: async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch (err) {
      console.error("Failed to copy:", err)
      return false
    }
  },

  // Native share API (mobile)
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
        console.error("Share failed:", err)
        return false
      }
    }
    return false
  },
}
