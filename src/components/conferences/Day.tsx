import { Talk as TalkType } from '@/types/Talk';
import { Talk } from '../talks/Talk';

export function Day({ talks, dayNumber }) {
  return (
    <div className="gap-y-4 flex flex-col">
      <h2 className="text-xl font-semibold text-white">Day {dayNumber}</h2>
      {talks.map((talk: TalkType) => {
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
  );
}
