import { useEffect, useState } from "react";
import { ContestCriteriaApi } from "../../../services/contest-criteria/api";

export function useContestCriteria({ messageApi } = {}) {
  const [criteriaItems, setCriteriaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCriteriaItems = async () => {
    setLoading(true);
    try {
      const data = await ContestCriteriaApi.getCriteria();
      setCriteriaItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCriteriaItems();
  }, []);

  const add = async (criteria) => {
    const criteriaData = await ContestCriteriaApi.addCriteria({ criteria });
    setCriteriaItems([...criteriaItems, criteriaData]);
  };

  const update = async (id, criteria) => {
    const criteriaData = await ContestCriteriaApi.updateCriteria({
      id,
      criteria,
    });
    const index = criteriaItems.findIndex((criteria) => criteria.id === id);
    const newCriteriaItems = [...criteriaItems];
    newCriteriaItems[index] = criteriaData;
    setCriteriaItems(newCriteriaItems);
  };

  const remove = async (id) => {
    await ContestCriteriaApi.deleteCriteria({ id });
    const newCriteriaItems = criteriaItems.filter(
      (criteria) => criteria.id !== id,
    );
    setCriteriaItems(newCriteriaItems);
  };

  return {
    items: criteriaItems,
    setItems: setCriteriaItems,
    loading,
    add,
    update,
    remove,
  };
}
