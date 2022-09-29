import { Loader } from '@/components/common/Loader';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { queryClient } from '@/utils/react-query-client';
import {
  useConferencesQuery,
  useDeleteConferenceMutation,
  useSetConferenceFeaturedMutation,
} from '@/utils/__generated__/graphql';
import { PencilIcon, StarIcon, TrashIcon } from '@heroicons/react/solid';
import { useAuthenticationStatus } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useConferencesQuery.getKey(),
    useConferencesQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 10,
  };
}

function ConferencesPage() {
  const { isAuthenticated } = useAuthenticationStatus();
  const [deletableConferenceId, setDeletableConferenceId] = useState<string>();

  const {
    mutateAsync: deleteConference,
    status: deleteConferenceStatus,
    error: deleteConferenceError,
  } = useDeleteConferenceMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });
  const {
    mutateAsync: setConferenceFeatured,
    error: setConferenceFeaturedError,
  } = useSetConferenceFeaturedMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });

  const { data, status, error: conferencesError } = useConferencesQuery();

  const error =
    setConferenceFeaturedError || deleteConferenceError || conferencesError;

  async function handleDelete(conferenceId: string) {
    setDeletableConferenceId(conferenceId);

    try {
      await deleteConference({ id: conferenceId });
    } finally {
      setDeletableConferenceId(undefined);
    }
  }

  async function handleSetFeatured(conferenceId: string) {
    try {
      await setConferenceFeatured({ id: conferenceId });
    } catch {
      // This error is already handled by useSetConferenceFeaturedMutation
    }
  }

  return (
    <div className="grid grid-flow-row gap-4">
      {isAuthenticated && (
        <div className="grid items-center justify-end grid-flow-col">
          <Link href="/conferences/add" passHref>
            <a className="flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list">
              Add Conference
            </a>
          </Link>
        </div>
      )}

      {status === 'loading' && (
        <p className="grid justify-start grid-flow-col gap-1">
          <Loader /> Loading conferences...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : 'Unknown error occurred. Please try again later.'}
        </p>
      )}

      {data?.conferences.length === 0 ? (
        <p>There are no conferences yet.</p>
      ) : (
        <ul className="grid grid-flow-row gap-4">
          {data?.conferences.map((conference) => {
            return (
              <li
                key={conference.id}
                className={twMerge(
                  'group bg-card gap-y-1 grid items-center grid-cols-2 px-4 py-3 rounded-md motion-safe:transition-opacity',
                  deleteConferenceStatus === 'loading' &&
                    deletableConferenceId === conference.id &&
                    'opacity-50',
                )}
              >
                <div
                  className={twMerge(
                    !isAuthenticated
                      ? 'col-span-2'
                      : 'col-span-2 sm:col-span-1',
                  )}
                >
                  <Link href={`/conferences/${conference.slug}`}>
                    <a className="text-xl font-medium hover:underline">
                      {conference.name}
                    </a>
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="grid justify-start mt-2 sm:mt-0 order-4 grid-flow-col col-span-2 gap-2 opacity-100 sm:order-[initial] sm:justify-end sm:col-span-1 group-hover:opacity-100 sm:opacity-0">
                    <Link href={`/conferences/${conference.slug}/edit`}>
                      <a className="grid items-center justify-center w-full grid-flow-col gap-1 px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list">
                        <PencilIcon className="w-4 h-4" /> Edit
                      </a>
                    </Link>

                    <button
                      className="grid items-center justify-center w-full grid-flow-col gap-1 px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list"
                      onClick={() => handleDelete(conference.id)}
                    >
                      <TrashIcon className="w-4 h-4" /> Delete
                    </button>

                    <button
                      className="grid items-center justify-center w-full grid-flow-col gap-1 px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list"
                      onClick={() => handleSetFeatured(conference.id)}
                    >
                      <StarIcon className="w-4 h-4" /> Set Featured
                    </button>
                  </div>
                )}

                {conference.featured && (
                  <div className="grid items-center justify-start grid-flow-col col-span-2 gap-1 text-sm sm:col-span-1">
                    <StarIcon className="w-4 h-4 fill-yellow-500" /> Featured
                  </div>
                )}

                <div className="grid justify-start grid-flow-col col-span-2">
                  {conference.speakers.slice(0, 8).map(({ id, avatar_url }) => (
                    <div
                      key={id}
                      className="w-6 h-6 -ml-2 overflow-hidden rounded-full shadow-sm shadow-gray-900 first-of-type:ml-0"
                    >
                      <picture>
                        <source
                          srcSet={avatar_url}
                          type="image/webp"
                          width={50}
                          height={50}
                          className="object-cover aspect-square"
                        />
                        <img
                          alt="Speaker's photo"
                          src={avatar_url}
                          width={50}
                          height={50}
                          className="object-cover aspect-square"
                        />
                      </picture>
                    </div>
                  ))}

                  {conference.speakers.length === 0 && (
                    <p className="text-sm">No speakers</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
ConferencesPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default ConferencesPage;
