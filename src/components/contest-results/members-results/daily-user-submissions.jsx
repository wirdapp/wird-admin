import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../../util/routes-data";
import dayjs from "dayjs";
import { ContestResultsApi } from "../../../services/contest-results/api";
import { ContestCriteriaApi } from "../../../services/contest-criteria/api";
import { DailySubmissionsTable } from "./daily-submissions-table";

export const DailyUserSubmissions = ({ onUpdated, userId }) => {
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [form] = Form.useForm();
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    if (!currentContest) return;
    ContestCriteriaApi.getCriteria({ contestId: currentContest.id }).then(
      (res) => {
        setCriteria(res);
      },
    );
  }, [currentContest]);

  useEffect(() => {
    setSubmissions([]);
    form.resetFields();
  }, [userId, form]);

  const loadSubmissions = async (date) => {
    setLoading(true);
    try {
      const res = await ContestResultsApi.getMemberDaySubmissions({
        userId,
        date: date.format("YYYY-MM-DD"),
      });
      setSubmissions(res.points);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFormFinish = async (values) => {
    await loadSubmissions(values.date);
  };

  const afterRecordUpdate = (record) => {
    const index = submissions.findIndex((r) => r.id === record.id);
    if (index !== -1) {
      const newSubmissions = [...submissions];
      newSubmissions[index] = record;
      setSubmissions(newSubmissions);
    }
    onUpdated?.(record);
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
        criteria={criteria}
        onUpdated={afterRecordUpdate}
      />
    </div>
  );
};
