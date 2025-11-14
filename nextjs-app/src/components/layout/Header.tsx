'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import routes from '@/lib/utils/routes';

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, sessionInfo } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href={routes.home()} className="text-2xl font-bold hover:text-gray-300">
              TechStacks
            </Link>
            <Link href={routes.home()} className="text-sm text-gray-400 hover:text-gray-300">
              no noise, just tech!
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href={routes.home()}
              className={`px-4 py-2 rounded hover:bg-gray-800 ${
                isActive('/') ? 'bg-gray-800' : ''
              }`}
              title="Home (1 or H)"
            >
              Home
            </Link>
            <Link
              href={routes.top()}
              className={`px-4 py-2 rounded hover:bg-gray-800 ${
                isActive('/top') ? 'bg-gray-800' : ''
              }`}
              title="Top Technologies (2)"
            >
              Top
            </Link>
            <Link
              href={routes.stack()}
              className={`px-4 py-2 rounded hover:bg-gray-800 ${
                pathname?.startsWith('/stacks') ? 'bg-gray-800' : ''
              }`}
              title="Technology Stacks (3)"
            >
              Stacks
            </Link>
            <Link
              href={routes.tech()}
              className={`px-4 py-2 rounded hover:bg-gray-800 ${
                pathname?.startsWith('/tech') ? 'bg-gray-800' : ''
              }`}
              title="Technologies (4)"
            >
              Technologies
            </Link>
            {isAuthenticated && (
              <Link
                href={routes.favorites()}
                className={`px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive('/favorites') ? 'bg-gray-800' : ''
                }`}
                title="Favorites (5)"
              >
                Favorites
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center">
            {isAuthenticated && sessionInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:bg-gray-800 rounded px-2 py-1">
                  {sessionInfo.profileUrl && (
                    <img
                      src={sessionInfo.profileUrl}
                      alt={sessionInfo.displayName || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    {sessionInfo.userId && (
                      <Link
                        href={routes.user(sessionInfo.userId)}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    )}
                    <a href="/Identity/Account/Manage" className="block px-4 py-2 hover:bg-gray-700">
                      Account
                    </a>
                    <a href="/auth/logout" className="block px-4 py-2 hover:bg-gray-700">
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                href="/Identity/Account/Login"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
