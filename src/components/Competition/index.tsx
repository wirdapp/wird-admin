import styled from "@emotion/styled";
import { Alert, Flex } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "../../ui/animated-page";
import { useDashboardData } from "../../util/routes-data";
import ContestMembers from "./ContestMembers";
import { ContestDeleteSection } from "./ContestMembers/contest-delete-section";
import { ContestDetailsBox } from "./contest-details-box";
import EditCompetitionForm from "./EditCompetitionForm";
import { ManageAnnouncements } from "./manage-announcements";
import { StyledAnnouncementWrapper } from "./styles";

const StyledContestEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Competition: React.FC = () => {
	const { t } = useTranslation();
	const { currentContest } = useDashboardData();

	if (!currentContest) {
		return null;
	}

	return (
		<AnimatedPage>
			<Flex vertical gap={24}>
				<ContestDetailsBox />

				<ContestMembers />
				<StyledContestEditWrapper>
					<EditCompetitionForm contest={currentContest} />
					<StyledAnnouncementWrapper>
						<Alert.ErrorBoundary message={t("something-went-wrong")} description="">
							<ManageAnnouncements />
						</Alert.ErrorBoundary>
						<ContestDeleteSection />
					</StyledAnnouncementWrapper>
				</StyledContestEditWrapper>
			</Flex>
		</AnimatedPage>
	);
};

export default Competition;
