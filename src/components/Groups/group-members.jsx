import React from "react";
import { App, Button, Flex, Form, List, Select, Space } from "antd";
import { css } from "@emotion/css";
import { colors } from "../../styles";
import {
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
import { useDashboardData } from "../../util/routes-data";

const MemberActions = ({ groupId, member }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const revalidator = useRevalidator();
  const [submitting, setSubmitting] = React.useState(false);

  const removeMember = async () => {
    setSubmitting(true);
    try {
      await GroupsApi.removeGroupMember({
        groupId: groupId,
        memberId: member.id,
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
    <Button
      type="text"
      size="small"
      danger
      icon={<XMarkIcon />}
      loading={submitting}
      onClick={removeMember}
    >
      {t("remove")}
    </Button>
  );
};

export const GroupMembers = ({ group, members }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [adding, setAdding] = React.useState(false);
  const revalidator = useRevalidator();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { currentUser } = useDashboardData();
  const [formErrors, setFormErrors] = React.useState({});

  const addMember = async (values) => {
    setAdding(true);
    setFormErrors({});
    try {
      const userIds = values.contest_person;
      const body = userIds.map((id) => ({
        contest_person: id,
        group_role: values.group_role,
      }));

      await GroupsApi.addGroupMember({
        groupId: group.id,
        body,
      });
      message.success(t("group-updated"));
      revalidator.revalidate();
      form.resetFields();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
      setFormErrors(e.response?.data || {});
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
              title={getFullName(member.person)}
              description={
                <>
                  {member.group_role === 1 && t("group-roles.admin")}
                  {member.group_role === 2 && t("group-roles.member")}
                </>
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
            validateStatus={formErrors.contest_person ? "error" : undefined}
            help={formErrors.contest_person}
          >
            <MembersSelect
              placeholder={t("select-member")}
              excludeUsernames={[
                currentUser.username,
                ...members.map((m) => m.person.username),
              ]}
              mode="multiple"
            />
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
