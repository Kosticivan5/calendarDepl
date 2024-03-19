import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSearchBarChange,
  resetSearchBarValue,
} from "../features/Searchbar/searchbarSlice";
import { useEffect, useMemo, useState } from "react";
import { GrClose } from "react-icons/gr";
import useHandleFilteredEvents from "../hooks/HandleFilteredEvents";
import { useNavigate, useLocation } from "react-router-dom";
// import { isSubmitted } from "../features/sidebar/sidebarSlice";
import { isSubmitted } from "../features/calendar/calendarSlice";

const SearchForm = () => {
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
  const { searchValue } = useSelector((store) => store.searchBarFilter);

  const [value, setValue] = useState(searchValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    financial_literacy
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

  useEffect(() => {
    setValue(searchValue); // Synchronize value state with searchValue from Redux
  }, [searchValue]);

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

    dispatch(handleSearchBarChange(value));
    dispatch(isSubmitted(true));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <CiSearch className="search-icon" />
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          name="name"
          value={value}
          className="search-form__input"
          placeholder="Поиск внутри календаря"
          autoComplete="off"
        />
        {value.trim() !== "" && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              if (searchValue) {
                dispatch(resetSearchBarValue(""));
                dispatch(isSubmitted(true));
              }
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
