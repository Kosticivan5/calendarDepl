import dayjs from "dayjs";

const Day = ({ day, rowIndex }) => {
  // current day
  const highlightCurrDay = () => {
    if (day) {
      return dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? "highlightDay"
        : "";
    }
  };

  if (day) {
    return (
      <div className={"day"}>
        {/* day */}
        {dayjs(day).isBefore(dayjs().subtract(1, "day")) ? (
          <p className={`day__text ${highlightCurrDay()} dim`}>
            {dayjs(day).format("D")}
          </p>
        ) : (
          <p className={`day__text ${highlightCurrDay()} `}>
            {dayjs(day).format("D")}
          </p>
        )}
      </div>
    );
  }

  return <div className="day"></div>;
};
export default Day;
