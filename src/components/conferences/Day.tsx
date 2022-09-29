import { TalkCard } from '@/components/talks/TalkCard';
import { Talk } from '@/types/Talk';

interface DayProps {
  talks: Talk[];
  dayNumber: number;
}

export function Day({ talks, dayNumber }: DayProps) {
  return (
    <div className="grid content-start grid-flow-row gap-y-4">
      <h2 className="text-xl font-semibold text-white">Day {dayNumber}</h2>

      {talks.length === 0 ? (
        <p>There are no talks yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-flow-row sm:grid-cols-2 sm:grid-flow-row md:grid-cols-none">
          {talks.map((talk) => (
            <TalkCard
              key={talk.id}
              id={talk.id}
              name={talk.name}
              speaker={talk.speaker}
              start_date={talk.start_date}
              end_date={talk.end_date}
              hideDate
            />
          ))}
        </div>
      )}
    </div>
  );
}
