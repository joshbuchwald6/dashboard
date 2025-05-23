import './globals.css'
import { ClientLayout } from './client-layout'
import { Inter } from 'next/font/google'
import { TellerConnectScript } from '@/components/teller/TellerConnectScript'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KokonutUI Dashboard',
  description: 'A modern dashboard with theme switching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <TellerConnectScript />
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
