import React from "react";
import { App, Button, Flex, Form, Space } from "antd";
import { css } from "@emotion/css";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MembersSelect } from "../contest-results/members-results/members-select";
import { useTranslation } from "react-i18next";
import { GroupRole } from "../../types";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useDashboardData } from "../../util/routes-data";
import { Role } from "../../util/roles";
import { useAddGroupMember } from "../../services/groups/queries";
import type { GroupMember } from "../../types";

interface GroupUserAddFormProps {
  groupId: string;
  groupMembers: GroupMember[];
  role: GroupRole;
}

interface FormValues {
  contest_person: string[];
}

interface FormErrors {
  [key: string]: string[];
}

interface ErrorObject {
  error: { [key: string]: string[] };
  data?: { contest_person: string };
}

interface AddMemberResponse {
  errors?: ErrorObject[];
}

export const GroupUserAddForm: React.FC<GroupUserAddFormProps> = ({ groupId, groupMembers, role }) => {
  const { currentUser } = useDashboardData();
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});
  const [form] = Form.useForm<FormValues>();
  const screens = useBreakpoint();
  const addGroupMember = useAddGroupMember();

  const fillErrors = (errors: ErrorObject[] | undefined) => {
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

  const addUsersToGroup = async (values: FormValues) => {
    setFormErrors({});
    try {
      const body = values.contest_person.map((id) => ({
        contest_person: id,
        group_role: role,
      }));

      const data = await addGroupMember.mutateAsync({
        groupId: groupId!,
        body: body as unknown as { user_id?: string; username?: string; group_role?: GroupRole },
      }) as unknown as AddMemberResponse;
      if (data.errors) {
        const failedUsersIds = data.errors.map(
          (error) => error.data?.contest_person,
        ).filter((id): id is string => id !== undefined);
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
      const axiosError = e as { response?: { data?: { errors?: ErrorObject[] } } };
      fillErrors(axiosError.response?.data?.errors ?? (axiosError.response?.data as unknown as ErrorObject[] | undefined));
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
              currentUser?.username ?? '',
              ...(groupMembers ?? []).map((m) => m.person_info.username),
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
