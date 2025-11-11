'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GridSkeleton } from '@/components/shared/loading-skeleton'
import { useFavoriteTechnologies, useFavoriteTechStacks } from '@/lib/api/queries-client'
import { useAuth } from '@/lib/api/auth'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
  const { isAuthenticated, signInWithGitHub } = useAuth()
  const { data: techResponse, isLoading: techLoading } = useFavoriteTechnologies()
  const { data: stackResponse, isLoading: stackLoading } = useFavoriteTechStacks()

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Sign in to view favorites</h3>
            <p className="text-muted-foreground mb-6">
              You need to sign in to view your favorite technologies and stacks.
            </p>
            <Button onClick={signInWithGitHub} size="lg">
              Sign in with GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (techLoading || stackLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Favorites</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Technologies and stacks you&apos;ve favorited
          </p>
        </div>
        <GridSkeleton />
      </div>
    )
  }

  const favoriteTechs = techResponse?.results || []
  const favoriteStacks = stackResponse?.results || []

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
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Start exploring technologies and stacks, then favorite the ones you love to see them
              here!
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/tech">Browse Technologies</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/stacks">Browse Stacks</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {favoriteTechs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Favorite Technologies ({favoriteTechs.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteTechs.map((tech) => (
                  <Link key={tech.id} href={`/tech/${tech.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle>{tech.name}</CardTitle>
                        <CardDescription>
                          {tech.tier || 'Technology'}
                          {tech.vendorName && ` by ${tech.vendorName}`}
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
            </div>
          )}

          {favoriteStacks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Favorite Stacks ({favoriteStacks.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteStacks.map((stack) => (
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
            </div>
          )}
        </div>
      )}
    </div>
  )
}
