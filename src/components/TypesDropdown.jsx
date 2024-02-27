import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  toggleDropdown,
  selectType,
} from "../features/typesDropdown/typesDropdownSlice";
import { useDispatch, useSelector } from "react-redux";

const TypesDropdown = () => {
  const dispatch = useDispatch();
  const { isOpen, info } = useSelector((store) => store.typesDropdown);
  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(toggleDropdown())}
        className="type-select"
      >
        <p>{info}</p>
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {isOpen && (
        <ul onClick={(e) => dispatch(selectType(e.target.textContent))}>
          <li>Персональная эффективность</li>
          <li>Лидерские навыки</li>
          <li>Digital & IT</li>
          <li>Проектные и продуктовые технологии</li>
          <li>Банки и финансы</li>
          <li>Клиентоцентричность</li>
        </ul>
      )}
    </>
  );
};
export default TypesDropdown;
