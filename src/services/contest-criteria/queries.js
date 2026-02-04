import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContestCriteriaApi } from './api';
import { getCurrentContestId } from '../contests/utils';

export const contestCriteriaKeys = {
  all: ['contestCriteria'],
  sections: () => [...contestCriteriaKeys.all, 'sections'],
  sectionsList: (contestId) => [...contestCriteriaKeys.sections(), 'list', { contestId }],
  criteria: () => [...contestCriteriaKeys.all, 'criteria'],
  criteriaList: (contestId) => [...contestCriteriaKeys.criteria(), 'list', { contestId }],
  criteriaDetail: (contestId, id) => [...contestCriteriaKeys.criteria(), 'detail', { contestId, id }],
};

// Sections hooks
export function useSections(contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestCriteriaKeys.sectionsList(cid),
    queryFn: async () => {
      const data = await ContestCriteriaApi.getSections({ contestId: cid });
      return data.sort((a, b) => a.position - b.position);
    },
    enabled: !!cid,
    ...options,
  });
}

export function useAddSection() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (section) => ContestCriteriaApi.addSection({ section, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.sectionsList(contestId) });
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ id, section }) => ContestCriteriaApi.updateSection({ id, section, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.sectionsList(contestId) });
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (id) => ContestCriteriaApi.deleteSection({ id, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.sectionsList(contestId) });
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
    },
  });
}

export function useUpdateSectionsOrder() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (newSections) => ContestCriteriaApi.updateSectionsOrder({ newSections, contestId }),
    onMutate: async (newSections) => {
      await queryClient.cancelQueries({ queryKey: contestCriteriaKeys.sectionsList(contestId) });
      const previousSections = queryClient.getQueryData(contestCriteriaKeys.sectionsList(contestId));
      const newSectionsWithPositions = newSections.map((section, index) => ({
        ...section,
        position: index,
      }));
      queryClient.setQueryData(contestCriteriaKeys.sectionsList(contestId), newSectionsWithPositions);
      return { previousSections };
    },
    onError: (err, newSections, context) => {
      queryClient.setQueryData(contestCriteriaKeys.sectionsList(contestId), context.previousSections);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.sectionsList(contestId) });
    },
  });
}

// Criteria hooks
export function useCriteria(contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestCriteriaKeys.criteriaList(cid),
    queryFn: () => ContestCriteriaApi.getCriteria({ contestId: cid }),
    enabled: !!cid,
    ...options,
  });
}

export function useCriteriaById(id, contestId, options = {}) {
  const cid = contestId ?? getCurrentContestId();
  return useQuery({
    queryKey: contestCriteriaKeys.criteriaDetail(cid, id),
    queryFn: () => ContestCriteriaApi.getById({ id, contestId: cid }),
    enabled: !!cid && !!id,
    ...options,
  });
}

export function useAddCriteria() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (criterion) => ContestCriteriaApi.addCriteria({ criterion, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
    },
  });
}

export function useUpdateCriteria() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: ({ id, criterion }) => ContestCriteriaApi.updateCriteria({ id, criterion, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
    },
  });
}

export function useDeleteCriteria() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (id) => ContestCriteriaApi.deleteCriteria({ id, contestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
    },
  });
}

export function useUpdateCriteriaOrder() {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  return useMutation({
    mutationFn: (newCriteriaItems) => ContestCriteriaApi.updateCriteriaOrder({ newCriteriaItems, contestId }),
    onMutate: async (newCriteriaItems) => {
      await queryClient.cancelQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
      const previousCriteria = queryClient.getQueryData(contestCriteriaKeys.criteriaList(contestId));
      queryClient.setQueryData(contestCriteriaKeys.criteriaList(contestId), newCriteriaItems);
      return { previousCriteria };
    },
    onError: (err, newCriteriaItems, context) => {
      queryClient.setQueryData(contestCriteriaKeys.criteriaList(contestId), context.previousCriteria);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: contestCriteriaKeys.criteriaList(contestId) });
    },
  });
}
