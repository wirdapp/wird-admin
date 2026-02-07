import type React from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
	value?: string | number | boolean | string[];
	onChange?: (value: string | number | boolean | string[]) => void;
}

export const CriterionField: React.FC<CriterionFieldProps> = ({ criterion }) => {
	const { t } = useTranslation();

	return (
		<>
			{criterion.resourcetype === FieldTypes.Text &&
				(criterion.allow_multiline ? (
					<Textarea placeholder={criterion.label} />
				) : (
					<Input placeholder={criterion.label} />
				))}
			{criterion.resourcetype === FieldTypes.Number && (
				<Input
					type="number"
					defaultValue={criterion.lower_bound || 0}
					min={criterion.lower_bound}
					max={criterion.upper_bound}
				/>
			)}
			{criterion.resourcetype === FieldTypes.Checkbox && (
				<Switch
					checkedText={criterion.checked_label ?? t("yes")}
					uncheckedText={criterion.unchecked_label ?? t("no")}
				/>
			)}
			{criterion.resourcetype === FieldTypes.MultipleChoices && (
				<div className="flex flex-col gap-2">
					{criterion.options?.map((o) => (
						<div key={o.id} className="flex items-center gap-2">
							<Checkbox id={o.id} />
							<Label htmlFor={o.id} className="font-normal">
								{o.label}
							</Label>
						</div>
					))}
				</div>
			)}
			{criterion.resourcetype === FieldTypes.Radio && (
				<RadioGroup>
					{criterion.options?.map((o) => (
						<div key={o.id} className="flex items-center gap-2">
							<RadioGroupItem value={o.id} id={o.id} />
							<Label htmlFor={o.id} className="font-normal">
								{o.label}
							</Label>
						</div>
					))}
				</RadioGroup>
			)}
		</>
	);
};
