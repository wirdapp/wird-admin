import { css } from "@emotion/css";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { App, Form, Input, Modal, Result, Select } from "antd";
import { isAxiosError } from "axios";
import dayjs, { type Dayjs } from "dayjs";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { allCountries } from "../../data/countries";
import { ContestsService } from "../../services/contests/contests.service";
import { changeCurrentContest } from "../../services/contests/utils";
import { useDashboardData } from "../../util/routes-data";

interface CreateContestPopupProps {
	visible: boolean;
	onClose?: () => void;
}

interface CreateContestFormValues {
	contest_id: string;
	name: string;
	description?: string;
	country: string;
	start_date: Dayjs;
	end_date: Dayjs;
}

interface FormErrors {
	contest_id?: string;
	name?: string;
	description?: string;
	country?: string;
	[key: string]: string | undefined;
}

export const CreateContestPopup: React.FC<CreateContestPopupProps> = ({ visible, onClose }) => {
	const { message } = App.useApp();
	const { currentUser } = useDashboardData();
	const { t, i18n } = useTranslation();
	const [errors, setErrors] = React.useState<FormErrors>({});
	const [submitting, setSubmitting] = React.useState<boolean>(false);
	const [form] = Form.useForm<CreateContestFormValues>();

	const handleSubmit = async (values: CreateContestFormValues): Promise<void> => {
		if (!currentUser?.email_verified) {
			message.error(t("emailNotVerified"));
			return;
		}
		setSubmitting(true);

		try {
			const { start_date, end_date, ...rest } = values;
			const result = await ContestsService.createContest({
				...rest,
				start_date: start_date.format("YYYY-MM-DD"),
				end_date: end_date.format("YYYY-MM-DD"),
			});
			changeCurrentContest(result.id);
			window.location.reload();
			onClose?.();
		} catch (error) {
			if (isAxiosError(error) && error.response?.data) {
				setErrors(error.response.data as FormErrors);
			}
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = (): void => {
		setErrors({});
		form.resetFields();
		onClose?.();
	};

	const countries = useMemo(() => {
		return allCountries(i18n.language)
			.filter((country): country is { code: string; name: string } => Boolean(country))
			.map((country) => ({
				label: country.name,
				value: country.code,
			}));
	}, [i18n.language]);

	const isEmailVerified = currentUser?.email_verified ?? false;

	return (
		<Modal
			title={t("create-contest")}
			onCancel={handleClose}
			open={visible}
			onOk={() => form.submit()}
			okText={t("create-contest")}
			okButtonProps={{
				icon: <PlusCircleIcon style={{ width: 16 }} />,
				loading: submitting,
				disabled: !isEmailVerified,
			}}
			cancelText={t("cancel")}
		>
			<div style={{ position: "relative" }}>
				{!isEmailVerified && (
					<div
						className={css`
              position: absolute;
              inset: 0;
              background-color: rgba(255, 255, 255, 0.5);
              backdrop-filter: blur(2px);
              z-index: 100;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 14px;
              margin: 0 -4px;
            `}
					>
						<Result
							title={t("emailNotVerified")}
							status="warning"
							extra={
								<span
									dangerouslySetInnerHTML={{
										__html: t("emailNotVerifiedDescription", {
											email: currentUser?.email,
										}),
									}}
								/>
							}
						/>
					</div>
				)}
				<Form
					style={{ padding: "32px 0" }}
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					disabled={!isEmailVerified || submitting}
				>
					<Form.Item
						name="contest_id"
						label={t("contest-code")}
						required
						rules={[
							{ required: true, message: t("contest-code-required-error") },
							{ min: 6, message: t("contest-code-invalid-error") },
						]}
						validateStatus={errors.contest_id ? "error" : undefined}
						help={errors.contest_id}
					>
						<Input placeholder={t("contest-code")} />
					</Form.Item>
					<Form.Item
						label={t("contest-name")}
						name="name"
						required
						rules={[{ required: true, message: t("contest-name-required-error") }]}
						validateStatus={errors.name ? "error" : undefined}
						help={errors.name}
					>
						<Input placeholder={t("name-label")} />
					</Form.Item>
					<Form.Item
						label={t("contest-description")}
						name="description"
						validateStatus={errors.description ? "error" : undefined}
						help={errors.description}
					>
						<Input.TextArea placeholder={t("contest-description")} rows={2} />
					</Form.Item>
					<Form.Item
						label={t("country")}
						name="country"
						required
						rules={[{ required: true, message: t("requiredField") }]}
						validateStatus={errors.country ? "error" : undefined}
						help={errors.country}
					>
						<Select options={countries} showSearch optionFilterProp="label" />
					</Form.Item>
					<Form.Item
						label={t("start-date")}
						name="start_date"
						rules={[{ required: true }]}
						getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) => dayjs(e.target.value)}
						getValueProps={(value: Dayjs) => ({
							value: value?.format("YYYY-MM-DD"),
						})}
					>
						<Input type="date" />
					</Form.Item>
					<Form.Item
						label={t("end-date")}
						name="end_date"
						rules={[{ required: true }]}
						getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) => dayjs(e.target.value)}
						getValueProps={(value: Dayjs) => ({
							value: value?.format("YYYY-MM-DD"),
						})}
					>
						<Input type="date" />
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
};
