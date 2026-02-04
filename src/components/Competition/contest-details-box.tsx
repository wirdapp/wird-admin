import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Space, Typography } from "antd";
import { ContestBadge } from "./contest-badge";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { ContestDetailBox } from "./styles";
import { getCountryFlagElement, getCountryName } from "../../data/countries";
import dayjs from "dayjs";

export const ContestDetailsBox: React.FC = () => {
  const { currentContest } = useDashboardData();
  const { t, i18n } = useTranslation();

  if (!currentContest) {
    return null;
  }

  const Flag = getCountryFlagElement(currentContest.country, i18n.language);

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
          {t("country")}:{" "}
          <Typography.Text>
            {currentContest.country && (
              <Space>
                <Flag style={{ display: "block", width: 24 }} />
                {getCountryName(currentContest.country, i18n.language)}
              </Space>
            )}
          </Typography.Text>
        </div>

        <div className="contest-detail-item">
          {t("start-date")}:{" "}
          <Typography.Text>
            {dayjs(currentContest.start_date)
              .locale(i18n.language)
              .format("dddd, DD MMM YYYY")}
          </Typography.Text>
        </div>

        <div className="contest-detail-item">
          {t("end-date")}:{" "}
          <Typography.Text>
            {dayjs(currentContest.end_date)
              .locale(i18n.language)
              .format("dddd, DD MMM YYYY")}
          </Typography.Text>
        </div>

        <div className="contest-detail-item preformatted">
          {t("join-code")}:{" "}
          <Typography.Text copyable>
            {currentContest.contest_id}
          </Typography.Text>
        </div>
      </div>
    </ContestDetailBox>
  );
};
