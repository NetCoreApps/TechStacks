'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/api/auth'

export function Header() {
  const { user, isAuthenticated, signInWithGitHub, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TechStacks
          </span>
        </Link>

        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/tech"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Technologies
          </Link>
          <Link
            href="/stacks"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Stacks
          </Link>
          <Link
            href="/top"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Top
          </Link>
          {isAuthenticated && (
            <Link
              href="/favorites"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Favorites
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  {user.displayName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/users/${user.userName}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites">Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={signInWithGitHub}>
                Sign In
              </Button>
              <Button size="sm" onClick={signInWithGitHub}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
