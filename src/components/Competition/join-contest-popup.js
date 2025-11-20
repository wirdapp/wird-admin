import React from "react";
import { useTranslation } from "react-i18next";
import { ContestsApi } from "../../services/contests/api";
import { Form, Input, Modal } from "antd";
import { changeCurrentContest } from "../../services/contests/utils";

export const JoinContestPopup = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setIsError(false);
    try {
      await ContestsApi.joinContest(values.code);
      const contests = await ContestsApi.getContests();
      const newCurrentContest = contests.find(
        (contest) => contest.contest_id === values.code,
      );
      if (newCurrentContest) {
        changeCurrentContest(newCurrentContest.id);
        window.location.reload();
      }
      onClose?.();
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setSubmitting(false);
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
      okButtonProps={{ loading: submitting }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ padding: "32px 0" }}
        disabled={submitting}
      >
        <Form.Item
          label={t("code-label")}
          name="code"
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
          validateStatus={isError ? "error" : undefined}
          help={isError ? t("code-error") : undefined}
        >
          <Input placeholder={t("code-label")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
