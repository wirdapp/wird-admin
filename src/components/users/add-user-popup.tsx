import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddUserToContest } from "../../services/members/queries";
import type { ContestPerson } from "../../types";
import { Role } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { RolesSelect } from "./roles-select";

interface AddUserPopupProps {
	open: boolean;
	onClose: () => void;
	onAdded: (result: ContestPerson) => void;
}

interface ApiErrorResponse {
	detail?: string;
}

export const AddUserPopup: React.FC<AddUserPopupProps> = ({ open, onClose, onAdded }) => {
	const { t } = useTranslation();
	const [formError, setFormError] = useState<string | undefined>();
	const { currentUser } = useDashboardData();
	const addUserToContest = useAddUserToContest();

	const formSchema = z.object({
		username: z.string().min(1, t("requiredField")),
		role: z.nativeEnum(Role),
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			role: Role.MEMBER,
		},
	});

	const onSubmit = async (values: FormValues): Promise<void> => {
		if (!values.username.length) return;
		setFormError(undefined);

		try {
			const res = await addUserToContest.mutateAsync({
				role: values.role,
				username: values.username,
			});
			toast.success(t("notification.addStudent"));
			form.reset();
			onAdded(res);
		} catch (error) {
			toast.error(t("notification.errorStudent"));
			const axiosError = error as AxiosError<ApiErrorResponse>;
			setFormError(axiosError?.response?.data?.detail);
		}
	};

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			form.reset();
			setFormError(undefined);
			onClose();
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("addParticipantManually")}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("username")}</FormLabel>
									<FormControl>
										<Input placeholder={t("username")} {...field} />
									</FormControl>
									<FormMessage />
									{formError && <p className="text-sm text-destructive">{formError}</p>}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("mainRole")}</FormLabel>
									<FormControl>
										<RolesSelect
											value={field.value}
											onChange={field.onChange}
											minRole={currentUser!.role!}
											title={t("mainRole")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={addUserToContest.isPending}>
							<PlusIcon className="h-4 w-4" />
							{addUserToContest.isPending ? t("loading") : t("add-user")}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
