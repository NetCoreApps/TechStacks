import { serverClient } from './server'
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

// Server-side data fetching for RSC

export async function getTechnology(slug: string): Promise<GetTechnologyResponse> {
  const request = new GetTechnology({ slug })
  return await serverClient.get(request)
}

export async function getTechnologies(params?: {
  nameContains?: string
  vendorNameContains?: string
  skip?: number
  take?: number
  orderBy?: string
}): Promise<QueryResponse<TechnologyView>> {
  const request = new QueryTechnology({
    nameContains: params?.nameContains,
    vendorNameContains: params?.vendorNameContains,
    skip: params?.skip || 0,
    take: params?.take || 50,
    orderBy: params?.orderBy || 'Name',
  })
  return await serverClient.get(request)
}

export async function getTechnologyStack(slug: string): Promise<GetTechnologyStackResponse> {
  const request = new GetTechnologyStack({ slug })
  return await serverClient.get(request)
}

export async function getTechnologyStacks(params?: {
  nameContains?: string
  skip?: number
  take?: number
  orderBy?: string
}): Promise<QueryResponse<TechnologyStackView>> {
  const request = new QueryTechStacks({
    nameContains: params?.nameContains,
    skip: params?.skip || 0,
    take: params?.take || 50,
    orderBy: params?.orderBy || 'Name',
  })
  return await serverClient.get(request)
}

// Helper to get top technologies by favorites
export async function getTopTechnologies(
  take: number = 10
): Promise<QueryResponse<TechnologyView>> {
  const request = new QueryTechnology({
    take,
    orderByDesc: 'FavCount',
  })
  return await serverClient.get(request)
}

// Helper to get top stacks by favorites
export async function getTopTechnologyStacks(
  take: number = 10
): Promise<QueryResponse<TechnologyStackView>> {
  const request = new QueryTechStacks({
    take,
    orderByDesc: 'FavCount',
  })
  return await serverClient.get(request)
}
