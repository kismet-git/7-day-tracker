// Analytics utility for tracking user behavior
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log("Analytics:", event, properties)
      }

      // Add your analytics service here (Google Analytics, Mixpanel, etc.)
      // Example: window.gtag?.('event', event, properties)
    }
  },

  page: (name: string) => {
    if (typeof window !== "undefined") {
      analytics.track("page_view", { page: name })
    }
  },
}
