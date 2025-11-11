'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/api/auth'
import { client } from '@/lib/api/client'
import { CreateOrganization } from '@/lib/dtos'
import { organizationSchema, type OrganizationFormValues } from '@/lib/validations/organization'
import { useState } from 'react'

export default function NewOrganizationPage() {
  const router = useRouter()
  const { isAuthenticated, signInWithGitHub } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  })

  // Auto-generate slug from name
  const name = watch('name')
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue('name', value)
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setValue('slug', slug)
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Sign in required</h3>
            <p className="text-muted-foreground mb-6">
              You need to sign in to create an organization.
            </p>
            <Button onClick={signInWithGitHub} size="lg">
              Sign in with GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const onSubmit = async (data: OrganizationFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const request = new CreateOrganization({
        name: data.name,
        slug: data.slug,
        description: data.description,
        refSource: 'web',
        refUrn: '',
      })

      const response = await client.post(request)

      if (response.id) {
        router.push(`/organizations/${data.slug}`)
      }
    } catch (err: any) {
      setError(err.responseStatus?.message || 'Failed to create organization. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Create Organization</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Start a new community for developers to collaborate and share technologies
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Choose a name and description for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name *</Label>
              <Input
                id="name"
                placeholder="Acme Inc"
                {...register('name')}
                onChange={handleNameChange}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                placeholder="acme-inc"
                {...register('slug')}
                className="font-mono"
              />
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /organizations/{watch('slug') || 'your-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="A brief description of your organization..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
