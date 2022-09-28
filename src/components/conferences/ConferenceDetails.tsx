import { getDatesInRange } from '@/utils/getDatesInRange';
import { ConferencesQuery } from '@/utils/__generated__/graphql';
import { StarIcon } from '@heroicons/react/solid';

import { PropsWithChildren } from 'react';
import { Day } from './Day';
import { SubscribeToConference } from './SubscribeToConference';

export function conferenceContainer({ children }: PropsWithChildren<unknown>) {
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

export interface ConferenceDetailsProps {
  /**
   * The conference data
   */
  conference: ConferencesQuery['conferences'][number];
}

export function ConferenceDetails({ conference }: ConferenceDetailsProps) {
  if (!conference) {
    return null;
  }

  return (
    <>
      <div className="grid grid-flow-row gap-2 py-8 text-center">
        <h1 className="text-dim text-[68px] font-semibold leading-none drop-shadow-sm">
          <span className="stroke">
            {conference.name.substring(0, conference.name.lastIndexOf(' '))}
          </span>{' '}
          <span className="gradient">
            {conference.name.split(' ').splice(-1)}
          </span>
        </h1>

        <div className="max-w-sm mx-auto space-y-1 text-center">
          <p> {conference.location}</p>
          <p className="text-list text-center">
            {`${new Date(conference.start_date).toDateString()} to 
              ${new Date(conference.end_date).toDateString()}`}
          </p>
        </div>

        {conference.featured && (
          <div className="bg-card justify-self-center grid items-center justify-center grid-flow-col col-span-1 gap-1 px-4 py-2 text-sm rounded-md">
            <StarIcon className="fill-yellow-500 w-4 h-4" /> Featured
          </div>
        )}

        <SubscribeToConference conferenceId={conference.id} />
      </div>

      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="flex flex-col py-2 text-center">
          <div className="gap-y-12 place-content-between grid grid-cols-3 gap-8 py-5">
            {getDatesInRange(conference.start_date, conference.end_date).map(
              (day, index) => {
                return (
                  <Day
                    key={day.getUTCDay()}
                    dayNumber={index + 1}
                    talks={
                      conference.talks.filter(
                        (talk) =>
                          new Date(talk.start_date).getUTCDay() ===
                          day.getUTCDay(),
                      ) || []
                    }
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
}
