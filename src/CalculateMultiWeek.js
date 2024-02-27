export function getWeeksBetweenDates(startDate, endDate) {
  // Ensure start date is before end date
  if (startDate.isAfter(endDate)) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Initialize a counter for weeks
  let weeksDifference = 0;

  // Copy the start date to avoid modifying the original
  let currentDate = startDate.clone();

  // Loop until the current date exceeds the end date
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    // Check if the current date is at the start of a new week (Monday)
    if (currentDate.day() === 1) {
      weeksDifference++;
    }

    // Move to the next day
    currentDate = currentDate.add(1, "day");
  }

  return weeksDifference;
}
