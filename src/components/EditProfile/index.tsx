import { App, Flex, Grid, Space, Typography } from "antd";
import type { AxiosError } from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { useUpdateUserInfo } from "../../services/auth/queries";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";
import { ChangePasswordForm } from "./change-password-form";
import { ProfilePictureUploader } from "./profile-picture-uploader";
import { UserDetailsForm } from "./user-details-form";

export interface UpdateUserInfoValues {
	first_name?: string;
	last_name?: string;
	profile_photo?: File;
}

function EditProfile() {
	const { message } = App.useApp();
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();
	const screens = Grid.useBreakpoint();
	const updateUserInfo = useUpdateUserInfo();

	const handleSubmit = async (values: UpdateUserInfoValues): Promise<void> => {
		try {
			const formData = new FormData();
			if (values.first_name !== undefined) {
				formData.append("first_name", values.first_name);
			}
			if (values.last_name !== undefined) {
				formData.append("last_name", values.last_name);
			}
			if (values.profile_photo !== undefined) {
				formData.append("profile_photo", values.profile_photo);
			}
			await updateUserInfo.mutateAsync(formData);
			message.success(t("profile-has-been-edited-successfully"));
		} catch (err) {
			const axiosError = err as AxiosError<Record<string, string[]>>;
			const errMessages: string[] = [];
			if (axiosError.response?.data) {
				const obj = axiosError.response.data;
				Object.keys(obj).forEach((e) => {
					errMessages.push(`${obj[e]} : ${e}`);
				});
			}
			message.error(errMessages.length > 0 ? errMessages : t("something-went-wrong"));
		}
	};

	return (
		<div>
			<Space align="center" size="large">
				<ProfilePictureUploader onSubmit={handleSubmit} />
				<Space direction="vertical" size="small">
					<Typography.Title level={3} style={{ marginBottom: 0 }}>
						{getFullName(currentUser)}
					</Typography.Title>
					<Typography.Text>{currentUser?.email}</Typography.Text>
				</Space>
			</Space>
			<Flex vertical={!screens.lg} style={{ marginTop: 24, width: "100%" }} gap={24}>
				<UserDetailsForm onSubmit={handleSubmit} />
				<ChangePasswordForm />
			</Flex>
		</div>
	);
}

export default EditProfile;
