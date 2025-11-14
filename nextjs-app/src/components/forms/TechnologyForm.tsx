'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import { useAppStore } from '@/lib/stores/useAppStore';
import * as gateway from '@/lib/api/gateway';
import routes from '@/lib/utils/routes';

interface TechnologyFormProps {
  slug?: string;
  onDone?: () => void;
}

export function TechnologyForm({ slug, onDone }: TechnologyFormProps) {
  const router = useRouter();
  const isAuthenticated = useRequireAuth();
  const { config } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    slug: '',
    vendorName: '',
    description: '',
    productUrl: '',
    vendorUrl: '',
    tier: '',
    isLocked: false,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');

  const isUpdate = !!slug;

  useEffect(() => {
    if (slug && isAuthenticated) {
      loadTechnology();
    }
  }, [slug, isAuthenticated]);

  const loadTechnology = async () => {
    try {
      setLoading(true);
      const tech = await gateway.getTechnology(slug!);
      setFormData({
        id: tech.id,
        name: tech.name,
        slug: tech.slug,
        vendorName: tech.vendorName || '',
        description: tech.description || '',
        productUrl: tech.productUrl || '',
        vendorUrl: tech.vendorUrl || '',
        tier: tech.tier || '',
        isLocked: tech.isLocked || false,
      });
      if (tech.logoUrl) {
        setLogoPreview(tech.logoUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load technology');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from name for new technologies
    if (name === 'name' && !isUpdate) {
      const slugValue = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: slugValue }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isUpdate) {
        await gateway.updateTechnology(formData, logoFile || undefined);
      } else {
        await gateway.createTechnology(formData, logoFile || undefined);
      }

      if (onDone) {
        onDone();
      } else {
        router.push(routes.tech(formData.slug));
      }
    } catch (err: any) {
      setError(err.responseStatus?.message || err.message || 'Failed to save technology');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this technology?')) return;

    try {
      setLoading(true);
      await gateway.deleteTechnology(formData.id);
      router.push(routes.tech());
    } catch (err: any) {
      setError(err.message || 'Failed to delete technology');
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Authentication is required</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        {isUpdate ? 'Edit Technology' : 'Add New Technology'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Technology Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled={isUpdate}
              maxLength={100}
            />

            <Input
              label="Vendor Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
              maxLength={100}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                required
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2"
              >
                <option value="">Select a category</option>
                {config?.allTiers?.map((tier: any) => (
                  <option key={tier.name} value={tier.name}>
                    {tier.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (minimum 150 x 100)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {logoPreview && (
                <div className="mt-4">
                  <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-32 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            maxLength={1000}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">{formData.description.length}/1000</p>
        </div>

        <Input
          label="Product URL"
          name="productUrl"
          type="url"
          value={formData.productUrl}
          onChange={handleChange}
          required
          maxLength={200}
        />

        <Input
          label="Vendor URL"
          name="vendorUrl"
          type="url"
          value={formData.vendorUrl}
          onChange={handleChange}
          maxLength={200}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isLocked"
            checked={formData.isLocked}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 rounded border-gray-300"
          />
          <label className="ml-2 text-sm text-gray-700">
            Prevent others from editing this Technology?
          </label>
        </div>

        <div className="flex gap-4 justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => onDone ? onDone() : router.back()}
          >
            Cancel
          </Button>

          <div className="flex gap-4">
            {isUpdate && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isUpdate ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
