import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOrganization } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let orgResponse
  try {
    orgResponse = await getOrganization(slug)
  } catch (error) {
    notFound()
  }

  const organization = orgResponse.organization

  if (!organization) {
    notFound()
  }

  const owners = orgResponse.owners || []
  const moderators = orgResponse.moderators || []
  const allMembers = [...owners, ...moderators]
  const categories = orgResponse.labels || []

  return (
    <div className="container py-8">
      {/* Hero Section */}
      {organization.heroUrl && (
        <div className="mb-8 h-48 rounded-lg overflow-hidden">
          <img
            src={organization.heroUrl}
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          {organization.logoUrl && (
            <img
              src={organization.logoUrl}
              alt={organization.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{organization.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{organization.description}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/organizations/${slug}/edit`}>Edit</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          {organization.descriptionHtml && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: organization.descriptionHtml }}
                />
              </CardContent>
            </Card>
          )}

          {/* Members */}
          {allMembers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Members ({allMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {allMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3">
                      {member.avatarUrl && (
                        <img
                          src={member.avatarUrl}
                          alt={member.userName}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <Link
                          href={`/users/${member.userName}`}
                          className="font-medium hover:underline"
                        >
                          {member.userName}
                        </Link>
                        {member.isOwner && (
                          <span className="ml-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            Owner
                          </span>
                        )}
                        {member.isModerator && !member.isOwner && (
                          <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Moderator
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{orgResponse.membersCount || allMembers.length}</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{owners.length}</div>
                <div className="text-sm text-muted-foreground">Owners</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{moderators.length}</div>
                <div className="text-sm text-muted-foreground">Moderators</div>
              </div>
            </CardContent>
          </Card>

          {categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: any) => (
                    <span
                      key={category.slug}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {category.slug}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {organization.created && (
            <Card>
              <CardHeader>
                <CardTitle>Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">Created</div>
                  <div className="text-muted-foreground">
                    {new Date(organization.created).toLocaleDateString()}
                  </div>
                </div>
                {organization.refId && (
                  <div>
                    <div className="font-medium">ID</div>
                    <div className="text-muted-foreground font-mono text-xs">
                      {organization.refId}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
