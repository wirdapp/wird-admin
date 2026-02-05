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
import { Input } from "components/ui/input";
import { useRequestPasswordReset } from "services/auth/queries";

const forgotPasswordSchema = z.object({
	username: z.string().min(1, "Username is required"),
	email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
	const { t } = useTranslation();
	const [success, setSuccess] = useState(false);
	const requestPasswordReset = useRequestPasswordReset();

	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			await requestPasswordReset.mutateAsync(data);
			setSuccess(true);
		} catch (error) {
			const axiosError = error as AxiosError<Record<string, string[]>>;
			if (axiosError.response?.data) {
				Object.entries(axiosError.response.data).forEach(([field, messages]) => {
					form.setError(field as keyof ForgotPasswordFormData, {
						type: "server",
						message: Array.isArray(messages) ? messages.join(", ") : String(messages),
					});
				});
			}
		}
	};

	return success ? (
		<Alert variant="success" className="max-w-md w-full">
			<CheckCircle className="size-4" />
			<AlertTitle>{t("ForgotPasswordPage.emailSent")}</AlertTitle>
			<AlertDescription>
				{t("ForgotPasswordPage.emailSentMessage")}
			</AlertDescription>
		</Alert>
	) : (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full">
				<div className="text-lg md:text-2xl font-bold text-gray-700 mb-4">
					{t("ForgotPasswordPage.forgotPassword")}
				</div>
				<div className="text-gray-500 mb-5">
					{t("ForgotPasswordPage.forgotPasswordFormMessage")}
				</div>
				<div className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={t("ForgotPasswordPage.username")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder={t("ForgotPasswordPage.email")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubmitButton loading={form.formState.isSubmitting}>
						{t("ForgotPasswordPage.sendResetLink")}
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
};
