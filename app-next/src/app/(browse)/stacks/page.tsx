import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function StacksPage() {
  // Temporary mock data for layout demonstration
  const mockStacks = [
    {
      id: 1,
      name: 'Modern Web Stack',
      description: 'Full-stack web development with React and Node.js',
      techCount: 8,
      favCount: 42,
    },
    {
      id: 2,
      name: 'Serverless Stack',
      description: 'Cloud-native serverless architecture',
      techCount: 6,
      favCount: 31,
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      description: 'Scalable e-commerce technology stack',
      techCount: 12,
      favCount: 58,
    },
    {
      id: 4,
      name: 'Mobile-First Stack',
      description: 'Cross-platform mobile development',
      techCount: 7,
      favCount: 26,
    },
    {
      id: 5,
      name: 'Data Science Stack',
      description: 'Machine learning and data analysis',
      techCount: 10,
      favCount: 39,
    },
    {
      id: 6,
      name: 'DevOps Pipeline',
      description: 'Complete CI/CD infrastructure',
      techCount: 9,
      favCount: 45,
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Technology Stacks</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore complete technology stacks from successful companies
        </p>
      </div>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Search stacks..."
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockStacks.map((stack) => (
          <Card key={stack.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{stack.name}</CardTitle>
              <CardDescription>{stack.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>🔧 {stack.techCount} technologies</span>
                <span>❤️ {stack.favCount} favorites</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
