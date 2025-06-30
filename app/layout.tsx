import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "7-Day ChatGPT Challenge",
  description: "Build your AI confidence in just 7 days",
  generator: "v0.dev",
  icons: {
    icon: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}
