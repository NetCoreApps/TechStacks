'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { technologySchema, type TechnologyFormValues } from '@/lib/validations/technology'
import { client } from '@/lib/api/client'
import { CreateTechnology, TechnologyTier } from '@/lib/dtos'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/lib/api/auth'

export default function NewTechnologyPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      tier: TechnologyTier.ProgrammingLanguage,
    },
  })

  const tierValue = watch('tier')

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/github')
    return null
  }

  const onSubmit = async (data: TechnologyFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const request = new CreateTechnology({
        ...data,
        isLocked: false,
      })
      const response = await client.post(request)

      if (response.result) {
        router.push(`/tech/${response.result.slug}`)
      }
    } catch (err: any) {
      setError(err.responseStatus?.message || 'Failed to create technology')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Create Technology</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Add a new technology to the TechStacks database
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technology Details</CardTitle>
          <CardDescription>
            Fill in the information about the technology you&apos;re adding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" {...register('name')} placeholder="React" />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="react"
                className="font-mono"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                URL-friendly identifier (lowercase, numbers, hyphens only)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier">
                Tier <span className="text-destructive">*</span>
              </Label>
              <Select
                value={tierValue}
                onValueChange={(value) => setValue('tier', value as TechnologyTier)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TechnologyTier.ProgrammingLanguage}>
                    Programming Language
                  </SelectItem>
                  <SelectItem value={TechnologyTier.Client}>Client</SelectItem>
                  <SelectItem value={TechnologyTier.Http}>HTTP</SelectItem>
                  <SelectItem value={TechnologyTier.Server}>Server</SelectItem>
                  <SelectItem value={TechnologyTier.Data}>Data</SelectItem>
                  <SelectItem value={TechnologyTier.SoftwareInfrastructure}>
                    Software Infrastructure
                  </SelectItem>
                  <SelectItem value={TechnologyTier.OperatingSystem}>
                    Operating System
                  </SelectItem>
                  <SelectItem value={TechnologyTier.HardwareInfrastructure}>
                    Hardware Infrastructure
                  </SelectItem>
                  <SelectItem value={TechnologyTier.ThirdPartyServices}>
                    Third Party Services
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.tier && (
                <p className="text-sm text-destructive">{errors.tier.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="A JavaScript library for building user interfaces..."
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input
                  id="vendorName"
                  {...register('vendorName')}
                  placeholder="Meta"
                />
                {errors.vendorName && (
                  <p className="text-sm text-destructive">{errors.vendorName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendorUrl">Vendor URL</Label>
                <Input
                  id="vendorUrl"
                  {...register('vendorUrl')}
                  placeholder="https://meta.com"
                  type="url"
                />
                {errors.vendorUrl && (
                  <p className="text-sm text-destructive">{errors.vendorUrl.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="productUrl">Product URL</Label>
                <Input
                  id="productUrl"
                  {...register('productUrl')}
                  placeholder="https://react.dev"
                  type="url"
                />
                {errors.productUrl && (
                  <p className="text-sm text-destructive">{errors.productUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  {...register('logoUrl')}
                  placeholder="https://example.com/logo.png"
                  type="url"
                />
                {errors.logoUrl && (
                  <p className="text-sm text-destructive">{errors.logoUrl.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Technology'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
