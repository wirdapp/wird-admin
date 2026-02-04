import { Select, type SelectProps } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { MembersService } from "../../../services/members/members.service";
import type { ContestPerson, Role } from "../../../types";
import { getFullName } from "../../../util/user-utils";

interface MemberOption {
	value: string;
	label: string | null;
	username: string;
}

type ValueFieldFunction = (member: ContestPerson) => string;

interface MembersSelectProps
	extends Omit<SelectProps, "loading" | "options" | "showSearch" | "optionFilterProp"> {
	role?: Role;
	valueField?: string | ValueFieldFunction;
	excludeUsernames?: string[];
}

export const MembersSelect: React.FC<MembersSelectProps> = ({
	role,
	valueField = "id",
	excludeUsernames,
	...props
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
			{...props}
			loading={loading}
			options={filteredMembers}
			showSearch
			optionFilterProp="label"
		/>
	);
};
