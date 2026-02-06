import { Check, ChevronsUpDown, Copy, LayoutGrid, PlusCircle, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { changeCurrentContest } from "../../../services/contests/utils";
import type { ContestRaw } from "../../../types";
import { useDashboardData } from "../../../util/routes-data";
import { ContestBadge } from "../../Competition/contest-badge";

interface ContestSwitcherProps {
	onCreateContest: () => void;
	onJoinContest: () => void;
}

export function ContestSwitcher({ onCreateContest, onJoinContest }: ContestSwitcherProps) {
	const { currentContest, contests } = useDashboardData();
	const { t, i18n } = useTranslation();
	const { isMobile, setOpenMobile } = useSidebar();

	const closeMobileSidebar = () => setOpenMobile(false);

	const otherContests = contests.filter((contest) => contest.id !== currentContest?.id);

	const switchContest = async (contest: ContestRaw) => {
		try {
			await changeCurrentContest(contest.id);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	const copyJoinCode = () => {
		if (currentContest?.contest_id) {
			navigator.clipboard.writeText(currentContest.contest_id);
			toast.success(t("copied"));
		}
	};

	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="bg-sidebar-accent hover:bg-sidebar-border data-[state=open]:bg-sidebar-border !h-auto py-5"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
									<LayoutGrid className="size-4" />
								</div>
								<div className="grid flex-1 text-start leading-tight">
									<span className="truncate font-semibold text-base">
										{currentContest?.name ?? t("no-contest-yet")}
									</span>
									{currentContest && (
										<ContestBadge status={currentContest.status} variant="inline" />
									)}
								</div>
								<ChevronsUpDown className="ms-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
							align="start"
							side={isMobile ? "bottom" : i18n.dir() === "rtl" ? "left" : "right"}
							sideOffset={4}
						>
							{currentContest && (
								<>
									<DropdownMenuLabel className="text-xs text-muted-foreground">
										{t("current-contest")}
									</DropdownMenuLabel>
									<DropdownMenuItem className="gap-2 p-2">
										<div className="flex size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
											<LayoutGrid className="size-4 shrink-0" />
										</div>
										<span className="font-medium">{currentContest.name}</span>
										<Check className="ms-auto size-4" />
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => { copyJoinCode(); }} className="gap-2 p-2">
										<Copy className="size-4 text-muted-foreground" />
										<span className="text-muted-foreground">{t("join-code")}:</span>
										<code className="bg-muted px-1 py-0.5 rounded text-xs">
											{currentContest.contest_id}
										</code>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</>
							)}
							{otherContests.length > 0 && (
								<>
									<DropdownMenuLabel className="text-xs text-muted-foreground">
										{t("switch-contest")}
									</DropdownMenuLabel>
									{otherContests.map((contest) => (
										<DropdownMenuItem
											key={contest.id}
											onClick={() => switchContest(contest)}
											className="gap-2 p-2"
										>
											<div className="flex size-6 items-center justify-center rounded-md bg-muted">
												<LayoutGrid className="size-4 shrink-0" />
											</div>
											{contest.name}
										</DropdownMenuItem>
									))}
									<DropdownMenuSeparator />
								</>
							)}
              <DropdownMenuItem onClick={() => { onCreateContest(); closeMobileSidebar();}} className="gap-2 p-2">
								<PlusCircle className="size-4 text-brand-orange" />
								{t("create-contest")}
							</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { onJoinContest(); closeMobileSidebar(); }} className="gap-2 p-2">
								<UserPlus className="size-4 text-brand-orange" />
								{t("join-contest")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	);
}
