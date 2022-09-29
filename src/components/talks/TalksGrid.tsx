import { Loader } from '@/components/common/Loader';
import { useConferenceBySlugQuery } from '@/utils/__generated__/graphql';
import { useRouter } from 'next/router';
import { TalkCard } from './TalkCard';

export function TalksGrid() {
  const {
    query: { conferenceSlug },
  } = useRouter();

  const { data, status, error } = useConferenceBySlugQuery({
    slug: conferenceSlug as string,
  });

  if (status === 'error' && error) {
    return (
      <div className="w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md bg-opacity-10">
        <p className="pb-2 text-xl font-medium leading-none text-center text-white">
          {error instanceof Error
            ? error.message
            : 'Unknown error occurred. Please try again.'}
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading talks...
      </p>
    );
  }

  const { talks } = data?.conferences?.[0] || {};

  return (
    <div className="text-white">
      {talks.length === 0 ? (
        'There are no talks on this conference yet.'
      ) : (
        <div className="grid grid-cols-2 gap-6 text-center text-white sm:grid-cols-3 md:grid-cols-4 place-content-between">
          {talks.map((talk) => {
            return (
              <TalkCard
                key={talk.id}
                id={talk.id}
                name={talk.name}
                speaker={talk.speaker}
                start_date={talk.start_date}
                end_date={talk.end_date}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
