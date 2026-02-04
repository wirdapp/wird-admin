import React, { useCallback, useMemo } from "react";
import { App, Table } from "antd";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";
import { CriterionRecordAnswer } from "./criterion-record-answer";
import { CriterionRecordPoints } from "./criterion-record-points";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import dayjs from "dayjs";
import { useUpdatePointRecord } from "../../../services/contest-results/queries";
import type { Criterion, PointRecordUpdateData } from "../../../types";
import type { ColumnsType } from "antd/es/table";

interface PointRecordData {
  id: string;
  point_total: number;
  contest_criterion_data: {
    id: string;
    label: string;
  };
  resourcetype: string;
  record_date: string;
  person: string;
  timestamp: string;
  user_input?: string;
  number?: number;
  checked?: boolean;
  choices?: string[];
  choice?: string;
}

interface DailySubmissionsTableProps {
  submissions: PointRecordData[];
  onUpdated?: (record?: PointRecordData) => void;
  criteria: Criterion[];
}

interface UpdateRecordParams {
  record: PointRecordData;
  data: PointRecordUpdateData;
}

export const DailySubmissionsTable: React.FC<DailySubmissionsTableProps> = ({
  submissions,
  onUpdated,
  criteria,
}) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const updatePointRecord = useUpdatePointRecord();

  const onUpdateRecord = useCallback(
    async ({ record, data }: UpdateRecordParams): Promise<PointRecordData> => {
      try {
        const updatedRecord = await updatePointRecord.mutateAsync({
          recordId: record.id,
          date: record.record_date,
          userId: record.person,
          data,
        });
        message.success(t("saved-successfully"));
        onUpdated?.(updatedRecord as unknown as PointRecordData);
        return updatedRecord as unknown as PointRecordData;
      } catch (error) {
        message.error(t("failedToSave"));
      }
      return record;
    },
    [updatePointRecord, message, onUpdated, t],
  );

  const columns: ColumnsType<PointRecordData> = useMemo(
    () => [
      {
        render: (_: unknown, __: PointRecordData, index: number) => index + 1,
        width: 50,
      },
      {
        title: t("dailySubmissionsPopup.criteriaTitle"),
        dataIndex: ["contest_criterion_data", "label"],
        key: "title",
        width: 250,
      },
      {
        title: t("dailySubmissionsPopup.points"),
        key: "point_total",
        width: 200,
        render: (record: PointRecordData) => (
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
        render: (record: PointRecordData) => (
          <CriterionRecordAnswer
            pointRecord={record}
            criteria={criteria}
            onSave={onUpdateRecord}
          />
        ),
      },
      {
        title: t("dailySubmissionsPopup.lastUpdated"),
        dataIndex: "timestamp",
        key: "timestamp",
        render: (timestamp: string) => dayjs(timestamp).format("YYYY-MM-DD hh:mm A"),
      },
    ],
    [criteria, t, onUpdateRecord],
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
        scroll={{ x: 800 }}
        tableLayout={screens.md ? "fixed" : "auto"}
      />
    </div>
  );
};
