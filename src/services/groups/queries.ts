import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	Group,
	GroupCreateData,
	GroupMember,
	GroupRole,
	GroupUpdateData,
	LeaderboardEntry,
} from "../../types";
import { getCurrentContestId } from "../contests/utils";
import { GroupsService } from "./groups.service";

interface GroupMemberBody {
	user_id?: string;
	username?: string;
	group_role?: GroupRole;
}

export const groupKeys = {
	all: ["groups"] as const,
	lists: () => [...groupKeys.all, "list"] as const,
	list: (contestId: string | undefined) => [...groupKeys.lists(), { contestId }] as const,
	details: () => [...groupKeys.all, "detail"] as const,
	detail: (contestId: string | undefined, groupId: string) =>
		[...groupKeys.details(), { contestId, groupId }] as const,
	members: (contestId: string | undefined, groupId: string) =>
		[...groupKeys.detail(contestId, groupId), "members"] as const,
	leaderboard: (contestId: string | undefined, groupId: string) =>
		[...groupKeys.detail(contestId, groupId), "leaderboard"] as const,
};

export function useGroups(
	contestId?: string,
	options: Omit<UseQueryOptions<Group[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: groupKeys.list(cid),
		queryFn: () => GroupsService.getGroups(cid),
		enabled: !!cid,
		...options,
	});
}

export function useGroup(
	groupId: string | undefined,
	contestId?: string,
	options: Omit<UseQueryOptions<Group, Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: groupKeys.detail(cid, groupId ?? ""),
		queryFn: async () => {
			const group = await GroupsService.getGroup({
				id: groupId!,
				contestId: cid,
			});
			group.announcements = Array.isArray(group.announcements) ? group.announcements : [];
			return group;
		},
		enabled: !!cid && !!groupId,
		...options,
	});
}

export function useGroupMembers(
	groupId: string | undefined,
	contestId?: string,
	options: Omit<UseQueryOptions<GroupMember[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: groupKeys.members(cid, groupId ?? ""),
		queryFn: () => GroupsService.getGroupMembers({ groupId: groupId!, contestId: cid }),
		enabled: !!cid && !!groupId,
		...options,
	});
}

export function useGroupLeaderboard(
	groupId: string | undefined,
	contestId?: string,
	options: Omit<
		UseQueryOptions<LeaderboardEntry[], Error>,
		"queryKey" | "queryFn" | "enabled"
	> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: groupKeys.leaderboard(cid, groupId ?? ""),
		queryFn: () => GroupsService.leaderboard({ groupId: groupId!, contestId: cid }),
		enabled: !!cid && !!groupId,
		...options,
	});
}

export function useCreateGroup() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (body: GroupCreateData) => GroupsService.createGroup({ body, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: groupKeys.list(contestId) });
		},
	});
}

export function useUpdateGroup() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: GroupUpdateData }) =>
			GroupsService.updateGroup({ id, body, contestId }),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({
				queryKey: groupKeys.detail(contestId, id),
			});
			queryClient.invalidateQueries({ queryKey: groupKeys.list(contestId) });
		},
	});
}

export function useDeleteGroup() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (id: string) => GroupsService.deleteGroup({ id, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
		},
	});
}

export function useAddGroupMember() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ groupId, body }: { groupId: string; body: GroupMemberBody }) =>
			GroupsService.addGroupMember({ groupId, body, contestId }),
		onSuccess: (_, { groupId }) => {
			queryClient.invalidateQueries({
				queryKey: groupKeys.members(contestId, groupId),
			});
		},
	});
}

export function useRemoveGroupMember() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ groupId, memberId }: { groupId: string; memberId: string }) =>
			GroupsService.removeGroupMember({ groupId, memberId, contestId }),
		onSuccess: (_, { groupId }) => {
			queryClient.invalidateQueries({
				queryKey: groupKeys.members(contestId, groupId),
			});
		},
	});
}
