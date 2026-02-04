import { css } from "@emotion/css";
import { App, Button, Form, type FormProps, Input, Space } from "antd";
import type { AxiosError } from "axios";
import type React from "react";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../services/auth/auth.service";
import type { ChangePasswordFormData } from "../../types";
import { Fieldset } from "./EditProfile.styled";

interface ChangePasswordFormValues {
	new_password1: string;
	new_password2: string;
}

export const ChangePasswordForm: React.FC = () => {
	const { message } = App.useApp();
	const { t } = useTranslation();
	const [form] = Form.useForm<ChangePasswordFormValues>();

	const onSubmit: FormProps<ChangePasswordFormValues>["onFinish"] = async (values) => {
		try {
			// Cast to ChangePasswordFormData - the API may not require old_password in all cases
			await AuthService.changePassword(values as unknown as ChangePasswordFormData);
			form.resetFields();
			message.success(t("password-has-been-changed-successfully"));
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
		<Form onFinish={onSubmit} layout="vertical" form={form} style={{ flexGrow: 1 }}>
			<Fieldset
				className={css`
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        `}
			>
				<legend>{t("change-password")}</legend>
				<Form.Item name="new_password1" label={t("new-password")} rules={[{ required: true }]}>
					<Input.Password placeholder={t("new-password")} />
				</Form.Item>
				<Form.Item
					name="new_password2"
					label={t("confirm-new-password")}
					rules={[{ required: true }]}
				>
					<Input.Password placeholder={t("confirm-new-password")} />
				</Form.Item>
				<Space>
					<Button type="primary" htmlType="submit">
						{t("save")}
					</Button>
					<Button type="text" htmlType="reset">
						{t("cancel")}
					</Button>
				</Space>
			</Fieldset>
		</Form>
	);
};
