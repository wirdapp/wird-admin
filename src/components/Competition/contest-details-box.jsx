import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Space, Typography } from "antd";
import { ContestBadge } from "./contest-badge";
import { getInviteLink } from "../../services/contests/utils";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { ContestDetailBox } from "./styles";

export const ContestDetailsBox = () => {
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();

  return (
    <ContestDetailBox>
      <Squares2X2Icon />
      <div className="contest-details">
        <h2>
          <Space>
            {currentContest.name}
            <ContestBadge status={currentContest.status} />
          </Space>
        </h2>
        {currentContest.description && <h3>{currentContest.description}</h3>}

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
    </ContestDetailBox>
  );
};
