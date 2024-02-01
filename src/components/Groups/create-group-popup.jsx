import React from "react";
import { App, Button, Form, Input, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { GroupsApi } from "../../services/groups/api";
import { useNavigate, useRevalidator } from "react-router-dom";

export const CreateGroupPopup = ({ open, onClose }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const onCreateGroup = async (values) => {
    setSubmitting(true);
    try {
      const createdGroup = await GroupsApi.createGroup({ body: values });
      revalidator.revalidate();
      navigate(`/dashboard/groups/${createdGroup.id}`);
      onClose();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={t("create-group")}
      open={open}
      onCancel={onClose}
      width={400}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onCreateGroup}
        style={{ marginTop: 24 }}
        disabled={submitting}
      >
        <Form.Item
          name="name"
          label={t("name")}
          rules={[{ required: true, message: t("requiredField") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {t("create")}
            </Button>
            <Button onClick={onClose}>{t("cancel")}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
