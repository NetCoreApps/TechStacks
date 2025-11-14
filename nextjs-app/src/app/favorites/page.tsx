'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import { useAppStore } from '@/lib/stores/useAppStore';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import * as gateway from '@/lib/api/gateway';

export default function FavoritesPage() {
  const isAuthenticated = useRequireAuth();
  const { favoriteTechnologyIds, favoriteTechStackIds } = useAppStore();
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [stacks, setStacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadFavorites = async () => {
      try {
        const [techResponse, stacksResponse] = await Promise.all([
          favoriteTechnologyIds.length > 0
            ? gateway.queryTechnology({
                ids: favoriteTechnologyIds.join(','),
              })
            : Promise.resolve({ results: [] }),
          favoriteTechStackIds.length > 0
            ? gateway.queryTechStacks({
                ids: favoriteTechStackIds.join(','),
              })
            : Promise.resolve({ results: [] }),
        ]);

        setTechnologies(techResponse.results || []);
        setStacks(stacksResponse.results || []);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, favoriteTechnologyIds, favoriteTechStackIds]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading favorites...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Favorites</h1>

        <div className="space-y-8">
          {/* Favorite Technologies */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Technologies ({technologies.length})
            </h2>
            {technologies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech: any) => (
                  <Link
                    key={tech.id}
                    href={routes.tech(tech.slug)}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start gap-4">
                      {tech.logoUrl && (
                        <img
                          src={tech.logoUrl}
                          alt={tech.name}
                          className="w-16 h-16 object-contain"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tech.name}
                        </h3>
                        {tech.vendorName && (
                          <p className="text-sm text-gray-600">{tech.vendorName}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No favorite technologies yet.</p>
            )}
          </div>

          {/* Favorite Tech Stacks */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Tech Stacks ({stacks.length})
            </h2>
            {stacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stacks.map((stack: any) => (
                  <Link
                    key={stack.id}
                    href={routes.stack(stack.slug)}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {stack.screenshotUrl && (
                      <img
                        src={stack.screenshotUrl}
                        alt={stack.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {stack.name}
                      </h3>
                      {stack.vendorName && (
                        <p className="text-sm text-gray-600">{stack.vendorName}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No favorite tech stacks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
