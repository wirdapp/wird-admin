import React from "react";
import { Fieldset } from "./EditProfile.styled";
import { css } from "@emotion/css";
import { Button, Form, Input, message, Space } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { changePassword } from "../../services/auth/api";

export const ChangePasswordForm = () => {
  const { currentUser } = useDashboardData();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    try {
      await changePassword(values);
      form.reset();
      message.success(t("password-has-been-changed-successfully"));
    } catch (err) {
      let errMessages = [];
      if (err.response.data) {
        let obj = err.response.data;
        Object.keys(obj).forEach((e) => {
          errMessages.push(`${obj[e]} : ${e}`);
        });
      }
      message.error(errMessages ?? t("something-went-wrong"));
    }
  };

  return (
    <Form
      onFinish={onSubmit}
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
        <legend>{t("change-password")}</legend>
        <Form.Item
          name="new_password1"
          label={t("new-password")}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder={t("new-password")} />
        </Form.Item>
        <Form.Item
          name="new_password2"
          label={t("confirm-new-password")}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder={t("confirm-new-password")} />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {t("save")}
          </Button>
          <Button type="default" htmlType="reset">
            {t("cancel")}
          </Button>
        </Space>
      </Fieldset>
    </Form>
  );
};
