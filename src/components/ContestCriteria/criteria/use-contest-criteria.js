import { useContestCriteriaContext } from "../contest-criteria-context";
import { useMemo } from "react";
import {
  useAddCriteria,
  useUpdateCriteria,
  useDeleteCriteria,
  useUpdateCriteriaOrder,
} from "../../../services/contest-criteria/queries";
import { ContestCriteriaApi } from "../../../services/contest-criteria/api";

export function useContestCriteria({ sectionId } = {}) {
  const { criteria } = useContestCriteriaContext();
  const addCriteriaMutation = useAddCriteria();
  const updateCriteriaMutation = useUpdateCriteria();
  const deleteCriteriaMutation = useDeleteCriteria();
  const updateCriteriaOrderMutation = useUpdateCriteriaOrder();

  const getById = async (id) => {
    return await ContestCriteriaApi.getById({ id });
  };

  const add = async (criterion) => {
    await addCriteriaMutation.mutateAsync(criterion);
  };

  const update = async (id, criterion) => {
    await updateCriteriaMutation.mutateAsync({ id, criterion });
  };

  const remove = async (id) => {
    await deleteCriteriaMutation.mutateAsync(id);
  };

  const updateOrder = async (newCriteriaItems) => {
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
        (s) => s.section_info.id === sectionId,
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
