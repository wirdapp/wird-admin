import React from "react";
import { App, Button, Form, Input, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCreateGroup } from "../../services/groups/queries";

export const CreateGroupPopup = ({ open, onClose }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createGroup = useCreateGroup();

  const onCreateGroup = async (values) => {
    try {
      const createdGroup = await createGroup.mutateAsync(values);
      navigate(`/dashboard/groups/${createdGroup.id}`);
      onClose();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
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
        disabled={createGroup.isPending}
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
            <Button type="primary" htmlType="submit" loading={createGroup.isPending}>
              {t("create")}
            </Button>
            <Button onClick={onClose}>{t("cancel")}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
