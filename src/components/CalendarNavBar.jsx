import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isSubmitted } from "../features/sidebar/sidebarSlice";

const CalendarNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <nav className="calendar-nav">
      <NavLink
        onClick={() => {
          dispatch(isSubmitted(true));
        }}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to={`/calendarDKO`}
      >
        Вебинары и тренинги
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/calendarCORP"
      >
        Календарь CORP
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/calendarRETAIL"
      >
        Календарь RETAIL
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/calendarDRPZ"
      >
        Календарь ДРПЗ
      </NavLink>
    </nav>
  );
};
export default CalendarNavBar;
