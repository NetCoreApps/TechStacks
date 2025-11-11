import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function FavoritesPage() {
  // Mock favorites - in real app, this would come from user's session
  const favoriteTechs = [
    { id: 1, name: 'React', tier: 'Frontend Library' },
    { id: 2, name: 'TypeScript', tier: 'Programming Language' },
    { id: 3, name: 'Next.js', tier: 'Frontend Framework' },
  ]

  const favoriteStacks = [
    { id: 1, name: 'Modern Web Stack', techCount: 8 },
    { id: 2, name: 'E-commerce Platform', techCount: 12 },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Favorites</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Technologies and stacks you&apos;ve favorited
        </p>
      </div>

      {favoriteTechs.length === 0 && favoriteStacks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Start exploring technologies and stacks, then favorite the ones you love to see them here!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {favoriteTechs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Favorite Technologies</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteTechs.map((tech) => (
                  <Card key={tech.id}>
                    <CardHeader>
                      <CardTitle>{tech.name}</CardTitle>
                      <CardDescription>{tech.tier}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {favoriteStacks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Favorite Stacks</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteStacks.map((stack) => (
                  <Card key={stack.id}>
                    <CardHeader>
                      <CardTitle>{stack.name}</CardTitle>
                      <CardDescription>{stack.techCount} technologies</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
