// Security utilities for input sanitization and validation

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return ""

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim()
}

/**
 * Validate and sanitize HTML for display
 */
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement("div")
  div.textContent = html
  return div.innerHTML
}

/**
 * Validate input length
 */
export const validateInputLength = (input: string, maxLength = 10000): boolean => {
  return input.length > 0 && input.length <= maxLength
}

/**
 * Validate URL is safe to open
 */
export const validateURL = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url)
    // Only allow https and http protocols
    return ["https:", "http:"].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

/**
 * Safe window.open with security attributes
 */
export const safeWindowOpen = (url: string, target = "_blank"): Window | null => {
  if (!validateURL(url)) {
    console.error("Invalid URL:", url)
    return null
  }

  // Add noopener and noreferrer for security
  return window.open(url, target, "noopener,noreferrer")
}

/**
 * Validate localStorage data structure
 */
export const validateStorageData = (data: any): boolean => {
  if (!data || typeof data !== "object") return false

  // Check required properties
  if (!Array.isArray(data.daysData)) return false
  if (typeof data.currentDay !== "number") return false
  if (typeof data.currentScreen !== "string") return false

  // Validate each day's data
  return data.daysData.every(
    (day: any) =>
      typeof day.day === "number" &&
      typeof day.completed === "boolean" &&
      typeof day.userPrompt === "string" &&
      typeof day.userResponse === "string",
  )
}

/**
 * Safe localStorage operations with error handling
 */
export const safeStorage = {
  get: (key: string): any | null => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      const parsed = JSON.parse(item)

      // Validate data structure
      if (!validateStorageData(parsed)) {
        console.warn("Invalid storage data detected, clearing")
        localStorage.removeItem(key)
        return null
      }

      return parsed
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  },

  set: (key: string, value: any): boolean => {
    try {
      // Validate data before storing
      if (!validateStorageData(value)) {
        console.error("Invalid data structure, not storing")
        return false
      }

      // Check storage size (5MB limit for most browsers)
      const serialized = JSON.stringify(value)
      if (serialized.length > 5 * 1024 * 1024) {
        console.error("Data too large for localStorage")
        return false
      }

      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error("Error writing to localStorage:", error)
      return false
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error removing from localStorage:", error)
      return false
    }
  },
}

/**
 * Rate limiting for actions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  isAllowed(key: string, maxAttempts = 10, windowMs = 60000): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((timestamp) => now - timestamp < windowMs)

    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)

    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

/**
 * Content Security Policy headers for Next.js
 */
export const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://*.vercel.com https://*.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\s{2,}/g, " ")
  .trim()
