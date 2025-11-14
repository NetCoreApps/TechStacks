'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import * as gateway from '@/lib/api/gateway';

interface PostFormProps {
  onDone?: () => void;
}

export function PostForm({ onDone }: PostFormProps) {
  const router = useRouter();
  const isAuthenticated = useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    type: 'Announcement',
    title: '',
    url: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await gateway.createPost(formData, undefined);
      if (onDone) {
        onDone();
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.responseStatus?.message || err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Please sign in to create a post</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Create New Post</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2"
          >
            <option value="Announcement">Announcement</option>
            <option value="Post">Post</option>
            <option value="Showcase">Showcase</option>
            <option value="Question">Question</option>
            <option value="Request">Request</option>
          </select>
        </div>

        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={200}
        />

        <Input
          label="URL (optional)"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          maxLength={500}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2"
          />
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button type="button" variant="outline" onClick={() => onDone && onDone()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
