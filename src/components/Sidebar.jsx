import FormatDropdown from "./FormatDropdown";
import TypesDropdown from "./TypesDropdown";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  resetCheckboxes,
} from "../features/checkboxes/checkboxesSlice";

import { useEffect } from "react";
import { isSubmitted } from "../features/sidebar/sidebarSlice";
import useHandleFilteredEvents from "./HandleFilteredEvents";
import { resetType } from "../features/typesDropdown/typesDropdownSlice";
import { resetFormat } from "../features/formatDropdown/formatDropdownSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registred,
    for_type,
    starting,
    lead_academy,
    lead_friday,
    learn_own,
    digital_lit,
    finance_lit,
  } = useSelector((store) => store.checkboxes);

  const { submitted, buttonDisabled } = useSelector((store) => store.sidebar);

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
    lead_friday,
    learn_own,
    digital_lit,
    finance_lit
  );

  useEffect(() => {
    filteredLogic();
  }, [
    registred,
    for_type,
    starting,
    lead_academy,
    lead_friday,
    learn_own,
    digital_lit,
    finance_lit,
    navigate,
    submitted,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isSubmitted(true));
  };

  const handleReset = () => {
    dispatch(resetCheckboxes());
    dispatch(resetType());
    dispatch(resetFormat());
    dispatch(isSubmitted(true));
  };

  return (
    <aside className="sidebar">
      <form
        onSubmit={handleSubmit}
        action="/calendarDKO"
        className="sidebar__form"
      >
        {/* top checkbox filters */}
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="registred"
            id="mine"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={registred ? true : false}
          />
          <label htmlFor="mine">Я записан</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="for_type"
            id="managers"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={for_type ? true : false}
          />
          <label htmlFor="managers">Для руководителей</label>
        </div>

        {/* select filters */}
        <div className="select-input">
          <FormatDropdown />
          <TypesDropdown />
        </div>
        {/* bottom checkbox filters */}
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="starting"
            id="starting"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={starting ? true : false}
          />
          <label htmlFor="starting">Starting</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="lead_academy"
            id="lead_academy"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={lead_academy ? true : false}
          />
          <label htmlFor="lead_academy">Академия лидеров</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="lead_friday"
            id="lead_friday"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={lead_friday ? true : false}
          />
          <label htmlFor="lead_friday">Лидерские пятница</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="learn_own"
            id="learn_own"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={learn_own ? true : false}
          />
          <label htmlFor="learn_own">Учись у своих</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="digital_lit"
            id="digital_lit"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={digital_lit ? true : false}
          />
          <label htmlFor="digital_lit">Цифровая грамотность</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="finance_lit"
            id="finance_lit"
            onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
            checked={finance_lit ? true : false}
          />
          <label htmlFor="finance_lit">Финансовая грамостность</label>
        </div>
        {/* control buttons */}
        <div className="button-container">
          <button type="submit" disabled={buttonDisabled}>
            Показать
          </button>
          <button onClick={handleReset} type="button">
            Сбросить фильтры
          </button>
        </div>
      </form>
    </aside>
  );
};
export default Sidebar;
