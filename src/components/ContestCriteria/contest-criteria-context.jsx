import { createContext, useContext, useMemo } from "react";
import { useContestSections } from "./sections/use-contest-sections";
import { useContestCriteria } from "./criteria/use-contest-criteria";

const ContestCriteriaContext = createContext({
  sections: {
    items: [],
    setItems: () => {},
    add: () => {},
    update: () => {},
    remove: () => {},
    saveAll: () => {},
    loading: false,
  },
  criteria: {
    items: [],
    setItems: () => {},
    add: () => {},
    update: () => {},
    remove: () => {},
    saveAll: () => {},
    loading: false,
  },
  loading: false,
});

export const useContestCriteriaContext = () =>
  useContext(ContestCriteriaContext);

export const ContestCriteriaProvider = ({ children }) => {
  const sections = useContestSections();
  const criteria = useContestCriteria();

  const contextValue = useMemo(
    () => ({
      sections,
      criteria,
      loading: sections.loading || criteria.loading,
    }),
    [sections, criteria],
  );

  return (
    <ContestCriteriaContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </ContestCriteriaContext.Provider>
  );
};
