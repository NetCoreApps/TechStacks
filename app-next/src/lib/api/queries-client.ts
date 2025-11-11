'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from './client'
import {
  GetTechnology,
  GetTechnologyStack,
  QueryTechnology,
  QueryTechStacks,
  GetTechnologyResponse,
  GetTechnologyStackResponse,
  QueryResponse,
  TechnologyView,
  TechnologyStackView,
  AddFavoriteTechnology,
  RemoveFavoriteTechnology,
  AddFavoriteTechStack,
  RemoveFavoriteTechStack,
  GetFavoriteTechnologies,
  GetFavoriteTechStack,
} from '@/lib/dtos'

// React Query hooks for client-side

export function useTechnology(slug: string) {
  return useQuery({
    queryKey: ['technology', slug],
    queryFn: async () => {
      const request = new GetTechnology({ slug })
      return await client.get(request)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useTechnologies(params?: {
  nameContains?: string
  vendorNameContains?: string
  skip?: number
  take?: number
  orderBy?: string
}) {
  return useQuery({
    queryKey: ['technologies', params],
    queryFn: async () => {
      const request = new QueryTechnology({
        nameContains: params?.nameContains,
        vendorNameContains: params?.vendorNameContains,
        skip: params?.skip || 0,
        take: params?.take || 50,
        orderBy: params?.orderBy || 'Name',
      })
      return await client.get(request)
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useTechnologyStack(slug: string) {
  return useQuery({
    queryKey: ['techstack', slug],
    queryFn: async () => {
      const request = new GetTechnologyStack({ slug })
      return await client.get(request)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useTechnologyStacks(params?: {
  nameContains?: string
  skip?: number
  take?: number
  orderBy?: string
}) {
  return useQuery({
    queryKey: ['techstacks', params],
    queryFn: async () => {
      const request = new QueryTechStacks({
        nameContains: params?.nameContains,
        skip: params?.skip || 0,
        take: params?.take || 50,
        orderBy: params?.orderBy || 'Name',
      })
      return await client.get(request)
    },
    staleTime: 2 * 60 * 1000,
  })
}

export function useTopTechnologies(take: number = 10) {
  return useQuery({
    queryKey: ['technologies', 'top', take],
    queryFn: async () => {
      const request = new QueryTechnology({
        take,
        orderByDesc: 'FavCount',
      })
      return await client.get(request)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useTopTechnologyStacks(take: number = 10) {
  return useQuery({
    queryKey: ['techstacks', 'top', take],
    queryFn: async () => {
      const request = new QueryTechStacks({
        take,
        orderByDesc: 'FavCount',
      })
      return await client.get(request)
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Favorite mutations

export function useAddFavoriteTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (technologyId: number) => {
      const request = new AddFavoriteTechnology({ technologyId })
      return await client.put(request)
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch
      queryClient.invalidateQueries({ queryKey: ['technology'] })
      queryClient.invalidateQueries({ queryKey: ['technologies'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavoriteTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (technologyId: number) => {
      const request = new RemoveFavoriteTechnology({ technologyId })
      return await client.delete(request)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technology'] })
      queryClient.invalidateQueries({ queryKey: ['technologies'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useAddFavoriteTechStack() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (technologyStackId: number) => {
      const request = new AddFavoriteTechStack({ technologyStackId })
      return await client.put(request)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techstack'] })
      queryClient.invalidateQueries({ queryKey: ['techstacks'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavoriteTechStack() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (technologyStackId: number) => {
      const request = new RemoveFavoriteTechStack({ technologyStackId })
      return await client.delete(request)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techstack'] })
      queryClient.invalidateQueries({ queryKey: ['techstacks'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

// Get user favorites

export function useFavoriteTechnologies() {
  return useQuery({
    queryKey: ['favorites', 'technologies'],
    queryFn: async () => {
      const request = new GetFavoriteTechnologies()
      return await client.get(request)
    },
    staleTime: 2 * 60 * 1000,
  })
}

export function useFavoriteTechStacks() {
  return useQuery({
    queryKey: ['favorites', 'techstacks'],
    queryFn: async () => {
      const request = new GetFavoriteTechStack()
      return await client.get(request)
    },
    staleTime: 2 * 60 * 1000,
  })
}
