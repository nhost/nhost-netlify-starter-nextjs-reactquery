/**
 * It takes two dates, and returns an array of dates between them
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns An array of dates between the start and end date.
 */
export function getDatesInRange(
  startDate: string | Date,
  endDate: string | Date,
) {
  if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new Date(endDate);
  }

  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
