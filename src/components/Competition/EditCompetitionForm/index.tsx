import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { allCountries } from "../../../data/countries";
import { useUpdateContest } from "../../../services/contests/queries";
import type { Contest } from "../../../types";
import { isAtLeastSuperAdmin } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";

interface EditCompetitionFormProps {
	contest: Contest;
}

interface ApiErrorResponse {
	response?: {
		data?: Record<string, string>;
	};
}

const EditCompetitionForm: React.FC<EditCompetitionFormProps> = ({ contest }) => {
	const { t, i18n } = useTranslation();
	const [messages, setMessages] = useState<string[]>([]);
	const { currentUser } = useDashboardData();
	const updateContest = useUpdateContest();

	const formSchema = z.object({
		name: z.string().min(1, t("requiredField")),
		description: z.string().optional(),
		country: z.string().min(1, t("requiredField")),
		start_date: z.string().min(1, t("requiredField")),
		end_date: z.string().min(1, t("requiredField")),
		days_to_record_in_past: z.number().min(1).optional(),
		show_standings: z.boolean().optional(),
		readonly_mode: z.boolean().optional(),
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: contest.name || "",
			description: contest.description || "",
			country: contest.country || "",
			start_date: contest.start_date ? dayjs(contest.start_date).format("YYYY-MM-DD") : "",
			end_date: contest.end_date ? dayjs(contest.end_date).format("YYYY-MM-DD") : "",
			days_to_record_in_past: contest.days_to_record_in_past || undefined,
			show_standings: contest.show_standings ?? false,
			readonly_mode: contest.readonly_mode ?? false,
		},
	});

	// Reset form when contest changes
	useEffect(() => {
		form.reset({
			name: contest.name || "",
			description: contest.description || "",
			country: contest.country || "",
			start_date: contest.start_date ? dayjs(contest.start_date).format("YYYY-MM-DD") : "",
			end_date: contest.end_date ? dayjs(contest.end_date).format("YYYY-MM-DD") : "",
			days_to_record_in_past: contest.days_to_record_in_past || undefined,
			show_standings: contest.show_standings ?? false,
			readonly_mode: contest.readonly_mode ?? false,
		});
	}, [contest, form]);

	const countries = useMemo(() => {
		return allCountries(i18n.language)
			.filter((country): country is { code: string; name: string } => Boolean(country))
			.map((country) => ({
				label: country.name,
				value: country.code,
			}));
	}, [i18n.language]);

	const handleUpdateContest = async (values: FormValues): Promise<void> => {
		try {
			setMessages([]);
			await updateContest.mutateAsync({
				id: contest.id,
				data: {
					...values,
					start_date: values.start_date,
					end_date: values.end_date,
				},
			});
			toast.success(t("contest-has-been-edited-successfully"));
		} catch (err) {
			const error = err as ApiErrorResponse;
			const errMessages: string[] = [];
			if (error.response?.data) {
				const obj = error.response.data;
				Object.keys(obj).forEach((e) => {
					errMessages.push(obj[e]);
				});
			}
			setMessages(errMessages);
		}
	};

	const canEdit = currentUser?.role !== undefined ? isAtLeastSuperAdmin(currentUser.role) : false;

	return (
		<div className="flex w-full">
			<div className="flex w-full max-w-none flex-1 flex-col items-start gap-6 rounded-3xl bg-wheat-warm p-6 text-sm">
				<h3 className="text-base font-bold">{t("contest-information")}</h3>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleUpdateContest)} className="w-full space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("name-label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("name-label")}
											disabled={!canEdit || updateContest.isPending}
											{...field}
										/>
									</FormControl>
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("description-label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("description-label")}
											disabled={!canEdit || updateContest.isPending}
											{...field}
										/>
									</FormControl>
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("country")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={!canEdit || updateContest.isPending}
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
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start_date"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("start-date")}</FormLabel>
									<FormControl>
										<Input type="date" disabled={!canEdit || updateContest.isPending} {...field} />
									</FormControl>
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="end_date"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("end-date")}</FormLabel>
									<FormControl>
										<Input type="date" disabled={!canEdit || updateContest.isPending} {...field} />
									</FormControl>
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="days_to_record_in_past"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<FormLabel>{t("days-to-record-in-past")}</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<Input
												type="number"
												min={1}
												className="w-24"
												disabled={!canEdit || updateContest.isPending}
												{...field}
												value={field.value ?? ""}
												onChange={(e) =>
													field.onChange(e.target.value ? Number(e.target.value) : undefined)
												}
											/>
										</FormControl>
										<span className="text-muted-foreground">{t("days")}</span>
									</div>
									<FormDescription className="md:col-start-2">
										{t("days-to-record-in-past-msg")}
									</FormDescription>
									<FormMessage className="md:col-start-2" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="show_standings"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<div />
									<div className="flex items-center space-x-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={!canEdit || updateContest.isPending}
											/>
										</FormControl>
										<Label className="font-normal">{t("show-leaderboard-for-students")}</Label>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="readonly_mode"
							render={({ field }) => (
								<FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:items-center">
									<div />
									<div className="flex items-center space-x-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={!canEdit || updateContest.isPending}
											/>
										</FormControl>
										<Label className="font-normal">{t("readonly")}</Label>
									</div>
								</FormItem>
							)}
						/>

						{messages.length > 0 && (
							<div className="md:ms-[180px]">
								<Alert variant="destructive">
									<AlertTitle>{t("contest-isn't-edited-successfully")}</AlertTitle>
									<AlertDescription>
										{messages.map((msg, index) => (
											<div key={index}>{msg}</div>
										))}
									</AlertDescription>
								</Alert>
							</div>
						)}

						{canEdit && (
							<div className="flex gap-2 md:ms-[180px]">
								<Button type="submit" disabled={updateContest.isPending}>
									{updateContest.isPending ? "..." : t("update")}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => form.reset()}
									disabled={updateContest.isPending}
								>
									{t("reset")}
								</Button>
							</div>
						)}
					</form>
				</Form>
			</div>
		</div>
	);
};

export default EditCompetitionForm;
