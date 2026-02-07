import type React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Role } from "../../util/roles";

interface RolesSelectProps {
	value?: Role | number;
	onChange?: (value: Role | number) => void;
	showAll?: boolean;
	className?: string;
	minRole?: number;
	title?: string;
}

interface RoleOption {
	label: string;
	value: Role | number;
}

export const RolesSelect: React.FC<RolesSelectProps> = ({
	value,
	onChange,
	showAll,
	className,
	minRole = -1,
	title,
}) => {
	const { t } = useTranslation();

	const options = useMemo<RoleOption[]>(() => {
		const ops: RoleOption[] = [];
		if (showAll) {
			ops.push({ label: t("all"), value: -1 });
		}
		Object.values(Role).forEach((roleValue) => {
			if (typeof roleValue === "number" && roleValue > minRole) {
				ops.push({ label: t(`role.${roleValue}`), value: roleValue });
			}
		});
		return ops;
	}, [minRole, showAll, t]);

	return (
		<Select
			value={value?.toString()}
			onValueChange={(val) => onChange?.(Number(val))}
			items={options.map((o) => ({ value: o.value.toString(), label: o.label }))}
		>
			<SelectTrigger className={cn("w-full", className)}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent title={title}>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value.toString()}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
