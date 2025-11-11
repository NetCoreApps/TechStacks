'use client'

import { FavoriteButton } from '@/components/shared/favorite-button'

interface StackHeaderProps {
  name: string
  vendorName?: string
  id: number
  favCount: number
}

export function StackHeader({ name, vendorName, id, favCount }: StackHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
        {vendorName && <p className="text-lg text-muted-foreground mt-2">by {vendorName}</p>}
      </div>
      <FavoriteButton type="stack" itemId={id} initialCount={favCount} size="lg" />
    </div>
  )
}
