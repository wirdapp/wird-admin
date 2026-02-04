import { css } from "@emotion/css";
import { TrashIcon } from "@heroicons/react/20/solid";
import type { FormInstance } from "antd";
import { Alert, Button, Checkbox, Flex, Form, Input, InputNumber, Tooltip, Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type React from "react";
import { useTranslation } from "react-i18next";
// @ts-expect-error - uuid types not installed
import { v4 as uuidv4 } from "uuid";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import { CriteriaTypeSelect } from "./criteria-type-select";

interface CriteriaTypeFieldsProps {
	form: FormInstance;
	isEdit: boolean;
}

interface CriterionOption {
	id: string;
	label: string;
	is_correct: boolean;
}

export const CriteriaTypeFields: React.FC<CriteriaTypeFieldsProps> = ({ form, isEdit }) => {
	const { t, i18n } = useTranslation();
	const selectedType: string | undefined = Form.useWatch("resourcetype", form);

	const onCheckboxChecked = (e: CheckboxChangeEvent, index: number): void => {
		if (selectedType !== FieldTypes.Radio) return;
		if (e.target.checked) {
			const currentOptions: CriterionOption[] = form.getFieldsValue().options ?? [];
			form.setFieldsValue({
				options: currentOptions.map((option, i) => {
					if (i !== index) {
						return {
							...option,
							is_correct: false,
						};
					}
					return {
						...option,
						is_correct: true,
					};
				}),
			});
		}
	};

	return (
		<>
			{isEdit && (
				<Alert
					showIcon
					type="info"
					message={t("criteria-type-change-warning")}
					style={{ marginBottom: 16 }}
				/>
			)}
			<Form.Item label={t("criteria-type")} name="resourcetype" rules={[{ required: true }]}>
				<CriteriaTypeSelect disabled={isEdit} />
			</Form.Item>
			{selectedType === FieldTypes.Text && (
				<Form.Item name="allow_multiline" valuePropName="checked" initialValue={false}>
					<Checkbox>{t("allow-multiline")}</Checkbox>
				</Form.Item>
			)}
			{selectedType === FieldTypes.Number && (
				<>
					<Form.Item label={t("criteria-min")} name="lower_bound" initialValue={0}>
						<InputNumber />
					</Form.Item>
					<Form.Item label={t("criteria-max")} name="upper_bound" initialValue={20}>
						<InputNumber />
					</Form.Item>
				</>
			)}
			{selectedType === FieldTypes.Checkbox && (
				<>
					<Form.Item label={t("checked-label")} name="checked_label" initialValue={t("yes")}>
						<Input />
					</Form.Item>
					<Form.Item
						label={t("unchecked-label")}
						name="unchecked_label"
						rules={[{ required: true }]}
						initialValue={t("no")}
					>
						<Input />
					</Form.Item>
				</>
			)}
			{selectedType === FieldTypes.MultipleChoices && (
				<Form.Item name="partial_points" valuePropName="checked" initialValue={false}>
					<Checkbox>{t("partial-points")}</Checkbox>
				</Form.Item>
			)}
			{(selectedType === FieldTypes.Radio || selectedType === FieldTypes.MultipleChoices) && (
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							<Typography.Text>{t("options")}:</Typography.Text>
							<ol>
								{fields.map((field, index) => (
									<li
										key={field.key}
										className={css`
                        margin-bottom: 16px;
                      `}
									>
										<Flex gap="small" align="center">
											<Form.Item hidden name={[field.name, "id"]} />
											<Form.Item
												name={[field.name, "label"]}
												rules={[{ required: true }]}
												style={{ width: "100%" }}
												noStyle
											>
												<Input size="small" placeholder={t("option")} />
											</Form.Item>
											<Tooltip
												title={t("is-correct")}
												placement={i18n.dir() === "ltr" ? "right" : "left"}
											>
												<div>
													<Form.Item
														noStyle
														name={[field.name, "is_correct"]}
														valuePropName="checked"
													>
														<Checkbox onChange={(e) => onCheckboxChecked(e, index)} />
													</Form.Item>
												</div>
											</Tooltip>
											<Button
												onClick={() => remove(index)}
												type="text"
												size="small"
												danger
												icon={<TrashIcon />}
											/>
										</Flex>
									</li>
								))}
							</ol>
							<Button
								type="dashed"
								size="small"
								onClick={() =>
									add({
										id: uuidv4(),
										label: "",
										is_correct: false,
									})
								}
								block
							>
								{t("add-option")}
							</Button>
						</>
					)}
				</Form.List>
			)}
		</>
	);
};
