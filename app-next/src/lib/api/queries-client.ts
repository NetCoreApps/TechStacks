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
