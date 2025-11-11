import { Suspense } from 'react'
import Link from 'next/link'
import { getTechnologies } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GridSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/error-state'
import { PageHeader } from '@/components/browse/page-header'

export const dynamic = 'force-dynamic'

export default async function TechPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const searchQuery = params.q

  return (
    <div className="container py-8">
      <PageHeader
        title="Technologies"
        description="Browse and discover technologies used by top companies"
        createHref="/tech/new"
        createLabel="Add Technology"
      />

      <div className="mb-6">
        <form action="/tech" method="get">
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search technologies..."
            className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </form>
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <TechnologyGrid searchQuery={searchQuery} />
      </Suspense>
    </div>
  )
}

async function TechnologyGrid({ searchQuery }: { searchQuery?: string }) {
  const response = await getTechnologies({
    nameContains: searchQuery,
    take: 50,
  })

  const technologies = response.results || []

  if (technologies.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No technologies found"
        message={
          searchQuery
            ? `No results for "${searchQuery}". Try a different search term.`
            : 'No technologies available at the moment.'
        }
      />
    )
  }

  return (
    <>
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {technologies.length} result{technologies.length !== 1 ? 's' : ''} for &quot;
          {searchQuery}&quot;
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <Link key={tech.id} href={`/tech/${tech.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{tech.name}</CardTitle>
                <CardDescription>
                  {tech.tier || 'Technology'} {tech.vendorName && `by ${tech.vendorName}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tech.description || 'No description available'}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span>❤️ {tech.favCount || 0} favorites</span>
                  <span>👁️ {tech.viewCount || 0} views</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
