import Cookies from "js-cookie";
import { ContestsApi } from "./api";

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
