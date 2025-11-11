import { z } from 'zod'

export const stackSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  vendorName: z.string().max(100, 'Vendor name is too long').optional(),
  appUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  screenshotUrl: z.string().url('Invalid screenshot URL').or(z.literal('')).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  details: z.string().max(5000, 'Details are too long').optional(),
  technologyIds: z.array(z.number()).min(1, 'Please select at least one technology'),
})

export type StackFormValues = z.infer<typeof stackSchema>
