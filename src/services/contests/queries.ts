import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Contest, ContestCreateData, ContestRaw, ContestUpdateData } from "../../types";
import { ContestsService } from "./contests.service";
import { changeCurrentContest, getCurrentContestId } from "./utils";

export const contestKeys = {
	all: ["contests"] as const,
	lists: () => [...contestKeys.all, "list"] as const,
	details: () => [...contestKeys.all, "detail"] as const,
	detail: (id: string) => [...contestKeys.details(), id] as const,
};

export function useContests(
	options: Omit<UseQueryOptions<ContestRaw[], Error>, "queryKey" | "queryFn"> = {},
) {
	return useQuery({
		queryKey: contestKeys.lists(),
		queryFn: () => ContestsService.getContests(),
		...options,
	});
}

export function useContestDetails(
	contestId: string | undefined,
	options: Omit<UseQueryOptions<Contest, Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	return useQuery({
		queryKey: contestKeys.detail(contestId ?? ""),
		queryFn: () => ContestsService.getContestDetails(contestId!),
		enabled: !!contestId,
		...options,
	});
}

export function useCurrentContest(
	contests: ContestRaw[] = [],
	options: Omit<UseQueryOptions<Contest, Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
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
		mutationFn: (formData: ContestCreateData) => ContestsService.createContest(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
		},
	});
}

export function useUpdateContest() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ContestUpdateData }) =>
			ContestsService.updateContest(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: contestKeys.detail(id) });
			queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
		},
	});
}

export function useJoinContest() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (code: string) => ContestsService.joinContest(code),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
		},
	});
}

export function useDropContest() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, confirmed }: { id: string; confirmed: boolean }) =>
			ContestsService.drop(id, confirmed),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: contestKeys.all });
		},
	});
}
