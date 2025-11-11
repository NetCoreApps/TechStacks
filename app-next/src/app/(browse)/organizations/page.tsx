import { Suspense } from 'react'
import Link from 'next/link'
import { getUserOrganizations } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GridSkeleton } from '@/components/shared/loading-skeleton'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function OrganizationsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Organizations</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Browse developer communities and organizations
          </p>
        </div>
        <Button asChild>
          <Link href="/organizations/new">Create Organization</Link>
        </Button>
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <OrganizationsGrid />
      </Suspense>
    </div>
  )
}

async function OrganizationsGrid() {
  let organizations: any[] = []

  try {
    const response = await getUserOrganizations()
    organizations = response.members || []
  } catch (error) {
    // If not authenticated or error, show empty state
    organizations = []
  }

  if (organizations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2">No organizations yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Organizations are communities where developers can share technologies, collaborate on
            projects, and build together.
          </p>
          <Button asChild size="lg">
            <Link href="/organizations/new">Create Your Organization</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <Link key={org.id} href={`/organizations/${org.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            {org.logoUrl && (
              <div className="h-32 overflow-hidden rounded-t-lg">
                <img
                  src={org.logoUrl}
                  alt={org.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
              <CardDescription>
                {org.membersCount || 0} member{org.membersCount !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {org.description || 'No description available'}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
