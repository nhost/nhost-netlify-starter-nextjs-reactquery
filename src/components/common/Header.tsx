import {
  FeaturedConferencesQuery,
  useFeaturedConferencesQuery,
} from '@/utils/__generated__/graphql';
import { useAuthenticationStatus, useSignOut } from '@nhost/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

export function Header() {
  const {
    asPath,
    query: { conferenceSlug },
  } = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const { data, status } =
    useFeaturedConferencesQuery<FeaturedConferencesQuery>();

  const slug =
    status === 'success' ? data?.conferences[0].slug : conferenceSlug;

  return (
    <header className="sticky border-b bg-header border-b-brd">
      <div className="flex flex-row max-w-5xl p-4 mx-auto place-content-between">
        <Link href="/" passHref>
          <a className="self-center font-medium text-white text-md hover:underline">
            Conference Template
          </a>
        </Link>

        {slug && (
          <nav
            className="self-center hidden md:block"
            aria-label="Main navigation"
          >
            <ul className="grid items-center w-full grid-flow-col gap-2 text-sm font-medium list-none text-list">
              <li
                className={twMerge(
                  'hover:text-white',
                  asPath.endsWith(`/${slug}`) && 'text-white',
                )}
              >
                <Link href={`/conferences/${slug}`}>
                  <a className="px-2">Home</a>
                </Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white',
                  asPath.endsWith('/speakers') && 'text-white',
                )}
              >
                <Link href={`/conferences/${slug}/speakers`}>
                  <a className="px-2">Speakers</a>
                </Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white',
                  asPath.endsWith('/talks') && 'text-white',
                )}
              >
                <Link href={`/conferences/${slug}/talks`} passHref>
                  <a className="px-2">Talks</a>
                </Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white',
                  asPath.endsWith('/about') && 'text-white',
                )}
              >
                <Link href={`/conferences/${slug}/about`}>
                  <a className="px-2">About</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex">
          {isAuthenticated && (
            <div className="grid items-center grid-flow-col gap-2 md:gap-4">
              <Link href="/conferences" passHref>
                <a className="hidden px-2 py-1 text-xs text-list hover:underline md:block">
                  Manage Conferences
                </a>
              </Link>

              <Link href="/conferences" passHref>
                <a className="block px-2 py-1 text-xs text-list hover:underline md:hidden">
                  Manage
                </a>
              </Link>

              <button
                onClick={signOut}
                className="flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list"
              >
                Sign Out
              </button>
            </div>
          )}

          {!isAuthenticated && !isLoading && (
            <div className="grid items-center grid-flow-col gap-2 md:gap-4">
              <Link href="/conferences" passHref>
                <a className="hidden px-2 py-1 text-xs text-list hover:underline md:block">
                  Browse Conferences
                </a>
              </Link>

              <Link href="/conferences" passHref>
                <a className="block px-2 py-1 text-xs text-list hover:underline md:hidden">
                  Browse
                </a>
              </Link>

              <Link href="/sign-in" passHref>
                <a className="flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list">
                  Sign In
                </a>
              </Link>
            </div>
          )}

          {isLoading && <div className="w-16" />}
        </div>
      </div>
    </header>
  );
}
