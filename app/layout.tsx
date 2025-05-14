import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"
import { blockCryptoExtensions } from "@/lib/block-extensions"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Budget Tracker Dashboard",
  description: "A modern budget tracking dashboard with theme switching",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    useEffect(() => {
      blockCryptoExtensions();
    }, []);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}