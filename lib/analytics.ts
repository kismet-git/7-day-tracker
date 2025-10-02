// Analytics utility with security improvements
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      try {
        // Sanitize event name
        const safeEvent = String(event).replace(/[^a-zA-Z0-9_]/g, "_")

        // Sanitize properties
        const safeProperties = properties
          ? Object.entries(properties).reduce(
              (acc, [key, value]) => {
                const safeKey = String(key).replace(/[^a-zA-Z0-9_]/g, "_")
                // Only allow primitive types
                if (["string", "number", "boolean"].includes(typeof value)) {
                  acc[safeKey] = value
                }
                return acc
              },
              {} as Record<string, any>,
            )
          : undefined

        // Log to console in development
        if (process.env.NODE_ENV === "development") {
          console.log("Analytics:", safeEvent, safeProperties)
        }

        // Add your analytics service here (Google Analytics, Mixpanel, etc.)
        // Example: window.gtag?.('event', safeEvent, safeProperties)
      } catch (error) {
        console.error("Analytics error:", error)
      }
    }
  },

  page: (name: string) => {
    if (typeof window !== "undefined") {
      const safeName = String(name).replace(/[^a-zA-Z0-9_-]/g, "_")
      analytics.track("page_view", { page: safeName })
    }
  },
}
