import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ContestCriteriaApi } from "../../services/contest-criteria/api";
import { Spin } from "antd";

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
  const [sections, setSections] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [criteriaLoading, setCriteriaLoading] = useState(false);

  const loadSections = async () => {
    setSectionsLoading(true);
    try {
      const data = await ContestCriteriaApi.getSections();
      setSections(data.sort((a, b) => a.position - b.position));
    } finally {
      setSectionsLoading(false);
    }
  };

  const loadCriteriaItems = async () => {
    setCriteriaLoading(true);
    try {
      const data = await ContestCriteriaApi.getCriteria();
      setCriteria(data);
    } finally {
      setCriteriaLoading(false);
    }
  };

  useEffect(() => {
    loadCriteriaItems();
  }, []);

  useEffect(() => {
    loadSections();
  }, []);

  const contextValue = useMemo(
    () => ({
      sections: {
        items: sections,
        setItems: setSections,
        loading: sectionsLoading,
        setLoading: setSectionsLoading,
      },
      criteria: {
        items: criteria,
        setItems: setCriteria,
        loading: criteriaLoading,
        setLoading: setCriteriaLoading,
      },
      loading: sectionsLoading || criteriaLoading,
    }),
    [sections, criteria, sectionsLoading, criteriaLoading],
  );

  return (
    <ContestCriteriaContext.Provider value={contextValue}>
      <Spin spinning={contextValue.loading}>
        {typeof children === "function" ? children(contextValue) : children}
      </Spin>
    </ContestCriteriaContext.Provider>
  );
};
