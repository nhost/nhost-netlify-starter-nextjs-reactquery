import { TalkCard } from '@/components/talks/TalkCard';
import { Talk } from '@/types/Talk';

interface DayProps {
  talks: Talk[];
  dayNumber: number;
}

export function Day({ talks, dayNumber }: DayProps) {
  return (
    <div className="gap-y-4 flex flex-col">
      <h2 className="text-xl font-semibold text-white">Day {dayNumber}</h2>

      {talks.length === 0
        ? 'There are no talks yet.'
        : talks.map((talk) => {
            return (
              <TalkCard
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
  );
}
