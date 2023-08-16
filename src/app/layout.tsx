import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from '@/_redux/provider'
import NavBar from './NavBar'


const montserrat = Montserrat({ subsets: ['latin'] })

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
      <body className='bg-neutral-100 min-h-screen'>
        <Providers>
          <main className={montserrat.className}>
            <NavBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
