import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterEvents } from "../features/calendar/calendarSlice";
import { useState, useEffect, useCallback } from "react";
import { store } from "../store";
import { updateMonthIndex } from "../features/calendar/calendarSlice";
import dayjs from "dayjs";

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
  fri_leaders,
  expert_learning,
  cifrovaya_gramotmotnost,
  financial_literacy,
  location
) => {
  // const { filteredEvents } = useSelector((store) => store.searchBarFilter);
  const { calendarEvents } = useSelector((store) => store.calendar);

  const { searchValue } = useSelector((store) => store.searchBarFilter);
  const { formatValue } = useSelector((store) => store.formatDropdown);
  const { typeValue } = useSelector((store) => store.typesDropdown);
  const { monthIndex } = useSelector((store) => store.calendar);

  const filteredLogic = () => {
    // const urlSearchParams = new URLSearchParams(location.search);
    // const queryParams = Object.fromEntries(urlSearchParams.entries());

    if (submitted) {
      const urlSearchParams = new URLSearchParams(location.search);
      let monthQueryParam = urlSearchParams.get("monthIndex");

      if (
        monthQueryParam !== null &&
        monthQueryParam !== undefined &&
        monthQueryParam !== ""
      ) {
        const monthIndex = parseInt(monthQueryParam);
        dispatch(updateMonthIndex(monthIndex));
        urlSearchParams.set("monthIndex", monthIndex.toString());
        navigate({ search: urlSearchParams.toString() });
        conditions.monthIndex = monthIndex;
      } else {
        monthQueryParam = dayjs().month();
        const currentMonthIndex = dayjs().month();
        urlSearchParams.set("monthIndex", currentMonthIndex.toString());
        navigate({ search: urlSearchParams.toString() });
        dispatch(updateMonthIndex(currentMonthIndex));
        conditions.monthIndex = currentMonthIndex;
      }

      // const queryStringMonth = urlSearchParams.toString();

      // navigate({ search: queryStringMonth });
      conditions = {
        ...conditions,
        ...(registred === 1 ? { registred: 1 } : undefined),
        ...(for_type === 1 ? { for_type: "boss" } : undefined),
        ...(starting === 1 ? { starting: 1 } : undefined),
        ...(lead_academy === 1 ? { lead_academy: 1 } : undefined),
        ...(fri_leaders === 1 ? { fri_leaders: 1 } : undefined),
        ...(expert_learning === 1 ? { expert_learning: 1 } : undefined),
        ...(cifrovaya_gramotmotnost === 1
          ? { cifrovaya_gramotmotnost: 1 }
          : undefined),
        ...(financial_literacy === 1 ? { financial_literacy: 1 } : undefined),
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

        // if (evt.monthIndex !== conditions.monthIndex) {
        //   return { ...evt, isHidden: false }; // Exclude filtering based on monthIndex
        // }

        if (anyValueUndefined) {
          return { ...evt, isHidden: false };
        }

        const allConditionsMet = Object.entries(conditions).every(
          ([key, value]) => {
            if (key === "name") {
              return evt[key].toLowerCase().includes(value.toLowerCase());
            }
            if (key === "for_type") {
              return evt[key].indexOf("boss]") !== -1;
            }
            if (key === "monthIndex") {
              return true;
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
