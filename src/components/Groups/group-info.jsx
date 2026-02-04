import React from "react";
import { App, Button, Flex, Form, Input, Popconfirm } from "antd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";
import { useUpdateGroup, useDeleteGroup } from "../../services/groups/queries";

export const GroupInfo = ({ group }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useDashboardData();
  const updateGroup = useUpdateGroup();
  const deleteGroupMutation = useDeleteGroup();

  const isSuperAdmin = isAtLeastSuperAdmin(currentUser.role);

  const onUpdateName = async (values) => {
    if (!isSuperAdmin) return;
    try {
      await updateGroup.mutateAsync({
        id: groupId,
        body: { name: values.name },
      });
      message.success(t("group-updated"));
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    }
  };

  const deleteGroup = async () => {
    if (!isSuperAdmin) return;
    try {
      await deleteGroupMutation.mutateAsync(groupId);
      message.success(t("group-deleted"));
      navigate("/dashboard/groups");
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    }
  };

  return (
    <Form
      initialValues={group}
      layout="vertical"
      onFinish={onUpdateName}
      disabled={!isSuperAdmin || updateGroup.isPending}
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
          <Button type="primary" htmlType="submit" loading={updateGroup.isPending}>
            {t("save")}
          </Button>
          <Popconfirm
            title={t("delete-group-confirm")}
            onConfirm={deleteGroup}
            placement="topRight"
          >
            <Button danger type="text" icon={<TrashIcon />} loading={deleteGroupMutation.isPending}>
              {t("delete")}
            </Button>
          </Popconfirm>
        </Flex>
      )}
    </Form>
  );
};
