import { Key } from 'react';
import { Speaker } from './speakers/Speaker';
import { Talk } from './talks/Talk';

export type TalkType = {
  key: Key;
  id: string;
  name: string;
  speaker: Speaker;
  start_date: string;
  end_date: string;
};

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
