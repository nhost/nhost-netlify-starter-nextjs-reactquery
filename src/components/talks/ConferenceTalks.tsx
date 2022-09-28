import { Loader } from '@/components/common/Loader';
import { Talk as TalkType } from '@/types/Talk';
import { useTalksQuery } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';

import { AddNewTalk } from './AddNewTalk';
import { Talk } from './Talk';

export function ConferenceTalks() {
  const { data, isLoading, isError } = useTalksQuery();
  const isAuthenticated = useAuthenticated();

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
    <div>
      <div className="place-content-between grid grid-cols-3 gap-8 py-5 text-center">
        {data.talks.map((talk: TalkType) => {
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
      {isAuthenticated ? (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Talk
          </h1>
          <AddNewTalk />
        </div>
      ) : null}
    </div>
  );
}
