import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MembersApi } from './api';
import { getCurrentContestId } from '../contests/utils';

export const memberKeys = {
  all: ['members'],
  lists: () => [...memberKeys.all, 'list'],
  list: (contestId, filters) => [...memberKeys.lists(), { contestId, ...filters }],
};

export function useMembers({ role, search, page_size, page, contestId } = {}, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: memberKeys.list(cid, { role, search, page_size, page }),
    queryFn: () => MembersApi.getUsers({ contestId: cid, role, search, page_size, page }),
    enabled: !!cid,
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useAddUserToContest() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ username, role }) => MembersApi.addUserToContest({ username, role, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
}

export function useUpdateUserContestRole() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ userId, role }) => MembersApi.updateUserContestRole({ userId, role, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
}

export function useRemoveUserFromContest() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (userId) => MembersApi.removeUserFromContest({ userId, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
}
