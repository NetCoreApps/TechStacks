'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import * as gateway from '@/lib/api/gateway';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppStore } from '@/lib/stores/useAppStore';

export default function TechStackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [stack, setStack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { favoriteTechStackIds, addFavoriteTechStack, removeFavoriteTechStack } =
    useAppStore();

  useEffect(() => {
    const loadStack = async () => {
      try {
        const data = await gateway.getTechnologyStack(slug);
        setStack(data.result);
      } catch (err) {
        console.error('Failed to load tech stack:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStack();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!stack) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Tech stack not found</p>
        </div>
      </div>
    );
  }

  const isFavorite = stack.id && favoriteTechStackIds.includes(stack.id);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      window.location.href = '/Identity/Account/Login';
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoriteTechStack(stack.id);
      } else {
        await addFavoriteTechStack(stack.id);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {stack.screenshotUrl && (
            <img
              src={stack.screenshotUrl}
              alt={stack.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">{stack.name}</h1>
                {stack.vendorName && (
                  <p className="text-lg text-gray-600 mt-2">by {stack.vendorName}</p>
                )}
                {stack.appUrl && (
                  <a
                    href={stack.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline mt-2 inline-block"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
              <button
                onClick={handleFavoriteToggle}
                className={`px-4 py-2 rounded ${
                  isFavorite
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isFavorite ? '★ Favorited' : '☆ Favorite'}
              </button>
            </div>

            {stack.description && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700">{stack.description}</p>
              </div>
            )}

            {stack.technologyChoices && stack.technologyChoices.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stack.technologyChoices.map((choice: any) => (
                    <div key={choice.technologyId} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        {choice.technology?.logoUrl && (
                          <img
                            src={choice.technology.logoUrl}
                            alt={choice.technology.name}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        <div className="flex-1">
                          <Link
                            href={routes.tech(choice.technology?.slug || '')}
                            className="font-semibold text-gray-900 hover:text-primary-600"
                          >
                            {choice.technology?.name}
                          </Link>
                          <p className="text-xs text-gray-600">{choice.tier}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
