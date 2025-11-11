'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/api/auth'
import {
  useAddFavoriteTechnology,
  useRemoveFavoriteTechnology,
  useAddFavoriteTechStack,
  useRemoveFavoriteTechStack,
} from '@/lib/api/queries-client'

interface FavoriteButtonProps {
  type: 'technology' | 'stack'
  itemId: number
  initialFavorited?: boolean
  initialCount?: number
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function FavoriteButton({
  type,
  itemId,
  initialFavorited = false,
  initialCount = 0,
  size = 'default',
  variant = 'outline',
}: FavoriteButtonProps) {
  const { isAuthenticated, signInWithGitHub } = useAuth()
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [favCount, setFavCount] = useState(initialCount)

  const addTechMutation = useAddFavoriteTechnology()
  const removeTechMutation = useRemoveFavoriteTechnology()
  const addStackMutation = useAddFavoriteTechStack()
  const removeStackMutation = useRemoveFavoriteTechStack()

  const handleClick = async () => {
    if (!isAuthenticated) {
      signInWithGitHub()
      return
    }

    // Optimistic update
    const newFavorited = !isFavorited
    setIsFavorited(newFavorited)
    setFavCount((prev) => (newFavorited ? prev + 1 : prev - 1))

    try {
      if (type === 'technology') {
        if (newFavorited) {
          await addTechMutation.mutateAsync(itemId)
        } else {
          await removeTechMutation.mutateAsync(itemId)
        }
      } else {
        if (newFavorited) {
          await addStackMutation.mutateAsync(itemId)
        } else {
          await removeStackMutation.mutateAsync(itemId)
        }
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsFavorited(!newFavorited)
      setFavCount((prev) => (newFavorited ? prev - 1 : prev + 1))
      console.error('Failed to update favorite:', error)
    }
  }

  const isPending =
    addTechMutation.isPending ||
    removeTechMutation.isPending ||
    addStackMutation.isPending ||
    removeStackMutation.isPending

  return (
    <Button
      variant={isFavorited ? 'default' : variant}
      size={size}
      onClick={handleClick}
      disabled={isPending}
      className="gap-2"
    >
      <Heart
        className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
        aria-hidden="true"
      />
      <span>{favCount}</span>
      <span className="sr-only">{isFavorited ? 'Unfavorite' : 'Favorite'}</span>
    </Button>
  )
}
