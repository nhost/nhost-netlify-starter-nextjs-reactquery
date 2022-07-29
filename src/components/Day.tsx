import { Talk } from './Talk';

export function Day({ talks, dayNumber }) {
  return (
    <div className="gap-y-4 flex flex-col">
      <h2 className="text-xl font-semibold text-white">Day {dayNumber}</h2>
      {talks.map((talk) => {
        return (
          <Talk
            key={talk.id}
            id={talk.id}
            name={talk.name}
            speaker={talk.speaker.name}
            startDate={talk.start_date}
            endDate={talk.end_date}
          />
        );
      })}
    </div>
  );
}
