import { Suspense } from 'react'
import Link from 'next/link'
import { getTopTechnologies, getTopTechnologyStacks } from '@/lib/api/queries-server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GridSkeleton } from '@/components/shared/loading-skeleton'

export const dynamic = 'force-dynamic'

export default function TopPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Top Technologies & Stacks</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Most popular technologies and stacks by the community
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={<GridSkeleton count={3} />}>
          <TopTechnologiesSection />
        </Suspense>

        <Suspense fallback={<GridSkeleton count={3} />}>
          <TopStacksSection />
        </Suspense>
      </div>
    </div>
  )
}

async function TopTechnologiesSection() {
  const response = await getTopTechnologies(10)
  const topTechnologies = response.results || []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Technologies</h2>
      <div className="space-y-4">
        {topTechnologies.map((tech, index) => (
          <Link key={tech.id} href={`/tech/${tech.slug}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="truncate">{tech.name}</CardTitle>
                      <div className="text-sm text-muted-foreground truncate">
                        {tech.tier}
                        {tech.vendorName && ` • ${tech.vendorName}`}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>❤️ {tech.favCount || 0} favorites</span>
                  <span>👁️ {tech.viewCount || 0} views</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

async function TopStacksSection() {
  const response = await getTopTechnologyStacks(10)
  const topStacks = response.results || []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Stacks</h2>
      <div className="space-y-4">
        {topStacks.map((stack, index) => (
          <Link key={stack.id} href={`/stacks/${stack.slug}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-lg font-bold text-purple-600 shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="truncate">{stack.name}</CardTitle>
                      {stack.vendorName && (
                        <div className="text-sm text-muted-foreground truncate">
                          by {stack.vendorName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>❤️ {stack.favCount || 0} favorites</span>
                  <span>👁️ {stack.viewCount || 0} views</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
