import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContestResultsApi } from './api';
import { getCurrentContestId } from '../contests/utils';

export const contestResultsKeys = {
  all: ['contestResults'],
  leaderboard: (contestId) => [...contestResultsKeys.all, 'leaderboard', { contestId }],
  results: (contestId) => [...contestResultsKeys.all, 'results', { contestId }],
  memberResults: (contestId, userId) => [...contestResultsKeys.all, 'memberResults', { contestId, userId }],
  memberDaySubmissions: (contestId, userId, date) => [...contestResultsKeys.all, 'memberDaySubmissions', { contestId, userId, date }],
};

export function useLeaderboard(contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestResultsKeys.leaderboard(cid),
    queryFn: () => ContestResultsApi.leaderboard({ contestId: cid }),
    enabled: !!cid,
    ...options,
  });
}

export function useContestResults(contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestResultsKeys.results(cid),
    queryFn: () => ContestResultsApi.getResults({ contestId: cid }),
    enabled: !!cid,
    ...options,
  });
}

export function useMemberResults(userId, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestResultsKeys.memberResults(cid, userId),
    queryFn: () => ContestResultsApi.getMemberResults({ userId, contestId: cid }),
    enabled: !!cid && !!userId,
    ...options,
  });
}

export function useMemberDaySubmissions(userId, date, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestResultsKeys.memberDaySubmissions(cid, userId, date),
    queryFn: () => ContestResultsApi.getMemberDaySubmissions({ userId, date, contestId: cid }),
    enabled: !!cid && !!userId && !!date,
    ...options,
  });
}

export function useUpdatePointRecord() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ recordId, userId, date, data }) =>
      ContestResultsApi.updatePointRecord({ recordId, userId, date, contestId, data }),
    onSuccess: (_, { userId, date }) => {
      queryClient.invalidateQueries({ queryKey: contestResultsKeys.memberDaySubmissions(contestId, userId, date) });
      queryClient.invalidateQueries({ queryKey: contestResultsKeys.memberResults(contestId, userId) });
      queryClient.invalidateQueries({ queryKey: contestResultsKeys.leaderboard(contestId) });
    },
  });
}
