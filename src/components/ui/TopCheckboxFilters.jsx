import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const TopCheckboxFilters = () => {
  const dispatch = useDispatch();
  const { registred, for_type } = useSelector((store) => store.checkboxes);
  return (
    <>
      {" "}
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
    </>
  );
};
export default TopCheckboxFilters;
