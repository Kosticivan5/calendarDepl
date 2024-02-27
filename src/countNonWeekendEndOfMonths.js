import dayjs from "dayjs";

export const endOfMonthNonWeekendDays = (start, end) => {
  let nonWeekendEndOfMonthCount = 0;

  // Determine the start and end months
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  // Loop through each month in the range
  let currentDate = startDate.startOf("month");
  while (currentDate.isBefore(endDate.startOf("month"))) {
    // Check if the end of month date is not Friday, Saturday, or Sunday
    if (![5, 6, 0].includes(currentDate.endOf("month").day())) {
      nonWeekendEndOfMonthCount++;
    }

    // Move to the next month
    currentDate = currentDate.add(1, "month");
  }

  return nonWeekendEndOfMonthCount;
};
