import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRemoveUserFromContest } from "../../services/members/queries";
import type { ContestPerson } from "../../types";
import { isAtLeastSuperAdmin, isMember, isOwner, Role } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { getFullName, getInitials } from "../../util/user-utils";
import ChangeRoleDropdown from "./ChangeRoleDropdown";

interface UserListItemProps {
	student: ContestPerson;
	onChange?: (result?: ContestPerson) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ student, onChange }) => {
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const removeUserFromContestMutation = useRemoveUserFromContest();
	const [confirmOpen, setConfirmOpen] = useState(false);

	const canEdit =
		student.contest_role > currentUser!.role! && isAtLeastSuperAdmin(currentUser!.role!);

	const removeUserFromContest = async (userId: string): Promise<void> => {
		try {
			await removeUserFromContestMutation.mutateAsync(userId);
			toast.success(t("user-removed"));
			onChange?.();
			setConfirmOpen(false);
		} catch (error) {
			console.error(error);
			toast.error(t("something-went-wrong"));
		}
	};

	const getBadgeVariant = (role: Role) => {
		if (role === Role.DEACTIVATED) return "destructive";
		if (role === Role.PENDING) return "secondary";
		return "default";
	};

	return (
		<div
			data-person-id={student.id}
			className="flex items-start gap-3 bg-muted/50 p-6 w-full rounded-3xl"
		>
			<Avatar className="bg-amber-300 text-black">
				<AvatarFallback className="bg-amber-300 text-black font-medium">
					{getInitials(student?.person_info)}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col md:flex-row md:items-center justify-between items-start flex-1">
				<div className="flex flex-col justify-center">
					<span className="font-bold text-base md:text-sm sm:text-xs">
						{getFullName(student?.person_info)}
					</span>
					<div className="flex flex-wrap gap-2 items-center">
						<span className="text-sm text-muted-foreground">{student?.person_info?.username}</span>
						<Badge variant={getBadgeVariant(student?.contest_role)}>
							{t(`role.${student?.contest_role}`)}
						</Badge>
					</div>
				</div>

				<div className="flex flex-wrap gap-2 mt-2 md:mt-0">
					{canEdit && <ChangeRoleDropdown student={student} onChange={onChange} />}
					{isMember(student.contest_role) && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => navigate(`/dashboard/results/members?userId=${student?.id}`)}
						>
							<ResultsIcon className="h-4 w-4" />
							{t("show-results")}
						</Button>
					)}
					{canEdit &&
						student?.person_info?.username !== currentUser?.username &&
						!isOwner(student.contest_role) && (
							<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
								<AlertDialogTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="text-destructive hover:text-destructive hover:bg-destructive/10"
									>
										<XMarkIcon className="h-4 w-4" />
										{t("remove")}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>{t("are-you-sure")}</AlertDialogTitle>
										<AlertDialogDescription>
											{t("remove-user-confirmation", {
												defaultValue: "This action will remove the user from the contest.",
											})}
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => removeUserFromContest(student?.id)}
											disabled={removeUserFromContestMutation.isPending}
											className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
										>
											{removeUserFromContestMutation.isPending ? t("loading") : t("remove")}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
				</div>
			</div>
		</div>
	);
};

export default UserListItem;
