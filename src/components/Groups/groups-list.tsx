import type React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { Group } from "../../types";

interface GroupsListProps {
	groups: Group[];
	selected?: string;
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups, selected }) => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();
	const navigate = useNavigate();

	if (!isMobile) {
		// Desktop: show as a vertical menu list
		return (
			<nav className="flex flex-col gap-2">
				{groups.map((group) => (
					<button
						key={group.id}
						type="button"
						onClick={() => navigate(`/dashboard/groups/${group.id}`)}
						className={cn(
							"px-4 py-2 text-start rounded-md transition-colors bg-muted hover:bg-wheat-warm",
							selected === group.id && "bg-white hover:bg-white !ring-primary ring font-medium",
						)}
					>
						{group.name}
					</button>
				))}
			</nav>
		);
	}

	// Mobile: show as a select
	return (
		<Select
			value={selected ?? ""}
			onValueChange={(value) => navigate(`/dashboard/groups/${value}`)}
			items={groups.map((g) => ({ value: g.id, label: g.name }))}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("select-group")} />
			</SelectTrigger>
			<SelectContent>
				{groups.map((group) => (
					<SelectItem key={group.id} value={group.id}>
						{group.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
