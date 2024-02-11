import React from "react";
import { App, Button, Flex, List } from "antd";
import { css } from "@emotion/css";
import { colors } from "../../styles";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { GroupsApi } from "../../services/groups/api";
import { useRevalidator } from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { getFullName } from "../../util/user-utils";
import { useDashboardData } from "../../util/routes-data";
import { GroupUserAddForm } from "./group-user-add-form";
import { GroupRole } from "../../services/groups/consts";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";

const MemberActions = ({ groupId, member }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const revalidator = useRevalidator();
  const [submitting, setSubmitting] = React.useState(false);
  const { currentUser } = useDashboardData();

  const isSuperAdmin = isAtLeastSuperAdmin(currentUser.role);

  if (!isSuperAdmin || currentUser.username === member.username) return null;

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
  const { t } = useTranslation();
  const [adding, setAdding] = React.useState(false);
  const screens = useBreakpoint();
  const { currentUser } = useDashboardData();

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
      <GroupUserAddForm
        groupId={group.id}
        groupMembers={members}
        role={GroupRole.MEMBER}
      />
      <GroupUserAddForm
        groupId={group.id}
        groupMembers={members}
        role={GroupRole.ADMIN}
      />
    </Flex>
  );
};
