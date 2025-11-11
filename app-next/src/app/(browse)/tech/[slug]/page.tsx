import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTechnology } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TechnologyHeader } from '@/components/technology/technology-header'

export const dynamic = 'force-dynamic'

export default async function TechDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let techResponse
  try {
    techResponse = await getTechnology(slug)
  } catch (error) {
    notFound()
  }

  const technology = techResponse.technology

  if (!technology) {
    notFound()
  }

  const relatedStacks = techResponse.technologyStacks || []

  return (
    <div className="container py-8">
      <div className="mb-8">
        <TechnologyHeader
          name={technology.name}
          tier={technology.tier}
          vendorName={technology.vendorName}
          id={technology.id!}
          favCount={technology.favCount || 0}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About {technology.name}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              {technology.description ? (
                <p>{technology.description}</p>
              ) : (
                <p className="text-muted-foreground italic">No description available.</p>
              )}
            </CardContent>
          </Card>

          {relatedStacks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Stacks using {technology.name} ({relatedStacks.length})
              </h2>
              <div className="grid gap-4">
                {relatedStacks.map((stack) => (
                  <Link key={stack.id} href={`/stacks/${stack.slug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle>{stack.name}</CardTitle>
                        <CardDescription>
                          {stack.vendorName && `by ${stack.vendorName}`}
                        </CardDescription>
                      </CardHeader>
                      {stack.description && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {stack.description}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{technology.favCount || 0}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{relatedStacks.length}</div>
                <div className="text-sm text-muted-foreground">Used in Stacks</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{technology.viewCount || 0}</div>
                <div className="text-sm text-muted-foreground">Page Views</div>
              </div>
            </CardContent>
          </Card>

          {technology.productUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href={technology.productUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website →
                  </a>
                </Button>
                {technology.vendorUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={technology.vendorUrl} target="_blank" rel="noopener noreferrer">
                      Vendor Site →
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {technology.createdBy && (
                <div>
                  <div className="font-medium">Created by</div>
                  <div className="text-muted-foreground">{technology.createdBy}</div>
                </div>
              )}
              {technology.created && (
                <div>
                  <div className="font-medium">Added</div>
                  <div className="text-muted-foreground">
                    {new Date(technology.created).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
