import { Loader } from '@/components/common/Loader';
import { useTalksQuery } from '@/utils/__generated__/graphql';

import { Talk } from './Talk';

export function ConferenceTalks() {
  const { data, isLoading, isError } = useTalksQuery();

  if (isError) {
    return (
      <div className="bg-opacity-10 w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md">
        <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
          Error
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-fit flex mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white">
      {data?.talks.length === 0 ? (
        'There are no talks yet.'
      ) : (
        <div className="place-content-between grid grid-cols-3 gap-8 py-5 text-center text-white">
          {data?.talks.map((talk) => {
            return (
              <Talk
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
