import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMonthIndex } from "../features/calendar/calendarSlice";
import { useEffect } from "react";

const UpdateMonth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { monthIndex } = useSelector((state) => state.calendar);
  const { monthParam } = useParams();

  useEffect(() => {
    if (!monthParam || monthParam === NaN) {
      // If no parameter exists, use current month index
      const currentMonthIndex = dayjs().month();
      dispatch(setMonthIndex(currentMonthIndex));
      const currentSearchParams = new URLSearchParams(window.location.search);
      const existingSearchParamsString = currentSearchParams.toString();
      navigate(
        `/calendarDKO/${currentMonthIndex}?${existingSearchParamsString}`
      ); // Navigate with preserved search parameters
    } else {
      // If parameter exists, use its value as month index
      dispatch(setMonthIndex(Number(monthParam)));
    }
  }, [dispatch, monthParam, navigate]);
};
export default UpdateMonth;
