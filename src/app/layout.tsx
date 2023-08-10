import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/_redux/provider'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Topic Tracker',
  description: 'Track your Tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="light" lang="en">
      <body className='bg-white min-h-screen'>
        <Providers>
          <NavBar />
          <main className='grow'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
