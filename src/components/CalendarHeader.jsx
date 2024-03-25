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
import { useNavigate } from "react-router-dom";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { monthIndex } = useSelector((store) => store.calendar);
  // const { monthIndex, setMonthIndex } = useGlobalContext();

  const currYear = dayjs().year();

  const queryString = new URLSearchParams(monthIndex).toString();

  const handlePrevMonth = () => {
    dispatch(prevMonth());
    const newMonthIndex = monthIndex - 1;
    const queryParams = new URLSearchParams();
    queryParams.set("monthIndex", newMonthIndex.toString()); // Set "monthIndex" parameter
    const queryString = queryParams.toString();
    navigate({ search: queryString });
    dispatch(getCalendarEvents());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
    const newMonthIndex = monthIndex + 1;
    const queryParams = new URLSearchParams();
    queryParams.set("monthIndex", newMonthIndex.toString()); // Set "monthIndex" parameter
    const queryString = queryParams.toString();
    navigate({ search: queryString });
    dispatch(getCalendarEvents());
  };

  const monthDisplayed = dayjs(new Date(dayjs().year(), monthIndex)).format(
    "MMMM YYYY"
  );

  // const updateMonthUrl = (newMonthIndex) => {
  //   const queryParams = new URLSearchParams();
  //   queryParams.set("month", newMonthIndex);
  //   const queryString = queryParams.toString();
  //   navigate({ hash: queryString });
  // };

  // const { hash } = useLocation();
  // const params = new URLSearchParams(hash); // Remove the leading #
  // const year = params.get("year");
  // const month = params.get("month");
  // console.log(monthIndex);

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
