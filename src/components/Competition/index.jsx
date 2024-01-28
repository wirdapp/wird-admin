import React from "react";
import EditCompetitionForm from "./EditCompetitionForm";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { getInviteLink } from "../../services/contests/utils";
import { ManageAnnouncements } from "./manage-announcements";
import styled from "@emotion/styled";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { AnimatedPage } from "../../ui/animated-page";
import { Space, Typography } from "antd";
import { ContestBadge } from "./contest-badge";

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
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <ContestModeratorDefault>
        <div className="contest-details-wrapper">
          <Squares2X2Icon />
          <div className="contest-details">
            <h2>
              <Space>
                {currentContest.name}
                <ContestBadge status={currentContest.status} />
              </Space>
            </h2>
            {currentContest.description && (
              <h3>{currentContest.description}</h3>
            )}

            <div className="contest-detail-item">
              {t("start-date")}:{" "}
              <Typography.Text>
                {currentContest.start_date.format("dddd, DD MMM YYYY")}
              </Typography.Text>
            </div>

            <div className="contest-detail-item">
              {t("end-date")}:{" "}
              <Typography.Text>
                {currentContest.end_date.format("dddd, DD MMM YYYY")}
              </Typography.Text>
            </div>

            <div className="contest-detail-item">
              {t("join-code")}:{" "}
              <Typography.Text copyable>
                {currentContest.contest_id}
              </Typography.Text>
            </div>
            <div className="contest-detail-item">
              {t("copy-link")}:{" "}
              <Typography.Text copyable>
                {getInviteLink(currentContest.contest_id)}
              </Typography.Text>
            </div>
          </div>
        </div>

        <ContestMembers contest={currentContest} />
        <StyledContestEditWrapper>
          <ManageAnnouncements />
          <EditCompetitionForm contest={currentContest} />
        </StyledContestEditWrapper>
      </ContestModeratorDefault>
    </AnimatedPage>
  );
}
