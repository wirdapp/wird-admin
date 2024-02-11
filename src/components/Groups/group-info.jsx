import React from "react";
import { App, Button, Flex, Form, Input, Popconfirm } from "antd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams, useRevalidator } from "react-router-dom";
import { GroupsApi } from "../../services/groups/api";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";

export const GroupInfo = ({ group }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { groupId } = useParams();
  const [updating, setUpdating] = React.useState(false);
  const [deleting, setDeleting] = React.useState();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const { currentUser } = useDashboardData();

  const isSuperAdmin = isAtLeastSuperAdmin(currentUser.role);

  const onUpdateName = async (values) => {
    if (!isSuperAdmin) return;
    setUpdating(true);
    try {
      await GroupsApi.updateGroup({
        id: groupId,
        body: { name: values.name },
      });
      setUpdating(false);
      message.success(t("group-updated"));
      revalidator.revalidate();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    }
  };

  const deleteGroup = async () => {
    if (!isSuperAdmin) return;
    setDeleting(true);
    try {
      await GroupsApi.deleteGroup({
        id: groupId,
      });
      setUpdating(false);
      message.success(t("group-deleted"));
      navigate("/dashboard/groups");
      revalidator.revalidate();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Form
      initialValues={group}
      layout="vertical"
      onFinish={onUpdateName}
      disabled={!isSuperAdmin || updating}
    >
      <Form.Item
        label={t("name")}
        name="name"
        rules={[{ required: true, message: t("requiredField") }]}
      >
        <Input />
      </Form.Item>
      {isSuperAdmin && (
        <Flex gap={16} justify="space-between">
          <Button type="primary" htmlType="submit" loading={updating}>
            {t("save")}
          </Button>
          <Popconfirm
            title={t("delete-group-confirm")}
            onConfirm={deleteGroup}
            placement="topRight"
          >
            <Button danger type="text" icon={<TrashIcon />} loading={deleting}>
              {t("delete")}
            </Button>
          </Popconfirm>
        </Flex>
      )}
    </Form>
  );
};
