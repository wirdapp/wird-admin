import { css } from "@emotion/css";
import { Empty, Tabs } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ContestStatus } from "../../services/contests/utils";
import { AnimatedPage } from "../../ui/animated-page";
import { useDashboardData } from "../../util/routes-data";
import { MembersResults } from "./members-results/members-results";
import { ResultsOverview } from "./results-overview/results-overview";

export const ContestResults: React.FC = () => {
	const { t } = useTranslation();
	const { tab: tabParam } = useParams<{ tab: string }>();
	const navigate = useNavigate();
	const { currentContest } = useDashboardData();

	const onTabChange = (tab: string): void => {
		navigate(`../results/${tab}`);
	};

	return (
		<AnimatedPage
			className={css`
        height: 100%;
      `}
		>
			{currentContest?.status === ContestStatus.NOT_STARTED ? (
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
