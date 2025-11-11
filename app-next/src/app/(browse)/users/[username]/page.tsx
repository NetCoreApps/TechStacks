import { notFound } from 'next/navigation'
import Link from 'next/link'
import { serverClient } from '@/lib/api/server'
import { GetUserInfo } from '@/lib/dtos'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  let userResponse
  try {
    const request = new GetUserInfo({ userName: username })
    userResponse = await serverClient.get(request)
  } catch (error) {
    notFound()
  }

  if (!userResponse.userName) {
    notFound()
  }

  const techStacks = userResponse.techStacks || []
  const favoriteTechStacks = userResponse.favoriteTechStacks || []
  const favoriteTechnologies = userResponse.favoriteTechnologies || []

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-start gap-6">
        {userResponse.avatarUrl && (
          <img
            src={userResponse.avatarUrl}
            alt={userResponse.userName}
            className="h-24 w-24 rounded-full border-4 border-border"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{userResponse.userName}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Member since {new Date(userResponse.created).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {techStacks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Created Stacks ({techStacks.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStacks.map((stack) => (
                <Link key={stack.id} href={`/stacks/${stack.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{stack.name}</CardTitle>
                      <CardDescription>
                        {stack.description && stack.description.substring(0, 100)}
                        {stack.description && stack.description.length > 100 && '...'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>❤️ {stack.favCount || 0}</span>
                        <span>👁️ {stack.viewCount || 0}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {favoriteTechStacks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Favorite Stacks ({favoriteTechStacks.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTechStacks.map((stack) => (
                <Link key={stack.id} href={`/stacks/${stack.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{stack.name}</CardTitle>
                      <CardDescription>
                        {stack.description && stack.description.substring(0, 100)}
                        {stack.description && stack.description.length > 100 && '...'}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {favoriteTechnologies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Favorite Technologies ({favoriteTechnologies.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTechnologies.map((tech) => (
                <Link key={tech.id} href={`/tech/${tech.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{tech.name}</CardTitle>
                      <CardDescription>{tech.tier}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {techStacks.length === 0 &&
          favoriteTechStacks.length === 0 &&
          favoriteTechnologies.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-semibold mb-2">No activity yet</h3>
                <p className="text-muted-foreground">
                  This user hasn&apos;t created any stacks or favorited anything yet.
                </p>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  )
}
