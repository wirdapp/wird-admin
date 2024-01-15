import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { createContest } from "../../services/competitionsServices";
import { isAxiosError } from "axios";
import { DatePicker, Form, Input, Modal } from "antd";
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
    values["start_date"] = values.start_date.format("YYYY-MM-DD");
    values["end_date"] = values.end_date.format("YYYY-MM-DD");

    try {
      const result = await createContest(values);
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
          label={t("start-date")}
          name="start_date"
          required
          rules={[{ required: true, message: t("start-date-required-error") }]}
          validateStatus={errors.start_date ? "error" : undefined}
          help={errors.start_date}
        >
          <DatePicker placeholder={t("start-date")} />
        </Form.Item>
        <Form.Item
          label={t("end-date")}
          name="end_date"
          dependencies={["start_date"]}
          required
          rules={[
            { required: true, message: t("end-date-required-error") },
            // rule to make sure this value is after start_date
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("start_date").isBefore(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("end-date-invalid-error")));
              },
            }),
          ]}
          validateStatus={errors.end_date ? "error" : undefined}
          help={errors.end_date}
        >
          <DatePicker placeholder={t("end-date")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
