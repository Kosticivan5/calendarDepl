import dayjs from "dayjs";
import { getWeeksBetweenDates } from "./CalculateMultiWeek";
import { endOfMonthNonWeekendDays } from "./countNonWeekendEndOfMonths";

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
// export const getMonth = (month = dayjs().month()) => {
//   const year = dayjs().year();
//   const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

//   let currentMonthCount = 1 - firstDayOfMonth;
//   let count = 0;

//   const daysMatrix = new Array(5).fill([]).map(() => {
//     count++;

//     if (count > 1) {
//       currentMonthCount += 2;
//     }
//     return new Array(5).fill(null).map(() => {
//       currentMonthCount++;
//       if (
//         dayjs(new Date(year, month, currentMonthCount)).format("MMMM") !==
//         dayjs(new Date(year, month, 1)).format("MMMM")
//       ) {
//         return "";
//       }
//       return dayjs(new Date(year, month, currentMonthCount));
//     });
//   });

//   return daysMatrix;
// };

// // ===========--===========
export const getNewData = (data) => {
  let newData = [];

  data.map((info) => {
    const infoCopy = { ...info };
    const { start_date, finish_date, name, start_date_prev_month } = info;

    // getWeeksBetweenDates(dayjs(start_date), dayjs(finish_date));

    // =======
    // =======

    // if the weeks of two dates don't have same week or same moth, we process them
    if (
      dayjs.tz(start_date).week() !== dayjs.tz(finish_date).week() ||
      dayjs.tz(start_date).month() !== dayjs.tz(finish_date).month()
    ) {
      // variables for new properties
      let newStartDate;
      let spanTransfer;
      let newDay;
      let isFirst;
      let isLast;
      let isMiddle;
      let newFinishDate;
      let idCounter = 0;
      let multiMonthStartDay;
      let startDate;
      if (start_date_prev_month) {
        startDate = dayjs.tz(finish_date).startOf("month");
      } else {
        startDate = start_date;
      }

      let amountOfWeeks = getWeeksBetweenDates(
        dayjs.tz(startDate),
        dayjs.tz(finish_date)
      );
      // calculate how many end of month dates are not on fri,sut,sun
      // and add i to the amount of weeks count

      // if the start and finish dates are on a different month
      // we add one more loop to split the events

      const endOfMonthOrigin = dayjs.tz(start_date).endOf("month");
      const endOfMonthOriginIncluded = dayjs
        .tz(endOfMonthOrigin)
        .isBetween(start_date, finish_date);
      // if (endOfMonthOriginIncluded) {
      //   amountOfWeeks =
      //     amountOfWeeks + endOfMonthNonWeekendDays(start_date, finish_date);
      // }

      console.log(amountOfWeeks);

      if (endOfMonthOriginIncluded && !start_date_prev_month) {
        amountOfWeeks = getWeeksBetweenDates(
          dayjs.tz(start_date),
          dayjs.tz(endOfMonthOrigin)
        );
      }
      if (amountOfWeeks === 0) {
        amountOfWeeks = 1;
      }

      // loop that determines to how many peaces we split the event
      for (let i = 0; i <= amountOfWeeks; i++) {
        // if it's the first slice, it gets property of 1

        isMiddle = 1;

        if (i === 0) {
          newStartDate = dayjs.tz(startDate); // Clone added here
          isFirst = 1;
          // isLast = 0;
          isMiddle = 0;
        } else {
          isFirst = 0;
        }
        if (
          start_date_prev_month &&
          dayjs.tz(startDate).week() !== dayjs.tz(finish_date).week()
        ) {
          isMiddle = 1;
          isLast = 0;
          isFirst = 0;
        }

        // if it's the last slice, it gets property of 1 as last
        if (i === amountOfWeeks) {
          isLast = 1;
          // isFirst = 0;
          isMiddle = 0;
        } else {
          isLast = 0;
        }

        if (
          start_date_prev_month &&
          dayjs.tz(startDate).week() === dayjs.tz(finish_date).week()
        ) {
          isMiddle = 0;
          isLast = 1;
          isFirst = 0;
        }

        // if (i === amountOfWeeks - 1 && i !== 0) {
        //   isLast = 1;
        //   // isFirst = 0;
        //   isMiddle = 0;
        // } else {
        //   isLast = 0;
        // }

        // if (multiMonthStartDay) {
        //   newStartDate = multiMonthStartDay; // Clone added here
        // }
        // multiMonthStartDay = null;
        // the start of the event
        let eventStart = newStartDate.day();

        // how many lines is event allowed to span
        // since there are 5 days, we can span across 6 lines

        const allowedToSpan = 6 - eventStart;
        // variable that determines how much can current event slice span
        let addDays = allowedToSpan;
        // if the difference between the original finished date and the new slice
        // start date is smaller than the allowed to span amount, then we just
        // reassign the value of the span as addDays as a difference between the
        // new start date and the original finish date
        if (dayjs.tz(finish_date).diff(newStartDate, "day") < allowedToSpan) {
          addDays = dayjs.tz(finish_date).diff(newStartDate, "day");
        }
        // new finish date is equals to new start date, plus the allowed to span amount
        // as a addDays variable

        // ==
        const endOfMonth = newStartDate.endOf("month"); // Clone added here
        const endOfMonthIncluded = endOfMonth.isBetween(
          newStartDate,
          finish_date
        );

        if (endOfMonthIncluded && newStartDate.week() === endOfMonth.week()) {
          addDays = endOfMonth.diff(newStartDate, "day");
          // if (addDays === 0) {
          //   addDays = 1;
          // }
          // multiMonthStartDay = endOfMonth.add(1, "day"); // Clone added here
          // if (multiMonthStartDay.day() === 6) {
          //   multiMonthStartDay = multiMonthStartDay.add(2, "day");
          // }
          // if (multiMonthStartDay.day() === 0) {
          //   multiMonthStartDay = multiMonthStartDay.add(1, "day");
          // }
        }
        // =======

        newFinishDate = newStartDate.add(addDays, "day").format();
        // ========

        let eventSpanEnd = dayjs.tz(finish_date).diff(newStartDate, "day");

        if (eventSpanEnd < 1) {
          eventSpanEnd = 1;
        }

        let newEvent = {
          // ============
          ...infoCopy,
          path_id: info.id,
          id: `${info.id}mw${idCounter}`,
          start_date: newStartDate.format(),
          finish_date: newFinishDate,
          is_multiWeek: true,
          is_first: isFirst,
          is_last: isLast,
          is_Middle: isMiddle,
          old_start_date: info.start_date,
          old_finish_date: info.finish_date,
          // ============
        };

        idCounter += 1;

        //   setNewData((newData) => [newEvent, ...newData]);
        newData = [newEvent, ...newData];

        if (eventSpanEnd > allowedToSpan) {
          spanTransfer = eventSpanEnd - allowedToSpan;
        }
        newDay = dayjs.tz(finish_date).subtract(spanTransfer, "day");
        if (newDay.day() === 6) {
          newDay = newDay.add(2, "day");
        }
        if (newDay.day() === 0) {
          newDay = newDay.add(1, "day");
        }

        newStartDate = newDay;

        const titleLimit = name.substring(0, 18);
      }

      return;
    }
    //   setNewData((newData) => [...newData, info]);
    newData = [...newData, info];
  });

  return newData;
};
