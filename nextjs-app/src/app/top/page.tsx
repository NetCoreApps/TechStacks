'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import * as gateway from '@/lib/api/gateway';

export default function TopPage() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopTechnologies = async () => {
      try {
        const response = await gateway.queryTechnology({
          orderBy: '-favCount,-viewCount',
          take: 100,
        });
        setTechnologies(response.results || []);
      } catch (err) {
        console.error('Failed to load top technologies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTopTechnologies();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading top technologies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Top Technologies</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technology
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Favorites
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technologies.map((tech: any, index: number) => (
                <tr key={tech.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {tech.logoUrl && (
                        <img
                          src={tech.logoUrl}
                          alt={tech.name}
                          className="w-10 h-10 object-contain mr-3"
                        />
                      )}
                      <Link
                        href={routes.tech(tech.slug)}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600"
                      >
                        {tech.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tech.vendorName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {tech.favCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {tech.viewCount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
