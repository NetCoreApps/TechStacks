'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import * as gateway from '@/lib/api/gateway';

export default function TechStacksPage() {
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStacks = async () => {
      try {
        const response = await gateway.getAllTechStacks();
        setStacks(response.results || []);
      } catch (err) {
        console.error('Failed to load tech stacks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStacks();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading tech stacks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Technology Stacks</h1>

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
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                  {stack.name}
                </h3>
                {stack.vendorName && (
                  <p className="text-sm text-gray-600 mt-1">by {stack.vendorName}</p>
                )}
                {stack.description && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                    {stack.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
