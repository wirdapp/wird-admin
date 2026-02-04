import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { isAdmin } from '../../util/roles';
import type { ContestRaw, Contest, Role } from '../../types';
import { ContestStatus } from '../../types';

export { ContestStatus };

export function getCurrentContestId(): string | undefined {
  return Cookies.get('currentContest');
}

export function changeCurrentContest(contestId: string): void {
  Cookies.set('currentContest', contestId, { path: '/' });
}

export function removeCurrentContest(): void {
  Cookies.remove('currentContest');
}

export async function getCurrentContest(
  contests: ContestRaw[] = []
): Promise<Contest | null> {
  // Import dynamically to avoid circular dependency
  const { ContestsService } = await import('./contests.service');

  let currentContestId = getCurrentContestId();
  if (!contests.find((contest) => contest.id === currentContestId)) {
    currentContestId = contests[0]?.id;
  }
  if (!currentContestId) {
    return null;
  }
  changeCurrentContest(currentContestId);
  return ContestsService.getContestDetails(currentContestId);
}

export function getInviteLink(contestId: string): string {
  return `${import.meta.env.VITE_MAIN_URL}/contest/${contestId}`;
}

export function getContestStatus(contest: ContestRaw): ContestStatus {
  const now = dayjs();
  if (dayjs(contest.end_date).isBefore(now)) return ContestStatus.FINISHED;
  if (dayjs(contest.start_date).isAfter(now)) return ContestStatus.NOT_STARTED;
  return ContestStatus.STARTED;
}

export const isUserAdminOnAnyContest = (
  contests: Array<{ person_contest_role?: Role }>
): boolean => {
  return contests.some(
    (contest) =>
      contest.person_contest_role !== undefined &&
      isAdmin(contest.person_contest_role)
  );
};
