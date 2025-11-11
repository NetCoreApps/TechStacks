import { z } from 'zod'
import { TechnologyTier } from '@/lib/dtos'

export const technologySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  vendorName: z.string().max(100, 'Vendor name is too long').optional(),
  vendorUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  productUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  logoUrl: z.string().url('Invalid logo URL').or(z.literal('')).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  tier: z.nativeEnum(TechnologyTier, {
    required_error: 'Please select a tier',
  }),
})

export type TechnologyFormValues = z.infer<typeof technologySchema>
