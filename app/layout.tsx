import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "7-Day ChatGPT Challenge",
  description: "Build your AI confidence in just 7 days",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        rel: "icon",
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "7-Day ChatGPT Challenge",
    startupImage: [
      {
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  openGraph: {
    title: "7-Day ChatGPT Challenge",
    description: "Build your AI confidence in just 7 days",
    images: [
      {
        url: "https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg",
        width: 1200,
        height: 630,
        alt: "7-Day ChatGPT Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day ChatGPT Challenge",
    description: "Build your AI confidence in just 7 days",
    images: ["https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"],
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
        {/* Favicon and icon links for maximum compatibility */}
        <link
          rel="icon"
          type="image/jpeg"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="shortcut icon"
          type="image/jpeg"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />

        {/* Android/Chrome icons */}
        <link
          rel="icon"
          type="image/jpeg"
          sizes="192x192"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="512x512"
          href="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />

        {/* Microsoft tiles */}
        <meta
          name="msapplication-TileImage"
          content="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/aibeginnermode-site-icon.jpg"
        />
        <meta name="msapplication-TileColor" content="#000099" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme colors */}
        <meta name="theme-color" content="#000099" />
        <meta name="msapplication-navbutton-color" content="#000099" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="7-Day ChatGPT Challenge" />
      </head>
      <body>{children}</body>
    </html>
  )
}
