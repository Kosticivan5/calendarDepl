import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDropdown,
  selectFormat,
} from "../features/formatDropdown/formatDropdownSlice";

const FormatDropdown = () => {
  const dispatch = useDispatch();
  const { isOpen, info } = useSelector((store) => store.formatDropdown);
  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(toggleDropdown())}
        className="format-select"
      >
        <p>{info}</p>
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {isOpen && (
        <ul onClick={(e) => dispatch(selectFormat(e.target.textContent))}>
          <li>Дистанционно</li>
          <li>Очно</li>
        </ul>
      )}
    </>
  );
};
export default FormatDropdown;
