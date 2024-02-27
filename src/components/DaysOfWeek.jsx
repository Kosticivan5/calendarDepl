const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

const DaysOfWeek = () => {
  return (
    <header className="weekdays__header">
      {weekdays.map((day, index) => {
        return <p key={index}>{day}</p>;
      })}
    </header>
  );
};
export default DaysOfWeek;
