import { TrashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeleteGroup, useUpdateGroup } from "../../services/groups/queries";
import type { Group } from "../../types";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";

interface GroupInfoProps {
	group: Group;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({ group }) => {
	const { t } = useTranslation();

	const groupInfoSchema = z.object({
		name: z.string().min(1, t("requiredField")),
	});

	type FormValues = z.infer<typeof groupInfoSchema>;
	const { groupId } = useParams<{ groupId: string }>();
	const navigate = useNavigate();
	const { currentUser } = useDashboardData();
	const updateGroup = useUpdateGroup();
	const deleteGroupMutation = useDeleteGroup();

	const isSuperAdmin = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	const form = useForm<FormValues>({
		resolver: zodResolver(groupInfoSchema),
		defaultValues: {
			name: group.name,
		},
	});

	const onUpdateName = async (values: FormValues) => {
		if (!isSuperAdmin) return;
		try {
			await updateGroup.mutateAsync({
				id: groupId!,
				body: { name: values.name },
			});
			toast.success(t("group-updated"));
		} catch (e) {
			console.error(e);
			toast.error(t("something-went-wrong"));
		}
	};

	const deleteGroup = async () => {
		if (!isSuperAdmin) return;
		try {
			await deleteGroupMutation.mutateAsync(groupId!);
			toast.success(t("group-deleted"));
			navigate("/dashboard/groups");
		} catch (e) {
			console.error(e);
			toast.error(t("something-went-wrong"));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onUpdateName)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("name")}</FormLabel>
							<FormControl>
								<Input {...field} disabled={!isSuperAdmin || updateGroup.isPending} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isSuperAdmin && (
					<div className="flex justify-between gap-4">
						<Button type="submit" disabled={updateGroup.isPending}>
							{updateGroup.isPending && (
								<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
							)}
							{t("save")}
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									className="text-destructive hover:text-destructive hover:bg-destructive/10"
									disabled={deleteGroupMutation.isPending}
								>
									{deleteGroupMutation.isPending ? (
										<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
									) : (
										<TrashIcon className="h-4 w-4" />
									)}
									{t("delete")}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>{t("delete-group-confirm")}</AlertDialogTitle>
									<AlertDialogDescription>{t("delete-group-confirm")}</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
									<AlertDialogAction
										onClick={deleteGroup}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										{t("delete")}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				)}
			</form>
		</Form>
	);
};
