'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/lib/utils/routes';
import { useAppStore } from '@/lib/stores/useAppStore';

const TIER_TITLES: Record<string, string> = {
  'ProgrammingLanguage': 'Programming Languages',
  'Client': 'Client',
  'Http': 'HTTP',
  'Server': 'Server',
  'Data': 'Data',
  'SoftwareInfrastructure': 'Software Infrastructure',
  'OperatingSystem': 'Operating System',
  'HardwareInfrastructure': 'Hardware Infrastructure',
  'ThirdPartyServices': '3rd Party Services'
};

export default function TopPage() {
  const { overview, config } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Data is already loaded in the store
    if (overview && config) {
      setLoading(false);
    }
  }, [overview, config]);

  if (loading || !overview) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  const allTiers = config?.allTiers || [];
  const topTechnologies = overview?.topTechnologies || [];
  const topTechnologiesByTier = overview?.topTechnologiesByTier || {};

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 rounded-lg shadow-xl p-8 text-gray-900">
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Discover what technologies were used to create popular Websites and Apps, for example here's what{' '}
                  <Link href={routes.stack('techstacks')} className="text-primary-600 hover:underline font-semibold">
                    TechStacks was created
                  </Link>{' '}
                  with.
                </p>
                <p className="text-lg">
                  Missing your favorite Tech or TechStack? Sign-in to add it now!
                  and customize this page to see who else uses your favorite technology.
                </p>

                {/* Mobile App Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a href="https://github.com/ServiceStackApps/TechStacksApp" target="_blank" rel="noopener noreferrer">
                    <img src="/img/swift-logo.svg" alt="Swift" className="h-6" />
                  </a>
                  <a href="https://itunes.apple.com/us/app/webstacks/id1176797617?ls=1&mt=8" target="_blank" rel="noopener noreferrer">
                    <img src="/img/appstore-badge.png" alt="App Store" className="h-12" />
                  </a>
                  <a href="https://github.com/ServiceStackApps/TechStacksAndroidApp" target="_blank" rel="noopener noreferrer">
                    <img src="/img/java-logo.svg" alt="Java" className="h-10" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=servicestack.net.techstacks" target="_blank" rel="noopener noreferrer">
                    <img src="/img/en_app_rgb_wo_60.png" alt="Google Play" className="h-12" />
                  </a>
                  <a href="https://github.com/ServiceStackApps/TechStacksKotlinApp" target="_blank" rel="noopener noreferrer">
                    <img src="/img/kotlin-logo.svg" alt="Kotlin" className="h-6" />
                  </a>
                  <a href="https://github.com/ServiceStackApps/HelloMobile" target="_blank" rel="noopener noreferrer">
                    <img src="/img/csharp-logo.svg" alt="C#" className="h-10" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Technology Tiers Grid - Left Side (2/3) */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allTiers.map((tier: any) => {
                const tierTechs = topTechnologiesByTier[tier.name] || [];
                return (
                  <div key={tier.name} className="bg-white rounded-lg shadow overflow-hidden">
                    <Link href={`/tech?tier=${tier.name}`}>
                      <div className="bg-primary-600 text-white px-4 py-3">
                        <h3 className="font-semibold text-lg">
                          {TIER_TITLES[tier.name] || tier.title || tier.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="space-y-3">
                        {tierTechs.slice(0, 5).map((tech: any) => (
                          <div key={tech.id} className="flex items-center gap-3">
                            <div className="text-xl font-semibold text-gray-500 min-w-[50px]">
                              <em>({tech.stacksCount})</em>
                            </div>
                            <Link href={routes.tech(tech.slug)} className="flex-1">
                              {tech.logoUrl && (
                                <img
                                  src={tech.logoUrl}
                                  alt={tech.name}
                                  className="h-11 max-w-full object-contain hover:scale-105 transition-transform"
                                />
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                        <Link
                          href={`/tech?tier=${tier.name}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          view all →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Technologies Sidebar - Right Side (1/3) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow overflow-hidden sticky top-20">
              <Link href={routes.tech()}>
                <div className="bg-gray-700 text-white px-4 py-3">
                  <h3 className="font-semibold text-lg">Browse by Technology</h3>
                </div>
              </Link>
              <div className="p-4">
                <div className="space-y-3">
                  {topTechnologies.slice(0, 20).map((tech: any) => (
                    <div key={tech.id} className="text-lg">
                      <Link
                        href={routes.tech(tech.slug)}
                        className="text-gray-900 hover:text-primary-600 font-medium"
                      >
                        <em className="text-gray-600">({tech.stacksCount})</em> {tech.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
