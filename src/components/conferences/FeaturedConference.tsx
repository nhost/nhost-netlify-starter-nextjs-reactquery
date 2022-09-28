import { getDatesInRange } from '@/utils/getDatesInRange';
import {
  Conferences,
  useFeaturedConferencesQuery,
} from '@/utils/__generated__/graphql';

import { Loader } from '@/components/common/Loader';
import { PropsWithChildren } from 'react';
import { Agenda } from './Agenda';
import { SubscribeToConference } from './SubscribeToConference';

export function FeaturedConferenceContainer({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-row py-20 text-center">
        <div className="flex flex-row w-full mx-auto text-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export function FeaturedConference() {
  const { data, isLoading, isError } = useFeaturedConferencesQuery();

  if (isError) {
    return (
      <FeaturedConferenceContainer>
        <div className="bg-opacity-10 w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-500 rounded-md">
          <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
            Error
          </h1>
        </div>
      </FeaturedConferenceContainer>
    );
  }
  if (isLoading) {
    return (
      <FeaturedConferenceContainer>
        <Loader />
      </FeaturedConferenceContainer>
    );
  }

  const featuredConference: Pick<
    Conferences,
    'id' | 'name' | 'start_date' | 'end_date' | 'location'
  > = data.conferences[0];
  if (!featuredConference) {
    return null;
  }
  return (
    <div className=" max-w-4xl mx-auto">
      <div className="flex flex-col py-8 text-center">
        <h1 className="text-dim text-[68px] font-semibold leading-none drop-shadow-sm">
          <span className="stroke">
            {featuredConference.name.substring(
              0,
              featuredConference.name.lastIndexOf(' '),
            )}
          </span>{' '}
          <span className="gradient">
            {featuredConference.name.split(' ').splice(-1)}
          </span>
        </h1>
        <div className="max-w-sm mx-auto mt-2 space-y-1 text-center">
          <p> {featuredConference.location}</p>
          <p className="text-list text-center">
            {`${new Date(featuredConference.start_date).toDateString()} to 
              ${new Date(featuredConference.end_date).toDateString()}`}
          </p>
        </div>
        <SubscribeToConference featuredConferenceId={featuredConference.id} />
      </div>
      <Agenda
        amountOfDays={getDatesInRange(
          featuredConference.start_date,
          featuredConference.end_date,
        )}
      />
    </div>
  );
}
