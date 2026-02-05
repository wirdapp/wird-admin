import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { SubmitButton } from "components/public/submit-button";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "components/ui/form";
import { PasswordInput } from "components/ui/password-input";
import { useConfirmPasswordReset } from "services/auth/queries";

type Props = {
	token: string;
	uid: string;
};

const resetPasswordSchema = z
	.object({
		new_password1: z.string().min(8, "Password must be at least 8 characters"),
		new_password2: z.string().min(8, "Password must be at least 8 characters"),
	})
	.refine((data) => data.new_password1 === data.new_password2, {
		message: "Passwords do not match",
		path: ["new_password2"],
	});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = ({ token, uid }: Props) => {
	const { t } = useTranslation();
	const [success, setSuccess] = useState(false);
	const confirmPasswordReset = useConfirmPasswordReset();

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			new_password1: "",
			new_password2: "",
		},
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			await confirmPasswordReset.mutateAsync({
				...data,
				token,
				uid,
			});
			setSuccess(true);
		} catch (error) {
			const axiosError = error as AxiosError<Record<string, string[]>>;
			if (axiosError.response?.data) {
				Object.entries(axiosError.response.data).forEach(([field, messages]) => {
					if (field === "non_field_errors") {
						form.setError("root", {
							type: "server",
							message: Array.isArray(messages) ? messages.join(", ") : String(messages),
						});
					} else {
						form.setError(field as keyof ResetPasswordFormData, {
							type: "server",
							message: Array.isArray(messages) ? messages.join(", ") : String(messages),
						});
					}
				});
			}
		}
	};

	return success ? (
		<Alert variant="success" className="max-w-md w-full">
			<CheckCircle className="size-4" />
			<AlertTitle>{t("ResetPasswordPage.success")}</AlertTitle>
			<AlertDescription>
				{t("ResetPasswordPage.successMessage")}
			</AlertDescription>
		</Alert>
	) : (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full">
				<div className="text-lg md:text-2xl font-bold text-gray-700 mb-4">
					{t("ResetPasswordPage.resetPassword")}
				</div>
				<div className="text-gray-500 mb-5">
					{t("ResetPasswordPage.enterNewPassword")}:
				</div>
				<div className="flex flex-col gap-4 w-full">
					{form.formState.errors.root && (
						<p className="text-sm font-medium text-destructive">
							{form.formState.errors.root.message}
						</p>
					)}
					<FormField
						control={form.control}
						name="new_password1"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<PasswordInput
										placeholder={t("ResetPasswordPage.newPassword")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="new_password2"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<PasswordInput
										placeholder={t("ResetPasswordPage.confirmNewPassword")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubmitButton loading={form.formState.isSubmitting}>
						{t("ResetPasswordPage.resetPassword")}
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
};
