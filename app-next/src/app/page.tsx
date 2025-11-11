import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechStacks
            </h1>
            <p className="mb-8 text-xl text-slate-600">
              Discover the Hottest Technology Stacks
            </p>
            <div className="inline-block rounded-lg bg-white px-6 py-4 shadow-lg mb-8">
              <p className="text-slate-700">
                🚀 Next.js Migration - Phase 1 Complete!
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/tech">Browse Technologies</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/stacks">View Stacks</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Link
              href="/tech"
              className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <div className="mb-4 text-4xl">🔧</div>
              <h3 className="mb-2 text-xl font-semibold">Browse Technologies</h3>
              <p className="text-slate-600">
                Explore thousands of technologies used by top companies
              </p>
            </Link>

            <Link
              href="/stacks"
              className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <div className="mb-4 text-4xl">📚</div>
              <h3 className="mb-2 text-xl font-semibold">Discover Stacks</h3>
              <p className="text-slate-600">
                Find complete technology stacks from successful startups
              </p>
            </Link>

            <Link
              href="/top"
              className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <div className="mb-4 text-4xl">🏆</div>
              <h3 className="mb-2 text-xl font-semibold">Top Ranked</h3>
              <p className="text-slate-600">
                See the most popular technologies and stacks
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
