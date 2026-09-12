import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "LifeQuest — Gamify Your Life",
    template: "%s | LifeQuest",
  },
  description:
    "Transform real-life tasks into epic quests. Earn XP, level up your character, and conquer your goals with LifeQuest.",
  keywords: ["productivity", "gamification", "RPG", "quests", "habits", "goal tracker"],
  authors: [{ name: "LifeQuest" }],
  creator: "LifeQuest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "LifeQuest — Gamify Your Life",
    description: "Transform real-life tasks into epic quests.",
    siteName: "LifeQuest",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Material Symbols icon font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-background font-sans text-white antialiased">{children}</body>
    </html>
  )
}
