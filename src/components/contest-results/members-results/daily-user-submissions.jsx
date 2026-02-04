import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../../util/routes-data";
import dayjs from "dayjs";
import { DailySubmissionsTable } from "./daily-submissions-table";
import { useMemberDaySubmissions } from "../../../services/contest-results/queries";
import { useCriteria } from "../../../services/contest-criteria/queries";

export const DailyUserSubmissions = ({ onUpdated, userId }) => {
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: criteriaData = [] } = useCriteria(currentContest?.id);
  const { data: submissionsData, isLoading: loading, refetch } = useMemberDaySubmissions(
    userId,
    selectedDate,
    currentContest?.id
  );

  const submissions = submissionsData?.points ?? [];

  useEffect(() => {
    setSelectedDate(null);
    form.resetFields();
  }, [userId, form]);

  const onFormFinish = async (values) => {
    setSelectedDate(values.date.format("YYYY-MM-DD"));
  };

  const afterRecordUpdate = () => {
    refetch();
    onUpdated?.();
  };

  return (
    <div>
      <Form
        form={form}
        layout="inline"
        onFinish={onFormFinish}
        style={{ marginBottom: 24 }}
      >
        <Form.Item
          label={t("dailySubmissionsPopup.date")}
          name="date"
          rules={[{ required: true, message: t("requiredField") }]}
          initialValue={currentContest.start_date}
        >
          <DatePicker
            disabledDate={(current) => {
              // Can not select days before today and today
              return (
                current &&
                (dayjs(currentContest.start_date)
                  .startOf("day")
                  .isAfter(current) ||
                  dayjs(currentContest.end_date).endOf("day").isBefore(current))
              );
            }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t("dailySubmissionsPopup.load")}
        </Button>
      </Form>
      <DailySubmissionsTable
        submissions={submissions}
        criteria={criteriaData}
        onUpdated={afterRecordUpdate}
      />
    </div>
  );
};
