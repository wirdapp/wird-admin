import React, { useState } from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import { PageTitle } from "../shared/page-title";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "./no-contest-yet";
import { getInviteLink } from "../../services/contests/utils";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { CopyButton } from "../../ui/copy-button";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

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
    <>
      <PageTitle>{t("contest-information")}</PageTitle>
      {contest ? (
        <ContestModeratorDefault>
          <div className="contest-details-wrapper">
            <Squares2X2Icon />
            <div className="contest-details">
              <h2>{contest.name}</h2>
              {contest.description && <h3>{contest.description}</h3>}
              <div className="invite-link">
                {t("join-code")}: <span>{contest.contest_id}</span>
                <CopyButton value={contest.contest_id} />
              </div>
              <div className="invite-link">
                {t("copy-link")}:{" "}
                <span>{getInviteLink(contest.contest_id)}</span>
                <CopyButton value={getInviteLink(contest.contest_id)} />
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
    </>
  );
}
