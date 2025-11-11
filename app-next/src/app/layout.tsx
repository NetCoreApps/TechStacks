import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/api/query-provider'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'TechStacks - Discover Technology Stacks',
  description:
    'Discover the hottest technology stacks of the most popular startups and apps using your favorite languages and technologies!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
