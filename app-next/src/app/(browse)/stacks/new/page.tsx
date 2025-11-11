'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stackSchema, type StackFormValues } from '@/lib/validations/stack'
import { client } from '@/lib/api/client'
import { CreateTechnologyStack, QueryTechnology } from '@/lib/dtos'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/api/auth'

export default function NewStackPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [technologies, setTechnologies] = useState<Array<{ id: number; name: string }>>([])
  const [selectedTechIds, setSelectedTechIds] = useState<number[]>([])
  const [techSearch, setTechSearch] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StackFormValues>({
    resolver: zodResolver(stackSchema),
    defaultValues: {
      technologyIds: [],
    },
  })

  // Load technologies for selection
  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const request = new QueryTechnology({
          take: 100,
          orderBy: 'Name',
        })
        const response = await client.get(request)
        if (response.results) {
          setTechnologies(
            response.results.map((tech) => ({
              id: tech.id!,
              name: tech.name,
            }))
          )
        }
      } catch (err) {
        console.error('Failed to load technologies:', err)
      }
    }
    loadTechnologies()
  }, [])

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/github')
    return null
  }

  const toggleTechnology = (techId: number) => {
    const newSelection = selectedTechIds.includes(techId)
      ? selectedTechIds.filter((id) => id !== techId)
      : [...selectedTechIds, techId]

    setSelectedTechIds(newSelection)
    setValue('technologyIds', newSelection, { shouldValidate: true })
  }

  const filteredTechnologies = techSearch
    ? technologies.filter((tech) =>
        tech.name.toLowerCase().includes(techSearch.toLowerCase())
      )
    : technologies

  const onSubmit = async (data: StackFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const request = new CreateTechnologyStack({
        ...data,
        isLocked: false,
        technologyIds: selectedTechIds,
      })
      const response = await client.post(request)

      if (response.result) {
        router.push(`/stacks/${response.result.slug}`)
      }
    } catch (err: any) {
      setError(err.responseStatus?.message || 'Failed to create stack')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Create Technology Stack</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Share your technology stack with the community
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>General details about your stack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Stack Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" {...register('name')} placeholder="Modern Web Stack" />
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
                placeholder="modern-web-stack"
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
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="A comprehensive full-stack web development setup..."
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendorName">Organization/Vendor Name</Label>
                <Input
                  id="vendorName"
                  {...register('vendorName')}
                  placeholder="Acme Corp"
                />
                {errors.vendorName && (
                  <p className="text-sm text-destructive">{errors.vendorName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="appUrl">Application URL</Label>
                <Input
                  id="appUrl"
                  {...register('appUrl')}
                  placeholder="https://example.com"
                  type="url"
                />
                {errors.appUrl && (
                  <p className="text-sm text-destructive">{errors.appUrl.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenshotUrl">Screenshot URL</Label>
              <Input
                id="screenshotUrl"
                {...register('screenshotUrl')}
                placeholder="https://example.com/screenshot.png"
                type="url"
              />
              {errors.screenshotUrl && (
                <p className="text-sm text-destructive">{errors.screenshotUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                {...register('details')}
                placeholder="Detailed information about your stack, architecture, and design decisions..."
                rows={6}
              />
              {errors.details && (
                <p className="text-sm text-destructive">{errors.details.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                You can use Markdown formatting here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
            <CardDescription>
              Select the technologies used in your stack{' '}
              <span className="text-destructive">*</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="techSearch">Search Technologies</Label>
              <Input
                id="techSearch"
                value={techSearch}
                onChange={(e) => setTechSearch(e.target.value)}
                placeholder="Search by name..."
              />
            </div>

            {selectedTechIds.length > 0 && (
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium mb-2">
                  Selected: {selectedTechIds.length}{' '}
                  {selectedTechIds.length === 1 ? 'technology' : 'technologies'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedTechIds.map((id) => {
                    const tech = technologies.find((t) => t.id === id)
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleTechnology(id)}
                        className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        {tech?.name}
                        <span>×</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
                {filteredTechnologies.map((tech) => (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => toggleTechnology(tech.id)}
                    className={`rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      selectedTechIds.includes(tech.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>

            {errors.technologyIds && (
              <p className="text-sm text-destructive">{errors.technologyIds.message}</p>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Stack'}
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
