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

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
