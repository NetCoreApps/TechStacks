import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
