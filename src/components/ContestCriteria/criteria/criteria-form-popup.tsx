import { CheckIcon } from "@heroicons/react/24/outline";
import { App, Form, Modal, Spin, Tabs } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import type { Section, UUID } from "../../../types";
import { CriteriaAdvancedFields } from "./criteria-advanced-fields";
import { CriteriaBasicFields } from "./criteria-basic-fields";
import { CriteriaTypeFields } from "./criteria-type-fields";
import { useContestCriteria } from "./use-contest-criteria";

interface CriteriaFormPopupProps {
	criterionId: UUID | null;
	section: Section;
	open: boolean;
	onClose: () => void;
	index: number;
}

interface CriterionOption {
	id: string;
	label: string;
	is_correct: boolean;
}

interface CriterionFormValues {
	label: string;
	description: string;
	points: number;
	resourcetype: string;
	allow_multiline?: boolean;
	lower_bound?: number;
	upper_bound?: number;
	checked_label?: string;
	unchecked_label?: string;
	partial_points?: boolean;
	options?: CriterionOption[];
	visible?: boolean;
	active?: boolean;
	activate_on_dates?: string[];
	deactivate_on_dates?: string[];
}

export const CriteriaFormPopup: React.FC<CriteriaFormPopupProps> = ({
	criterionId,
	section,
	open,
	onClose,
	index,
}) => {
	const [loading, setLoading] = React.useState(false);
	const [submitting, setSubmitting] = React.useState(false);
	const { message } = App.useApp();
	const { t } = useTranslation();
	const [form] = Form.useForm<CriterionFormValues>();
	const { actions } = useContestCriteria({ sectionId: section.id });

	const isEdit = !!criterionId;

	useEffect(() => {
		if (!open) return;
		if (criterionId) {
			setLoading(true);
			actions
				.getById(criterionId)
				.then((criterion) => {
					form.setFieldsValue(criterion as unknown as CriterionFormValues);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			form.resetFields();
		}
	}, [open, criterionId, form, actions]);

	const handleFormSubmit = async (values: CriterionFormValues): Promise<void> => {
		setSubmitting(true);
		try {
			if (
				values.resourcetype === FieldTypes.Radio ||
				values.resourcetype === FieldTypes.MultipleChoices
			) {
				if (!values.options || !values.options.some((option) => option.is_correct)) {
					message.error(t("correct-option-required"));
					return;
				}
			}
			if (criterionId) {
				await actions.update(criterionId, {
					...values,
				});
				message.success(t("criteria-updated"));
			} else {
				await actions.add({
					...values,
					section: section.id,
					order_in_section: index,
				} as any);
				message.success(t("criteria-added"));
			}
			handleClose();
		} catch (e) {
			message.error(t("criteria-operation-failed"));
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = (): void => {
		onClose();
		form.resetFields();
	};

	return (
		<Modal
			open={open}
			onCancel={handleClose}
			title={isEdit ? t("update-criteria") : t("add-criteria")}
			onOk={() => form.submit()}
			okText={isEdit ? t("update") : t("add")}
			cancelText={t("cancel")}
			okButtonProps={{
				loading: submitting,
				disabled: loading,
				icon: <CheckIcon />,
			}}
			width={600}
			destroyOnClose
		>
			<Spin spinning={loading}>
				<Form
					onFinish={handleFormSubmit}
					form={form}
					layout="vertical"
					style={{ marginBottom: 24 }}
					initialValues={{
						resourcetype: FieldTypes.Text,
					}}
					disabled={submitting || loading}
				>
					<Tabs
						items={[
							{
								label: t("criteria-basic"),
								key: "basic",
								children: <CriteriaBasicFields />,
							},
							{
								label: t("criteria-type"),
								key: "type",
								children: <CriteriaTypeFields form={form} isEdit={isEdit} />,
								forceRender: true,
							},
							{
								label: t("criteria-advanced"),
								key: "advanced",
								children: <CriteriaAdvancedFields form={form} />,
								forceRender: true,
							},
						]}
					/>
				</Form>
			</Spin>
		</Modal>
	);
};
