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
      <div className="bg-opacity-10 w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md">
        <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
          {error instanceof Error
            ? error.message
            : 'Unknown error occurred. Please try again.'}
        </h1>
      </div>
    );
  }

  if (status === 'loading') {
    return <Loader className="mx-auto" />;
  }

  const { talks } = data?.conferences?.[0] || {};

  return (
    <div className="text-white">
      {talks.length === 0 ? (
        'There are no talks on this conference yet.'
      ) : (
        <div className="place-content-between grid grid-cols-3 gap-8 py-5 text-center text-white">
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
