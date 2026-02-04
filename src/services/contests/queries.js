import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContestsApi } from './api';
import { getCurrentContestId, changeCurrentContest } from './utils';

export const contestKeys = {
  all: ['contests'],
  lists: () => [...contestKeys.all, 'list'],
  details: () => [...contestKeys.all, 'detail'],
  detail: (id) => [...contestKeys.details(), id],
};

export function useContests(options = {}) {
  return useQuery({
    queryKey: contestKeys.lists(),
    queryFn: ContestsApi.getContests,
    ...options,
  });
}

export function useContestDetails(contestId, options = {}) {
  return useQuery({
    queryKey: contestKeys.detail(contestId),
    queryFn: () => ContestsApi.getContestDetails(contestId),
    enabled: !!contestId,
    ...options,
  });
}

export function useCurrentContest(contests = [], options = {}) {
  // Determine which contest ID to use
  let contestId = getCurrentContestId();
  if (contests.length > 0 && !contests.find((c) => c.id === contestId)) {
    contestId = contests[0]?.id;
  }

  // Update cookie if needed
  if (contestId && contestId !== getCurrentContestId()) {
    changeCurrentContest(contestId);
  }

  return useContestDetails(contestId, options);
}

export function useCreateContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ContestsApi.createContest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

export function useUpdateContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ContestsApi.updateContest(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

export function useJoinContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ContestsApi.joinContest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

export function useDropContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, confirmed }) => ContestsApi.drop(id, confirmed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestKeys.all });
    },
  });
}
