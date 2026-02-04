import React from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import { useDashboardData } from "../../util/routes-data";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { AnimatedPage } from "../../ui/animated-page";
import { ContestDetailsBox } from "./contest-details-box";
import { Alert, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { StyledAnnouncementWrapper } from "./styles";
import { ContestDeleteSection } from "./ContestMembers/contest-delete-section";

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
            <Alert.ErrorBoundary
              message={t("something-went-wrong")}
              description=""
            >
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
