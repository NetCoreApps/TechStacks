'use client';

import { use } from 'react';
import { TechnologyForm } from '@/components/forms/TechnologyForm';

export default function EditTechnologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <TechnologyForm slug={slug} />
      </div>
    </div>
  );
}
