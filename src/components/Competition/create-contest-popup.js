import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { isAxiosError } from "axios";
import { DatePicker, Form, Input, Modal } from "antd";
import { ContestsApi } from "../../services/contests/api";
import { changeCurrentContest } from "../../services/contests/utils";

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 8px;
`;

export const CreateContestPopup = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      const { daterange, ...rest } = values;
      const result = await ContestsApi.createContest({
        ...rest,
        start_date: daterange[0].format("YYYY-MM-DD"),
        end_date: daterange[1].format("YYYY-MM-DD"),
      });
      changeCurrentContest(result.id);
      window.location.reload();
      onClose?.();
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        setErrors(error.response.data);
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={t("create-contest")}
      onCancel={onClose}
      open={visible}
      onOk={() => form.submit()}
      okText={t("create-contest")}
      okButtonProps={{
        icon: <PlusCircleIcon style={{ width: 16 }} />,
        loading: submitting,
      }}
      cancelText={t("cancel")}
    >
      <Form
        style={{ padding: "32px 0" }}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        disabled={submitting}
      >
        <Form.Item
          name="contest_id"
          label={t("contest-code")}
          required
          rules={[
            { required: true, message: t("contest-code-required-error") },
            { min: 6, message: t("contest-code-invalid-error") },
          ]}
          validateStatus={errors.contest_id ? "error" : undefined}
          help={errors.contest_id}
        >
          <Input placeholder={t("contest-code")} />
        </Form.Item>
        <Form.Item
          label={t("contest-name")}
          name="name"
          required
          rules={[
            { required: true, message: t("contest-name-required-error") },
          ]}
          validateStatus={errors.name ? "error" : undefined}
          help={errors.name}
        >
          <Input placeholder={t("name-label")} />
        </Form.Item>
        <Form.Item
          label={t("contest-description")}
          name="description"
          validateStatus={errors.description ? "error" : undefined}
          help={errors.description}
        >
          <Input.TextArea placeholder={t("contest-description")} rows={2} />
        </Form.Item>
        <Form.Item
          label={t("date")}
          name="daterange"
          required
          rules={[{ required: true }]}
          validateStatus={
            errors.start_date || errors.end_date ? "error" : undefined
          }
          help={errors.start_date || errors.end_date}
        >
          <DatePicker.RangePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
