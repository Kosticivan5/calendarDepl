import { Outlet } from "react-router-dom";
import CalendarNavBar from "../components/CalendarNavBar";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const { isLoading } = useSelector((store) => store.calendar);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="banner">
        <img src="banner.jpg" alt="" />
        <p>Календарь</p>
      </div>
      <CalendarNavBar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
