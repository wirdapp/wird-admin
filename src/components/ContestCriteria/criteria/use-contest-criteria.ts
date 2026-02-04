import { useContestCriteriaContext } from '../contest-criteria-context';
import { useMemo } from 'react';
import {
  useAddCriteria,
  useUpdateCriteria,
  useDeleteCriteria,
  useUpdateCriteriaOrder,
} from '../../../services/contest-criteria/queries';
import { ContestCriteriaService } from '../../../services/contest-criteria/contest-criteria.service';
import type { Criterion, CriterionCreateData, CriterionUpdateData, UUID } from '../../../types';

interface UseContestCriteriaOptions {
  sectionId?: UUID;
}

interface UseContestCriteriaReturn {
  criteriaItems: Criterion[];
  loading: boolean;
  actions: {
    getById: (id: string) => Promise<Criterion>;
    add: (criterion: CriterionCreateData) => Promise<void>;
    update: (id: string, criterion: CriterionUpdateData) => Promise<void>;
    remove: (id: string) => Promise<void>;
    updateOrder: (newCriteriaItems: Criterion[]) => Promise<Criterion[]>;
  };
}

export function useContestCriteria({ sectionId }: UseContestCriteriaOptions = {}): UseContestCriteriaReturn {
  const { criteria } = useContestCriteriaContext();
  const addCriteriaMutation = useAddCriteria();
  const updateCriteriaMutation = useUpdateCriteria();
  const deleteCriteriaMutation = useDeleteCriteria();
  const updateCriteriaOrderMutation = useUpdateCriteriaOrder();

  const getById = async (id: string): Promise<Criterion> => {
    return await ContestCriteriaService.getById({ id });
  };

  const add = async (criterion: CriterionCreateData): Promise<void> => {
    await addCriteriaMutation.mutateAsync(criterion);
  };

  const update = async (id: string, criterion: CriterionUpdateData): Promise<void> => {
    await updateCriteriaMutation.mutateAsync({ id, criterion });
  };

  const remove = async (id: string): Promise<void> => {
    await deleteCriteriaMutation.mutateAsync(id);
  };

  const updateOrder = async (newCriteriaItems: Criterion[]): Promise<Criterion[]> => {
    const newCriteriaItemsWithPositions = criteria.items.map((criterion) => {
      const newIndex = newCriteriaItems.findIndex((c) => c.id === criterion.id);
      return {
        ...criterion,
        order_in_section:
          newIndex !== -1 ? newIndex : criterion.order_in_section,
      };
    });
    return await updateCriteriaOrderMutation.mutateAsync(newCriteriaItemsWithPositions);
  };

  const criteriaItems = useMemo(() => {
    if (!criteria.items) return [];
    let items = criteria.items;
    if (sectionId) {
      items = criteria.items.filter(
        (s) => s.section_info?.id === sectionId,
      );
    }
    return items.sort(
      (a, b) => a.order_in_section - b.order_in_section,
    );
  }, [criteria.items, sectionId]);

  return {
    criteriaItems,
    loading: criteria.loading,
    actions: {
      getById,
      add,
      update,
      remove,
      updateOrder,
    },
  };
}
