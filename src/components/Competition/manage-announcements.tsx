import { css } from "@emotion/css";
import type { FormInstance } from "antd";
import { App, Button, Empty, Form, Input, Modal, Spin, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateNotification, useNotifications } from "../../services/notifications/queries";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { StyledAnnouncementsList } from "./styles";

interface AnnouncementFormValues {
	title: string;
	body: string;
}

interface ApiErrorResponse {
	response?: {
		data?: Record<string, string>;
	};
}

export const ManageAnnouncements: React.FC = () => {
	const { message } = App.useApp();
	const { currentContest, currentUser } = useDashboardData();
	const { t } = useTranslation();
	const [errors, setErrors] = useState<string[]>([]);
	const [form] = Form.useForm<AnnouncementFormValues>();
	const [announcementFormVisible, setAnnouncementFormVisible] = useState<boolean>(false);
	const createNotification = useCreateNotification();
	const { data: notifications = [], isFetching } = useNotifications(currentContest?.id);

	const onFormFinish = async (values: AnnouncementFormValues): Promise<void> => {
		if (!currentContest) return;

		try {
			await createNotification.mutateAsync({
				contestId: currentContest.id,
				title: values.title.trim(),
				body: values.body.trim(),
			});
			setAnnouncementFormVisible(false);
			form.resetFields();
		} catch (err) {
			console.log(err);
			const error = err as ApiErrorResponse;
			const errorsList: string[] = [];
			Object.values(error.response?.data ?? {}).forEach((errMsg) => {
				errorsList.push(errMsg);
			});
			if (errorsList.length > 0) {
				setErrors(errorsList);
			} else {
				setErrors([t("something-went-wrong")]);
			}
			message.error(
				errorsList.map((errItem) => (
					<React.Fragment key={errItem}>
						{errItem}
						<br />
					</React.Fragment>
				)),
			);
		}
	};

	const canManageAnnouncements =
		currentUser?.role !== undefined ? isAtLeastSuperAdmin(currentUser.role) : false;

	return (
		<>
			<div>
				<div className="announcement-header">
					<h2>{t("active-announcements")}</h2>

					{canManageAnnouncements && (
						<Button onClick={() => setAnnouncementFormVisible(true)}>
							{t("new-announcement")}
						</Button>
					)}
				</div>
				{notifications.length === 0 ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				) : (
					<Spin spinning={isFetching}>
						<StyledAnnouncementsList>
							{notifications.map((notification) => (
								<li key={notification.id}>
									<div
										className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                    `}
									>
										<Typography.Text type="secondary" style={{ fontSize: 10 }}>
											{notification.created_at
												? dayjs(notification.created_at).format("DD MMM YYYY HH:mm")
												: t("not-sent-yet")}
										</Typography.Text>
										<Typography.Text strong>{notification.title}</Typography.Text>
										<Typography.Text>{notification.body}</Typography.Text>
									</div>
								</li>
							))}
						</StyledAnnouncementsList>
					</Spin>
				)}
			</div>
			<Modal
				title={t("make-an-announcement")}
				open={announcementFormVisible}
				onCancel={() => setAnnouncementFormVisible(false)}
				onOk={() => form.submit()}
				okText={t("add")}
				cancelText={t("cancel")}
				okButtonProps={{
					loading: createNotification.isPending,
				}}
			>
				<Form onFinish={onFormFinish} form={form} layout="vertical">
					<Form.Item
						name="title"
						label={t("notification-title")}
						rules={[{ required: true, message: t("requiredField") }]}
					>
						<Input placeholder={t("notification-title-placeholder")} />
					</Form.Item>
					<Form.Item
						name="body"
						label={t("notification-body")}
						rules={[{ required: true, message: t("requiredField") }]}
						validateStatus={errors.length > 0 ? "error" : undefined}
						help={
							errors.length
								? errors.map((errItem) => <div key={errItem}>{errItem}</div>)
								: undefined
						}
					>
						<Input.TextArea placeholder={t("notification-body-placeholder")} rows={5} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
