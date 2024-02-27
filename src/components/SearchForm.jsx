import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSearchBarChange,
  resetSearchBarValue,
} from "../features/Searchbar/searchbarSlice";
import { useEffect, useMemo, useState } from "react";
import { GrClose } from "react-icons/gr";
import useHandleFilteredEvents from "./HandleFilteredEvents";
import { useNavigate, useLocation } from "react-router-dom";
import { isSubmitted } from "../features/sidebar/sidebarSlice";

const SearchForm = () => {
  // const [value, setValue] = useState("");
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
  const { searchValue } = useSelector((store) => store.searchBarFilter);

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

  // const handleChange = useMemo(() => {
  //   let timeoutId;
  //   return (e) => {
  //     clearTimeout(timeoutId);
  //     setValue(e.target.value);
  //     timeoutId = setTimeout(() => {
  //       dispatch(handleSearchBarChange(e.target.value));
  //     }, 100);
  //   };
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isSubmitted(true));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <CiSearch className="search-icon" />
        <input
          onChange={(e) => dispatch(handleSearchBarChange(e.target.value))}
          type="text"
          name="name"
          value={searchValue}
          className="search-form__input"
          placeholder="Поиск внутри календаря"
          autoComplete="off"
        />
        {searchValue.trim() !== "" && (
          <button
            type="button"
            onClick={() => {
              // setValue("");
              dispatch(resetSearchBarValue(""));
              dispatch(isSubmitted(true));
            }}
            className="search-reset-icon"
          >
            <GrClose />
          </button>
        )}
      </div>
      <button className="search-form__btn" type="submit">
        Найти
      </button>
    </form>
  );
};
export default SearchForm;
