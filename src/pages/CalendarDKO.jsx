import CalendarHeader from "../components/CalendarHeader";
import Month from "../components/Month";
import Sidebar from "../components/Sidebar";
import DaysOfWeek from "../components/DaysOfWeek";
import SearchForm from "../components/SearchForm";
import { Outlet } from "react-router-dom";

const CalendarDKO = () => {
  return (
    <>
      <section className="calendar">
        <SearchForm />
        <div className="calendar__wrapper">
          <Sidebar />
          <div className="weekdays">
            <CalendarHeader />
            <DaysOfWeek />
            <Month />
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
};
export default CalendarDKO;
