export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TechStacks
        </h1>
        <p className="text-lg text-gray-600">
          Next.js 16 Migration - Phase 1: Foundation Complete
        </p>
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Migration Progress</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Next.js 16 setup complete
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              TypeScript configuration
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tailwind CSS v4 configured
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              API client and gateway layer
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Zustand store for state management
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Authentication hooks and provider
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              UI component library (pending)
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              Page components (pending)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
