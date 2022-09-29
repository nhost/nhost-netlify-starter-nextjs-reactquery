import { Talk } from '@/types/Talk';
import { queryClient } from '@/utils/react-query-client';
import { useDeleteTalkMutation } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';

export interface TalkCardProps extends Talk {
  /**
   * Determines whether or not the date should be displayed
   */
  hideDate?: boolean;
}

export function TalkCard({
  id,
  name,
  speaker,
  start_date,
  end_date,
  hideDate,
}: TalkCardProps) {
  const isAuthenticated = useAuthenticated();

  const { mutateAsync } = useDeleteTalkMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const startHours = startDate.getUTCHours().toString().padStart(2, '0');
  const startMinutes = startDate.getUTCMinutes().toString().padStart(2, '0');

  const endHours = endDate.getUTCHours().toString().padStart(2, '0');
  const endMinutes = endDate.getUTCMinutes().toString().padStart(2, '0');

  return (
    <div className="relative flex flex-col w-full p-4 space-y-1 border border-gray-900 rounded-md bg-card">
      {isAuthenticated ? (
        <button
          className="absolute text-red-500 right-2 top-3 opacity-80"
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

      {!hideDate && (
        <p className="text-xs">
          {startDate.getUTCFullYear()}-
          {(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}-
          {startDate.getUTCDate().toString().padStart(2, '0')}
        </p>
      )}

      <p className="text-xs font-medium text-dim">
        {start_date
          ? `${startHours}:${startMinutes} to ${endHours}:${endMinutes} UTC`
          : '-'}
      </p>

      <h2 className="text-lg font-medium text-white"> {name}</h2>
      <p className="text-xs font-medium text-white"> by {speaker.name}</p>
    </div>
  );
}
