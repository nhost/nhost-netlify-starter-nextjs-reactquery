import { getDatesInRange } from '@/utils/getDatesInRange';
import {
  Conferences,
  useConferencesQueryQuery,
} from '@/utils/__generated__/graphql';
import { Agenda } from './Agenda';

export function FeaturedConference() {
  const { data, isLoading, isError } = useConferencesQueryQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const featuredConference: Pick<
    Conferences,
    'id' | 'name' | 'start_date' | 'end_date' | 'location'
  > = data.conferences[0];

  if (!featuredConference) {
    return null;
  }

  return (
    <div className="">
      <div className=" max-w-4xl mx-auto">
        <div className="py-14 text-center">
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
          <div className="max-w-sm mx-auto mt-4">
            <button className="py-2.5 bg-gradient-to-r from-indigo-800  to-pink-900  px-2 rounded-md text-white text-sm font-medium">
              Get your ticket
            </button>
          </div>
        </div>
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
