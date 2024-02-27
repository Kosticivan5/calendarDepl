import { initialRender } from "./features/checkboxes/checkboxesSlice";
import { initialDirectionRender } from "./features/typesDropdown/typesDropdownSlice";
import { initialFormatRender } from "./features/formatDropdown/formatDropdownSlice";
import { handleSearchBarChange } from "./features/Searchbar/searchbarSlice";

export const updateFiltersFromUrl = (dispatch, location) => {
  const urlParams = new URLSearchParams(location.search);

  const paramActionMap = {
    registred: initialRender,
    for_type: initialRender,
    starting: initialRender,
    lead_academy: initialRender,
    lead_friday: initialRender,
    learn_own: initialRender,
    digital_lit: initialRender,
    finance_lit: initialRender,
    type: initialFormatRender,
    direction: initialDirectionRender,
    name: handleSearchBarChange,
  };

  let formatValue;
  let directionValue;

  urlParams.forEach((value, key) => {
    const action = paramActionMap[key];
    // // type(direction) select update
    if (key === "direction") {
      if (value === "person_effect") {
        directionValue = "Персональная эффективность";
      }
      if (value === "lead_skill") {
        directionValue = "Лидерские навыки";
      }
      if (value === "digital_it") {
        directionValue = "Digital & IT";
      }
      if (value === "design_prod_tech") {
        directionValue = "Проектные и продуктовые технологии";
      }
      if (value === "bank_finance") {
        directionValue = "Банки и финансы";
      }
      if (value === "customer_orient") {
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
