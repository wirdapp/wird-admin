import React, { useState } from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "./no-contest-yet";
import { getInviteLink } from "../../services/contests/utils";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { AnimatedPage } from "../../ui/animated-page";
import { Typography } from "antd";

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
  const [contest, setContest] = useState(currentContest);
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      {contest ? (
        <ContestModeratorDefault>
          <div className="contest-details-wrapper">
            <Squares2X2Icon />
            <div className="contest-details">
              <h2>{contest.name}</h2>
              {contest.description && <h3>{contest.description}</h3>}
              <div className="invite-link">
                {t("join-code")}:{" "}
                <Typography.Text copyable>{contest.contest_id}</Typography.Text>
              </div>
              <div className="invite-link">
                {t("copy-link")}:{" "}
                <Typography.Text copyable>
                  {getInviteLink(contest.contest_id)}
                </Typography.Text>
              </div>
            </div>
          </div>

          <ContestMembers contest={contest} />
          <StyledContestEditWrapper>
            <ManageAnnouncements />
            <EditCompetitionForm contest={contest} onChange={setContest} />
          </StyledContestEditWrapper>
        </ContestModeratorDefault>
      ) : (
        <NoContestYet />
      )}
    </AnimatedPage>
  );
}
