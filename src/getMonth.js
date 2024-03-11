import dayjs from "dayjs";

// global locale 'ru'
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Moscow");
// dayjs().utcOffset(180);

dayjs.extend(localizedFormat);
dayjs.locale("ru");
// ---
dayjs.extend(duration);
dayjs.duration();
// ---
dayjs.extend(relativeTime);
// ---
dayjs.extend(isBetween);

dayjs.extend(weekOfYear);

// ===================--=================

// get month
export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 1 - firstDayOfMonth;
  let count = 0;

  const daysMatrix = new Array(5).fill([]).map(() => {
    count++;

    if (count > 1) {
      currentMonthCount += 2;
    }
    return new Array(5).fill(null).map(() => {
      currentMonthCount++;
      if (
        dayjs(new Date(year, month, currentMonthCount)).format("MMMM") !==
        dayjs(new Date(year, month, 1)).format("MMMM")
      ) {
        return "";
      }
      return dayjs(new Date(year, month, currentMonthCount)).format();
    });
  });

  return daysMatrix;
};
