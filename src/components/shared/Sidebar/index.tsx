import { ReactComponent as CompInfoIcon } from "assets/icons/competition-information.svg";
import { ReactComponent as CriteriaIcon } from "assets/icons/criterias.svg";
import { ReactComponent as GroupsIcon } from "assets/icons/group.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as LeaderBoard } from "assets/icons/leaderBoard.svg";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { ReactComponent as ParticipantsIcon } from "assets/icons/students.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { isAtLeastSuperAdmin } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";
import {
	MenuContainer,
	MenuItem,
	MenuLink,
	SideBarContainer,
	WirdLogoContainer,
} from "./sidebar.styles";

function Sidebar() {
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();

	const isSuperAdmin = isAtLeastSuperAdmin(currentUser?.role);

	return (
		<SideBarContainer>
			<div>
				<WirdLogoContainer>
					<WirdLogo />
				</WirdLogoContainer>

				<MenuContainer>
					<MenuLink end to="/dashboard/" title={t("home-page")}>
						<HomeIcon />
						<MenuItem>{t("home-page")}</MenuItem>
					</MenuLink>
					<MenuLink to="/dashboard/competition" title={t("contest-information")}>
						<CompInfoIcon />
						<MenuItem>{t("contest-information")}</MenuItem>
					</MenuLink>
					<MenuLink to="/dashboard/groups" title={t("groups-page")}>
						<GroupsIcon />
						<MenuItem>{t("groups-page")}</MenuItem>
					</MenuLink>

					<MenuLink to="/dashboard/results/overview" title={t("results-page")}>
						<ResultsIcon />
						<MenuItem>{t("results-page")}</MenuItem>
					</MenuLink>
					<MenuLink to="/dashboard/leaderboard" title={t("leaders-board")}>
						<LeaderBoard />
						<MenuItem>{t("leaders-board")}</MenuItem>
					</MenuLink>
					<MenuLink to="/dashboard/participants" title={t("participants")}>
						<ParticipantsIcon />
						<MenuItem>{t("participants")}</MenuItem>
					</MenuLink>
					{isSuperAdmin && (
						<MenuLink to="/dashboard/contest-criteria" title={t("criterias")}>
							<CriteriaIcon />
							<MenuItem>{t("criterias")}</MenuItem>
						</MenuLink>
					)}
				</MenuContainer>
			</div>
		</SideBarContainer>
	);
}

export default Sidebar;
