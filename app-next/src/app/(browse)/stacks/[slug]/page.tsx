import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTechnologyStack } from '@/lib/api/queries-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function StackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let stackResponse
  try {
    stackResponse = await getTechnologyStack(slug)
  } catch (error) {
    notFound()
  }

  const stack = stackResponse.result

  if (!stack) {
    notFound()
  }

  const technologies = stack.technologyChoices || []

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{stack.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {stack.vendorName && `by ${stack.vendorName}`}
            </p>
          </div>
          <Button size="lg">❤️ Favorite</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About This Stack</CardTitle>
            </CardHeader>
            <CardContent>
              {stack.description ? (
                <p className="text-muted-foreground">{stack.description}</p>
              ) : (
                <p className="text-muted-foreground italic">No description available.</p>
              )}
              {stack.detailsHtml && (
                <div
                  className="prose prose-slate max-w-none mt-4"
                  dangerouslySetInnerHTML={{ __html: stack.detailsHtml }}
                />
              )}
            </CardContent>
          </Card>

          {technologies.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Technology Stack ({technologies.length} technologies)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {technologies.map((tech) => (
                  <Link key={tech.technologyId} href={`/tech/${tech.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{tech.name || 'Unknown'}</CardTitle>
                        <CardDescription>{tech.tier}</CardDescription>
                      </CardHeader>
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
                <div className="text-2xl font-bold">{stack.favCount || 0}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{technologies.length}</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stack.viewCount || 0}</div>
                <div className="text-sm text-muted-foreground">Page Views</div>
              </div>
            </CardContent>
          </Card>

          {stack.appUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={stack.appUrl} target="_blank" rel="noopener noreferrer">
                    Visit Application →
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {stack.createdBy && (
                <div>
                  <div className="font-medium">Created by</div>
                  <div className="text-muted-foreground">{stack.createdBy}</div>
                </div>
              )}
              {stack.created && (
                <div>
                  <div className="font-medium">Added</div>
                  <div className="text-muted-foreground">
                    {new Date(stack.created).toLocaleDateString()}
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
