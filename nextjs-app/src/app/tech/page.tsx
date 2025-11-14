'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import * as gateway from '@/lib/api/gateway';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const response = await gateway.getAllTechnologies();
        setTechnologies(response.results || []);
      } catch (err) {
        console.error('Failed to load technologies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTechnologies();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading technologies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Technologies</h1>

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
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                    {tech.name}
                  </h3>
                  {tech.vendorName && (
                    <p className="text-sm text-gray-600">by {tech.vendorName}</p>
                  )}
                  {tech.description && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {tech.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
