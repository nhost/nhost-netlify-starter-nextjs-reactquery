import { Loader } from '@/components/common/Loader';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { useConferenceBySlugQuery } from '@/utils/__generated__/graphql';
import { useRouter } from 'next/router';

export function SpeakersGrid() {
  const {
    query: { conferenceSlug },
  } = useRouter();

  const { data, status, error } = useConferenceBySlugQuery({
    slug: conferenceSlug as string,
  });

  if (status === 'error' && error) {
    return (
      <div className="w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md bg-opacity-10">
        <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
          {error instanceof Error
            ? error.message
            : 'Unknown error occurred. Please try again.'}
        </h1>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading speakers...
      </p>
    );
  }

  const { speakers } = data?.conferences?.[0] || {};

  return (
    <div className="text-white">
      {speakers.length === 0 ? (
        'There are no speakers on this conference yet.'
      ) : (
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {speakers?.map((speaker) => {
            return (
              <SpeakerCard
                key={speaker.id}
                id={speaker.id}
                avatar_url={
                  speaker.avatar_url || 'https://via.placeholder.com/350x350'
                }
                name={speaker.name}
                social={speaker.social}
                job_description={speaker.job_description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
