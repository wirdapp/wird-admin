import React from "react";
import { Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

export const CriteriaBasicFields: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        label={t("criteria-title")}
        name="label"
        rules={[{ required: true }]}
      >
        <Input placeholder={t("criteria-title")} />
      </Form.Item>
      <Form.Item
        label={t("criteria-description")}
        name="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder={t("criteria-description")} />
      </Form.Item>
      <Form.Item label={t("criteria-points")} name="points" initialValue={1}>
        <InputNumber min={1} />
      </Form.Item>
    </>
  );
};
