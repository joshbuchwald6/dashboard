import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ExtensionBlocker } from "@/components/extension-blocker"

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ExtensionBlocker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}