import { Speaker } from '@/types/Speaker';
import { queryClient } from '@/utils/react-query-client';
import {
  useConferencesQueryQuery,
  useDeleteSpeakerMutation,
  useSpeakersQuery,
} from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';

export function Speaker({
  id,
  avatar_url,
  name,
  social,
  job_description,
}: Speaker) {
  const isAuthenticated = useAuthenticated();

  const { mutateAsync } = useDeleteSpeakerMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useSpeakersQuery.getKey());
      queryClient.fetchQuery(useConferencesQueryQuery.getKey());
    },
  });

  return (
    <div className="bg-card shadow-gray-900 relative flex flex-col px-4 py-5 transition-all duration-150 ease-in border border-gray-900 rounded-md shadow-sm">
      {isAuthenticated ? (
        <button
          className="right-2 bottom-3 opacity-80 absolute text-red-500"
          onClick={async () => {
            await mutateAsync({
              id,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      ) : null}
      <picture className="object-cover rounded-md aspect-square p-0.5">
        <source srcSet={avatar_url} type="image/webp" />
        <img alt="Speaker's photo" src={avatar_url} />
      </picture>
      <div className="py-2">
        <h1 className="text-lg font-medium text-white">{name}</h1>
        <h2 className="text-dim text-xs font-medium">@{social}</h2>
        <h2 className="text-dim mt-2 text-sm font-medium">{job_description}</h2>
      </div>
    </div>
  );
}
