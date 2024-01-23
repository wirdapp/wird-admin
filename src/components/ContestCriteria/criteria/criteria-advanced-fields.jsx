import React from "react";
import { css } from "@emotion/css";
import { Checkbox, Form, Select, Switch, Typography } from "antd";
import { getContestDays } from "../../../util/contest-utils";
import { useDashboardData } from "../../../util/routes-data";
import { useTranslation } from "react-i18next";

export const CriteriaAdvancedFields = () => {
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();
  const [partiallyAvailable, setPartiallyAvailable] = React.useState(false);

  return (
    <>
      <Form.Item
        label={t("visibility")}
        name="visible"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch
          checkedChildren={t("visible")}
          unCheckedChildren={t("hidden")}
        />
      </Form.Item>
      <fieldset
        className={css`
          border: 1px solid #d9d9d9;
          padding: 16px;
          border-radius: 8px;
        `}
      >
        <legend
          className={css`
            width: auto !important;
            padding: 0 8px !important;
            border: none !important;
            margin: 0 !important;
          `}
        >
          <Form.Item name="partially_available" valuePropName="checked" noStyle>
            <Checkbox
              value={partiallyAvailable}
              onChange={(e) => setPartiallyAvailable(e.target.checked)}
            >
              {t("criteria-partially-available")}
            </Checkbox>
          </Form.Item>
        </legend>
        {partiallyAvailable ? (
          <Form.Item label={t("criteria-days-available")} name="days_available">
            <Select
              mode="multiple"
              placeholder={t("criteria-days-available")}
              options={[...getContestDays(currentContest)].map((day) => ({
                label: day.format("dddd, MMMM Do YYYY"),
                value: day.format("YYYY-MM-DD"),
              }))}
            />
          </Form.Item>
        ) : (
          <Typography.Text type="secondary">
            {t("criteria-partially-available-description")}
          </Typography.Text>
        )}
      </fieldset>
    </>
  );
};
