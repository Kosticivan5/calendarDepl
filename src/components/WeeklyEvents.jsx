import Day from "./Day";
import Event from "./Event";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

const WeeklyEvents = ({ row }) => {
  const mapEvents = new Map();
  const { calendarEvents } = useSelector((store) => store.calendar);

  return (
    <>
      <div className="currentWeekDay">
        {row.map((day, idx) => {
          mapEvents.set(nanoid(), day);

          return <Day key={idx} day={day} rowIndex={idx} />;
        })}
      </div>
      <div className="events">
        {calendarEvents.map((data) => {
          const {
            id,
            name,
            start_date,
            finish_date,
            is_multiWeek,
            is_first,
            is_last,
            is_Middle,
            isHidden,
          } = data;

          for (const day of mapEvents.values()) {
            if (
              dayjs(day).week() === dayjs(start_date).week() &&
              dayjs(day).year() === dayjs(start_date).year() &&
              dayjs(day).month() === dayjs(start_date).month()
            ) {
              return (
                <Event
                  key={id}
                  id={id}
                  start_date={start_date}
                  finish_date={finish_date}
                  name={name}
                  multiWeek={is_multiWeek}
                  is_first={is_first}
                  is_last={is_last}
                  is_Middle={is_Middle}
                  isHidden={isHidden}
                  {...data}
                />
              );
            }
          }
        })}
      </div>
    </>
  );
};
export default WeeklyEvents;
