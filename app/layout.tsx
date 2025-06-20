import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ATU Assistant - Accra Technical University Chatbot",
  description:
    "Official chatbot for Accra Technical University Computer Science Department. Get information about programs, admissions, courses, and university services.",
  keywords:
    "Accra Technical University, ATU, Computer Science, Cybersecurity, Information Technology, Ghana, Technical Education",
  authors: [{ name: "Accra Technical University" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
