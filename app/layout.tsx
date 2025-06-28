import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "7-Day ChatGPT Challenge",
  description: "Build your ChatGPT habit in 7 days. No lessons, just practice.",
  generator: "v0.dev",
  manifest: "/manifest.json",
  icons: {
    icon: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-icon-minimal_new.png",
    apple: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-icon-minimal_new.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "7-Day ChatGPT Challenge",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "7-Day ChatGPT Challenge",
    title: "7-Day ChatGPT Challenge",
    description: "Build your ChatGPT habit in 7 days. No lessons, just practice.",
  },
  twitter: {
    card: "summary",
    title: "7-Day ChatGPT Challenge",
    description: "Build your ChatGPT habit in 7 days. No lessons, just practice.",
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
        <link
          rel="icon"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-icon-minimal_new.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-icon-minimal_new.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="7-Day ChatGPT Challenge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0422FF" />
      </head>
      <body>{children}</body>
    </html>
  )
}
