import { Suspense } from 'react'
import Link from 'next/link'
import { getTechnologyStacks } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GridSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/error-state'
import { PageHeader } from '@/components/browse/page-header'

export const dynamic = 'force-dynamic'

export default async function StacksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const searchQuery = params.q

  return (
    <div className="container py-8">
      <PageHeader
        title="Technology Stacks"
        description="Explore complete technology stacks from successful companies"
        createHref="/stacks/new"
        createLabel="Create Stack"
      />

      <div className="mb-6">
        <form action="/stacks" method="get">
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search stacks..."
            className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </form>
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <StacksGrid searchQuery={searchQuery} />
      </Suspense>
    </div>
  )
}

async function StacksGrid({ searchQuery }: { searchQuery?: string }) {
  const response = await getTechnologyStacks({
    nameContains: searchQuery,
    take: 50,
  })

  const stacks = response.results || []

  if (stacks.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No stacks found"
        message={
          searchQuery
            ? `No results for "${searchQuery}". Try a different search term.`
            : 'No stacks available at the moment.'
        }
      />
    )
  }

  return (
    <>
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {stacks.length} result{stacks.length !== 1 ? 's' : ''} for &quot;{searchQuery}
          &quot;
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => (
          <Link key={stack.id} href={`/stacks/${stack.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{stack.name}</CardTitle>
                <CardDescription>
                  {stack.vendorName && `by ${stack.vendorName}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {stack.description || 'No description available'}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span>❤️ {stack.favCount || 0} favorites</span>
                  <span>👁️ {stack.viewCount || 0} views</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
