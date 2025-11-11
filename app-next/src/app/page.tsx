export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TechStacks
          </h1>
          <p className="mb-8 text-xl text-slate-600">
            Discover the Hottest Technology Stacks
          </p>
          <div className="inline-block rounded-lg bg-white px-6 py-4 shadow-lg">
            <p className="text-slate-700">
              🚀 Next.js Migration - Phase 0 Complete!
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 text-4xl">🔧</div>
            <h3 className="mb-2 text-xl font-semibold">Browse Technologies</h3>
            <p className="text-slate-600">
              Explore thousands of technologies used by top companies
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 text-4xl">📚</div>
            <h3 className="mb-2 text-xl font-semibold">Discover Stacks</h3>
            <p className="text-slate-600">
              Find complete technology stacks from successful startups
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 text-4xl">💬</div>
            <h3 className="mb-2 text-xl font-semibold">Join Community</h3>
            <p className="text-slate-600">
              Discuss and share insights with other developers
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
