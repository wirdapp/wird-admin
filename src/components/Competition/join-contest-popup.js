import React from "react";
import { useTranslation } from "react-i18next";
import { ContestsApi } from "../../services/contests/api";
import { Form, Input, Modal } from "antd";
import { changeCurrentContest } from "../../services/contests/utils";
import { useRevalidator } from "react-router-dom";

export const JoinContestPopup = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();

  const handleSubmit = async (values) => {
    try {
      const result = await ContestsApi.joinContest(values.code);
      if (result.id) {
        changeCurrentContest(result.id);
        window.location.reload();
      }
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    } finally {
      onClose?.();
    }
  };

  return (
    <Modal
      title={t("join-contest")}
      open={visible}
      okText={t("join-contest")}
      cancelText={t("cancel")}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleSubmit} style={{ padding: "32px 0" }}>
        <Form.Item label={t("code-label")} name="code">
          <Input placeholder={t("code-label")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
