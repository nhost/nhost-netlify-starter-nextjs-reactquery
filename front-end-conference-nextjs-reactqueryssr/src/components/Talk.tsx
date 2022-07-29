type Talk = {
  id: string;
  name: string;
  // will change to speaker type
  speaker: string;
  startDate: string;
  endDate: string;
};

export function Talk({ id, name, speaker, startDate, endDate }: Talk) {
  const startMinutes =
    new Date(startDate).getUTCMinutes() === 0
      ? '00'
      : new Date(startDate).getUTCMinutes();
  const endMinutes =
    new Date(endDate).getUTCMinutes() === 0
      ? '00'
      : new Date(endDate).getUTCMinutes();
  return (
    <div className="bg-card flex flex-col w-full py-4 space-y-1 border border-gray-700 rounded-md">
      <h2 className="text-dim text-xs font-medium">
        {startDate
          ? `${new Date(startDate).getUTCHours()}:${startMinutes} to ${new Date(
              endDate,
            ).getUTCHours()}:${endMinutes} UTC`
          : '-'}
      </h2>
      <h1 className="text-lg font-medium text-white"> {name}</h1>
      <h1 className="text-xs font-medium text-white"> by {speaker}</h1>
    </div>
  );
}
