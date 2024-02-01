import React, { useMemo } from "react";
import { App, Table } from "antd";
import { useTranslation } from "react-i18next";
import { ContestResultsApi } from "../../../services/contest-results/api";
import { useDashboardData } from "../../../util/routes-data";
import { css } from "@emotion/css";
import { CriterionRecordAnswer } from "./criterion-record-answer";
import { CriterionRecordPoints } from "./criterion-record-points";

export const DailySubmissionsTable = ({ submissions, onClose, criteria }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();

  const onUpdateRecord = async ({ record, data }) => {
    try {
      await ContestResultsApi.updatePointRecord({
        contestId: currentContest.id,
        recordId: record.id,
        date: record.record_date,
        userId: record.person,
        data,
      });
      message.success(t("saved"));
    } catch (error) {
      message.error(t("failedToSave"));
    }
  };

  const columns = useMemo(
    () => [
      {
        render: (_, __, index) => index + 1,
      },
      {
        title: t("dailySubmissionsPopup.criteriaTitle"),
        dataIndex: ["contest_criterion_data", "label"],
        key: "title",
      },
      {
        title: t("dailySubmissionsPopup.points"),
        key: "point_total",
        render: (record, index) => (
          <CriterionRecordPoints
            pointRecord={record}
            criteria={criteria}
            onSave={onUpdateRecord}
          />
        ),
      },
      {
        title: t("dailySubmissionsPopup.answer"),
        key: "answer",
        render: (record, index) => (
          <CriterionRecordAnswer
            pointRecord={record}
            criteria={criteria}
            onSave={onUpdateRecord}
          />
        ),
      },
    ],
    [criteria, t],
  );

  return (
    <div
      className={css`
        margin: 0 -14px;
        @media (min-width: 768px) {
          margin: 0;
        }
      `}
    >
      <Table
        columns={columns}
        dataSource={submissions}
        pagination={false}
        rowKey="id"
        scroll={{ x: 500 }}
      />
    </div>
  );
};
