import { useConferencesQueryQuery } from '@/utils/__generated__/graphql';
import clsx from 'clsx';
import { Day } from './Day';

interface AgendaProps {
  amountOfDays: any;
}

export function Agenda({ amountOfDays }) {
  const { data, isLoading, isError } = useConferencesQueryQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const biggerThanThreeDays =
    amountOfDays.length > 3
      ? amountOfDays.length === 4
        ? 'grid-cols-4'
        : 'grid-cols-5'
      : '';

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <div className="flex flex-col py-2 text-center">
        <div
          className={clsx(
            'grid grid-cols-3 py-5 gap-y-12 gap-8 place-content-between',
            biggerThanThreeDays,
          )}
        >
          {amountOfDays.map((day, index) => {
            return (
              <Day
                key={day}
                dayNumber={index + 1}
                talks={data.conferences[0].talks.filter((talk) => {
                  return (
                    new Date(talk.start_date).getUTCDay() === day.getUTCDay()
                  );
                })}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
