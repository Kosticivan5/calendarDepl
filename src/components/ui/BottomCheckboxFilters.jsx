import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const BottomCheckboxFilters = () => {
  const dispatch = useDispatch();
  const {
    starting,
    lead_academy,
    fri_leaders,
    expert_learning,
    cifrovaya_gramotmotnost,
    financial_literacy,
  } = useSelector((store) => store.checkboxes);
  return (
    <>
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
          name="fri_leaders"
          id="fri_leaders"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={fri_leaders ? true : false}
        />
        <label htmlFor="fri_leaders">Лидерские пятницы</label>
      </div>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="expert_learning"
          id="expert_learning"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={expert_learning ? true : false}
        />
        <label htmlFor="expert_learning">Учись у своих</label>
      </div>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="cifrovaya_gramotmotnost"
          id="cifrovaya_gramotmotnost"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={cifrovaya_gramotmotnost ? true : false}
        />
        <label htmlFor="cifrovaya_gramotmotnost">Цифровая грамотность</label>
      </div>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="financial_literacy"
          id="financial_literacy"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={financial_literacy ? true : false}
        />
        <label htmlFor="financial_literacy">Финансовая грамостность</label>
      </div>
    </>
  );
};
export default BottomCheckboxFilters;
