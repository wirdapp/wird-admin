import { ShieldX } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches } from "react-router";
import { Result } from "@/components/ui/result";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { isAtLeastAdmin } from "../../util/roles";
import { useDashboardData, usePageTitle } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";
import { EmailNotVerifiedAlert } from "./email-not-verified-alert";
import { AppSidebar } from "./sidebar/app-sidebar";

export const DashboardLayout: React.FC = () => {
	const { t } = useTranslation();
	const { currentContest, currentUser } = useDashboardData();
	const matches = useMatches();
	const isProfilePage = matches.some((match) => match.id === "profile");
	const title = usePageTitle();

	const canAccessAdminPanel = isProfilePage || !currentContest || isAtLeastAdmin(currentUser?.role);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-white">
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ms-1" />
					<Separator orientation="vertical" className="me-2 h-4" />
					<h1 className="font-bold text-lg empty:hidden">{t(title ?? "")}</h1>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4">
					{!currentUser?.email_verified && <EmailNotVerifiedAlert />}
					{canAccessAdminPanel ? (
						<div className="p-4 md:p-6 flex-1">
							{isProfilePage || currentContest ? <Outlet /> : <NoContestYet />}
						</div>
					) : (
						<div className="p-4 md:p-6 flex-1">
							<Result
								status="error"
								title={t("forbidden")}
								subTitle={t("notAdmin")}
								icon={<ShieldX className="h-16 w-16 text-destructive" />}
							/>
						</div>
					)}
				</main>
				<footer className="flex justify-end gap-1 text-xs px-4 pb-4 text-muted-foreground">
					<div className="footer-content">
						<span>{t("copyrightFooterMsg", { year: new Date().getFullYear() })}</span>
					</div>
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
};
