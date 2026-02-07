import type React from "react";
import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FieldTypesIcons, FieldTypesOptions } from "../../../services/contest-criteria/consts";
import { colors } from "../../../styles";

interface CriteriaTypeSelectProps {
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	title?: string;
}

export const CriteriaTypeSelect: React.FC<CriteriaTypeSelectProps> = ({
	value,
	onChange,
	disabled,
	title,
}) => {
	const { t } = useTranslation();
	const items = FieldTypesOptions.map((o) => ({ value: o.value, label: t(o.label) }));

	return (
		<Select
			value={value}
			onValueChange={(val) => val !== null && onChange?.(val)}
			disabled={disabled}
			items={items}
		>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent title={title}>
				{FieldTypesOptions.map((o) => {
					const Icon = FieldTypesIcons[o.value];
					return (
						<SelectItem key={o.value} value={o.value}>
							<div className="flex items-center gap-2">
								<Icon className="w-4 h-4" style={{ color: colors.orange }} />
								{t(o.label)}
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
