import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { queryClient } from '@/utils/react-query-client';
import {
  useConferencesQuery,
  useDeleteConferenceMutation,
} from '@/utils/__generated__/graphql';
import { PencilIcon, StarIcon, TrashIcon } from '@heroicons/react/solid';
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
  const [deletableConferenceId, setDeletableConferenceId] = useState<string>();
  const { mutateAsync, status: deleteStatus } = useDeleteConferenceMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });

  const { data, status, error } = useConferencesQuery();

  async function handleDelete(conferenceId: string) {
    setDeletableConferenceId(conferenceId);

    try {
      await mutateAsync({ id: conferenceId });
    } finally {
      setDeletableConferenceId(undefined);
    }
  }

  return (
    <div className="grid grid-flow-row gap-4">
      <div className="grid items-center justify-end grid-flow-col">
        <Link href="/conferences/add" passHref>
          <a className="text-list hover:border-white hover:text-white border-list flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md">
            Add Conference
          </a>
        </Link>
      </div>

      {status === 'loading' && <p>Loading conferences...</p>}

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
            const numberOfTalks = conference.talks.length;

            return (
              <li
                key={conference.id}
                className={twMerge(
                  'group bg-card gap-y-1 grid items-center grid-cols-2 px-4 py-3 rounded-md motion-safe:transition-opacity',
                  deleteStatus === 'loading' &&
                    deletableConferenceId === conference.id &&
                    'opacity-50',
                )}
              >
                <div className="col-span-1">
                  <Link href={`/conferences/${conference.slug}`}>
                    <a className="hover:underline text-xl font-medium">
                      {conference.name}
                    </a>
                  </Link>
                </div>

                <div className="group-hover:opacity-100 grid justify-end grid-flow-col col-span-1 gap-2 opacity-0">
                  <Link href={`/conferences/${conference.slug}/edit`}>
                    <a className="hover:underline inline-grid items-center grid-flow-col gap-1">
                      <PencilIcon className="w-4 h-4" /> Edit
                    </a>
                  </Link>

                  <button
                    className="hover:underline grid items-center grid-flow-col gap-1 bg-transparent"
                    onClick={() => handleDelete(conference.id)}
                  >
                    <TrashIcon className="w-4 h-4" /> Delete
                  </button>
                </div>

                {conference.featured && (
                  <div className="grid items-center justify-start grid-flow-col col-span-1 gap-1 text-sm">
                    <StarIcon className="fill-yellow-500 w-4 h-4" /> Featured
                  </div>
                )}

                <div className="col-span-2 text-sm">
                  {numberOfTalks === 0 && 'No talks'}
                  {numberOfTalks === 1 && '1 talk'}
                  {numberOfTalks > 1 && `${numberOfTalks} talks`}
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
  return (
    <AuthenticatedLayout title={data.pageTitle}>{page}</AuthenticatedLayout>
  );
};

export default ConferencesPage;
