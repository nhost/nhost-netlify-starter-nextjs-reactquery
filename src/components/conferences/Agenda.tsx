import { useFeaturedConferencesQuery } from '@/utils/__generated__/graphql';

import { Day } from './Day';

interface AgendaProps {
  amountOfDays: Date[];
}

export function Agenda({ amountOfDays }: AgendaProps) {
  const { data, isLoading, isError } = useFeaturedConferencesQuery();

  if (isError) return <p>Failed to agenda</p>;

  if (isLoading) return <div>Loading agenda...</div>;

  const featuredConference =
    data?.conferences.find((conference) => conference.featured) ||
    data.conferences[0];

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <div className="flex flex-col py-2 text-center">
        <div className="gap-y-12 place-content-between grid grid-cols-3 gap-8 py-5">
          {amountOfDays.map((day, index) => {
            return (
              <Day
                key={day.getUTCDay()}
                dayNumber={index + 1}
                talks={
                  featuredConference?.talks.filter(
                    (talk) =>
                      new Date(talk.start_date).getUTCDay() === day.getUTCDay(),
                  ) || []
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
