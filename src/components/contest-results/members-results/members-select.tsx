import type React from "react";
import { useMemo } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useMembers } from "../../../services/members/queries";
import type { ContestPerson, Role } from "../../../types";
import { createNormalizedFilter } from "../../../util/normalize-text";
import { getFullName } from "../../../util/user-utils";

type ValueFieldFunction = (member: ContestPerson) => string;

interface MemberOption {
	value: string;
	label: string;
	username: string;
}

interface MembersSelectProps {
	roles?: Role[];
	valueField?: string | ValueFieldFunction;
	excludeUsernames?: string[];
	value?: string;
	onValueChange?: (value: string | null) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export const MembersSelect: React.FC<MembersSelectProps> = ({
	roles,
	valueField = "id",
	excludeUsernames,
	value,
	onValueChange,
	placeholder,
	className,
	disabled,
}) => {
	const memberFilter = useMemo(
		() => createNormalizedFilter<MemberOption>((item) => `${item.label} ${item.username}`),
		[],
	);
	const { data, isLoading: loading } = useMembers();

	const members = useMemo(() => {
		if (!data) return [];
		return data.results
			.filter((member) => !roles || roles.includes(member.contest_role))
			.map((member) => ({
				value: typeof valueField === "function" ? valueField(member) : member.id,
				label: getFullName(member.person_info) ?? member.person_info.username,
				username: member.person_info.username,
			}))
			.sort((a, b) => a.label.localeCompare(b.label));
	}, [data, valueField, roles]);

	const filteredMembers = useMemo(
		() => members.filter((member) => !excludeUsernames?.includes(member.username)),
		[members, excludeUsernames],
	);

	const selectedOption = useMemo(
		() => filteredMembers.find((m) => m.value === value) ?? null,
		[filteredMembers, value],
	);

	if (loading) {
		return (
			<div
				className={cn(
					"flex min-h-11 items-center gap-2 rounded-lg border border-input px-4 py-2",
					className,
				)}
			>
				<Spinner size="sm" />
				<span className="text-muted-foreground text-sm">Loading...</span>
			</div>
		);
	}

	return (
		<Combobox
			items={filteredMembers}
			itemToStringValue={(item: MemberOption) => `${item.label} ${item.username}`}
			filter={memberFilter}
			value={selectedOption}
			onValueChange={(item: MemberOption | null) => {
				onValueChange?.(item?.value ?? null);
			}}
		>
			<ComboboxInput
				showClear
				placeholder={placeholder}
				className={cn("w-full", className)}
				disabled={disabled}
			/>
			<ComboboxContent>
				<ComboboxEmpty>No members found</ComboboxEmpty>
				<ComboboxList>
					{(item: MemberOption) => (
						<ComboboxItem key={item.value} value={item} className="py-2 text-base">
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
};
