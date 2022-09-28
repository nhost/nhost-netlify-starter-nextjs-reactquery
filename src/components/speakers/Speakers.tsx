import { Loader } from '@/components/common/Loader';
import { Speaker } from '@/components/speakers/Speaker';
import { useSpeakersQuery } from '@/utils/__generated__/graphql';

export const Speakers = () => {
  const { data, isLoading, isError } = useSpeakersQuery();

  if (isError) {
    return (
      <div className="bg-opacity-10 w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md">
        <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
          Error:
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {data.speakers.map((speaker) => {
        return (
          <Speaker
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
  );
};
