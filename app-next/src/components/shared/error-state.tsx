import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  error?: Error | null
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  error,
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  const errorMessage =
    message || error?.message || 'An unexpected error occurred. Please try again.'

  return (
    <div className="container py-16">
      <Card className="max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function EmptyState({
  icon = '📭',
  title = 'No results found',
  message = 'Try adjusting your search or filters',
}: {
  icon?: string
  title?: string
  message?: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
