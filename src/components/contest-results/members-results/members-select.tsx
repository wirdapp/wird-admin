import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { MembersService } from "../../../services/members/members.service";
import type { ContestPerson, Role } from "../../../types";
import { getFullName } from "../../../util/user-utils";

interface MemberOption {
	value: string;
	label: string | null;
	username: string;
}

type ValueFieldFunction = (member: ContestPerson) => string;

interface MembersSelectProps {
	role?: Role;
	valueField?: string | ValueFieldFunction;
	excludeUsernames?: string[];
	value?: string | string[];
	onValueChange?: (value: string | null) => void;
	onChange?: (value: string | string[]) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	mode?: "multiple" | "single";
	status?: "error" | undefined;
}

export const MembersSelect: React.FC<MembersSelectProps> = ({
	role,
	valueField = "id",
	excludeUsernames,
	value,
	onValueChange,
	onChange: _onChange,
	placeholder,
	className,
	disabled,
	mode: _mode,
	status: _status,
}) => {
	const [members, setMembers] = useState<MemberOption[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		MembersService.getUsers({ role })
			.then((res) => {
				const membersList = Array.isArray(res) ? res : res.results;
				setMembers(
					membersList.map((member) => ({
						value: typeof valueField === "function" ? valueField(member) : member.id,
						label: getFullName(member.person_info),
						username: member.person_info.username,
					})),
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [role, valueField]);

	const filteredMembers = useMemo(
		() => members.filter((member) => !excludeUsernames?.includes(member.username)),
		[members, excludeUsernames],
	);

	return (
		<Select
			value={Array.isArray(value) ? value[0] : value}
			onValueChange={onValueChange}
			disabled={disabled || loading}
			items={filteredMembers.map((m) => ({ value: m.value, label: m.label }))}
		>
			<SelectTrigger className={cn("w-full", className)}>
				{loading ? (
					<div className="flex items-center gap-2">
						<Spinner size="sm" />
						<span className="text-muted-foreground">Loading...</span>
					</div>
				) : (
					<SelectValue placeholder={placeholder} />
				)}
			</SelectTrigger>
			<SelectContent title={placeholder}>
				{filteredMembers.map((member) => (
					<SelectItem key={member.value} value={member.value}>
						{member.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
