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

  return (
    <header className="bg-header border-b-brd sticky border-b">
      <div className="place-content-between flex flex-row max-w-5xl p-4 mx-auto">
        <div className="flex w-48">
          <Link href="/">
            <a className="text-md self-center font-medium text-white">
              Conference Template
            </a>
          </Link>
        </div>

        {conferenceSlug && (
          <nav className="self-center" aria-label="Main navigation">
            <ul className="text-list max-w-[208px] w-full items-center grid grid-flow-col gap-2 text-sm font-medium list-none">
              <li
                className={twMerge(
                  'hover:text-white px-2 cursor-pointer',
                  asPath.endsWith(`/${conferenceSlug}`) && 'text-white',
                )}
              >
                <Link href={`/conferences/${conferenceSlug}`}>Conference</Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white px-2 cursor-pointer',
                  asPath.endsWith('/speakers') && 'text-white',
                )}
              >
                <Link href={`/conferences/${conferenceSlug}/speakers`}>
                  Speakers
                </Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white px-2 cursor-pointer',
                  asPath.endsWith('/talks') && 'text-white',
                )}
              >
                <Link href={`/conferences/${conferenceSlug}/talks`}>Talks</Link>
              </li>

              <li
                className={twMerge(
                  'hover:text-white px-2 cursor-pointer',
                  asPath.endsWith('/about') && 'text-white',
                )}
              >
                <Link href={`/conferences/${conferenceSlug}/about`}>About</Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex">
          {isAuthenticated && (
            <div className="grid items-center grid-flow-col gap-4">
              <Link href="/conferences" passHref>
                <a className="text-list hover:underline px-2 py-1 text-xs">
                  Manage Conferences
                </a>
              </Link>

              <button
                onClick={signOut}
                className="text-list hover:border-white hover:text-white border-list flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}

          {!isAuthenticated && !isLoading && (
            <Link href="/sign-in" passHref>
              <a className="text-list hover:border-white hover:text-white border-list flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md">
                Sign In
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
