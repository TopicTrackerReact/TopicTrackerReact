import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from '@/_redux/provider'
import NavBar from './NavBar'
import { ThemeProvider } from './theme-provider';
import { ThemeSwitcher } from './theme-switcher'

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
      <body className='transition duration-200 ease-in bg-zinc-100 dark:bg-slate-900 min-h-screen'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Providers>
            <ThemeSwitcher />
            <main className={montserrat.className}>
              <NavBar />
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
