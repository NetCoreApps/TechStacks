'use client'

import { FavoriteButton } from '@/components/shared/favorite-button'

interface TechnologyHeaderProps {
  name: string
  tier?: string
  vendorName?: string
  id: number
  favCount: number
}

export function TechnologyHeader({
  name,
  tier,
  vendorName,
  id,
  favCount,
}: TechnologyHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {tier}
          {vendorName && ` by ${vendorName}`}
        </p>
      </div>
      <FavoriteButton type="technology" itemId={id} initialCount={favCount} size="lg" />
    </div>
  )
}
