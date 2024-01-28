import React from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import { useDashboardData } from "../../util/routes-data";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { AnimatedPage } from "../../ui/animated-page";
import { ContestDetailsBox } from "./contest-details-box";

const StyledContestEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export default function Competition() {
  const { currentContest } = useDashboardData();

  return (
    <AnimatedPage>
      <ContestModeratorDefault>
        <ContestDetailsBox />

        <ContestMembers contest={currentContest} />
        <StyledContestEditWrapper>
          <ManageAnnouncements />
          <EditCompetitionForm contest={currentContest} />
        </StyledContestEditWrapper>
      </ContestModeratorDefault>
    </AnimatedPage>
  );
}
