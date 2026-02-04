import React, { useState } from "react";
import { App, Button, Form, Input, Modal } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { RolesSelect } from "./roles-select";
import { Role } from "../../util/roles";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddUserToContest } from "../../services/members/queries";
import { ContestPerson } from "../../types";
import { AxiosError } from "axios";

interface AddUserPopupProps {
  open: boolean;
  onClose: () => void;
  onAdded: (result: ContestPerson) => void;
}

interface AddUserFormValues {
  username: string;
  role: Role;
}

interface ApiErrorResponse {
  detail?: string;
}

export const AddUserPopup: React.FC<AddUserPopupProps> = ({ open, onClose, onAdded }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm<AddUserFormValues>();
  const [formError, setFormError] = useState<string | undefined>();
  const { currentUser } = useDashboardData();
  const addUserToContest = useAddUserToContest();

  const onAddFormFinish = async (values: AddUserFormValues): Promise<void> => {
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
      const axiosError = error as AxiosError<ApiErrorResponse>;
      setFormError(axiosError?.response?.data?.detail);
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
          <RolesSelect minRole={currentUser!.role!} />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusIcon />}>
          {t("add-user")}
        </Button>
      </Form>
    </Modal>
  );
};
