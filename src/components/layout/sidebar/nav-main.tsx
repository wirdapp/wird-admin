import { ReactComponent as CompInfoIcon } from "assets/icons/competition-information.svg";
import { ReactComponent as CriteriaIcon } from "assets/icons/criterias.svg";
import { ReactComponent as GroupsIcon } from "assets/icons/group.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as LeaderBoard } from "assets/icons/leaderBoard.svg";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import { ReactComponent as ParticipantsIcon } from "assets/icons/students.svg";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { isAtLeastSuperAdmin } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";

const menuItems = [
	{ to: "/dashboard/", icon: HomeIcon, labelKey: "home-page", end: true },
	{ to: "/dashboard/competition", icon: CompInfoIcon, labelKey: "contest-information" },
	{ to: "/dashboard/groups", icon: GroupsIcon, labelKey: "groups-page" },
	{ to: "/dashboard/results/overview", icon: ResultsIcon, labelKey: "results-page" },
	{ to: "/dashboard/leaderboard", icon: LeaderBoard, labelKey: "leaders-board" },
	{ to: "/dashboard/participants", icon: ParticipantsIcon, labelKey: "participants" },
];

export function NavMain() {
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();
	const location = useLocation();
	const { setOpenMobile } = useSidebar();

	const isSuperAdmin = isAtLeastSuperAdmin(currentUser?.role);

	const isActive = (to: string, end?: boolean) => {
		if (end) {
			return location.pathname === to;
		}
		return location.pathname.startsWith(to);
	};

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{menuItems.map((item) => (
						<SidebarMenuItem key={item.to}>
							<SidebarMenuButton
								asChild
								isActive={isActive(item.to, item.end)}
								tooltip={t(item.labelKey)}
							>
								<NavLink to={item.to} end={item.end} onClick={() => setOpenMobile(false)}>
									<item.icon className="size-5" />
									<span>{t(item.labelKey)}</span>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
					{isSuperAdmin && (
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								isActive={isActive("/dashboard/contest-criteria")}
								tooltip={t("criterias")}
							>
								<NavLink to="/dashboard/contest-criteria" onClick={() => setOpenMobile(false)}>
									<CriteriaIcon className="size-5" />
									<span>{t("criterias")}</span>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
