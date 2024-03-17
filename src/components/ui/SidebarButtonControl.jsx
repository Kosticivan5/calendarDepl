import { useDispatch } from "react-redux";
import { resetCheckboxes } from "../../features/checkboxes/checkboxesSlice";
import { resetType } from "../../features/typesDropdown/typesDropdownSlice";
import { resetFormat } from "../../features/formatDropdown/formatDropdownSlice";
import { isSubmitted } from "../../features/calendar/calendarSlice";

const SidebarButtonControl = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCheckboxes());
    dispatch(resetType());
    dispatch(resetFormat());
    dispatch(isSubmitted(true));
  };

  return (
    <div className="button-container">
      <button type="submit">Показать</button>
      <button onClick={handleReset} type="button">
        Сбросить фильтры
      </button>
    </div>
  );
};
export default SidebarButtonControl;
