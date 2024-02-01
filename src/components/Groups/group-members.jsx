import React from "react";
import { App, Button, Dropdown, Flex, Form, List, Select, Space } from "antd";
import { css } from "@emotion/css";
import { colors } from "../../styles";
import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { MembersSelect } from "../contest-results/members-results/members-select";
import { GroupsApi } from "../../services/groups/api";
import { useRevalidator } from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { getFullName } from "../../util/user-utils";

const MemberActions = ({ groupId, member }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const revalidator = useRevalidator();
  const [submitting, setSubmitting] = React.useState(false);

  const updateMemberRole = async (role) => {
    setSubmitting(true);
    try {
      await GroupsApi.updateGroupMember({
        groupId: groupId,
        memberId: member.username,
        body: { group_role: role },
      });
      message.success(t("group-member-updated"));
      revalidator.revalidate();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    } finally {
      setSubmitting(false);
    }
  };

  const removeMember = async () => {
    setSubmitting(true);
    try {
      await GroupsApi.removeGroupMember({
        groupId: groupId,
        memberId: member.username,
      });
      message.success(t("group-member-removed"));
      revalidator.revalidate();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dropdown
      menu={{
        items: [
          member.group_role === 1
            ? {
                key: "set-role-member",
                label: t("change-role-to-member"),
                onClick: () => updateMemberRole(2),
              }
            : {
                key: "set-role-admin",
                label: t("change-role-to-admin"),
                onClick: () => updateMemberRole(1),
              },

          {
            key: "remove",
            label: t("remove"),
            icon: <XMarkIcon />,
            onClick: () => removeMember(),
          },
        ],
      }}
      disabled={submitting}
      trigger={["click"]}
    >
      <Button
        type="text"
        size="small"
        icon={<EllipsisVerticalIcon />}
        loading={submitting}
      />
    </Dropdown>
  );
};

export const GroupMembers = ({ group, members }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [adding, setAdding] = React.useState(false);
  const revalidator = useRevalidator();
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const addMember = async (values) => {
    setAdding(true);
    try {
      await GroupsApi.addGroupMember({
        groupId: group.id,
        body: values,
      });
      message.success(t("group-updated"));
      revalidator.revalidate();
      form.resetFields();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    } finally {
      setAdding(false);
    }
  };

  return (
    <Flex vertical gap={28}>
      <List
        className={css`
          background: ${colors.white};

          .ant-list-item-action li:last-child {
            padding: 0 !important;
          }
        `}
        bordered
        dataSource={members}
        renderItem={(member) => (
          <List.Item
            actions={[<MemberActions groupId={group.id} member={member} />]}
          >
            <List.Item.Meta
              title={getFullName(member.person_info)}
              description={
                member.group_role === 1
                  ? t("group-roles.admin")
                  : t("group-roles.member")
              }
            />
          </List.Item>
        )}
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={addMember}
        requiredMark={false}
        className={css`
          .ant-form-item {
            margin-bottom: 0;
            flex: 1;
          }
        `}
      >
        <Space align="center">
          <PlusCircleIcon style={{ display: "block", width: 20, height: 20 }} />
          {t("add-member")}
        </Space>
        <Flex gap={8} vertical={!screens.md}>
          <Form.Item
            rules={[{ required: true, message: t("requiredField") }]}
            name="contest_person"
          >
            <MembersSelect placeholder={t("select-member")} />
          </Form.Item>
          <Form.Item name="group_role" initialValue={2}>
            <Select
              placeholder={t("select-role")}
              options={[
                { label: t("group-roles.member"), value: 2 },
                { label: t("group-roles.admin"), value: 1 },
              ]}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={adding}
            icon={<PlusIcon />}
          >
            {t("add")}
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};
