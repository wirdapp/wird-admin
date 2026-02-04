import { Result } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches } from "react-router-dom";
import { isAtLeastAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { EmailNotVerifiedAlert } from "./email-not-verified-alert";
import { Container, DashboardFooter, MainContent } from "./layout.styles";

export const DashboardLayout: React.FC = () => {
	const { t } = useTranslation();
	const { currentContest, currentUser } = useDashboardData();
	const matches = useMatches();
	const isProfilePage = matches.some((match) => match.id === "profile");

	const canAccessAdminPanel = isProfilePage || !currentContest || isAtLeastAdmin(currentUser?.role);

	return (
		<Container>
			<Sidebar />
			<MainContent>
				<Navbar />
				{!currentUser?.email_verified && <EmailNotVerifiedAlert />}
				{canAccessAdminPanel ? (
					<div className="page-content">
						{isProfilePage || currentContest ? <Outlet /> : <NoContestYet />}
					</div>
				) : (
					<div className="page-content">
						<Result status="403" title={t("forbidden")} subTitle={t("notAdmin")} />
					</div>
				)}
				<DashboardFooter>
					<div className="footer-content">
						<span>{t("copyrightFooterMsg", { year: new Date().getFullYear() })}</span>
					</div>
				</DashboardFooter>
			</MainContent>
		</Container>
	);
};
