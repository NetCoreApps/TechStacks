import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function CardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-5 w-2/3 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded mt-2" />
      </CardContent>
    </Card>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="h-10 w-64 bg-muted rounded animate-pulse mb-2" />
        <div className="h-6 w-96 bg-muted rounded animate-pulse" />
      </div>
      <div className="mb-6">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </div>
      <GridSkeleton />
    </div>
  )
}
