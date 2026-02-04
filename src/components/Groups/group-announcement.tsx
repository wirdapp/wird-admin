import { css } from "@emotion/css";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Alert, App, Button, Flex, Form, Input, List, Space, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { useUpdateGroup } from "../../services/groups/queries";
import { colors } from "../../styles";
import type { Group, GroupAnnouncement as GroupAnnouncementType } from "../../types";

interface GroupAnnouncementProps {
	group: Group & { announcements: GroupAnnouncementType[] };
}

interface AnnouncementFormValues {
	newAnnouncementText: string;
}

interface LegacyAnnouncement {
	text: string;
	date: string;
}

export const GroupAnnouncement: React.FC<GroupAnnouncementProps> = ({ group }) => {
	const { message } = App.useApp();
	const [form] = Form.useForm<AnnouncementFormValues>();
	const { t } = useTranslation();
	const [adding, setAdding] = React.useState(false);
	const [deleting, setDeleting] = React.useState<number | null>(null);
	const updateGroup = useUpdateGroup();

	const handleSaveAnnouncement = async (announcements: LegacyAnnouncement[]) => {
		try {
			await updateGroup.mutateAsync({
				id: group.id,
				body: { announcements } as unknown as { name?: string },
			});
			message.success(t("group-updated"));
		} catch (e) {
			console.error(e);
			message.error(t("something-went-wrong"));
		}
	};

	const handleAddAnnouncement = async (values: AnnouncementFormValues) => {
		setAdding(true);
		const newAnnouncement: LegacyAnnouncement = {
			text: values.newAnnouncementText,
			date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		};
		const existingAnnouncements = (group.announcements as unknown as LegacyAnnouncement[]) || [];
		await handleSaveAnnouncement([...existingAnnouncements, newAnnouncement]);
		form.resetFields();
		setAdding(false);
	};

	const handleDeleteAnnouncement = async (index: number) => {
		setDeleting(index);
		const existingAnnouncements = (group.announcements as unknown as LegacyAnnouncement[]) || [];
		const updatedAnnouncements = [...existingAnnouncements];
		updatedAnnouncements.splice(index, 1);
		await handleSaveAnnouncement(updatedAnnouncements);
		setDeleting(null);
	};

	const newAnnouncementText = Form.useWatch("newAnnouncementText", form);
	const announcements = (group.announcements as unknown as LegacyAnnouncement[]) || [];

	return (
		<Alert.ErrorBoundary message={t("something-went-wrong")} description="">
			<Flex vertical gap={24}>
				<List
					className={css`
            background: ${colors.white};

            .ant-list-item-action li:last-child {
              padding: 0 !important;
            }

            .ant-list-item-meta-title {
              margin-bottom: 0;
              white-space: pre-wrap;
            }
          `}
					bordered
					dataSource={announcements}
					renderItem={(item: LegacyAnnouncement, index: number) => (
						<List.Item
							actions={[
								<Button
									key="delete"
									type="text"
									danger
									size="small"
									icon={<TrashIcon />}
									onClick={() => handleDeleteAnnouncement(index)}
									loading={deleting === index}
								/>,
							]}
						>
							<List.Item.Meta
								title={item.text}
								description={<small>{item.date}</small>}
								avatar={<Typography.Text type="secondary">{index + 1}.</Typography.Text>}
							/>
						</List.Item>
					)}
				/>
				<Form layout="vertical" onFinish={handleAddAnnouncement} requiredMark={false} form={form}>
					<Form.Item
						rules={[{ required: true, message: t("requiredField") }]}
						label={
							<Space align="center">
								<PlusCircleIcon style={{ display: "block", width: 20, height: 20 }} />
								{t("make-an-announcement")}
							</Space>
						}
						name="newAnnouncementText"
					>
						<Input.TextArea placeholder={t("make-an-announcement")} />
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={adding}
						icon={<PlusIcon />}
						size="small"
						disabled={!newAnnouncementText}
					>
						{t("new-announcement")}
					</Button>
				</Form>
			</Flex>
		</Alert.ErrorBoundary>
	);
};
