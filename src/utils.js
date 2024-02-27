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
dayjs().utcOffset(180);

dayjs.tz.setDefault("Europe/Moscow");

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
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

// =========================--=======================

// reduced data
export const getNewData = (data) => {
  let newData = [];
  data.map((info) => {
    const {
      name,
      id,
      start_date,
      finish_date,
      local_time_string,
      event_max_pers,
      is_open,
      price,
      is_single_person_price,
      description,
      calendar_group,
      type_no_access,
      for_type,
      event_rb_type,
      beexpert,
      is_devops,
      starting,
      is_la,
      type_val,
      type_detailed,
      place,
      type,
      organizational_form,
      isMandatory,
      event_form,
      calendar_show,
      is_passed,
      company,
      Mandatorys,
      max_pers,
      registred,
      in_wlist,
      hub,
    } = info;

    // getWeeksBetweenDates(dayjs(start_date), dayjs(finish_date));

    // =======
    // =======

    // if the weeks of two dates don't have same week or same moth, we process them
    if (
      dayjs(start_date).week() !== dayjs(finish_date).week() ||
      dayjs(start_date).month() !== dayjs(finish_date).month()
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
      let amountOfWeeks = getWeeksBetweenDates(
        dayjs(start_date),
        dayjs(finish_date)
      );
      // calculate how many end of month dates are not on fri,sut,sun
      // and add i to the amount of weeks count

      // if the start and finish dates are ona  different month
      // we add one more loop to split the events
      const endOfMonthOrigin = dayjs(start_date).endOf("month");
      const endOfMonthOriginIncluded = dayjs(endOfMonthOrigin).isBetween(
        start_date,
        finish_date
      );
      if (endOfMonthOriginIncluded) {
        amountOfWeeks =
          amountOfWeeks + endOfMonthNonWeekendDays(start_date, finish_date);
      }

      // loop that determines to how many peaces we split the event
      for (let i = 0; i <= amountOfWeeks; i++) {
        // if it's the first slice, it gets property of 1

        isMiddle = 1;

        if (i === 0) {
          newStartDate = start_date;
          isFirst = 1;
          // isLast = 0;
          isMiddle = 0;
        } else {
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
        // the rest of them are middle slices
        // if (
        //   i > 0 &&
        //   i < getWeeksBetweenDates(dayjs(start_date), dayjs(finish_date) - 1)
        // ) {
        //   isMiddle = 1;
        // } else {
        //   isMiddle = 0;
        // }
        if (multiMonthStartDay) {
          newStartDate = multiMonthStartDay;
        }
        multiMonthStartDay = null;
        // the start of the event
        let eventStart = dayjs(newStartDate).day();

        // how many lines is event allowed to span
        // since there are 5 days, we can span across 6 lines

        const allowedToSpan = 6 - eventStart;
        // variable that determines how much can current event slice span
        let addDays = allowedToSpan;
        // if the difference between the original finished date and the new slice
        // start date is smaller than the allowed to span amount, then we just
        // reassign the value of the span as addDays as a difference between the
        // new start date and the original finish date
        if (dayjs(finish_date).diff(newStartDate, "day") < allowedToSpan) {
          addDays = dayjs(finish_date).diff(newStartDate, "day");
        }
        // new finish date is equals to new start date, plus the allowed to span amount
        // as a addDays variable

        // ==
        const endOfMonth = dayjs(newStartDate).endOf("month");
        const endOfMonthIncluded = dayjs(endOfMonth).isBetween(
          newStartDate,
          finish_date
        );

        if (
          endOfMonthIncluded &&
          dayjs(newStartDate).week() === dayjs(endOfMonth).week()
        ) {
          addDays = dayjs(endOfMonth).diff(newStartDate, "day");
          multiMonthStartDay = dayjs(endOfMonth).add(1, "day").format();
          if (dayjs(multiMonthStartDay).get("day") === 6) {
            multiMonthStartDay = dayjs(multiMonthStartDay).add(2, "day");
          }
          if (dayjs(multiMonthStartDay).get("day") === 0) {
            multiMonthStartDay = dayjs(multiMonthStartDay).add(1, "day");
          }
        }
        // ==

        newFinishDate = dayjs(newStartDate).add(addDays, "day").format();
        // ========
        // newFinishDate = dayjs(newFinishDate).format();

        // if (dayjs(newStartDate).month() !== dayjs(newFinishDate).month()) {
        //   let lastDayOfMonth = dayjs(newStartDate).endOf("month").format();
        //   addDays = dayjs(lastDayOfMonth).diff(newStartDate, "day");
        //   isLast = 0;
        //   newFinishDate = dayjs(newStartDate).add(addDays, "day").format();
        // }
        // =================

        let eventSpanEnd = dayjs(finish_date).diff(dayjs(newStartDate), "day");

        if (eventSpanEnd < 1) {
          eventSpanEnd = 1;
        }

        let newEvent = {
          path_id: id,
          name,
          id: `${id}mw${idCounter}`,
          start_date: dayjs(newStartDate).format(),
          finish_date: dayjs(newFinishDate).format(),
          is_multiWeek: true,
          is_first: isFirst,
          is_last: isLast,
          is_Middle: isMiddle,
          old_start_date: start_date,
          old_finish_date: finish_date,
          // ============
          local_time_string,
          event_max_pers,
          is_open,
          price,
          is_single_person_price,
          description,
          calendar_group,
          type_no_access,
          for_type,
          event_rb_type,
          beexpert,
          is_devops,
          starting,
          is_la,
          type_val,
          type_detailed,
          place,
          class: info.class,
          type,
          organizational_form,
          isMandatory,
          event_form,
          calendar_show,
          is_passed,
          company,
          Mandatorys,
          max_pers,
          registred,
          in_wlist,
          hub,
        };

        idCounter += 1;

        //   setNewData((newData) => [newEvent, ...newData]);
        newData = [newEvent, ...newData];

        if (eventSpanEnd > allowedToSpan) {
          spanTransfer = eventSpanEnd - allowedToSpan;
        }
        newDay = dayjs(finish_date).subtract(spanTransfer, "day");
        if (dayjs(newDay).get("day") === 6) {
          newDay = dayjs(newDay).add(2, "day");
        }
        if (dayjs(newDay).get("day") === 0) {
          newDay = dayjs(newDay).add(1, "day");
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

// ===========--===========
