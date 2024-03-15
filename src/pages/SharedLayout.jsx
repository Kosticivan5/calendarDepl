import { Outlet } from "react-router-dom";
import CalendarNavBar from "../components/CalendarNavBar";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

const SharedLayout = () => {
  const { isLoading } = useSelector((store) => store.calendar);
  const { isModalOpened } = useSelector((store) => store.eventInfo);

  // if (isLoading) {
  //   return (
  //     <div className="loader-container show">
  //       <span className="loader"></span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={isLoading ? "loader-container show" : "loader-container"}>
        <span className="loader"></span>
      </div>
      <div className="banner">
        <img src="banner.jpg" alt="" />
        <p>Календарь</p>
      </div>
      {isModalOpened && <Modal />}
      <CalendarNavBar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
