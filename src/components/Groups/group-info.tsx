import { TrashIcon } from "@heroicons/react/20/solid";
import { App, Button, Flex, Form, Input, Popconfirm } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteGroup, useUpdateGroup } from "../../services/groups/queries";
import type { Group } from "../../types";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";

interface GroupInfoProps {
	group: Group;
}

interface FormValues {
	name: string;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({ group }) => {
	const { message } = App.useApp();
	const { t } = useTranslation();
	const { groupId } = useParams<{ groupId: string }>();
	const navigate = useNavigate();
	const { currentUser } = useDashboardData();
	const updateGroup = useUpdateGroup();
	const deleteGroupMutation = useDeleteGroup();

	const isSuperAdmin = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	const onUpdateName = async (values: FormValues) => {
		if (!isSuperAdmin) return;
		try {
			await updateGroup.mutateAsync({
				id: groupId!,
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
			await deleteGroupMutation.mutateAsync(groupId!);
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
