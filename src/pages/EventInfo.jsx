import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { PiMonitorPlayLight } from "react-icons/pi";
import dayjs from "dayjs";
import formatDurationInRussian from "../getTimeConverted";
import { useLocation } from "react-router-dom";
import { displayedCities } from "../features/eventInfo/EventInfoSlice";
import { useEffect } from "react";
import { openModal } from "../features/eventInfo/EventInfoSlice";
import {
  cancelRegistration,
  addRegistration,
} from "../features/eventInfo/EventInfoSlice";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Moscow");

const EventInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { calendarEvents } = useSelector((store) => store.calendar);
  const { regions, isRegistrationLoading } = useSelector(
    (store) => store.eventInfo
  );

  const { id: eventId } = useParams();

  const ev = calendarEvents.find(
    (event) => event.path_id === eventId || event.id === eventId
  );

  useEffect(() => {
    dispatch(displayedCities(ev?.hub));
  }, []);

  const urlAddress = window.location.href;

  return (
    <>
      <Link to={`/calendarDKO/${location.search}`}>
        <div className="overlay"></div>
      </Link>
      <aside className="event-info">
        {/* close btn */}
        <Link
          className="close-sidebar-btn"
          to={`/calendarDKO/${location.search}`}
        >
          <GrClose />
        </Link>
        {/* info */}
        <header className="event-info-header">
          <div className="time-date-container">
            <div className="date">
              <CiCalendar />
              {ev?.old_start_date && ev?.old_finish_date ? (
                <>
                  <p>{dayjs.tz(ev?.old_start_date).format(" D MMMM")}</p>
                  <p>{dayjs.tz(ev?.old_start_date).format("HH:mm")}</p>
                </>
              ) : (
                <>
                  <p>{dayjs.tz(ev?.start_date).format(" D MMMM")}</p>
                  <p>{dayjs.tz(ev?.start_date).format("HH:mm")}</p>
                </>
              )}
              <p>мск</p>
            </div>
            <div className="time">
              <CiClock2 />
              <p>
                {ev?.old_start_date && ev?.old_finish_date
                  ? dayjs
                      .duration(
                        dayjs(ev?.old_finish_date).diff(
                          dayjs(ev?.old_start_date).add(1, "day")
                        )
                      )
                      .humanize()
                  : formatDurationInRussian(ev?.start_date, ev?.finish_date)}
              </p>
            </div>
          </div>
          <button
            className="share"
            onClick={() => navigator.clipboard.writeText(urlAddress)}
          >
            <CiShare2 />
            <p>Поделиться</p>
          </button>
        </header>
        {/* event info center */}
        <section className="event-info-center">
          <div className="type">
            <PiMonitorPlayLight />
            <p>{ev?.class}</p>
          </div>
          <h2 className="info-title">{ev?.name}</h2>

          <div className="info-text">
            <p>Начало</p>
            {ev?.old_start_date ? (
              <p>
                {dayjs.tz(ev?.old_start_date).format("DD.MM.YYYY")}{" "}
                {dayjs.tz(ev?.old_start_date).format("HH:mm")} мск
              </p>
            ) : (
              <p>
                {dayjs.tz(ev?.start_date).format("DD.MM.YYYY")}{" "}
                {dayjs.tz(ev?.start_date).format("HH:mm")} мск
              </p>
            )}
            <p>Завершение</p>
            {ev?.old_finish_date ? (
              <p>
                {dayjs.tz(ev?.old_finish_date).format("DD.MM.YYYY")}{" "}
                {dayjs.tz(ev?.old_finish_date).format("HH:mm")} мск
              </p>
            ) : (
              <p>
                {dayjs.tz(ev?.finish_date).format("DD.MM.YYYY")}{" "}
                {dayjs.tz(ev?.finish_date).format("HH:mm")} мск
              </p>
            )}

            <p>Регион</p>
            <p>{regions ? regions : ""}</p>
            <p>Преподаватель</p>
            {<div dangerouslySetInnerHTML={{ __html: ev?.company }} />}
            {/* <p>{ev.company} </p> */}
            <p>Направление</p>
            <p>Личная пятница</p>
            <p dangerouslySetInnerHTML={{ __html: ev?.description }} />
          </div>
        </section>
        {dayjs.tz(ev?.old_start_date).isBefore(dayjs()) ||
        dayjs.tz(ev?.start_date).isBefore(dayjs()) ? (
          ""
        ) : (
          <div className="info-button-container">
            {ev?.registred ? (
              <button onClick={() => dispatch(cancelRegistration("1"))}>
                {isRegistrationLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Отменить регистрацию"
                )}
              </button>
            ) : (
              <button onClick={() => dispatch(addRegistration("2"))}>
                {isRegistrationLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Зарегистрироваться"
                )}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};
export default EventInfo;
