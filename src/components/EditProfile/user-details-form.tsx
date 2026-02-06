import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboardData } from "../../util/routes-data";
import type { UpdateUserInfoValues } from "./index";

interface UserDetailsFormProps {
	onSubmit: (values: UpdateUserInfoValues) => Promise<void>;
}

interface UserDetailsFormValues {
	first_name: string;
	last_name: string;
}

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onSubmit }) => {
	const { currentUser } = useDashboardData();
	const { t } = useTranslation();

	const form = useForm<UserDetailsFormValues>({
		defaultValues: {
			first_name: currentUser?.first_name ?? "",
			last_name: currentUser?.last_name ?? "",
		},
	});

	const resetForm = (): void => {
		form.reset({
			first_name: currentUser?.first_name ?? "",
			last_name: currentUser?.last_name ?? "",
		});
	};

	useEffect(() => {
		form.reset({
			first_name: currentUser?.first_name ?? "",
			last_name: currentUser?.last_name ?? "",
		});
	}, [currentUser, form]);

	const handleFormSubmit = (values: UserDetailsFormValues) => {
		onSubmit(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex-grow">
				<fieldset className="border border-primary rounded-md p-3">
					<legend className="text-sm text-foreground px-2 mx-1 mb-2">{t("user-details")}</legend>
					<div className="space-y-4">
						<div>
							<Label>{t("email")}</Label>
							<Input disabled value={currentUser?.email ?? ""} />
						</div>
						<div>
							<Label>{t("username")}</Label>
							<Input disabled value={currentUser?.username ?? ""} />
						</div>
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("first-name")}</FormLabel>
									<FormControl>
										<Input placeholder={t("first-name")} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("last-name")}</FormLabel>
									<FormControl>
										<Input placeholder={t("last-name")} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex gap-2">
							<Button type="submit">{t("save")}</Button>
							<Button type="button" variant="ghost" onClick={resetForm}>
								{t("cancel")}
							</Button>
						</div>
					</div>
				</fieldset>
			</form>
		</Form>
	);
};
