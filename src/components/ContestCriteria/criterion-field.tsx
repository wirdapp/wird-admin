import { Checkbox, Input, InputNumber, Radio, Switch } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { FieldTypes } from "../../services/contest-criteria/consts";
import type { Criterion } from "../../types";

interface CriterionFieldProps {
	criterion: Criterion & {
		label: string;
		allow_multiline?: boolean;
		lower_bound?: number;
		upper_bound?: number;
		checked_label?: string;
		unchecked_label?: string;
		options?: Array<{ id: string; label: string }>;
		points?: number;
		visible?: boolean;
	};
}

export const CriterionField: React.FC<CriterionFieldProps> = ({ criterion, ...props }) => {
	const { t } = useTranslation();

	return (
		<>
			{criterion.resourcetype === FieldTypes.Text &&
				(criterion.allow_multiline ? (
					<Input.TextArea placeholder={criterion.label} {...props} />
				) : (
					<Input placeholder={criterion.label} {...props} />
				))}
			{criterion.resourcetype === FieldTypes.Number && (
				<InputNumber
					defaultValue={criterion.lower_bound || 0}
					min={criterion.lower_bound}
					max={criterion.upper_bound}
					{...props}
				/>
			)}
			{criterion.resourcetype === FieldTypes.Checkbox && (
				<Switch
					checkedChildren={criterion.checked_label ?? t("yes")}
					unCheckedChildren={criterion.unchecked_label ?? t("no")}
					{...props}
				/>
			)}
			{criterion.resourcetype === FieldTypes.MultipleChoices && (
				<Checkbox.Group
					options={criterion.options?.map((o) => ({
						label: o.label,
						value: o.id,
					}))}
					{...props}
				/>
			)}
			{criterion.resourcetype === FieldTypes.Radio && (
				<Radio.Group
					options={criterion.options?.map((o) => ({
						label: o.label,
						value: o.id,
					}))}
					{...props}
				/>
			)}
		</>
	);
};
