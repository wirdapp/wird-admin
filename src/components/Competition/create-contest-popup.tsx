import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Result } from "@/components/ui/result";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allCountries } from "../../data/countries";
import { ContestsService } from "../../services/contests/contests.service";
import { changeCurrentContest } from "../../services/contests/utils";
import { useDashboardData } from "../../util/routes-data";

interface CreateContestPopupProps {
	visible: boolean;
	onClose?: () => void;
}

interface FormErrors {
	contest_id?: string;
	name?: string;
	description?: string;
	country?: string;
	[key: string]: string | undefined;
}

export const CreateContestPopup: React.FC<CreateContestPopupProps> = ({ visible, onClose }) => {
	const { currentUser } = useDashboardData();
	const { t, i18n } = useTranslation();
	const [errors, setErrors] = React.useState<FormErrors>({});
	const [submitting, setSubmitting] = React.useState<boolean>(false);

	const formSchema = z.object({
		contest_id: z
			.string()
			.min(1, t("contest-code-required-error"))
			.min(6, t("contest-code-invalid-error")),
		name: z.string().min(1, t("contest-name-required-error")),
		description: z.string().optional(),
		country: z.string().min(1, t("requiredField")),
		start_date: z.string().min(1, t("requiredField")),
		end_date: z.string().min(1, t("requiredField")),
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			contest_id: "",
			name: "",
			description: "",
			country: "",
			start_date: "",
			end_date: "",
		},
	});

	const handleSubmit = async (values: FormValues): Promise<void> => {
		if (!currentUser?.email_verified) {
			toast.error(t("emailNotVerified"));
			return;
		}
		setSubmitting(true);

		try {
			const result = await ContestsService.createContest({
				contest_id: values.contest_id,
				name: values.name,
				description: values.description,
				country: values.country,
				start_date: values.start_date,
				end_date: values.end_date,
			});
			changeCurrentContest(result.id);
			window.location.reload();
			onClose?.();
		} catch (error) {
			if (isAxiosError(error) && error.response?.data) {
				setErrors(error.response.data as FormErrors);
			}
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = (): void => {
		setErrors({});
		form.reset();
		onClose?.();
	};

	const countries = useMemo(() => {
		return allCountries(i18n.language)
			.filter((country): country is { code: string; name: string } => Boolean(country))
			.map((country) => ({
				label: country.name,
				value: country.code,
			}));
	}, [i18n.language]);

	const isEmailVerified = currentUser?.email_verified ?? false;

	return (
		<Dialog open={visible} onOpenChange={(open) => !open && handleClose()}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>{t("create-contest")}</DialogTitle>
				</DialogHeader>
				<div className="relative">
					{!isEmailVerified && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 p-4 backdrop-blur-sm">
							<Result
								status="warning"
								title={t("emailNotVerified")}
								extra={
									<span
										dangerouslySetInnerHTML={{
											__html: t("emailNotVerifiedDescription", {
												email: currentUser?.email,
											}),
										}}
									/>
								}
							/>
						</div>
					)}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
							<FormField
								control={form.control}
								name="contest_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("contest-code")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("contest-code")}
												disabled={!isEmailVerified || submitting}
												{...field}
											/>
										</FormControl>
										<FormMessage>{errors.contest_id}</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("contest-name")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("name-label")}
												disabled={!isEmailVerified || submitting}
												{...field}
											/>
										</FormControl>
										<FormMessage>{errors.name}</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("contest-description")}</FormLabel>
										<FormControl>
											<Textarea
												placeholder={t("contest-description")}
												rows={2}
												disabled={!isEmailVerified || submitting}
												{...field}
											/>
										</FormControl>
										<FormMessage>{errors.description}</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("country")}</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={!isEmailVerified || submitting}
											items={countries}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={t("country")} />
												</SelectTrigger>
											</FormControl>
											<SelectContent title={t("country")}>
												{countries.map((country) => (
													<SelectItem key={country.value} value={country.value}>
														{country.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage>{errors.country}</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("start-date")}</FormLabel>
										<FormControl>
											<Input type="date" disabled={!isEmailVerified || submitting} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("end-date")}</FormLabel>
										<FormControl>
											<Input type="date" disabled={!isEmailVerified || submitting} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="button" variant="outline" onClick={handleClose} disabled={submitting}>
									{t("cancel")}
								</Button>
								<Button type="submit" disabled={!isEmailVerified || submitting}>
									<PlusCircleIcon className="h-4 w-4" />
									{submitting ? "..." : t("create-contest")}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
