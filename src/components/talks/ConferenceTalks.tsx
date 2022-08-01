import { useTalksQuery } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';

import { AddNewTalk } from './AddNewTalk';
import { Talk } from './Talk';
import { Speaker } from '../speakers/Speaker';

export function ConferenceTalks() {
  const { data, isLoading, isError } = useTalksQuery();
  const isAuthenticated = useAuthenticated();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="place-content-between grid grid-cols-3 gap-8 py-5 text-center">
        {data.talks.map((talk) => {
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
