import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function TechDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Mock data for demonstration
  const technology = {
    name: 'React',
    tier: 'Frontend Library',
    vendor: 'Meta',
    description: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
    website: 'https://react.dev',
    favCount: 1234,
    stackCount: 567,
  }

  const relatedStacks = [
    { id: 1, name: 'Modern Web Stack', techCount: 8 },
    { id: 2, name: 'E-commerce Platform', techCount: 12 },
    { id: 3, name: 'SaaS Starter', techCount: 10 },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{technology.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {technology.tier} by {technology.vendor}
            </p>
          </div>
          <Button size="lg">❤️ Favorite</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About {technology.name}</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>{technology.description}</p>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Stacks using {technology.name}</h2>
            <div className="grid gap-4">
              {relatedStacks.map((stack) => (
                <Card key={stack.id}>
                  <CardHeader>
                    <CardTitle>{stack.name}</CardTitle>
                    <CardDescription>{stack.techCount} technologies</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{technology.favCount}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{technology.stackCount}</div>
                <div className="text-sm text-muted-foreground">Used in Stacks</div>
              </div>
              {technology.website && (
                <div className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={technology.website} target="_blank" rel="noopener noreferrer">
                      Visit Website →
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
