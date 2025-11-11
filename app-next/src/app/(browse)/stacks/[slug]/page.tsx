import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function StackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Mock data for demonstration
  const stack = {
    name: 'Modern Web Stack',
    description: 'A comprehensive full-stack web development setup with React and Node.js',
    creator: 'TechCorp',
    favCount: 42,
    technologies: [
      { id: 1, name: 'React', tier: 'Frontend Library' },
      { id: 2, name: 'Next.js', tier: 'Frontend Framework' },
      { id: 3, name: 'TypeScript', tier: 'Programming Language' },
      { id: 4, name: 'Node.js', tier: 'Runtime' },
      { id: 5, name: 'PostgreSQL', tier: 'Database' },
      { id: 6, name: 'Tailwind CSS', tier: 'CSS Framework' },
      { id: 7, name: 'Vercel', tier: 'Hosting' },
      { id: 8, name: 'GitHub Actions', tier: 'CI/CD' },
    ],
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{stack.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              by {stack.creator}
            </p>
          </div>
          <Button size="lg">❤️ Favorite</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About This Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{stack.description}</p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {stack.technologies.map((tech) => (
                <Card key={tech.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <CardDescription>{tech.tier}</CardDescription>
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
                <div className="text-2xl font-bold">{stack.favCount}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stack.technologies.length}</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
