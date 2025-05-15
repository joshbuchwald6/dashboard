import Sidebar from '@/components/kokonutui/sidebar'
import TopNav from '@/components/kokonutui/top-nav'
import MainContent from '@/components/layout/MainContent'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KokonutUI Dashboard',
  description: 'A modern dashboard with theme switching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <TopNav />
                <div className="flex-1">
                  <MainContent />
                </div>
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
