import { css } from "@emotion/css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { App, Button, Flex, List } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useRemoveGroupMember } from "../../services/groups/queries";
import { colors } from "../../styles";
import type { Group, GroupMember } from "../../types";
import { GroupRole } from "../../types";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";
import { GroupUserAddForm } from "./group-user-add-form";

interface MemberActionsProps {
	groupId: string;
	member: GroupMember;
}

const MemberActions: React.FC<MemberActionsProps> = ({ groupId, member }) => {
	const { t } = useTranslation();
	const { message } = App.useApp();
	const { currentUser } = useDashboardData();
	const removeGroupMember = useRemoveGroupMember();

	const isSuperAdmin = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	if (!isSuperAdmin || currentUser?.username === member.person_info.username) return null;

	const removeMember = async () => {
		try {
			await removeGroupMember.mutateAsync({
				groupId: groupId!,
				memberId: member.id,
			});
			message.success(t("group-member-removed"));
		} catch (e) {
			console.error(e);
			message.error(t("something-went-wrong"));
		}
	};

	return (
		<Button
			type="text"
			size="small"
			danger
			icon={<XMarkIcon />}
			loading={removeGroupMember.isPending}
			onClick={removeMember}
		>
			{t("remove")}
		</Button>
	);
};

interface GroupMembersProps {
	group: Group;
	members: GroupMember[];
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ group, members }) => {
	const { t } = useTranslation();

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
				renderItem={(member: GroupMember) => (
					<List.Item actions={[<MemberActions key="actions" groupId={group.id} member={member} />]}>
						<List.Item.Meta
							title={getFullName(member.person_info)}
							description={
								<>
									{member.group_role === GroupRole.ADMIN && t("group-roles.admin")}
									{member.group_role === GroupRole.MEMBER && t("group-roles.member")}
								</>
							}
						/>
					</List.Item>
				)}
			/>
			<GroupUserAddForm groupId={group.id} groupMembers={members} role={GroupRole.MEMBER} />
			<GroupUserAddForm groupId={group.id} groupMembers={members} role={GroupRole.ADMIN} />
		</Flex>
	);
};
