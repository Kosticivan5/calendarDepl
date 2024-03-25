import FormatDropdown from "./FormatDropdown";
import TypesDropdown from "./TypesDropdown";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  resetCheckboxes,
} from "../features/checkboxes/checkboxesSlice";

import { useEffect } from "react";
// import { isSubmitted } from "../features/sidebar/sidebarSlice";
import { isSubmitted } from "../features/calendar/calendarSlice";
import useHandleFilteredEvents from "../hooks/HandleFilteredEvents";
import { resetType } from "../features/typesDropdown/typesDropdownSlice";
import { resetFormat } from "../features/formatDropdown/formatDropdownSlice";
import TopCheckboxFilters from "./ui/TopCheckboxFilters";
import BottomCheckboxFilters from "./ui/BottomCheckboxFilters";
import SidebarButtonControl from "./ui/SidebarButtonControl";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    registred,
    for_type,
    starting,
    lead_academy,
    fri_leaders,
    expert_learning,
    cifrovaya_gramotmotnost,
    financial_literacy,
  } = useSelector((store) => store.checkboxes);

  const { buttonDisabled } = useSelector((store) => store.sidebar);
  const { submitted } = useSelector((store) => store.calendar);

  let conditions = {};

  const filteredLogic = useHandleFilteredEvents(
    navigate,
    conditions,
    submitted,
    buttonDisabled,
    dispatch,
    isSubmitted,
    registred,
    for_type,
    starting,
    lead_academy,
    fri_leaders,
    expert_learning,
    cifrovaya_gramotmotnost,
    financial_literacy,
    location
  );

  useEffect(() => {
    filteredLogic();
  }, [
    registred,
    for_type,
    starting,
    lead_academy,
    fri_leaders,
    expert_learning,
    cifrovaya_gramotmotnost,
    financial_literacy,
    navigate,
    submitted,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isSubmitted(true));
  };

  return (
    <aside className="sidebar">
      <form
        onSubmit={handleSubmit}
        action="/calendarDKO"
        className="sidebar__form"
      >
        <TopCheckboxFilters />
        <div className="select-input">
          <FormatDropdown />
          <TypesDropdown />
        </div>
        <BottomCheckboxFilters />
        <SidebarButtonControl />
      </form>
    </aside>
  );
};
export default Sidebar;
