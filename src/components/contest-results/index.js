import React from "react";
import { useTranslation } from "react-i18next";
import { Empty, Tabs } from "antd";
import { ResultsOverview } from "./results-overview/results-overview";
import { AnimatedPage } from "../../ui/animated-page";
import { useNavigate, useParams } from "react-router-dom";
import { MembersResults } from "./members-results/members-results";
import { css } from "@emotion/css";
import { useDashboardData } from "../../util/routes-data";
import { ContestStatus } from "../../services/contests/utils";

export const ContestResults = () => {
  const { t } = useTranslation();
  const { tab: tabParam } = useParams();
  const navigate = useNavigate();
  const { currentContest } = useDashboardData();

  const onTabChange = (tab) => {
    navigate(`../results/${tab}`);
  };

  return (
    <AnimatedPage
      className={css`
        height: 100%;
      `}
    >
      {currentContest.status === ContestStatus.NOT_STARTED ? (
        <Empty
          description={t("contestNotStarted")}
          className={css`
            margin-top: 50px;
          `}
        />
      ) : (
        <Tabs
          className={css`
            height: 100%;

            .ant-tabs-tabpane,
            .ant-tabs-content {
              height: 100%;
            }
          `}
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
      )}
    </AnimatedPage>
  );
};
