import { useSignOut, useUserEmail } from '@nhost/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Header() {
  const { asPath } = useRouter();
  const userEmail = useUserEmail();
  const { signOut } = useSignOut();

  return (
    <header className="bg-header border-b-brd sticky border-b">
      <div className="place-content-between flex flex-row max-w-5xl py-4 mx-auto">
        <div className="flex w-48">
          <Link href="/">
            <a className="text-md self-center text-white cursor-pointer">
              Conference Starter
            </a>
          </Link>
        </div>
        <div className="text-list w-52 flex flex-row self-center space-x-2 text-sm font-medium list-none">
          <li
            className={clsx(
              'hover:text-white py-1 px-2 cursor-pointer',
              asPath === '/speakers' && 'text-white',
            )}
          >
            <Link href="speakers">Speakers</Link>
          </li>
          <li
            className={clsx(
              'hover:text-white py-1 px-2 cursor-pointer',
              asPath === '/talks' && 'text-white',
            )}
          >
            <Link href="talks">Talks</Link>
          </li>
          <li
            className={clsx(
              'hover:text-white py-1 px-2 cursor-pointer',
              asPath === '/about' && 'text-white',
            )}
          >
            <Link href="about">About</Link>
          </li>
        </div>
        <div className="flex w-48">
          {userEmail ? (
            <div className="flex flex-row space-x-4">
              <Link href="/dashboard">
                <button className="text-list px-2 py-1 text-xs cursor-pointer">
                  {userEmail}
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="text-list border-list px-2 py-1 text-xs border rounded-md cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="signin">
              <button className="border text-xs py-1.5 text-list hover:border-white hover:text-white transition-colors duration-200 border-list rounded-md flex w-full items-center justify-center">
                Organizer Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
