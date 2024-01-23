import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { ResultsOverview } from "./results-overview/results-overview";
import { AnimatedPage } from "../../ui/animated-page";
import { useNavigate, useParams } from "react-router-dom";
import { MembersResults } from "./members-results/members-results";

export const ContestResults = () => {
  const { t } = useTranslation();
  const { tab: tabParam } = useParams();
  const navigate = useNavigate();

  const onTabChange = (tab) => {
    navigate(`../results/${tab}`);
  };

  return (
    <AnimatedPage>
      <Tabs
        activeKey={tabParam}
        onChange={onTabChange}
        items={[
          {
            key: "overview",
            label: t("results-overview"),
            children: <ResultsOverview />,
          },
          {
            key: "members",
            label: t("results-members"),
            children: <MembersResults />,
          },
        ]}
      />
    </AnimatedPage>
  );
};
