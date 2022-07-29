export function getDatesInRange(startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
