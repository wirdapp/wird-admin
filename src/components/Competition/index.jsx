import React from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import { useDashboardData } from "../../util/routes-data";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { AnimatedPage } from "../../ui/animated-page";
import { ContestDetailsBox } from "./contest-details-box";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { StyledAnnouncementWrapper } from "./styles";

const StyledContestEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export default function Competition() {
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();

  return (
    <AnimatedPage>
      <ContestModeratorDefault>
        <ContestDetailsBox />

        <ContestMembers contest={currentContest} />
        <StyledContestEditWrapper>
          <StyledAnnouncementWrapper>
            <Alert.ErrorBoundary
              message={t("something-went-wrong")}
              description=""
            >
              <ManageAnnouncements />
            </Alert.ErrorBoundary>
          </StyledAnnouncementWrapper>
          <EditCompetitionForm contest={currentContest} />
        </StyledContestEditWrapper>
      </ContestModeratorDefault>
    </AnimatedPage>
  );
}
