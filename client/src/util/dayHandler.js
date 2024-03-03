import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(calendar);
dayjs.extend(isBetween);

export const dayHandler = (day_key) => {
  let sixDaysBefore = dayjs().subtract(7, "day");
  if (dayjs(day_key).isBetween(sixDaysBefore, dayjs())) {
    let relativeDays = dayjs(day_key).calendar();
    if (relativeDays.startsWith("Last")) {
      relativeDays = relativeDays.split("Last ")[1];
      relativeDays = relativeDays.split(" at")[0];
      return relativeDays;
    } else {
      relativeDays = relativeDays.split(" at")[0];
      return relativeDays;
    }
  } else {
    return dayjs(day_key).format("MMM DD");
  }
};
