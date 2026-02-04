import { css } from "@emotion/css";
import { Col, Result, Row, Typography } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "../../ui/animated-page";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { ContestCriteriaProvider } from "./contest-criteria-context";
import { ContestPreview } from "./contest-preview";
import { SectionsList } from "./sections/sections-list";

export function ContestCriteria(): React.ReactElement {
	const { t } = useTranslation();
	const { currentUser } = useDashboardData();

	const canAccess = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	return (
		<AnimatedPage>
			{canAccess ? (
				<ContestCriteriaProvider>
					<Row gutter={24}>
						<Col
							span={24}
							lg={14}
							className={css`
                margin-bottom: 16px;
              `}
						>
							<SectionsList />
						</Col>
						<Col span={24} lg={10}>
							<div
								className={css`
                  @media (min-width: 992px) {
                    position: sticky;
                    top: 16px;
                  }
                `}
							>
								<Typography.Title level={3}>{t("preview")}</Typography.Title>
								<div
									className={css`
                    padding: 16px;
                    background-color: #f0f2f5;
                    min-height: 200px;
                  `}
								>
									<ContestPreview />
								</div>
							</div>
						</Col>
					</Row>
				</ContestCriteriaProvider>
			) : (
				<Result status="403" title={t("forbidden")} subTitle={t("notSuperAdmin")} />
			)}
		</AnimatedPage>
	);
}
