import { createContext, useContext, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import {
  useSections,
  useCriteria,
  contestCriteriaKeys,
} from "../../services/contest-criteria/queries";
import { getCurrentContestId } from "../../services/contests/utils";

const ContestCriteriaContext = createContext({
  sections: {
    items: [],
    setItems: () => {},
    loading: false,
    setLoading: () => {},
  },
  criteria: {
    items: [],
    setItems: () => {},
    loading: false,
    setLoading: () => {},
  },
  loading: false,
});

export const useContestCriteriaContext = () =>
  useContext(ContestCriteriaContext);

export const ContestCriteriaProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  const { data: sections = [], isLoading: sectionsLoading } = useSections();
  const { data: criteria = [], isLoading: criteriaLoading } = useCriteria();

  // These setItems functions update the query cache directly for optimistic updates
  const setSections = useCallback((newSections) => {
    queryClient.setQueryData(
      contestCriteriaKeys.sectionsList(contestId),
      (prev) => typeof newSections === 'function' ? newSections(prev) : newSections
    );
  }, [queryClient, contestId]);

  const setCriteria = useCallback((newCriteria) => {
    queryClient.setQueryData(
      contestCriteriaKeys.criteriaList(contestId),
      (prev) => typeof newCriteria === 'function' ? newCriteria(prev) : newCriteria
    );
  }, [queryClient, contestId]);

  const contextValue = useMemo(
    () => ({
      sections: {
        items: sections,
        setItems: setSections,
        loading: sectionsLoading,
        setLoading: () => {},
      },
      criteria: {
        items: criteria,
        setItems: setCriteria,
        loading: criteriaLoading,
        setLoading: () => {},
      },
      loading: sectionsLoading || criteriaLoading,
    }),
    [sections, criteria, sectionsLoading, criteriaLoading, setSections, setCriteria],
  );

  return (
    <ContestCriteriaContext.Provider value={contextValue}>
      <Spin spinning={contextValue.loading}>
        {typeof children === "function" ? children(contextValue) : children}
      </Spin>
    </ContestCriteriaContext.Provider>
  );
};
