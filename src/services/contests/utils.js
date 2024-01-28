import Cookies from "js-cookie";
import { ContestsApi } from "./api";
import dayjs from "dayjs";

export const ContestStatus = {
  NOT_STARTED: "not_started",
  STARTED: "started",
  FINISHED: "finished",
};

export function getCurrentContestId() {
  return Cookies.get("currentContest");
}

export function changeCurrentContest(contestId) {
  Cookies.set("currentContest", contestId, { path: "/" });
}

export async function getCurrentContest(contests = []) {
  let currentContestId = getCurrentContestId();
  if (!contests.find((contest) => contest.id === currentContestId)) {
    currentContestId = contests[0]?.id;
  }
  if (!currentContestId) {
    return null;
  }
  changeCurrentContest(currentContestId);
  return ContestsApi.getContestDetails(currentContestId);
}

export function getInviteLink(contestId) {
  return `${process.env.REACT_APP_MAIN_URL}/contest/${contestId}`;
}

export function getContestStatus(contest) {
  const now = dayjs();
  if (dayjs(contest.end_date).isBefore(now)) return ContestStatus.FINISHED;
  if (dayjs(contest.start_date).isAfter(now)) return ContestStatus.NOT_STARTED;
  return ContestStatus.STARTED;
}
