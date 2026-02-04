import React, { useState } from "react";
import { App, Button, Form, Input, Modal } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { RolesSelect } from "./roles-select";
import { Role } from "../../util/ContestPeople_Role";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddUserToContest } from "../../services/members/queries";

export const AddUserPopup = ({ open, onClose, onAdded }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [formError, setFormError] = useState();
  const { currentUser } = useDashboardData();
  const addUserToContest = useAddUserToContest();

  const onAddFormFinish = async (values) => {
    if (!values.username.length) return;

    try {
      const res = await addUserToContest.mutateAsync({
        role: values.role,
        username: values.username,
      });
      message.success(t("notification.addStudent"));
      onAdded(res);
    } catch (error) {
      message.error(t("notification.errorStudent"));
      setFormError(error?.response?.data?.detail);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={t("addParticipantManually")}
      footer={null}
    >
      <Form
        form={form}
        style={{ width: "100%", marginTop: 16 }}
        onFinish={onAddFormFinish}
        layout="vertical"
      >
        <Form.Item
          label={t("username")}
          name="username"
          rules={[{ required: true, message: t("requiredField") }]}
          validateStatus={formError ? "error" : undefined}
          help={formError}
        >
          <Input placeholder={t("username")} type="text" />
        </Form.Item>
        <Form.Item
          label={t("mainRole")}
          name="role"
          rules={[{ required: true, message: t("requiredField") }]}
          initialValue={Role.MEMBER}
        >
          <RolesSelect minRole={currentUser.role} />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusIcon />}>
          {t("add-user")}
        </Button>
      </Form>
    </Modal>
  );
};
