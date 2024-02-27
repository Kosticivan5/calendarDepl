import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Redirect = () => {
  const { isLoading } = useSelector((store) => store.calendar);

  if (!isLoading) {
    return <Navigate to={"/calendarDKO"} />;
  }

  return (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  );
};
export default Redirect;
