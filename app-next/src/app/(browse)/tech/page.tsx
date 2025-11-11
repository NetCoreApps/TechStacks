import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TechPage() {
  // Temporary mock data for layout demonstration
  const mockTechnologies = [
    { id: 1, name: 'React', tier: 'Frontend Library', description: 'A JavaScript library for building user interfaces' },
    { id: 2, name: 'Next.js', tier: 'Frontend Framework', description: 'The React Framework for Production' },
    { id: 3, name: 'TypeScript', tier: 'Programming Language', description: 'Typed superset of JavaScript' },
    { id: 4, name: 'Node.js', tier: 'Runtime', description: 'JavaScript runtime built on Chrome\'s V8 engine' },
    { id: 5, name: 'PostgreSQL', tier: 'Database', description: 'Open source relational database' },
    { id: 6, name: 'Tailwind CSS', tier: 'CSS Framework', description: 'A utility-first CSS framework' },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Technologies</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse and discover technologies used by top companies
        </p>
      </div>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Search technologies..."
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockTechnologies.map((tech) => (
          <Card key={tech.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{tech.name}</CardTitle>
              <CardDescription>{tech.tier}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
