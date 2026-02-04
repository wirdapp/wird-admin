import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	Criterion,
	CriterionCreateData,
	CriterionUpdateData,
	Section,
	SectionCreateData,
	SectionUpdateData,
} from "../../types";
import { getCurrentContestId } from "../contests/utils";
import { ContestCriteriaService } from "./contest-criteria.service";

interface OrderItem {
	id: string;
	position?: number;
	order_in_section?: number;
}

export const contestCriteriaKeys = {
	all: ["contestCriteria"] as const,
	sections: () => [...contestCriteriaKeys.all, "sections"] as const,
	sectionsList: (contestId: string | undefined) =>
		[...contestCriteriaKeys.sections(), "list", { contestId }] as const,
	criteria: () => [...contestCriteriaKeys.all, "criteria"] as const,
	criteriaList: (contestId: string | undefined) =>
		[...contestCriteriaKeys.criteria(), "list", { contestId }] as const,
	criteriaDetail: (contestId: string | undefined, id: string) =>
		[...contestCriteriaKeys.criteria(), "detail", { contestId, id }] as const,
};

// Sections hooks
export function useSections(
	contestId?: string,
	options: Omit<UseQueryOptions<Section[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestCriteriaKeys.sectionsList(cid),
		queryFn: async () => {
			const data = await ContestCriteriaService.getSections({ contestId: cid });
			return data.sort((a, b) => a.order_in_contest - b.order_in_contest);
		},
		enabled: !!cid,
		...options,
	});
}

export function useAddSection() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (section: SectionCreateData) =>
			ContestCriteriaService.addSection({ section, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.sectionsList(contestId),
			});
		},
	});
}

export function useUpdateSection() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ id, section }: { id: string; section: SectionUpdateData }) =>
			ContestCriteriaService.updateSection({ id, section, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.sectionsList(contestId),
			});
		},
	});
}

export function useDeleteSection() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (id: string) => ContestCriteriaService.deleteSection({ id, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.sectionsList(contestId),
			});
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
		},
	});
}

export function useUpdateSectionsOrder() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (newSections: OrderItem[]) =>
			ContestCriteriaService.updateSectionsOrder({ newSections, contestId }),
		onMutate: async (newSections) => {
			await queryClient.cancelQueries({
				queryKey: contestCriteriaKeys.sectionsList(contestId),
			});
			const previousSections = queryClient.getQueryData<Section[]>(
				contestCriteriaKeys.sectionsList(contestId),
			);
			const newSectionsWithOrder = newSections.map((section, index) => ({
				...section,
				position: index,
			}));
			queryClient.setQueryData(contestCriteriaKeys.sectionsList(contestId), newSectionsWithOrder);
			return { previousSections };
		},
		onError: (_err, _newSections, context) => {
			if (context?.previousSections) {
				queryClient.setQueryData(
					contestCriteriaKeys.sectionsList(contestId),
					context.previousSections,
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.sectionsList(contestId),
			});
		},
	});
}

// Criteria hooks
export function useCriteria(
	contestId?: string,
	options: Omit<UseQueryOptions<Criterion[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestCriteriaKeys.criteriaList(cid),
		queryFn: () => ContestCriteriaService.getCriteria({ contestId: cid }),
		enabled: !!cid,
		...options,
	});
}

export function useCriteriaById(
	id: string | undefined,
	contestId?: string,
	options: Omit<UseQueryOptions<Criterion, Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	const cid = contestId ? String(contestId) : getCurrentContestId();
	return useQuery({
		queryKey: contestCriteriaKeys.criteriaDetail(cid, id ?? ""),
		queryFn: () => ContestCriteriaService.getById({ id: id!, contestId: cid }),
		enabled: !!cid && !!id,
		...options,
	});
}

export function useAddCriteria() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (criterion: CriterionCreateData) =>
			ContestCriteriaService.addCriteria({ criterion, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
		},
	});
}

export function useUpdateCriteria() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: ({ id, criterion }: { id: string; criterion: CriterionUpdateData }) =>
			ContestCriteriaService.updateCriteria({ id, criterion, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
		},
	});
}

export function useDeleteCriteria() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (id: string) => ContestCriteriaService.deleteCriteria({ id, contestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
		},
	});
}

export function useUpdateCriteriaOrder() {
	const queryClient = useQueryClient();
	const contestId = getCurrentContestId();

	return useMutation({
		mutationFn: (newCriteriaItems: Criterion[]) =>
			ContestCriteriaService.updateCriteriaOrder({
				newCriteriaItems: newCriteriaItems.map((c) => ({
					id: c.id,
					order_in_section: c.order_in_section,
				})),
				contestId,
			}),
		onMutate: async (newCriteriaItems) => {
			await queryClient.cancelQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
			const previousCriteria = queryClient.getQueryData<Criterion[]>(
				contestCriteriaKeys.criteriaList(contestId),
			);
			queryClient.setQueryData(contestCriteriaKeys.criteriaList(contestId), newCriteriaItems);
			return { previousCriteria };
		},
		onError: (_err, _newCriteriaItems, context) => {
			if (context?.previousCriteria) {
				queryClient.setQueryData(
					contestCriteriaKeys.criteriaList(contestId),
					context.previousCriteria,
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: contestCriteriaKeys.criteriaList(contestId),
			});
		},
	});
}
