import React, { useMemo, useState } from "react";
import Day from "./Day";
import GridLines from "./GridLines";
import dayjs from "dayjs";
// import { useGlobalContext } from "../context/GlobalContext";
import Event from "./Event";
import WeeklyEvents from "./WeeklyEvents";
import { useSelector } from "react-redux";

const Month = () => {
  // const { currentMonth } = useGlobalContext();

  const { currentMonth } = useSelector((store) => store.calendar);

  return (
    <section className="month-grid">
      <GridLines />
      <div className=" calendar__month">
        {currentMonth.map((row, index) => {
          if (
            (dayjs(row[0]).week() === dayjs().week() &&
              dayjs(row[0]).year() === dayjs().year()) ||
            (dayjs(row[row.length - 1]).week() === dayjs().week() &&
              dayjs(row[row.length - 1]).year() === dayjs().year())
          ) {
            return (
              <div className={`week highlight`} key={index}>
                <WeeklyEvents row={row} />
              </div>
            );
          } else {
            return (
              <div className={"week"} key={index}>
                <WeeklyEvents row={row} />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};
export default Month;
