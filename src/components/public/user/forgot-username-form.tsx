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
import { useRequestUsernameEmail } from "services/auth/queries";

const forgotUsernameSchema = z.object({
	email: z.string().email("Invalid email address"),
});

type ForgotUsernameFormData = z.infer<typeof forgotUsernameSchema>;

export const ForgotUsernameForm = () => {
	const { t } = useTranslation();
	const [success, setSuccess] = useState(false);
	const requestUsernameEmail = useRequestUsernameEmail();

	const form = useForm<ForgotUsernameFormData>({
		resolver: zodResolver(forgotUsernameSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotUsernameFormData) => {
		try {
			await requestUsernameEmail.mutateAsync(data.email);
			setSuccess(true);
		} catch (error) {
			const axiosError = error as AxiosError<Record<string, string[]>>;
			if (axiosError.response?.data) {
				Object.entries(axiosError.response.data).forEach(([field, messages]) => {
					form.setError(field as keyof ForgotUsernameFormData, {
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
			<AlertTitle>{t("ForgotUsernamePage.emailSent")}</AlertTitle>
			<AlertDescription>
				{t("ForgotUsernamePage.emailSentMessage")}
			</AlertDescription>
		</Alert>
	) : (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full">
				<div className="text-lg md:text-2xl font-bold text-gray-700 mb-4">
					{t("ForgotUsernamePage.forgotUsername")}
				</div>
				<div className="text-gray-500 mb-5">
					{t("ForgotUsernamePage.forgotUsernameFormMessage")}
				</div>
				<div className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder={t("ForgotUsernamePage.email")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubmitButton loading={form.formState.isSubmitting}>
						{t("ForgotUsernamePage.sendUsername")}
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
};
