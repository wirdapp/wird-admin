import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupsApi } from './api';
import { getCurrentContestId } from '../contests/utils';

export const groupKeys = {
  all: ['groups'],
  lists: () => [...groupKeys.all, 'list'],
  list: (contestId) => [...groupKeys.lists(), { contestId }],
  details: () => [...groupKeys.all, 'detail'],
  detail: (contestId, groupId) => [...groupKeys.details(), { contestId, groupId }],
  members: (contestId, groupId) => [...groupKeys.detail(contestId, groupId), 'members'],
  leaderboard: (contestId, groupId) => [...groupKeys.detail(contestId, groupId), 'leaderboard'],
};

export function useGroups(contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: groupKeys.list(cid),
    queryFn: () => GroupsApi.getGroups(cid),
    enabled: !!cid,
    ...options,
  });
}

export function useGroup(groupId, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: groupKeys.detail(cid, groupId),
    queryFn: async () => {
      const group = await GroupsApi.getGroup({ id: groupId, contestId: cid });
      group.announcements = Array.isArray(group.announcements) ? group.announcements : [];
      return group;
    },
    enabled: !!cid && !!groupId,
    ...options,
  });
}

export function useGroupMembers(groupId, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: groupKeys.members(cid, groupId),
    queryFn: () => GroupsApi.getGroupMembers({ groupId, contestId: cid }),
    enabled: !!cid && !!groupId,
    ...options,
  });
}

export function useGroupLeaderboard(groupId, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: groupKeys.leaderboard(cid, groupId),
    queryFn: () => GroupsApi.leaderboard({ groupId, contestId: cid }),
    enabled: !!cid && !!groupId,
    ...options,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (body) => GroupsApi.createGroup({ body, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list(contestId) });
    },
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ id, body }) => GroupsApi.updateGroup({ id, body, contestId }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(contestId, id) });
      queryClient.invalidateQueries({ queryKey: groupKeys.list(contestId) });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (id) => GroupsApi.deleteGroup({ id, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
}

export function useAddGroupMember() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ groupId, body }) => GroupsApi.addGroupMember({ groupId, body, contestId }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(contestId, groupId) });
    },
  });
}

export function useRemoveGroupMember() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ groupId, memberId }) => GroupsApi.removeGroupMember({ groupId, memberId, contestId }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(contestId, groupId) });
    },
  });
}
