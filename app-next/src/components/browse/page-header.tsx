'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/api/auth'

interface PageHeaderProps {
  title: string
  description: string
  createHref?: string
  createLabel?: string
}

export function PageHeader({ title, description, createHref, createLabel }: PageHeaderProps) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{description}</p>
      </div>
      {isAuthenticated && createHref && (
        <Button asChild>
          <Link href={createHref}>{createLabel || 'Create'}</Link>
        </Button>
      )}
    </div>
  )
}
