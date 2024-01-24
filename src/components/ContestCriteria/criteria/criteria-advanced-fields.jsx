import React, { useMemo } from "react";
import { Checkbox, Form, Select, Space } from "antd";
import { useDashboardData } from "../../../util/routes-data";
import { useTranslation } from "react-i18next";
import { getContestDays } from "../../../util/contest-utils";

export const CriteriaAdvancedFields = ({ form }) => {
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();
  const activateOnDates = Form.useWatch("activate_on_dates", form);
  const deactivateOnDates = Form.useWatch("deactivate_on_dates", form);

  const { activateOnDatesOptions, deactivateOnDatesOptions } = useMemo(() => {
    const contestDays = getContestDays(currentContest);
    const activateOnDatesOptions = [];
    const deactivateOnDatesOptions = [];
    for (const d of contestDays) {
      const value = d.format("YYYY-MM-DD");
      const label = d.format("dddd, DD MMMM YYYY");
      if (!deactivateOnDates?.includes(value)) {
        activateOnDatesOptions.push({ value, label });
      }
      if (!activateOnDates?.includes(value)) {
        deactivateOnDatesOptions.push({ value, label });
      }
    }
    return { activateOnDatesOptions, deactivateOnDatesOptions };
  }, [currentContest, activateOnDates, deactivateOnDates]);

  return (
    <>
      <Space size="large">
        <Form.Item name="visible" valuePropName="checked" initialValue={true}>
          <Checkbox>{t("criteria-visible")}</Checkbox>
        </Form.Item>
        <Form.Item name="active" valuePropName="checked" initialValue={true}>
          <Checkbox>{t("criteria-active")}</Checkbox>
        </Form.Item>
      </Space>
      <Form.Item name="activate_on_dates" label={t("criteria-show-on-dates")}>
        <Select options={activateOnDatesOptions} mode="multiple" />
      </Form.Item>
      <Form.Item name="deactivate_on_dates" label={t("criteria-hide-on-dates")}>
        <Select options={deactivateOnDatesOptions} mode="multiple" />
      </Form.Item>
    </>
  );
};
