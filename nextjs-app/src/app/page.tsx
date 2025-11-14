'use client';

import { useEffect, useState } from 'react';
import { PostsList } from '@/components/posts/PostsList';
import { PostForm } from '@/components/forms/PostForm';
import { useAuth } from '@/lib/hooks/useAuth';
import * as gateway from '@/lib/api/gateway';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await gateway.queryPosts({ orderBy: 'rank', take: 50 });
      setPosts(response.results || []);
    } catch (err: any) {
      console.error('Failed to load posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostDone = () => {
    setShowPostForm(false);
    loadPosts();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
          {isAuthenticated && !showPostForm && (
            <button
              onClick={() => setShowPostForm(true)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              + New Post
            </button>
          )}
          {showPostForm && (
            <button
              onClick={() => setShowPostForm(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              ✕ Close
            </button>
          )}
        </div>

        {showPostForm && (
          <div className="mb-6">
            <PostForm onDone={handlePostDone} />
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Loading posts...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PostsList posts={posts} />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Sponsored by:
                </h3>
                <a href="https://servicestack.net" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/img/logo-text.svg"
                    alt="ServiceStack"
                    className="w-full"
                  />
                </a>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
            <p className="text-blue-800">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
