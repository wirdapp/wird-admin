import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	DailySubmissionSummary,
	LeaderboardEntry,
	MemberResult,
	PointRecord,
	PointRecordUpdateData,
} from "../../types";
import { getCurrentContestId } from "../contests/utils";
import { ContestResultsService } from "./contest-results.service";

export const contestResultsKeys = {
	all: ["contestResults"] as const,
	leaderboard: (contestId: string | undefined) =>
		[...contestResultsKeys.all, "leaderboard", { contestId }] as const,
	results: (contestId: string | undefined) =>
		[...contestResultsKeys.all, "results", { contestId }] as const,
	memberResults: (contestId: string | undefined, userId: string) =>
		[...contestResultsKeys.all, "memberResults", { contestId, userId }] as const,
	memberDaySubmissions: (contestId: string | undefined, userId: string, date: string) =>
		[...contestResultsKeys.all, "memberDaySubmissions", { contestId, userId, date }] as const,
};

export function useLeaderboard(
	contestId?: string,
	options: Omit<
		UseQueryOptions<LeaderboardEntry[], Error>,
		"queryKey" | "queryFn" | "enabled"
	> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestResultsKeys.leaderboard(cid),
		queryFn: () => ContestResultsService.leaderboard({ contestId: cid }),
		enabled: !!cid,
		...options,
	});
}

export function useContestResults(
	contestId?: string,
	options: Omit<
		UseQueryOptions<DailySubmissionSummary[], Error>,
		"queryKey" | "queryFn" | "enabled"
	> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestResultsKeys.results(cid),
		queryFn: () => ContestResultsService.getResults({ contestId: cid }),
		enabled: !!cid,
		...options,
	});
}

export function useMemberResults(
	userId: string | undefined,
	contestId?: string,
	options: Omit<UseQueryOptions<MemberResult, Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestResultsKeys.memberResults(cid, userId ?? ""),
		queryFn: () =>
			ContestResultsService.getMemberResults({
				userId: userId!,
				contestId: cid,
			}),
		enabled: !!cid && !!userId,
		...options,
	});
}

export function useMemberDaySubmissions(
	userId: string | undefined,
	date: string | undefined,
	contestId?: string,
	options: Omit<UseQueryOptions<PointRecord[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestResultsKeys.memberDaySubmissions(cid, userId ?? "", date ?? ""),
		queryFn: () =>
			ContestResultsService.getMemberDaySubmissions({
				userId: userId!,
				date: date!,
				contestId: cid,
			}),
		enabled: !!cid && !!userId && !!date,
		...options,
	});
}

export function useUpdatePointRecord() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({
			recordId,
			userId,
			date,
			data,
		}: {
			recordId: string;
			userId: string;
			date: string;
			data: PointRecordUpdateData;
		}) =>
			ContestResultsService.updatePointRecord({
				recordId,
				userId,
				date,
				contestId,
				data,
			}),
		onSuccess: (_, { userId, date }) => {
			queryClient.invalidateQueries({
				queryKey: contestResultsKeys.memberDaySubmissions(contestId, userId, date),
			});
			queryClient.invalidateQueries({
				queryKey: contestResultsKeys.memberResults(contestId, userId),
			});
			queryClient.invalidateQueries({
				queryKey: contestResultsKeys.leaderboard(contestId),
			});
		},
	});
}
