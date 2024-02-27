import dayjs from "dayjs";
import humanizeDuration from "humanize-duration";

const formatDurationInRussian = (start_date, finish_date) => {
  const durationInMilliseconds = dayjs(finish_date).diff(dayjs(start_date));

  const days = Math.ceil(dayjs.duration(durationInMilliseconds).as("days"));

  let formattedDuration;

  if (days > 1) {
    formattedDuration = humanizeDuration(days * 24 * 60 * 60 * 1000, {
      language: "ru",
      round: true,
      units: ["d"],
      languageFallback: "en",
    });
  } else {
    formattedDuration = humanizeDuration(durationInMilliseconds, {
      language: "ru",
      round: true,
      units: ["h", "m"],
      delimiter: " ",
      spacer: " ",
      languageFallback: "en",
    });
  }

  return formattedDuration;
};

export default formatDurationInRussian;
