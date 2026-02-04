import dayjs, { Dayjs } from 'dayjs';

interface ContestLike {
  start_date: string | Dayjs;
  end_date: string | Dayjs;
}

export function* getContestDays(contest: ContestLike): Generator<Dayjs> {
  const startDate = dayjs(contest.start_date).startOf('day');
  const endDate = dayjs(contest.end_date).endOf('day');
  let currentDate = startDate;
  while (currentDate.isBefore(endDate)) {
    yield currentDate;
    currentDate = currentDate.add(1, 'day');
  }
}

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
