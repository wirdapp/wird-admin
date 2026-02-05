import { ChevronsUpDown, HelpCircle, Languages, LogOut, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
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
import { destroySession } from "../../../services/auth/session";
import { changeLanguage } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";
import { getFullName, getInitials } from "../../../util/user-utils";

export function NavUser() {
	const { currentUser } = useDashboardData();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="bg-sidebar-accent hover:bg-sidebar-border data-[state=open]:bg-sidebar-border"
						>
							<Avatar className="h-8 w-8 rounded-md">
								<AvatarImage
									src={currentUser?.profile_photo ?? undefined}
									alt={getFullName(currentUser) ?? undefined}
								/>
								<AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
									{getInitials(currentUser)}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-start text-sm leading-tight">
								<span className="truncate font-semibold">{getFullName(currentUser)}</span>
								<span className="truncate text-xs text-muted-foreground">{currentUser?.email}</span>
							</div>
							<ChevronsUpDown className="ms-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
						side={isMobile ? "bottom" : i18n.dir() === "rtl" ? "left" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
								<Avatar className="h-8 w-8 rounded-md">
									<AvatarImage
										src={currentUser?.profile_photo ?? undefined}
										alt={getFullName(currentUser) ?? undefined}
									/>
									<AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
										{getInitials(currentUser)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-start text-sm leading-tight">
									<span className="truncate font-semibold">{getFullName(currentUser)}</span>
									<span className="truncate text-xs text-muted-foreground">
										{currentUser?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
								<User className="me-2 size-4" />
								{t("profile")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									window.open(`${import.meta.env.VITE_MAIN_URL}/help`, "_blank");
								}}
							>
								<HelpCircle className="me-2 size-4" />
								{t("help")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									changeLanguage(i18n.language === "ar" ? "en" : "ar");
								}}
							>
								<Languages className="me-2 size-4" />
								{t("language")}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								destroySession();
								navigate("/login");
							}}
						>
							<LogOut className="me-2 size-4" />
							{t("logout")}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
