import React from "react";
import { Form, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

export const BoundsInput = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (type, val) => {
    const newValue = [...(value ?? [])];
    newValue[type === "min" ? 0 : 1] = val;
    onChange(newValue);
  };

  return (
    <>
      <Form.Item label={t("criteria-min")}>
        <InputNumber
          value={value?.[0]}
          onChange={(val) => handleChange("min", val)}
        />
      </Form.Item>
      <Form.Item label={t("criteria-max")}>
        <InputNumber
          value={value?.[1]}
          onChange={(val) => handleChange("max", val)}
        />
      </Form.Item>
    </>
  );
};
