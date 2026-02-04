import React, { createContext, useContext, useMemo, useCallback, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Spin } from 'antd';
import {
  useSections,
  useCriteria,
  contestCriteriaKeys,
} from '../../services/contest-criteria/queries';
import { getCurrentContestId } from '../../services/contests/utils';
import type { Section, Criterion } from '../../types';

interface ItemsState<T> {
  items: T[];
  setItems: (items: T[] | ((prev: T[]) => T[])) => void;
  loading: boolean;
  setLoading: () => void;
}

interface ContestCriteriaContextValue {
  sections: ItemsState<Section>;
  criteria: ItemsState<Criterion>;
  loading: boolean;
}

const defaultContextValue: ContestCriteriaContextValue = {
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
};

const ContestCriteriaContext = createContext<ContestCriteriaContextValue>(defaultContextValue);

export const useContestCriteriaContext = () =>
  useContext(ContestCriteriaContext);

interface ContestCriteriaProviderProps {
  children: ReactNode | ((context: ContestCriteriaContextValue) => ReactNode);
}

export const ContestCriteriaProvider = ({ children }: ContestCriteriaProviderProps) => {
  const queryClient = useQueryClient();
  const contestId = getCurrentContestId();

  const { data: sections = [], isLoading: sectionsLoading } = useSections();
  const { data: criteria = [], isLoading: criteriaLoading } = useCriteria();

  // These setItems functions update the query cache directly for optimistic updates
  const setSections = useCallback((newSections: Section[] | ((prev: Section[]) => Section[])) => {
    queryClient.setQueryData(
      contestCriteriaKeys.sectionsList(contestId),
      (prev: Section[] | undefined) => typeof newSections === 'function' ? newSections(prev ?? []) : newSections
    );
  }, [queryClient, contestId]);

  const setCriteria = useCallback((newCriteria: Criterion[] | ((prev: Criterion[]) => Criterion[])) => {
    queryClient.setQueryData(
      contestCriteriaKeys.criteriaList(contestId),
      (prev: Criterion[] | undefined) => typeof newCriteria === 'function' ? newCriteria(prev ?? []) : newCriteria
    );
  }, [queryClient, contestId]);

  const contextValue = useMemo<ContestCriteriaContextValue>(
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
        {typeof children === 'function' ? children(contextValue) : children}
      </Spin>
    </ContestCriteriaContext.Provider>
  );
};
