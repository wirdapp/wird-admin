import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Member, PaginatedResponse, Role } from "../../types";
import { getCurrentContestId } from "../contests/utils";
import { MembersService } from "./members.service";

interface MemberFilters {
	role?: Role | string;
	search?: string;
	page_size?: number;
	page?: number;
	contestId?: string;
}

export const memberKeys = {
	all: ["members"] as const,
	lists: () => [...memberKeys.all, "list"] as const,
	list: (contestId: string | undefined, filters: Omit<MemberFilters, "contestId">) =>
		[...memberKeys.lists(), { contestId, ...filters }] as const,
};

export function useMembers(
	filters: MemberFilters = {},
	options: Omit<
		UseQueryOptions<PaginatedResponse<Member>, Error>,
		"queryKey" | "queryFn" | "enabled"
	> = {},
) {
	const { role, search, page_size, page, contestId } = filters;
	const cid = contestId ?? getCurrentContestId();

	return useQuery({
		queryKey: memberKeys.list(cid, { role, search, page_size, page }),
		queryFn: () => MembersService.getUsers({ contestId: cid, role, search, page_size, page }),
		enabled: !!cid,
		placeholderData: (prev) => prev,
		...options,
	});
}

export function useAddUserToContest() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ username, role }: { username: string; role: Role }) =>
			MembersService.addUserToContest({ username, role, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
		},
	});
}

export function useUpdateUserContestRole() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
			MembersService.updateUserContestRole({ userId, role, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
		},
	});
}

export function useRemoveUserFromContest() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (userId: string) => MembersService.removeUserFromContest({ userId, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
		},
	});
}
