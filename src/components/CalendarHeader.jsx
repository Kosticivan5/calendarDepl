import dayjs from "dayjs";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
// import { useGlobalContext } from "../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import {
  prevMonth,
  nextMonth,
  getCalendarEvents,
} from "../features/calendar/calendarSlice";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const { monthIndex } = useSelector((store) => store.calendar);
  // const { monthIndex, setMonthIndex } = useGlobalContext();

  const currYear = dayjs().year();

  const handlePrevMonth = () => {
    dispatch(prevMonth());
    dispatch(getCalendarEvents());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
    dispatch(getCalendarEvents());
  };
  const monthDisplayed = dayjs(new Date(dayjs().year(), monthIndex)).format(
    "MMMM YYYY"
  );

  return (
    <header className="calendar__header">
      <div className="calendar__header--container">
        <div className="btn-container">
          <button onClick={handlePrevMonth} className="arrow left">
            <img src={leftArrow} alt="left-arrow" />
          </button>
          <button onClick={handleNextMonth} className="arrow right">
            <img src={rightArrow} alt="right-arrow" />
          </button>
        </div>
        <h2>{monthDisplayed}</h2>
      </div>
    </header>
  );
};
export default CalendarHeader;
