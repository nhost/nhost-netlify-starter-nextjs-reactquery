import {
  useDeleteTalkMutation,
  useTalksQuery,
} from '../utils/__generated__/graphql';
import { queryClient } from '../utils/react-query-client';
import { useAuthenticated } from '@nhost/react';
import { useConferencesQueryQuery } from '../utils/__generated__/graphql';
type Talk = {
  id: string;
  name: string;
  // will change to speaker type
  speaker: string;
  startDate: string;
  endDate: string;
};

export function Talk({ id, name, speaker, startDate, endDate }: Talk) {
  const isAuthenticated = useAuthenticated();

  const { mutateAsync } = useDeleteTalkMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useTalksQuery.getKey());
      queryClient.fetchQuery(useConferencesQueryQuery.getKey());
    },
  });

  const startMinutes =
    new Date(startDate).getUTCMinutes() === 0
      ? '00'
      : new Date(startDate).getUTCMinutes();
  const endMinutes =
    new Date(endDate).getUTCMinutes() === 0
      ? '00'
      : new Date(endDate).getUTCMinutes();

  return (
    <div className="bg-card relative flex flex-col w-full py-4 space-y-1 border border-gray-700 rounded-md">
      {isAuthenticated ? (
        <button
          className="right-2 top-3 opacity-80 absolute text-red-500"
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
      <h2 className="text-dim text-xs font-medium">
        {startDate
          ? `${new Date(startDate).getUTCHours()}:${startMinutes} to ${new Date(
              endDate,
            ).getUTCHours()}:${endMinutes} UTC`
          : '-'}
      </h2>
      <h1 className="text-lg font-medium text-white"> {name}</h1>
      <h1 className="text-xs font-medium text-white"> by {speaker}</h1>
    </div>
  );
}
