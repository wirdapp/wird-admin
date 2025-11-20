import React, { useEffect } from "react";
import { Fieldset } from "./EditProfile.styled";
import { css } from "@emotion/css";
import { Button, Form, Input, Space } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";

export const UserDetailsForm = ({ onSubmit }) => {
  const { currentUser } = useDashboardData();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const resetForm = () => {
    form.setFieldsValue({
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
    });
  };

  useEffect(() => {
    resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onFinish={onSubmit}
      onReset={resetForm}
      layout="vertical"
      form={form}
      style={{ flexGrow: 1 }}
    >
      <Fieldset
        className={css`
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        `}
      >
        <legend>{t("user-details")}</legend>
        <Form.Item label={t("email")}>
          <Input disabled value={currentUser.email} />
        </Form.Item>
        <Form.Item label={t("username")}>
          <Input disabled value={currentUser.username} />
        </Form.Item>
        <Form.Item name="first_name" label={t("first-name")}>
          <Input placeholder={t("first-name")} />
        </Form.Item>
        <Form.Item name="last_name" label={t("last-name")}>
          <Input placeholder={t("last-name")} />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {t("save")}
          </Button>
          <Button type="text" htmlType="reset">
            {t("cancel")}
          </Button>
        </Space>
      </Fieldset>
    </Form>
  );
};
