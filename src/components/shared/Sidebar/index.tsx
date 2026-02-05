import { ReactComponent as CompInfoIcon } from "assets/icons/competition-information.svg";
import { ReactComponent as CriteriaIcon } from "assets/icons/criterias.svg";
import { ReactComponent as GroupsIcon } from "assets/icons/group.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as LeaderBoard } from "assets/icons/leaderBoard.svg";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { ReactComponent as ParticipantsIcon } from "assets/icons/students.svg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { isAtLeastSuperAdmin } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";

function Sidebar() {
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();

	const isSuperAdmin = isAtLeastSuperAdmin(currentUser?.role);

	const menuLinkClasses = cn(
		"flex no-underline justify-end rounded-xl items-center text-grey-dark whitespace-nowrap h-12 px-3 py-2 flex-row font-bold text-start gap-4 text-base",
		"hover:bg-brand-red-light hover:text-black",
		"focus:bg-brand-red-light focus:text-black",
		"[&.active]:bg-brand-red-light [&.active]:text-black",
		"max-lg:text-sm max-lg:w-full max-lg:justify-center",
	);

	return (
		<aside className="duration-200 bg-wheat-warm text-center my-2 flex-[0_1_300px] [&_svg]:min-w-5 max-lg:flex-[0_1_90px] max-lg:w-[90px] max-lg:text-center max-lg:[&_span]:hidden max-md:hidden">
			<div className="p-2">
				<div className="p-4 max-lg:p-0 max-lg:pb-4">
					<WirdLogo className="mx-auto w-full max-w-[50px] h-auto" />
				</div>

				<div className="w-full gap-2 flex flex-col">
					<NavLink end to="/dashboard/" title={t("home-page")} className={menuLinkClasses}>
						<HomeIcon />
						<span className="cursor-pointer p-0 border-none w-full">{t("home-page")}</span>
					</NavLink>
					<NavLink
						to="/dashboard/competition"
						title={t("contest-information")}
						className={menuLinkClasses}
					>
						<CompInfoIcon />
						<span className="cursor-pointer p-0 border-none w-full">
							{t("contest-information")}
						</span>
					</NavLink>
					<NavLink to="/dashboard/groups" title={t("groups-page")} className={menuLinkClasses}>
						<GroupsIcon />
						<span className="cursor-pointer p-0 border-none w-full">{t("groups-page")}</span>
					</NavLink>

					<NavLink
						to="/dashboard/results/overview"
						title={t("results-page")}
						className={menuLinkClasses}
					>
						<ResultsIcon />
						<span className="cursor-pointer p-0 border-none w-full">{t("results-page")}</span>
					</NavLink>
					<NavLink
						to="/dashboard/leaderboard"
						title={t("leaders-board")}
						className={menuLinkClasses}
					>
						<LeaderBoard />
						<span className="cursor-pointer p-0 border-none w-full">{t("leaders-board")}</span>
					</NavLink>
					<NavLink
						to="/dashboard/participants"
						title={t("participants")}
						className={menuLinkClasses}
					>
						<ParticipantsIcon />
						<span className="cursor-pointer p-0 border-none w-full">{t("participants")}</span>
					</NavLink>
					{isSuperAdmin && (
						<NavLink
							to="/dashboard/contest-criteria"
							title={t("criterias")}
							className={menuLinkClasses}
						>
							<CriteriaIcon />
							<span className="cursor-pointer p-0 border-none w-full">{t("criterias")}</span>
						</NavLink>
					)}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
