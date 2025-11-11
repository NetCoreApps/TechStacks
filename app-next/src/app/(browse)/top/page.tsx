import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TopPage() {
  const topTechnologies = [
    { id: 1, name: 'React', votes: 1234, stacks: 567 },
    { id: 2, name: 'TypeScript', votes: 1156, stacks: 498 },
    { id: 3, name: 'Node.js', votes: 1089, stacks: 523 },
    { id: 4, name: 'PostgreSQL', votes: 945, stacks: 412 },
    { id: 5, name: 'Next.js', votes: 892, stacks: 356 },
  ]

  const topStacks = [
    { id: 1, name: 'Modern Web Stack', votes: 145, techCount: 8 },
    { id: 2, name: 'Serverless Stack', votes: 132, techCount: 6 },
    { id: 3, name: 'E-commerce Platform', votes: 128, techCount: 12 },
    { id: 4, name: 'Mobile-First Stack', votes: 98, techCount: 7 },
    { id: 5, name: 'Data Science Stack', votes: 87, techCount: 10 },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Top Technologies & Stacks</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Most popular technologies and stacks by the community
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-4">Top Technologies</h2>
          <div className="space-y-4">
            {topTechnologies.map((tech, index) => (
              <Card key={tech.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                        #{index + 1}
                      </div>
                      <CardTitle>{tech.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>❤️ {tech.votes} votes</span>
                    <span>🔧 {tech.stacks} stacks</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Top Stacks</h2>
          <div className="space-y-4">
            {topStacks.map((stack, index) => (
              <Card key={stack.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-lg font-bold text-purple-600">
                        #{index + 1}
                      </div>
                      <CardTitle>{stack.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>❤️ {stack.votes} votes</span>
                    <span>🔧 {stack.techCount} technologies</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
