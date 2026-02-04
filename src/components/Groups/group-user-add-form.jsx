import React from "react";
import { App, Button, Flex, Form, Space } from "antd";
import { css } from "@emotion/css";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MembersSelect } from "../contest-results/members-results/members-select";
import { useTranslation } from "react-i18next";
import { GroupRole } from "../../services/groups/consts";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useDashboardData } from "../../util/routes-data";
import { Role } from "../../util/ContestPeople_Role";
import { useAddGroupMember } from "../../services/groups/queries";

export const GroupUserAddForm = ({ groupId, groupMembers, role }) => {
  const { currentUser } = useDashboardData();
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = React.useState({});
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const addGroupMember = useAddGroupMember();

  const fillErrors = (errors) => {
    if (errors) {
      errors.forEach((errorObj) => {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          Object.entries(errorObj.error).forEach(([key, value]) => {
            if (Array.isArray(newErrors[key])) {
              newErrors[key].push(...value);
            } else {
              newErrors[key] = value;
            }
          });
          return newErrors;
        });
      });
    }
  };

  const addUsersToGroup = async (values) => {
    setFormErrors({});
    try {
      const body = values.contest_person.map((id) => ({
        contest_person: id,
        group_role: role,
      }));

      const data = await addGroupMember.mutateAsync({
        groupId: groupId,
        body,
      });
      if (data.errors) {
        const failedUsersIds = data.errors.map(
          (error) => error.data.contest_person,
        );
        form.setFieldValue("contest_person", failedUsersIds);
        fillErrors(data.errors);
        message.error(t("something-went-wrong"));
      } else {
        message.success(t("group-updated"));
        form.resetFields();
      }
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
      fillErrors(e.response?.data?.errors ?? e.response?.data);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={addUsersToGroup}
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
        {role === GroupRole.ADMIN ? t("add-admins") : t("add-members")}
      </Space>
      <Flex gap={8} vertical={!screens.md}>
        <Form.Item
          rules={[{ required: true, message: t("requiredField") }]}
          name="contest_person"
          validateStatus={formErrors.contest_person ? "error" : undefined}
          help={formErrors.contest_person?.join(", ")}
        >
          <MembersSelect
            placeholder={t("select-member")}
            role={role === GroupRole.ADMIN ? Role.ADMIN : Role.MEMBER}
            excludeUsernames={[
              currentUser.username,
              ...groupMembers.map((m) => m.person.username),
            ]}
            mode="multiple"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={addGroupMember.isPending}
          icon={<PlusIcon />}
        >
          {t("add")}
        </Button>
      </Flex>
    </Form>
  );
};
