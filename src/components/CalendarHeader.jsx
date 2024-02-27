import dayjs from "dayjs";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
// import { useGlobalContext } from "../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { prevMonth, nextMonth } from "../features/calendar/calendarSlice";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const { monthIndex } = useSelector((store) => store.calendar);
  // const { monthIndex, setMonthIndex } = useGlobalContext();

  // const handlePrevMonth = () => {
  //   setMonthIndex(monthIndex - 1);
  // };
  // const handleNextMonth = () => {
  //   setMonthIndex(monthIndex + 1);
  // };
  const monthDisplayed = dayjs(new Date(dayjs().year(), monthIndex)).format(
    "MMMM YYYY"
  );

  return (
    <header className="calendar__header">
      <div className="calendar__header--container">
        <div className="btn-container">
          <button onClick={() => dispatch(prevMonth())} className="arrow left">
            <img src={leftArrow} alt="left-arrow" />
          </button>
          <button onClick={() => dispatch(nextMonth())} className="arrow right">
            <img src={rightArrow} alt="right-arrow" />
          </button>
        </div>
        <h2>{monthDisplayed}</h2>
      </div>
    </header>
  );
};
export default CalendarHeader;
