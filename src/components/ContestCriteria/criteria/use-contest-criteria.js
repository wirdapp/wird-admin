import { ContestCriteriaApi } from "../../../services/contest-criteria/api";
import { useContestCriteriaContext } from "../contest-criteria-context";
import { useMemo } from "react";

export function useContestCriteria({ sectionId } = {}) {
  const { criteria } = useContestCriteriaContext();

  const getById = async (id) => {
    return await ContestCriteriaApi.getById({ id });
  };

  const add = async (criterion) => {
    const criteriaData = await ContestCriteriaApi.addCriteria({ criterion });
    criteria.setItems([...criteria.items, criteriaData]);
  };

  const update = async (id, criterion) => {
    const criteriaData = await ContestCriteriaApi.updateCriteria({
      id,
      criterion,
    });
    const index = criteria.items.findIndex((c) => c.id === id);
    const newCriteriaItems = [...criteria.items];
    newCriteriaItems[index] = criteriaData;
    criteria.setItems(newCriteriaItems);
  };

  const remove = async (id) => {
    await ContestCriteriaApi.deleteCriteria({ id });
    const newCriteriaItems = criteria.items.filter(
      (criteria) => criteria.id !== id,
    );
    criteria.setItems(newCriteriaItems);
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
    criteria.setItems(newCriteriaItemsWithPositions);
    return await ContestCriteriaApi.updateCriteriaOrder({
      newCriteriaItems: newCriteriaItemsWithPositions,
    });
  };

  const criteriaItems = useMemo(() => {
    if (!criteria.items) return [];
    let criteriaItems = criteria.items;
    if (sectionId) {
      criteriaItems = criteria.items.filter((s) => s.section === sectionId);
    }
    return criteriaItems.sort(
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
