import React from "react";
import { usePageTitle } from "../shared/page-title";
import { useTranslation } from "react-i18next";
import { Tabs } from "../../ui/tabs";
import { ResultsOverview } from "./results-overview";
import { AnimatedPage } from "../../ui/animated-page";
import { useSearchParams } from "react-router-dom";

export const ContestResults = () => {
  const { t } = useTranslation();
  usePageTitle(t("results-page"));
  const [searchParams, setSearchParams] = useSearchParams();

  const onTabChange = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <AnimatedPage>
      <Tabs
        activeKey={searchParams.get("tab") || "results"}
        onChange={onTabChange}
        items={[
          {
            key: "results",
            title: t("results-overview"),
            content: <ResultsOverview />,
          },
          {
            key: "members",
            title: t("results-members"),
            content: <span>Submissions</span>,
          },
        ]}
      />
    </AnimatedPage>
  );
};
