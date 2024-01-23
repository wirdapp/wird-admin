import dayjs from "dayjs";

export function* getContestDays(contest) {
  const startDate = dayjs(contest.start_date).startOf("day");
  const endDate = dayjs(contest.end_date).endOf("day");
  let currentDate = startDate;
  while (currentDate.isBefore(endDate)) {
    yield currentDate;
    currentDate = currentDate.add(1, "day");
  }
}
