import { z } from 'zod'

export const organizationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(50, 'Slug must be 50 characters or less')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be 500 characters or less'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color').optional(),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color').optional(),
  linkColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color').optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color')
    .optional(),
  backgroundUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  logoUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  heroUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  lang: z.string().max(10).optional(),
})

export type OrganizationFormValues = z.infer<typeof organizationSchema>
