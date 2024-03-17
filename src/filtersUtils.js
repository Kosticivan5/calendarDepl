import { initialRender } from "./features/checkboxes/checkboxesSlice";
import { initialDirectionRender } from "./features/typesDropdown/typesDropdownSlice";
import { initialFormatRender } from "./features/formatDropdown/formatDropdownSlice";
import { handleSearchBarChange } from "./features/Searchbar/searchbarSlice";
import { useLocation } from "react-router-dom";

export const updateFiltersFromUrl = (dispatch, location) => {
  const urlParams = new URLSearchParams(location.search);

  const paramActionMap = {
    registred: initialRender,
    for_type: initialRender,
    starting: initialRender,
    lead_academy: initialRender,
    fri_leaders: initialRender,
    expert_learning: initialRender,
    cifrovaya_gramotmotnost: initialRender,
    financial_literacy: initialRender,
    type: initialFormatRender,
    direction: initialDirectionRender,
    name: handleSearchBarChange,
  };

  let formatValue;
  let directionValue;

  urlParams.forEach((value, key) => {
    const action = paramActionMap[key];
    console.log(action);
    // // type(direction) select update
    if (key === "direction") {
      if (value === "personaleffectivness") {
        directionValue = "Персональная эффективность";
      }
      if (value === "hrmanagement") {
        directionValue = "Лидерские навыки";
      }
      if (value === "digitalit") {
        directionValue = "Digital & IT";
      }
      if (value === "projectmanagement") {
        directionValue = "Проектные и продуктовые технологии";
      }
      if (value === "bankAndFinance") {
        directionValue = "Банки и финансы";
      }
      if (value === "customer_centricity") {
        directionValue = "Клиентоцентричность";
      }
      dispatch(action(directionValue));
      return;
    }
    // formats select update
    if (key === "type") {
      if (value === "webinar") {
        formatValue = "Дистанционно";
      }
      if (value === "training") {
        formatValue = "Очно";
      }
      dispatch(action(formatValue));
      return;
    }
    if (key === "name") {
      dispatch(action(value));
    }
    if (key === "name") return;
    // checkboxes update
    dispatch(action(key));
  });
};
