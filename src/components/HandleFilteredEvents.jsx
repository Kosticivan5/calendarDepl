import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterEvents } from "../features/calendar/calendarSlice";
import { useState, useEffect } from "react";
import { store } from "../store";

const useHandleFilteredEvents = (
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
) => {
  const { filteredEvents } = useSelector((store) => store.searchBarFilter);
  const { calendarEvents } = useSelector((store) => store.calendar);

  const { searchValue } = useSelector((store) => store.searchBarFilter);
  const { formatValue } = useSelector((store) => store.formatDropdown);
  const { typeValue } = useSelector((store) => store.typesDropdown);

  const filteredLogic = () => {
    // const urlSearchParams = new URLSearchParams(location.search);
    // const queryParams = Object.fromEntries(urlSearchParams.entries());

    if (submitted) {
      conditions = {
        ...(registred === 1 ? { registred: 1 } : undefined),
        ...(for_type === 1 ? { for_type: "boss" } : undefined),
        ...(starting === 1 ? { starting: 1 } : undefined),
        ...(lead_academy === 1 ? { lead_academy: 1 } : undefined),
        ...(lead_friday === 1 ? { lead_friday: 1 } : undefined),
        ...(learn_own === 1 ? { learn_own: 1 } : undefined),
        ...(digital_lit === 1 ? { digital_lit: 1 } : undefined),
        ...(finance_lit === 1 ? { finance_lit: 1 } : undefined),
        ...(searchValue.trim() !== "" ? { name: searchValue } : undefined),
        ...(formatValue !== "" ? { type: formatValue } : undefined),
        ...(typeValue !== "" ? { direction: typeValue } : undefined),
      };

      const queryString = new URLSearchParams(conditions).toString();

      navigate({ search: queryString });

      const newFilteredEvents = calendarEvents.map((evt) => {
        const anyValueUndefined = Object.values(conditions).some(
          (value) => value === undefined
        );

        if (anyValueUndefined) {
          return { ...evt, isHidden: false };
        }

        const allConditionsMet = Object.entries(conditions).every(
          ([key, value]) => {
            if (key === "name") {
              return evt[key].toLowerCase().startsWith(value.toLowerCase());
            }
            if (key === "for_type") {
              return evt[key].indexOf("boss]") !== -1;
            }

            return evt[key] === conditions[key];
          }
        );

        return { ...evt, isHidden: !allConditionsMet };
      });

      dispatch(filterEvents(newFilteredEvents));
      dispatch(isSubmitted(false));
    }
  };

  return filteredLogic;
};
export default useHandleFilteredEvents;
