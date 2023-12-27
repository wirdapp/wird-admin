import Cookies from "js-cookie";

export function getCurrentContestId() {
  return Cookies.get('currentContest');
}

export function changeCurrentContest(contestId) {
  Cookies.set('currentContest', contestId, {path: '/'});
}

export function getCurrentContest(contests) {
  const currentContestId = getCurrentContestId();
  if (!currentContestId) {
    changeCurrentContest(contests[0].id)
    return contests[0];
  }
  return contests.find(contest => contest.id === currentContestId);
}
